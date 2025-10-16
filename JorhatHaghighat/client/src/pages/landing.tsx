import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Mic, Smartphone, CheckCircle2, Zap, Shield } from "lucide-react";
import heroImage from "@assets/generated_images/Truth_or_Dare_hero_image_01cf2842.png";

export default function Landing() {
  const features = [
    {
      icon: Users,
      title: "بازی تیمی",
      description: "با دوستان خود به صورت گروهی بازی کنید و لحظات شاد و به یادماندنی بسازید",
    },
    {
      icon: Mic,
      title: "چت صوتی",
      description: "با قابلیت چت صوتی و تماس ویدیویی، تجربه‌ای واقعی‌تر از بازی داشته باشید",
    },
    {
      icon: Smartphone,
      title: "بازی آنلاین",
      description: "هر جا که هستید، با گوشی موبایل خود می‌توانید به بازی بپیوندید",
    },
  ];

  const steps = [
    {
      number: "۱",
      title: "ثبت نام کنید",
      description: "با شماره موبایل خود وارد شوید",
    },
    {
      number: "۲",
      title: "کد تایید را دریافت کنید",
      description: "کد پیامکی را وارد کنید",
    },
    {
      number: "۳",
      title: "اپلیکیشن را دانلود کنید",
      description: "اپلیکیشن اندروید را نصب کنید",
    },
    {
      number: "۴",
      title: "شروع بازی!",
      description: "با دوستان خود لذت ببرید",
    },
  ];

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Background Image with Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src={heroImage} 
            alt="بازی جرعت و حقیقت" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary/70 to-chart-2/80" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 py-24 text-center">
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <div className="flex flex-wrap justify-center gap-3">
              <Badge 
                variant="secondary" 
                className="text-base px-4 py-2 bg-white/20 backdrop-blur-md border-white/30 text-white hover:bg-white/30"
                data-testid="badge-team-play"
              >
                <Users className="w-4 h-4 ml-2" />
                بازی تیمی
              </Badge>
              <Badge 
                variant="secondary" 
                className="text-base px-4 py-2 bg-white/20 backdrop-blur-md border-white/30 text-white hover:bg-white/30"
                data-testid="badge-voice-chat"
              >
                <Mic className="w-4 h-4 ml-2" />
                چت صوتی
              </Badge>
              <Badge 
                variant="secondary" 
                className="text-base px-4 py-2 bg-white/20 backdrop-blur-md border-white/30 text-white hover:bg-white/30"
                data-testid="badge-online"
              >
                <Zap className="w-4 h-4 ml-2" />
                آنلاین
              </Badge>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
              جرعت و حقیقت
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto leading-relaxed">
              هیجان‌انگیزترین بازی جمعی برای دوستان ایرانی
              <br />
              با قابلیت چت صوتی و بازی تیمی
            </p>

            <div className="pt-6">
              <Link href="/phone" data-testid="link-start-game">
                <Button 
                  size="lg" 
                  className="text-xl px-12 py-6 h-auto rounded-xl shadow-2xl shadow-primary-foreground/50 hover:scale-105 transition-transform duration-300 bg-white text-primary hover:bg-white/90"
                  data-testid="button-start-game"
                >
                  شروع بازی
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              ویژگی‌های بازی
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              تجربه‌ای متفاوت از بازی جرعت و حقیقت با امکانات پیشرفته
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card 
                key={index}
                className="p-6 bg-card border-2 border-card-border hover-elevate hover:scale-105 transition-all duration-300"
                data-testid={`card-feature-${index}`}
              >
                <div className="space-y-4">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                    <feature.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-semibold text-card-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How to Play Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              چگونه شروع کنیم؟
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              فقط چند قدم تا شروع بازی فاصله دارید
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, index) => (
              <div 
                key={index}
                className="relative"
                data-testid={`step-${index}`}
              >
                <Card className="p-6 bg-card border-2 border-card-border hover-elevate transition-all duration-300">
                  <div className="space-y-4 text-center">
                    <div className="w-16 h-16 mx-auto rounded-full bg-primary flex items-center justify-center text-primary-foreground text-2xl font-bold">
                      {step.number}
                    </div>
                    <h3 className="text-xl font-semibold text-card-foreground">
                      {step.title}
                    </h3>
                    <p className="text-base text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              چرا ما را انتخاب کنید؟
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center space-y-3" data-testid="benefit-safe">
              <div className="w-12 h-12 mx-auto rounded-full bg-chart-4/10 flex items-center justify-center">
                <Shield className="w-6 h-6 text-chart-4" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">امن و خصوصی</h3>
              <p className="text-muted-foreground">حریم خصوصی شما برای ما مهم است</p>
            </div>

            <div className="text-center space-y-3" data-testid="benefit-easy">
              <div className="w-12 h-12 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                <Smartphone className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">آسان و سریع</h3>
              <p className="text-muted-foreground">فقط با یک کلیک شروع کنید</p>
            </div>

            <div className="text-center space-y-3" data-testid="benefit-fun">
              <div className="w-12 h-12 mx-auto rounded-full bg-chart-2/10 flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-chart-2" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">سرگرم‌کننده</h3>
              <p className="text-muted-foreground">ساعت‌ها لذت و خنده</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-primary to-chart-2 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-8">
          <h2 className="text-3xl md:text-5xl font-bold">
            آماده برای شروع هستید؟
          </h2>
          <p className="text-xl md:text-2xl text-white/90">
            همین حالا به جمع هزاران بازیکن بپیوندید
          </p>
          <Link href="/phone" data-testid="link-start-game-cta">
            <Button 
              size="lg" 
              className="text-xl px-12 py-6 h-auto rounded-xl shadow-2xl hover:scale-105 transition-transform duration-300 bg-white text-primary hover:bg-white/90"
              data-testid="button-start-game-cta"
            >
              شروع بازی رایگان
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-background border-t border-border">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-muted-foreground">
            © ۱۴۰۴ جرعت و حقیقت - تمامی حقوق محفوظ است
          </p>
        </div>
      </footer>
    </div>
  );
}
