import React from 'react'

interface InputFieldProps {
  type: React.HTMLInputTypeAttribute,
  placeholder: string,
  value?: string,
  required?: boolean
  disabled?: boolean
  name: string
  onChange: React.ChangeEventHandler<HTMLInputElement>
}

const InputField: React.FC<InputFieldProps> = ({ type, placeholder, value, onChange, name, required = false, disabled = false }) => {
  return (
    <input
      type={type}
      onChange={onChange}
      value={value}
      required={required}
      disabled={disabled}
      name={name}
      placeholder={placeholder}
      className="input input-bordered w-full max-w-md"
    />
  )
}

export default InputField
