import type { NextPage } from "next";
import Layout from "@components/layout";

const Chats: NextPage = () => {
  return (
    <Layout hasTabBar title="Chat">
      <div className="py-16 px-4 space-y-8">
        {[1, 1, 1, 1, 1, 1, 1].map((_, i) => (
          <div
            key={i}
            className="flex px-4 cursor-pointer py-3 items-center space-x-3"
          >
            <div className="w-12 h-12 rounded-full bg-slate-300" />
            <div>
              <p className="text-lg text-gray-700">Mr.Jobs</p>
              <p className="text-gray-500">
                The most inspiring leader I have ever known is myself
              </p>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Chats;
