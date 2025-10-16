import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Home, AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/20 via-background to-chart-2/20 flex items-center justify-center p-4" dir="rtl">
      <div className="text-center space-y-6">
        <div className="w-24 h-24 mx-auto rounded-full bg-destructive/10 flex items-center justify-center">
          <AlertCircle className="w-12 h-12 text-destructive" />
        </div>
        
        <div className="space-y-2">
          <h1 className="text-6xl md:text-8xl font-bold text-foreground">
            ۴۰۴
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground">
            صفحه یافت نشد
          </h2>
          <p className="text-lg text-muted-foreground max-w-md mx-auto">
            متأسفانه صفحه‌ای که به دنبال آن هستید وجود ندارد
          </p>
        </div>

        <Link href="/">
          <Button size="lg" className="rounded-xl" data-testid="button-home">
            <Home className="w-5 h-5 ml-2" />
            بازگشت به صفحه اصلی
          </Button>
        </Link>
      </div>
    </div>
  );
}
