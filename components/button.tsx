import React from "react";

interface ButtonProps {
  text: string;
}

const Button = ({ text }: ButtonProps) => {
  return (
    <button className="flex-1 bg-purple-500 text-white py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 font-medium hover:bg-purple-600">
      {text}
    </button>
  );
};

export default Button;
