import { InputHTMLAttributes } from "react";

interface InputProps {
  name: string;
  errors?: string[];
  height?: string;
}

export default function Input({
  name,
  errors = [],
  height,
  ...rest
}: InputProps & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="flex flex-col gap-2">
      <input
        name={name}
        className={` bg-transparent rounded-md w-full h-10 focus:outline-none ring-2 focus:ring-4 ring-neutral-200 focus:ring-purple-300 border-none placeholder:text-neutral-400 transition ${height}`}
        {...rest}
      />

      {errors.map((error, index) => (
        <span key={index} className="text-red-500 font-medium">
          {" "}
          {error}
        </span>
      ))}
    </div>
  );
}
