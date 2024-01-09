import React from "react";

interface ButtonProps {
  text: string;
}

const Button = ({ text }: ButtonProps) => {
  return (
    <div >
      <button className="w-full bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 focus:outline-none">
        {text}
      </button>
    </div>
  );
};

export default Button;
