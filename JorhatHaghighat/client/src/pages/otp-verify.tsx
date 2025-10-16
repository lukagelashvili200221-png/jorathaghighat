import { useState, useEffect, useRef } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { ShieldCheck, Loader2, RefreshCw } from "lucide-react";
import type { VerifyOtpRequest, VerifyOtpResponse, SendOtpRequest, OtpResponse } from "@shared/schema";

export default function OtpVerify() {
  const [, setLocation] = useLocation();
  const [code, setCode] = useState(["", "", "", ""]);
  const [countdown, setCountdown] = useState(120); // 2 minutes
  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];
  const { toast } = useToast();

  // Get mobile number from URL query
  const mobile = new URLSearchParams(window.location.search).get("mobile") || "";

  useEffect(() => {
    if (!mobile) {
      setLocation("/phone");
      return;
    }

    // Focus first input on mount
    inputRefs[0].current?.focus();

    // Countdown timer
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [mobile, setLocation]);

  const verifyOtpMutation = useMutation({
    mutationFn: async (data: VerifyOtpRequest) => {
      const response = await apiRequest("POST", "/api/verify-otp", data);
      return await response.json() as VerifyOtpResponse;
    },
    onSuccess: (data) => {
      if (data.verified) {
        toast({
          title: "تایید شد!",
          description: "شماره شما با موفقیت تایید شد",
        });
        setLocation("/download");
      } else {
        toast({
          title: "کد اشتباه است",
          description: data.message || "کد وارد شده صحیح نیست",
          variant: "destructive",
        });
        // Clear inputs with setTimeout to ensure state updates complete
        setTimeout(() => {
          setCode(["", "", "", ""]);
          inputRefs[0].current?.focus();
        }, 0);
      }
    },
    onError: (error: Error) => {
      // Try to parse error message for better user feedback
      let errorMessage = "لطفا دوباره تلاش کنید";
      
      try {
        const parts = error.message.split(": ", 2);
        if (parts.length === 2) {
          const jsonPart = parts[1];
          const parsed = JSON.parse(jsonPart);
          if (parsed.message) {
            errorMessage = parsed.message;
          }
        }
      } catch {
        errorMessage = error.message || errorMessage;
      }

      toast({
        title: "خطا در تایید",
        description: errorMessage,
        variant: "destructive",
      });
      
      // Clear inputs on error with setTimeout
      setTimeout(() => {
        setCode(["", "", "", ""]);
        inputRefs[0].current?.focus();
      }, 0);
    },
  });

  const resendOtpMutation = useMutation({
    mutationFn: async (data: SendOtpRequest) => {
      const response = await apiRequest("POST", "/api/send-otp", data);
      return await response.json() as OtpResponse;
    },
    onSuccess: (data) => {
      if (data.success) {
        toast({
          title: "کد جدید ارسال شد",
          description: "کد تایید جدید به شماره موبایل شما ارسال شد",
        });
        setCountdown(120);
        setCode(["", "", "", ""]);
        inputRefs[0].current?.focus();
      }
    },
    onError: (error: Error) => {
      let errorMessage = "لطفا دوباره تلاش کنید";
      
      try {
        const parts = error.message.split(": ", 2);
        if (parts.length === 2) {
          const jsonPart = parts[1];
          const parsed = JSON.parse(jsonPart);
          if (parsed.message) {
            errorMessage = parsed.message;
          }
        }
      } catch {
        errorMessage = error.message || errorMessage;
      }

      toast({
        title: "خطا در ارسال مجدد",
        description: errorMessage,
        variant: "destructive",
      });
    },
  });

  const handleCodeChange = (index: number, value: string) => {
    // Only allow single digit
    const digit = value.replace(/\D/g, "").slice(-1);
    
    const newCode = [...code];
    newCode[index] = digit;
    setCode(newCode);

    // Auto-focus next input
    if (digit && index < 3) {
      inputRefs[index + 1].current?.focus();
    }

    // Auto-submit when all 4 digits are entered
    if (digit && index === 3 && newCode.every(c => c !== "")) {
      const fullCode = newCode.join("");
      verifyOtpMutation.mutate({ mobile, code: fullCode });
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 4);
    const newCode = pastedData.split("").concat(["", "", "", ""]).slice(0, 4);
    setCode(newCode);

    // Focus appropriate input
    const nextEmptyIndex = newCode.findIndex(c => !c);
    if (nextEmptyIndex !== -1) {
      inputRefs[nextEmptyIndex].current?.focus();
    } else {
      inputRefs[3].current?.focus();
      // Auto-submit if all filled
      if (newCode.every(c => c !== "")) {
        verifyOtpMutation.mutate({ mobile, code: newCode.join("") });
      }
    }
  };

  const handleResend = () => {
    if (countdown === 0 && !resendOtpMutation.isPending) {
      resendOtpMutation.mutate({ mobile });
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/20 via-background to-chart-2/20 flex items-center justify-center p-4" dir="rtl">
      <div className="w-full max-w-md">
        {/* Progress Indicator */}
        <div className="mb-8 flex items-center justify-center gap-2">
          <div className="w-12 h-1 bg-primary rounded-full" data-testid="progress-step-1" />
          <div className="w-12 h-1 bg-primary rounded-full" data-testid="progress-step-2" />
          <div className="w-12 h-1 bg-muted rounded-full" data-testid="progress-step-3" />
        </div>

        <Card className="border-2 border-card-border bg-card/95 backdrop-blur-lg shadow-2xl">
          <CardHeader className="text-center space-y-4 pb-4">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center">
              <ShieldCheck className="w-8 h-8 text-primary" />
            </div>
            <CardTitle className="text-2xl md:text-3xl font-bold text-card-foreground">
              تایید شماره موبایل
            </CardTitle>
            <CardDescription className="text-base md:text-lg text-muted-foreground">
              کد ۴ رقمی ارسال شده به
              <br />
              <span className="font-medium text-foreground" dir="ltr">
                {mobile}
              </span>
              <br />
              را وارد کنید
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div className="space-y-6">
              {/* OTP Input Boxes */}
              <div 
                className="flex justify-center gap-3"
                onPaste={handlePaste}
              >
                {[0, 1, 2, 3].map((index) => (
                  <Input
                    key={index}
                    ref={inputRefs[index]}
                    type="tel"
                    maxLength={1}
                    value={code[index]}
                    onChange={(e) => handleCodeChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className="w-14 h-14 md:w-16 md:h-16 text-center text-2xl font-medium border-2 border-input focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all"
                    dir="ltr"
                    disabled={verifyOtpMutation.isPending}
                    data-testid={`input-otp-${index}`}
                  />
                ))}
              </div>

              {/* Timer and Resend */}
              <div className="text-center space-y-3">
                {countdown > 0 ? (
                  <p className="text-sm text-muted-foreground">
                    زمان باقی‌مانده:{" "}
                    <span className="font-medium text-foreground tabular-nums" dir="ltr" data-testid="text-countdown">
                      {formatTime(countdown)}
                    </span>
                  </p>
                ) : (
                  <Button
                    variant="ghost"
                    onClick={handleResend}
                    disabled={resendOtpMutation.isPending}
                    className="text-primary hover:text-primary/80"
                    data-testid="button-resend"
                  >
                    {resendOtpMutation.isPending ? (
                      <>
                        <Loader2 className="w-4 h-4 ml-2 animate-spin" />
                        در حال ارسال...
                      </>
                    ) : (
                      <>
                        <RefreshCw className="w-4 h-4 ml-2" />
                        ارسال مجدد کد
                      </>
                    )}
                  </Button>
                )}
              </div>

              {/* Loading State */}
              {verifyOtpMutation.isPending && (
                <div className="flex items-center justify-center gap-2 text-muted-foreground">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>در حال تایید...</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 text-center">
          <Button
            variant="ghost"
            onClick={() => setLocation("/phone")}
            className="text-muted-foreground hover:text-foreground"
            disabled={verifyOtpMutation.isPending}
            data-testid="button-change-number"
          >
            تغییر شماره موبایل
          </Button>
        </div>
      </div>
    </div>
  );
}
