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
  onChange,
}) => {
  return (
    <div className="flex flex-col mb-4 gap-2">
      {label && (
        <label
          htmlFor={id}
          className="block mb-2 text-sm font-medium text-gray-700"
        >
          {label} :
        </label>
      )}
      <input
        type="text"
        id={id}
        name={name}
        className={`${className}`}
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
