import React from "react";
import Button from "./button";
import { UseFormRegisterReturn } from "react-hook-form";

interface TextAreaProps {
  label?: string;
  name?: string;
  register: UseFormRegisterReturn;
  [key: string]: any;
}

const TextArea: React.FC<TextAreaProps> = ({
  label,
  name,
  register,
  ...rest
}) => {
  return (
    <div>
      {" "}
      <textarea
        id={name}
        {...register}
        className="mt-1 shadow-sm w-full focus:ring-purple-500 rounded-md border-gray-300 focus:border-purple-500"
        rows={4}
        {...rest}
      />{" "}
      <div className="flex items-center justify-between space-x-2"></div>
    </div>
  );
};

export default TextArea;
