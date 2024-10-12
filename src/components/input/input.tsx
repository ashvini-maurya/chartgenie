import React, { ChangeEvent } from "react";
import "./input.css";

interface ICgInput {
  id: string;
  label: string;
  type: string;
  value: string;
  required: boolean;
  placeholder: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const CgInput = ({
  id,
  label,
  type,
  value,
  required,
  placeholder,
  onChange,
}: ICgInput) => {
  return (
    <div className="input-container">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
      />
    </div>
  );
};

export default CgInput;
