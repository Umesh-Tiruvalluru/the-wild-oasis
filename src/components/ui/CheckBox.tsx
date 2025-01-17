import React from "react";

interface CheckBoxProps {
  checked: boolean;
  onChange: () => void;
  disabled?: boolean;
  id: string;
  children: React.ReactNode;
}

const CheckBox: React.FC<CheckBoxProps> = ({
  checked,
  onChange,
  disabled = false,
  id,
  children,
}) => {
  return (
    <div className="p-4 shadow-md space-x-2">
      <input
        type="checkbox"
        id={id}
        name=""
        checked={checked}
        onChange={onChange}
        disabled={disabled}
      />
      <label htmlFor={!disabled ? id : ""}>{children}</label>
    </div>
  );
};

export default CheckBox;
