import React from "react";

type InputProps = {
  label?: string;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  autoFocus?: boolean;
  maxLength?: number;
  minLength?: number;
  required?: boolean;
  readOnly?: boolean;
  name?: string;
  id?: string;
  value?: string;
  type?: "text" | "email" | "password" | "number" | "tel" | "url";
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Input: React.FC<InputProps> = ({
  label,
  placeholder = "Enter text here...",
  className = "",
  disabled,
  autoFocus,
  maxLength,
  minLength,
  required,
  readOnly,
  name,
  id,
  value,
  type,
  onChange,
}) => {
  // Determine border color based on value
  const borderColor = value ? "border-black" : "border-red-500";

  return (
    <div className="flex items-center mb-4 w-full">
      {label && (
        <label htmlFor={id} className="mr-4 text-lg text-black min-w-max">
          {label} :
        </label>
      )}
      <input
        type={type}
        id={id}
        name={name}
        className={`flex-1 border-2 ${borderColor}  bg-transparent focus:ring-0 focus:border-blue-500 text-base px-2 py-1 outline-none ${className}`}
        placeholder={placeholder}
        disabled={disabled}
        autoFocus={autoFocus}
        maxLength={maxLength}
        minLength={minLength}
        required={required}
        readOnly={readOnly}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default Input;
