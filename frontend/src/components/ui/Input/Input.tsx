import { Label } from "radix-ui";
import { useId, type ComponentProps, type Ref } from "react";
import { cn } from "../../../utils/cn";

type InputProps = ComponentProps<"input"> & {
  label: string;
  ref?: Ref<HTMLInputElement>;
};

const inputBase =
  "block w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm " +
  "text-slate-900 placeholder:text-slate-400 transition-colors " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 " +
  "focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

export const Input = ({
  label,
  id,
  className,
  required,
  ref,
  ...props
}: InputProps) => {
  const generatedId = useId();
  const inputId = id ?? generatedId;

  return (
    <div className="flex flex-col gap-1">
      <Label.Root
        htmlFor={inputId}
        className="text-sm font-medium text-slate-700"
      >
        {label}
        {required && (
          <span className="text-red-600" aria-hidden="true">
            {" *"}
          </span>
        )}
      </Label.Root>

      <input
        ref={ref}
        id={inputId}
        required={required}
        className={cn(inputBase, className)}
        {...props}
      />
    </div>
  );
};
