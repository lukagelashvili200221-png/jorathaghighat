import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage, generateOtpCode } from "./storage";
import { sendOtpSchema, verifyOtpSchema } from "@shared/schema";
import type { SendOtpRequest, VerifyOtpRequest, OtpResponse, VerifyOtpResponse } from "@shared/schema";

// Rate limiting map (simple in-memory implementation)
const rateLimitMap = new Map<string, { count: number; resetAt: Date }>();

// Clean up rate limit map every 5 minutes
setInterval(() => {
  const now = new Date();
  for (const [key, data] of rateLimitMap.entries()) {
    if (data.resetAt < now) {
      rateLimitMap.delete(key);
    }
  }
}, 5 * 60 * 1000);

function checkRateLimit(mobile: string, maxAttempts: number = 3, windowMinutes: number = 5): boolean {
  const now = new Date();
  const rateData = rateLimitMap.get(mobile);

  if (!rateData || rateData.resetAt < now) {
    // Create new rate limit window
    rateLimitMap.set(mobile, {
      count: 1,
      resetAt: new Date(now.getTime() + windowMinutes * 60 * 1000),
    });
    return true;
  }

  if (rateData.count >= maxAttempts) {
    return false;
  }

  rateData.count++;
  return true;
}

async function sendSmsOtp(mobile: string, code: string): Promise<boolean> {
  const apiUrl = "https://s.api.ir/api/sw1/SmsOTP";
  const token = process.env.SMS_API_TOKEN;
  const isDev = process.env.NODE_ENV === "development";

  // Development mode: log the code instead of sending SMS
  if (isDev) {
    console.log("=".repeat(50));
    console.log("📱 DEV MODE: SMS OTP Code for", mobile);
    console.log("🔢 Code:", code);
    console.log("=".repeat(50));
    return true;
  }

  if (!token) {
    console.error("SMS_API_TOKEN not found in environment");
    return false;
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "accept": "text/plain",
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        code: code,
        mobile: mobile,
        template: 0,
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("SMS API error:", response.status, errorText);
      return false;
    }

    return true;
  } catch (error: any) {
    if (error.name === 'AbortError') {
      console.error("SMS API timeout after 5 seconds");
    } else {
      console.error("Error sending SMS:", error);
    }
    return false;
  }
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Send OTP endpoint
  app.post("/api/send-otp", async (req, res) => {
    try {
      // Validate request body
      const validationResult = sendOtpSchema.safeParse(req.body);
      
      if (!validationResult.success) {
        const response: OtpResponse = {
          success: false,
          message: validationResult.error.errors[0]?.message || "شماره موبایل نامعتبر است",
        };
        return res.status(400).json(response);
      }

      const { mobile } = validationResult.data as SendOtpRequest;

      // Check rate limiting
      if (!checkRateLimit(mobile, 3, 5)) {
        const response: OtpResponse = {
          success: false,
          message: "تعداد درخواست‌های شما بیش از حد مجاز است. لطفا ۵ دقیقه بعد تلاش کنید",
        };
        return res.status(429).json(response);
      }

      // Generate OTP code
      const code = generateOtpCode();

      // Save OTP session
      await storage.createOtpSession(mobile, code);

      // Send SMS
      const smsSent = await sendSmsOtp(mobile, code);

      if (!smsSent) {
        const response: OtpResponse = {
          success: false,
          message: "خطا در ارسال پیامک. لطفا دوباره تلاش کنید",
        };
        return res.status(500).json(response);
      }

      const response: OtpResponse = {
        success: true,
        message: "کد تایید با موفقیت ارسال شد",
      };
      
      res.json(response);
    } catch (error) {
      console.error("Error in send-otp:", error);
      const response: OtpResponse = {
        success: false,
        message: "خطای سرور. لطفا دوباره تلاش کنید",
      };
      res.status(500).json(response);
    }
  });

  // Verify OTP endpoint
  app.post("/api/verify-otp", async (req, res) => {
    try {
      // Validate request body
      const validationResult = verifyOtpSchema.safeParse(req.body);
      
      if (!validationResult.success) {
        const response: VerifyOtpResponse = {
          success: false,
          verified: false,
          message: validationResult.error.errors[0]?.message || "داده‌های ورودی نامعتبر است",
        };
        return res.status(400).json(response);
      }

      const { mobile, code } = validationResult.data as VerifyOtpRequest;

      // Increment attempt counter
      await storage.incrementOtpAttempts(mobile);

      // Verify OTP
      const isValid = await storage.verifyOtp(mobile, code);

      if (!isValid) {
        const response: VerifyOtpResponse = {
          success: true, // Request was processed successfully
          verified: false, // But code was incorrect
          message: "کد تایید اشتباه است یا منقضی شده است",
        };
        return res.json(response); // Return 200 with verified: false
      }

      const response: VerifyOtpResponse = {
        success: true,
        verified: true,
        message: "تایید موفقیت‌آمیز بود",
      };
      
      res.json(response);
    } catch (error) {
      console.error("Error in verify-otp:", error);
      const response: VerifyOtpResponse = {
        success: false,
        verified: false,
        message: "خطای سرور. لطفا دوباره تلاش کنید",
      };
      res.status(500).json(response);
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
