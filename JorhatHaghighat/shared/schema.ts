import { z } from "zod";

// OTP Verification Schema
export const sendOtpSchema = z.object({
  mobile: z.string()
    .regex(/^09\d{9}$/, "شماره موبایل باید با 09 شروع شود و 11 رقم باشد")
    .length(11, "شماره موبایل باید 11 رقم باشد"),
});

export const verifyOtpSchema = z.object({
  mobile: z.string()
    .regex(/^09\d{9}$/, "شماره موبایل معتبر نیست")
    .length(11),
  code: z.string()
    .length(4, "کد تایید باید 4 رقم باشد")
    .regex(/^\d{4}$/, "کد تایید باید فقط شامل اعداد باشد"),
});

export type SendOtpRequest = z.infer<typeof sendOtpSchema>;
export type VerifyOtpRequest = z.infer<typeof verifyOtpSchema>;

export interface OtpResponse {
  success: boolean;
  message: string;
}

export interface VerifyOtpResponse extends OtpResponse {
  verified?: boolean;
}
