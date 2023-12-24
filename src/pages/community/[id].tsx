import type { NextPage } from "next";
import Button from "../../../components/button";

const CommunityPostDetail: NextPage = () => {
  return (
    <div>
      <span className="inline-flex my-2.5 ml-4 items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
        Ask
      </span>
      <div className="flex mb-3 px-4 cursor-pointer py-3 border-b items-center space-x-3">
        <div className="w-10 h-10 rounded-full bg-slate-300" />
        <div>
          <p className="font-medium text-gray-700">Mr.Jobs</p>
          <p className="text-md font-medium text-gray-500">
            View profile &rarr;
          </p>
        </div>
      </div>

      <div className="mt-2  text-gray-700 px-4">
        <span className="text-purple-500 font-medium ">Q.</span> Which leader
        inspires you the most?
      </div>
      <div>
        <div />
      </div>
      <div>
        <div className="flex space-x-5 mt-3 px-4 text-gray-700 py-2.5 border-t border-b-[2px] w-full">
          <span className="flex space-x-2 items-center">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <span>Curious 1</span>
          </span>
          <span className="flex space-x-2 items-center">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              ></path>
            </svg>
            <span>Replies 1</span>
          </span>
        </div>
      </div>
      <div className="px-4 my-5 space-y-5">
        <div className="flex items-start space-x-3">
          <div className="w-8 h-8 bg-slate-200 rounded-full" />
          <div>
            <span className="block font-medium text-gray-700">Steve Jobs</span>
            <span className=" text-sm block text-gray-500">2 hours ago</span>
            <p className="text-gray-700">I consider myself the best leader.</p>
          </div>
        </div>
      </div>
      <div className="px-4">
        <textarea
          className="mt-1 shadow-sm w-full focus:ring-purple-500 rounded-md border-gray-300 focus:border-purple-500"
          rows={4}
          placeholder="Comment on post"
        />
        <div className="flex items-center justify-between space-x-2">
          <Button text="reply" />
        </div>
      </div>
    </div>
  );
};

export default CommunityPostDetail;
