
import { useId } from "react";
import { useTranslation } from "@/hooks/use-translation";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

type FieldType = "text" | "email" | "tel" | "textarea";

interface FormFieldProps {
  name: string;
  type?: FieldType;
  label: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  error?: string;
  required?: boolean;
  className?: string;
  labelClassName?: string;
  inputClassName?: string;
  errorClassName?: string;
}

export const FormField = ({
  name,
  type = "text",
  label,
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  required = false,
  className,
  labelClassName,
  inputClassName,
  errorClassName,
}: FormFieldProps) => {
  const { translate } = useTranslation();
  const id = useId();
  
  const renderField = () => {
    switch (type) {
      case "textarea":
        return (
          <Textarea
            id={id}
            name={name}
            placeholder={placeholder || translate(`form.${name}`)}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            required={required}
            className={cn(
              "transition-all duration-300 resize-none min-h-[120px]",
              error ? "border-destructive focus:ring-destructive/50" : "",
              inputClassName
            )}
            aria-invalid={!!error}
            aria-describedby={error ? `${id}-error` : undefined}
          />
        );
      default:
        return (
          <Input
            id={id}
            name={name}
            type={type}
            placeholder={placeholder || translate(`form.${name}`)}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            required={required}
            className={cn(
              "transition-all duration-300",
              error ? "border-destructive focus:ring-destructive/50" : "",
              inputClassName
            )}
            aria-invalid={!!error}
            aria-describedby={error ? `${id}-error` : undefined}
          />
        );
    }
  };

  return (
    <div className={cn("form-field space-y-2", className)}>
      <Label
        htmlFor={id}
        className={cn("text-sm font-medium", labelClassName)}
      >
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </Label>
      {renderField()}
      {error && (
        <p
          id={`${id}-error`}
          className={cn("text-sm text-destructive animate-fade-in", errorClassName)}
        >
          {error}
        </p>
      )}
    </div>
  );
};
