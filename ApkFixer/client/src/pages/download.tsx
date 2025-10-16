import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Download, Smartphone, Users, Mic, Zap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import appMockup from "@assets/generated_images/Android_app_mockup_phone_643da925.png";

export default function DownloadPage() {
  const { toast } = useToast();

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/app.apk';
    link.download = 'jorat-haghighat.apk';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "دانلود شروع شد",
      description: "فایل APK در حال دانلود است. لطفاً پس از اتمام دانلود، فایل را نصب کنید",
    });
  };

  const features = [
    {
      icon: Users,
      title: "بازی با دوستان",
      description: "به صورت گروهی بازی کنید",
    },
    {
      icon: Mic,
      title: "چت صوتی",
      description: "صحبت کردن در حین بازی",
    },
    {
      icon: Zap,
      title: "سریع و آسان",
      description: "شروع فوری بازی",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-chart-2/10" dir="rtl">
      {/* Progress Indicator */}
      <div className="pt-8 pb-4">
        <div className="max-w-md mx-auto px-4 flex items-center justify-center gap-2">
          <div className="w-12 h-1 bg-primary rounded-full" data-testid="progress-step-1" />
          <div className="w-12 h-1 bg-primary rounded-full" data-testid="progress-step-2" />
          <div className="w-12 h-1 bg-primary rounded-full" data-testid="progress-step-3" />
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Success Message */}
        <div className="text-center mb-12 space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <div className="w-20 h-20 mx-auto rounded-full bg-chart-4/10 flex items-center justify-center">
            <CheckCircle2 className="w-12 h-12 text-chart-4" />
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-foreground">
            تبریک! تایید موفقیت‌آمیز بود
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            برای ادامه و شروع بازی، اپلیکیشن اندروید را دانلود و نصب کنید
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-12">
          {/* App Mockup */}
          <div className="order-2 md:order-1 flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-chart-2/20 blur-3xl" />
              <img 
                src={appMockup} 
                alt="اپلیکیشن جرعت و حقیقت" 
                className="relative w-full max-w-sm mx-auto drop-shadow-2xl"
                data-testid="img-app-mockup"
              />
            </div>
          </div>

          {/* Download Section */}
          <div className="order-1 md:order-2 space-y-6">
            <Card className="border-2 border-card-border bg-card/80 backdrop-blur-sm">
              <CardContent className="p-6 space-y-6">
                <div className="space-y-3">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <Smartphone className="w-7 h-7 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold text-card-foreground">
                    دانلود اپلیکیشن اندروید
                  </h2>
                  <p className="text-muted-foreground">
                    برای دسترسی کامل به بازی و استفاده از تمام امکانات، اپلیکیشن را دانلود کنید
                  </p>
                </div>

                <Button
                  size="lg"
                  className="w-full h-14 text-lg rounded-xl shadow-lg shadow-primary/30 hover:scale-105 transition-transform"
                  data-testid="button-download-app"
                  onClick={handleDownload}
                >
                  <Download className="w-5 h-5 ml-2" />
                  دانلود اپلیکیشن اندروید
                </Button>

                <div className="text-center">
                  <p className="text-sm text-muted-foreground">
                    نسخه ۱.۰.۰ - حجم: ۲۵ مگابایت
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Alternative Download */}
            <div className="text-center space-y-3">
              <p className="text-sm text-muted-foreground">
                یا از طریق کد QR دانلود کنید
              </p>
              <div className="w-32 h-32 mx-auto bg-white rounded-lg p-2 shadow-md">
                <div className="w-full h-full bg-gradient-to-br from-primary/20 to-chart-2/20 rounded flex items-center justify-center">
                  <span className="text-xs text-muted-foreground">QR Code</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* App Features */}
        <div className="space-y-6">
          <h3 className="text-2xl md:text-3xl font-bold text-center text-foreground">
            امکانات اپلیکیشن
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card 
                key={index}
                className="border-2 border-card-border bg-card/60 backdrop-blur-sm hover-elevate hover:scale-105 transition-all duration-300"
                data-testid={`card-app-feature-${index}`}
              >
                <CardContent className="p-6 text-center space-y-3">
                  <div className="w-12 h-12 mx-auto rounded-xl bg-primary/10 flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h4 className="text-lg font-semibold text-card-foreground">
                    {feature.title}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Support Section */}
        <div className="mt-12 text-center space-y-4">
          <Card className="border-2 border-card-border bg-muted/30 backdrop-blur-sm">
            <CardContent className="p-6">
              <p className="text-muted-foreground">
                در صورت مشکل در دانلود یا نصب، با{" "}
                <span className="text-primary font-medium">پشتیبانی</span>
                {" "}تماس بگیرید
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
