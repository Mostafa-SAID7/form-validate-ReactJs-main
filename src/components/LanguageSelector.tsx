
import { useState, useEffect } from "react";
import { Check, ChevronDown, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTranslation } from "@/hooks/use-translation";

const languages = [
  { code: "en", label: "English", flag: "🇺🇸" },
  { code: "fr", label: "Français", flag: "🇫🇷" },
  { code: "es", label: "Español", flag: "🇪🇸" },
  { code: "de", label: "Deutsch", flag: "🇩🇪" },
  { code: "ar", label: "العربية", flag: "🇸🇦" },
];

export function LanguageSelector() {
  const { language, setLanguage } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(language);
  
  useEffect(() => {
    setCurrentLanguage(language);
  }, [language]);

  const handleLanguageChange = (langCode: string) => {
    setLanguage(langCode);
  };

  const getCurrentLanguage = () => {
    return languages.find((l) => l.code === currentLanguage) || languages[0];
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2 rounded-full">
          <span className="text-base">{getCurrentLanguage().flag}</span>
          <span className="hidden sm:inline">{getCurrentLanguage().label}</span>
          <ChevronDown className="h-4 w-4 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            className="flex items-center justify-between cursor-pointer"
            onClick={() => handleLanguageChange(lang.code)}
          >
            <span className="flex items-center gap-2">
              <span className="text-base">{lang.flag}</span>
              {lang.label}
            </span>
            {currentLanguage === lang.code && <Check className="h-4 w-4" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
