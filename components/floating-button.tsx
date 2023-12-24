import Link from "next/link";
import React from "react";

interface FloatingButtonProps {
  children: React.ReactNode;
  href: string;
}

const FloatingButton = ({ children, href }: FloatingButtonProps) => {
  return (
    <Link href={href}>
      <button className="fixed hover:bg-purple-500 transition-colors cursor-pointer bottom-24 right-5 shadow-xl bg-purple-400 rounded-full p-4 text-white">
        {children}
      </button>
    </Link>
  );
};

export default FloatingButton;
