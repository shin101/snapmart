import React from "react";
import Layout from "@components/layout";
import FloatingButton from "@components/floating-button";

const Stream = () => {
  return (
    <Layout canGoBack>
      <div className="py-10 px-4 divide-y-2 space-y-4">
        <div className="pt-4 px-4">
          <div className="w-full bg-slate-300 aspect-video rounded-md shadow-sm" />
          <h3 className="font-medium text-gray-700 text-lg mt-2">
            Live stream title
          </h3>
          <FloatingButton href="/streams/create">
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
                d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
          </FloatingButton>
        </div>
      </div>
    </Layout>
  );
};

export default Stream;
