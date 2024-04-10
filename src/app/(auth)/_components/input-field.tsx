import { forwardRef, useState } from "react";
import { EyeIcon, EyeOffIcon, Mail, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input, InputProps } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const InputField = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const disabled =
      props.value === "" || props.value === undefined || props.disabled;

    if (props.id === "password") {
      return (
        <>
          <div className="flex flex-col">
            <p className="text-xl font-semibold mb-2 capitalize">{props.id}</p>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                className={cn("hide-password-toggle pr-10", className)}
                ref={ref}
                {...props}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowPassword((prev) => !prev)}
                disabled={disabled}
              >
                {showPassword && !disabled ? (
                  <EyeIcon className="h-4 w-4" aria-hidden="true" />
                ) : (
                  <EyeOffIcon className="h-4 w-4" aria-hidden="true" />
                )}
                <span className="sr-only">
                  {showPassword ? "Hide password" : "Show password"}
                </span>
              </Button>

              {/* hides browsers password toggles */}
              <style>{`
                  .hide-password-toggle::-ms-reveal,
                  .hide-password-toggle::-ms-clear {
                      visibility: hidden;
                      pointer-events: none;
                      display: none;
                  }
              `}</style>
            </div>
          </div>
        </>
      );
    }

    return (
      <div className="relative">
        <p className="text-xl font-semibold mb-2 capitalize">{props.id}</p>
        <Input type="text" className="pr-10" ref={ref} {...props} />
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
        >
          {props.value === "name" ? (
            <Mail className="h-4 w-4" aria-hidden="true" />
          ) : (
            <User className="h-4 w-4" aria-hidden="true" />
          )}
        </Button>
      </div>
    );
  }
);
InputField.displayName = "PasswordInput";

export { InputField as InputField };
