import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Translations = {
  [key: string]: {
    [key: string]: string;
  };
};

const translations: Translations = {
  en: {
    "form.title": "Contact Form",
    "form.subtitle": "Fill in your details below",
    "form.name": "Full Name",
    "form.email": "Email Address",
    "form.phone": "Phone Number",
    "form.message": "Your Message",
    "form.submit": "Submit",
    "form.reset": "Reset",
    "form.success": "Form submitted successfully!",
    "form.error.required": "This field is required",
    "form.error.email": "Please enter a valid email address",
    "form.error.minLength": "Must be at least {{min}} characters",
    "form.error.maxLength": "Cannot exceed {{max}} characters",
    "form.error.pattern": "Invalid format",
  },
  fr: {
    "form.title": "Formulaire de Contact",
    "form.subtitle": "Remplissez vos coordonnées ci-dessous",
    "form.name": "Nom Complet",
    "form.email": "Adresse Email",
    "form.phone": "Numéro de Téléphone",
    "form.message": "Votre Message",
    "form.submit": "Envoyer",
    "form.reset": "Réinitialiser",
    "form.success": "Formulaire soumis avec succès!",
    "form.error.required": "Ce champ est obligatoire",
    "form.error.email": "Veuillez saisir une adresse email valide",
    "form.error.minLength": "Doit comporter au moins {{min}} caractères",
    "form.error.maxLength": "Ne peut pas dépasser {{max}} caractères",
    "form.error.pattern": "Format invalide",
  },
  es: {
    "form.title": "Formulario de Contacto",
    "form.subtitle": "Complete sus datos a continuación",
    "form.name": "Nombre Completo",
    "form.email": "Correo Electrónico",
    "form.phone": "Número de Teléfono",
    "form.message": "Su Mensaje",
    "form.submit": "Enviar",
    "form.reset": "Restablecer",
    "form.success": "¡Formulario enviado con éxito!",
    "form.error.required": "Este campo es obligatorio",
    "form.error.email": "Por favor, introduzca una dirección de correo electrónico válida",
    "form.error.minLength": "Debe tener al menos {{min}} caracteres",
    "form.error.maxLength": "No puede exceder los {{max}} caracteres",
    "form.error.pattern": "Formato inválido",
  },
  de: {
    "form.title": "Kontaktformular",
    "form.subtitle": "Füllen Sie Ihre Daten unten aus",
    "form.name": "Vollständiger Name",
    "form.email": "E-Mail-Adresse",
    "form.phone": "Telefonnummer",
    "form.message": "Ihre Nachricht",
    "form.submit": "Absenden",
    "form.reset": "Zurücksetzen",
    "form.success": "Formular erfolgreich abgeschickt!",
    "form.error.required": "Dieses Feld ist erforderlich",
    "form.error.email": "Bitte geben Sie eine gültige E-Mail-Adresse ein",
    "form.error.minLength": "Muss mindestens {{min}} Zeichen lang sein",
    "form.error.maxLength": "Darf nicht mehr als {{max}} Zeichen haben",
    "form.error.pattern": "Ungültiges Format",
  },
  ar: {
    "form.title": "نموذج الاتصال",
    "form.subtitle": "املأ بياناتك أدناه",
    "form.name": "الاسم الكامل",
    "form.email": "البريد الإلكتروني",
    "form.phone": "رقم الهاتف",
    "form.message": "رسالتك",
    "form.submit": "إرسال",
    "form.reset": "إعادة تعيين",
    "form.success": "تم إرسال النموذج بنجاح!",
    "form.error.required": "هذا الحقل مطلوب",
    "form.error.email": "يرجى إدخال عنوان بريد إلكتروني صالح",
    "form.error.minLength": "يجب أن يكون على الأقل {{min}} أحرف",
    "form.error.maxLength": "لا يمكن أن يتجاوز {{max}} حرفًا",
    "form.error.pattern": "تنسيق غير صالح",
  },
};

type TranslationContextType = {
  translate: (key: string, params?: Record<string, string | number>) => string;
  language: string;
  setLanguage: (lang: string) => void;
};

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

export const TranslationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState("en");

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language");
    if (savedLanguage && translations[savedLanguage]) {
      setLanguage(savedLanguage);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("language", language);
    
    // Set document direction based on language
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
  }, [language]);

  const translate = (key: string, params?: Record<string, string | number>): string => {
    const translation = translations[language]?.[key] || translations.en[key] || key;
    
    if (params) {
      return Object.entries(params).reduce(
        (acc, [paramKey, paramValue]) =>
          acc.replace(new RegExp(`{{${paramKey}}}`, "g"), String(paramValue)),
        translation
      );
    }
    
    return translation;
  };

  return (
    <TranslationContext.Provider value={{ translate, language, setLanguage }}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (context === undefined) {
    throw new Error("useTranslation must be used within a TranslationProvider");
  }
  return context;
};
