
import { useTranslation } from "@/hooks/use-translation";
import { TranslationProvider } from "@/hooks/use-translation";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageSelector } from "@/components/LanguageSelector";
import { DynamicForm } from "@/components/DynamicForm";
import { LottieAnimation } from "@/components/LottieAnimation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import formAnimation from "../assets/formAnimation.json";

const FormPage = () => {
  const { translate } = useTranslation();

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 transition-colors duration-300">
      <div className="fixed top-4 right-4 flex items-center gap-3 z-10">
        <LanguageSelector />
        <ThemeToggle />
      </div>
      
      <div className="w-full max-w-md mx-auto">
        <div className="h-32 w-32 mx-auto mb-6 animate-float">
          <LottieAnimation
            animationData={formAnimation}
            loop={true}
            autoplay={true}
          />
        </div>
        
        <Card className="form-container backdrop-blur-md">
          <CardHeader className="space-y-1 pb-2">
            <div className="inline-block mb-1 px-2.5 py-0.5 text-xs font-medium rounded-full bg-primary/10 text-primary">
              Smart Form
            </div>
            <CardTitle className="text-2xl font-bold">
              {translate("form.title")}
            </CardTitle>
            <CardDescription>
              {translate("form.subtitle")}
            </CardDescription>
          </CardHeader>
          
          <CardContent className="pt-4">
            <DynamicForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const Index = () => {
  return (
    <TranslationProvider>
      <FormPage />
    </TranslationProvider>
  );
};

export default Index;
