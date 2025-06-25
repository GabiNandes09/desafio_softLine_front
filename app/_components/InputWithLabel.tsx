import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { forwardRef } from "react"

interface InputWithLabelProps {
  labelText: string
  hint: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onBlur?: () => void
  id?: string
  type?: string
  hasError?: boolean
  disabled?: boolean
}

export const InputWithLabel = forwardRef<HTMLInputElement, InputWithLabelProps>(
  (
    {
      labelText,
      hint,
      value,
      onChange,
      onBlur,
      id = "input",
      type = "text",
      hasError,
      disabled,
    },
    ref
  ) => {
    return (
      <div className="space-y-1">
        <Label htmlFor={id}>{labelText}</Label>
        <Input
          id={id}
          ref={ref}
          type={type}
          placeholder={hint}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          disabled={disabled}
          className={`mt-2 ${hasError ? "border-red-500" : ""}`}
        />
        {hasError && (
          <p className="text-red-500 text-sm">Campo obrigatório</p>
        )}
      </div>
    )
  }
)

InputWithLabel.displayName = "InputWithLabel"
