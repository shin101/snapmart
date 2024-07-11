"use client";
import { useFormStatus } from "react-dom";

interface ButtonProps {
  text: string;
  showLoading?: boolean;
}

export default function Button({ text, showLoading = true }: ButtonProps) {
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending}
      className="items-center border-2 font-medium rounded-full focus:outline-none focus:ring-2 transition-all hover:bg-[#818CF8] border-transparent text-gray-100 px-6 py-3 flex w-full justify-center bg-[#5547EE]"
    >
      {pending && showLoading ? "Loading..." : text}
    </button>
  );
}
