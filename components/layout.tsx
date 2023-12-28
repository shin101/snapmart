import React from "react";
import { cls } from "../libs/client/utils";
import Link from "next/link";
import TabBar from "@/pages/tab";
import { useRouter } from "next/router";

interface LayoutProps {
  title?: string;
  canGoBack?: boolean;
  hasTabBar?: boolean;
  children: React.ReactNode;
}

const Layout = ({ title, canGoBack, hasTabBar, children }: LayoutProps) => {
  const router = useRouter();
  const onClick = () => {
    router.back();
  };

  return (
    <div>
      <div className="bg-white w-full text-lg font-medium py-3 fixed text-gray-800 border-b top-0 left-0">
        {canGoBack ? (
          <button onClick={onClick}>
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              ></path>
            </svg>
          </button>
        ) : null}
        {title ? (
          <span className="flex items-center justify-center ">{title}</span>
        ) : null}
      </div>
      <div className={cls("pt-16", hasTabBar ? "pb-16" : "")}> {children}</div>
      {hasTabBar ? <TabBar /> : null}
    </div>
  );
};

export default Layout;
