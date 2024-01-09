import React from "react";

import { useRouter } from "next/router";
import { cls } from "@libs/client/utils";
import TabBar from "src/pages/tab";
import FloatingButton from "./floating-button";

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
      <div className="bg-white w-full text-lg font-medium py-3 text-gray-800 border-b top-0 fixed">
        {canGoBack ? (
          <span className="px-10">
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
              Back
            </button>
          </span>
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
