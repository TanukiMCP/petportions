import React, { FC } from "react";

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  success?: boolean;
  error?: boolean;
  hint?: string; // Optional hint text
}

const Input: FC<InputProps> = ({
  className = "",
  disabled = false,
  success = false,
  error = false,
  hint,
  ...props
}) => {
  // Determine input styles based on state (disabled, success, error)
  let inputClasses = `h-12 w-full rounded-lg border appearance-none px-4 py-3 text-body-md font-medium shadow-sm placeholder:text-muted-foreground focus:outline-hidden focus:ring-2 dark:bg-gray-900 dark:text-foreground dark:placeholder:text-muted-foreground dark:focus:border-primary ${className}`;

  // Add styles for the different states
  if (disabled) {
    inputClasses += ` text-gray-500 border-gray-300 cursor-not-allowed dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700`;
  } else if (error) {
    inputClasses += ` text-error-800 border-error-500 focus:ring-3 focus:ring-error-500/10  dark:text-error-400 dark:border-error-500`;
  } else if (success) {
    inputClasses += ` text-success-500 border-success-400 focus:ring-success-500/10 focus:border-success-300  dark:text-success-400 dark:border-success-500`;
  } else {
    inputClasses += ` bg-transparent text-foreground border-primary/30 focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-primary/30 dark:bg-gray-900 dark:text-foreground dark:focus:border-primary`;
  }

  return (
    <div className="relative">
      <input
        {...props}
        disabled={disabled}
        className={inputClasses}
      />

      {/* Optional Hint Text */}
      {hint && (
        <p
          className={`mt-1.5 text-xs ${
            error
              ? "text-error-500"
              : success
              ? "text-success-500"
              : "text-gray-500"
          }`}
        >
          {hint}
        </p>
      )}
    </div>
  );
};

export default Input;
