import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface InputWithLabelProps {
  labelText: string
  hint: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  id?: string
  type?: string
}

export function InputWithLabel({
  labelText,
  hint,
  value,
  onChange,
  id = "input",
  type = "text"
}: InputWithLabelProps) {
  return (
    <div>
      <Label htmlFor={id}>{labelText}</Label>
      <Input
        id={id}
        type={type}
        placeholder={hint}
        value={value}
        onChange={onChange}
        className="mt-2"
      />
    </div>
  )
}
