import React from "react";
import Button from "./button";

interface TextAreaProps {
  [key: string]: any;
}

const TextArea = ({ ...rest }: TextAreaProps) => {
  return (
    <div>
      {" "}
      <textarea
        className="mt-1 shadow-sm w-full focus:ring-purple-500 rounded-md border-gray-300 focus:border-purple-500"
        rows={4}
        {...rest}
      />{" "}
      <div className="flex items-center justify-between space-x-2">
        <Button text="Submit" />
      </div>
    </div>
  );
};

export default TextArea;
