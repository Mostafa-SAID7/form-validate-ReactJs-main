
import { useState } from "react";
import { useTranslation } from "@/hooks/use-translation";
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/FormField";
import { toast } from "sonner";
import { CheckCircle } from "lucide-react";

type FieldConfig = {
  name: string;
  type: "text" | "email" | "tel" | "textarea";
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  patternErrorKey?: string;
};

type FieldErrors = {
  [key: string]: string;
};

const fieldConfigs: FieldConfig[] = [
  {
    name: "name",
    type: "text",
    required: true,
    minLength: 2,
    maxLength: 50,
  },
  {
    name: "email",
    type: "email",
    required: true,
    pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    patternErrorKey: "form.error.email",
  },
  {
    name: "phone",
    type: "tel",
    pattern: /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/,
    patternErrorKey: "form.error.pattern",
  },
  {
    name: "message",
    type: "textarea",
    required: true,
    minLength: 10,
    maxLength: 500,
  },
];

export const DynamicForm = () => {
  const { translate } = useTranslation();
  const [formData, setFormData] = useState<Record<string, string>>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validateField = (name: string, value: string, config: FieldConfig): string => {
    if (config.required && !value.trim()) {
      return translate("form.error.required");
    }
    
    if (value.trim()) {
      if (config.minLength && value.length < config.minLength) {
        return translate("form.error.minLength", { min: config.minLength });
      }
      
      if (config.maxLength && value.length > config.maxLength) {
        return translate("form.error.maxLength", { max: config.maxLength });
      }
      
      if (config.pattern && !config.pattern.test(value)) {
        return translate(config.patternErrorKey || "form.error.pattern");
      }
    }
    
    return "";
  };

  const validateForm = (): boolean => {
    const newErrors: FieldErrors = {};
    let isValid = true;
    
    fieldConfigs.forEach((config) => {
      const error = validateField(config.name, formData[config.name] || "", config);
      if (error) {
        newErrors[config.name] = error;
        isValid = false;
      }
    });
    
    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear error on change
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const config = fieldConfigs.find((c) => c.name === name);
    
    if (config) {
      const error = validateField(name, value, config);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // Success
      setSubmitted(true);
      toast.success(translate("form.success"), {
        duration: 5000,
        icon: <CheckCircle className="h-5 w-5 text-green-500" />,
      });
      
      // Reset form after delay
      setTimeout(() => {
        resetForm();
      }, 2000);
    } catch (error) {
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      message: "",
    });
    setErrors({});
    setSubmitted(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {fieldConfigs.map((config) => (
        <FormField
          key={config.name}
          name={config.name}
          type={config.type}
          label={translate(`form.${config.name}`)}
          value={formData[config.name] || ""}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors[config.name]}
          required={config.required}
        />
      ))}
      
      <div className="flex gap-3 pt-2">
        <Button
          type="submit"
          className="flex-1 transition-all duration-300"
          disabled={isSubmitting || submitted}
        >
          {isSubmitting ? 
            "..." : 
            submitted ? 
              "✓" : 
              translate("form.submit")}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={resetForm}
          className="transition-all duration-300"
        >
          {translate("form.reset")}
        </Button>
      </div>
    </form>
  );
};
