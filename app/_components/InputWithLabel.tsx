import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import React from "react"

interface InputWithLabelProps {
  labelText: string
  hint: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
  id?: string
  type?: string
  hasError?: boolean
}

export function InputWithLabel({
  labelText,
  hint,
  value,
  onChange,
  onBlur,
  id = "input",
  type = "text",
  hasError,
}: InputWithLabelProps) {
  return (
    <div className="space-y-1">
      <Label htmlFor={id}>{labelText}</Label>
      <Input
        id={id}
        type={type}
        placeholder={hint}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className={`mt-2 ${hasError ? "border-red-500" : ""}`}
      />
      {hasError && (
        <p className="text-red-500 text-sm">Campo obrigatório</p>
      )}
    </div>
  )
}
