import React from "react";

const StreamDetail = () => {
  return (
    <div className="py-10 px-4 space-y-4">
      <div className="w-full bg-slate-300 aspect-video rounded-md shadow-sm" />
      <h3 className="text-gray-800 font-semibold text-2xl mt-2">
        Live stream title
      </h3>
      <div className="mt-10 pb-16 h-[50vh] overflow-y-scroll px-4 space-y-4">
        <div className="flex items-start space-x-2">
          <div className="w-8 h-8 rounded-full bg-slate-400" />
          <div className="w-1/2 text-gray-700 p-2 border border-gray-300 rounded-md">
            <p>Hi how much are you selling them for?</p>
          </div>
        </div>
        <div>
          <div className="flex flex-row-reverse items-start space-x-2 space-x-reverse">
            <div className="w-8 h-8 rounded-full bg-slate-400" />
            <div className="w-1/2 text-gray-700 p-2 border border-gray-300 rounded-md">
              {" "}
              <p> I want ￦20,000</p>
            </div>{" "}
          </div>
        </div>
      </div>
      <div className="fixed w-full mx-auto max-w-md bottom-2 inset-x-0">
        <div className="flex relative items-center">
          <input
            type="text"
            className="shadow-sm rounded-full w-full border-gray-300 focus:ring-purple-500 focus:outline-none pr-12 focus:border-purple-500"
          />
          <div className="absolute inset-y-0 flex py-1.5 pr-1.5 right-0">
            <button className="flex focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 items-center bg-purple-500 rounded-full px-3 hover:bg-purple-600 text-white">
              &rarr;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StreamDetail;
