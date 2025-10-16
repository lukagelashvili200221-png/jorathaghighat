import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Smartphone, ArrowRight, Loader2 } from "lucide-react";
import type { SendOtpRequest, OtpResponse } from "@shared/schema";

export default function PhoneInput() {
  const [, setLocation] = useLocation();
  const [mobile, setMobile] = useState("");
  const { toast } = useToast();

  const sendOtpMutation = useMutation({
    mutationFn: async (data: SendOtpRequest) => {
      const response = await apiRequest("POST", "/api/send-otp", data);
      return await response.json() as OtpResponse;
    },
    onSuccess: (data) => {
      if (data.success) {
        toast({
          title: "کد تایید ارسال شد",
          description: "کد تایید به شماره موبایل شما ارسال شد",
        });
        setLocation(`/verify?mobile=${mobile}`);
      } else {
        toast({
          title: "خطا",
          description: data.message || "مشکلی در ارسال کد پیش آمد",
          variant: "destructive",
        });
      }
    },
    onError: (error: Error) => {
      // Try to parse error message for better user feedback
      let errorMessage = "لطفا دوباره تلاش کنید";
      
      try {
        // Error format is "STATUS: JSON_BODY"
        const parts = error.message.split(": ", 2);
        if (parts.length === 2) {
          const jsonPart = parts[1];
          const parsed = JSON.parse(jsonPart);
          if (parsed.message) {
            errorMessage = parsed.message;
          }
        }
      } catch {
        // If parsing fails, use default or original message
        errorMessage = error.message || errorMessage;
      }

      toast({
        title: "خطا در ارسال",
        description: errorMessage,
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate Iranian mobile number
    if (!/^09\d{9}$/.test(mobile)) {
      toast({
        title: "شماره موبایل نامعتبر",
        description: "شماره موبایل باید با 09 شروع شود و 11 رقم باشد",
        variant: "destructive",
      });
      return;
    }

    sendOtpMutation.mutate({ mobile });
  };

  const formatMobileNumber = (value: string) => {
    // Only allow digits
    const digits = value.replace(/\D/g, '');
    // Limit to 11 digits
    return digits.slice(0, 11);
  };

  const handleMobileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatMobileNumber(e.target.value);
    setMobile(formatted);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/20 via-background to-chart-2/20 flex items-center justify-center p-4" dir="rtl">
      <div className="w-full max-w-md">
        {/* Progress Indicator */}
        <div className="mb-8 flex items-center justify-center gap-2">
          <div className="w-12 h-1 bg-primary rounded-full" data-testid="progress-step-1" />
          <div className="w-12 h-1 bg-muted rounded-full" data-testid="progress-step-2" />
          <div className="w-12 h-1 bg-muted rounded-full" data-testid="progress-step-3" />
        </div>

        <Card className="border-2 border-card-border bg-card/95 backdrop-blur-lg shadow-2xl">
          <CardHeader className="text-center space-y-4 pb-4">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center">
              <Smartphone className="w-8 h-8 text-primary" />
            </div>
            <CardTitle className="text-2xl md:text-3xl font-bold text-card-foreground">
              ورود به بازی
            </CardTitle>
            <CardDescription className="text-base md:text-lg text-muted-foreground">
              لطفا شماره موبایل خود را وارد کنید
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="mobile" className="text-sm font-medium text-card-foreground">
                  شماره موبایل
                </label>
                <div className="relative">
                  <Input
                    id="mobile"
                    type="tel"
                    placeholder="09123456789"
                    value={mobile}
                    onChange={handleMobileChange}
                    className="h-12 text-lg text-center tracking-wider border-2 border-input focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all"
                    dir="ltr"
                    disabled={sendOtpMutation.isPending}
                    data-testid="input-mobile"
                  />
                </div>
                <p className="text-xs text-muted-foreground text-center">
                  مثال: 09123456789
                </p>
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full h-12 text-lg rounded-xl shadow-lg shadow-primary/30 hover:scale-105 transition-transform"
                disabled={sendOtpMutation.isPending || mobile.length !== 11}
                data-testid="button-send-otp"
              >
                {sendOtpMutation.isPending ? (
                  <>
                    <Loader2 className="w-5 h-5 ml-2 animate-spin" />
                    در حال ارسال...
                  </>
                ) : (
                  <>
                    <ArrowRight className="w-5 h-5 ml-2" />
                    دریافت کد تایید
                  </>
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                با ورود، شما{" "}
                <span className="text-primary">قوانین و مقررات</span>
                {" "}را می‌پذیرید
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 text-center">
          <Button
            variant="ghost"
            onClick={() => setLocation("/")}
            className="text-muted-foreground hover:text-foreground"
            data-testid="button-back-home"
          >
            بازگشت به صفحه اصلی
          </Button>
        </div>
      </div>
    </div>
  );
}
