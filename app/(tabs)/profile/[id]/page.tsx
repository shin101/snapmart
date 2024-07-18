"use client";

import { Card, Dropdown } from "flowbite-react";
import Image from "next/image";
import { useContext } from "react";
import { UserContext } from "../../layout";
import { Header } from "@/components/header";
import BackButton from "@/components/back-button";

export default function UserProfilePage() {
  const userInfo = useContext(UserContext);
  console.log("fadsfaddfasfa", userInfo);
  return (
    <div>
      <Header />
      <BackButton />
	  STILL WORKING ON THIS PAGE
      <div className="p-4">
        <Card className="max-w-xl">
          <div className="flex flex-col items-center pb-10">
            <Image
              alt="user image"
              height="96"
              src="/images/people/profile-picture-3.jpg"
              width="96"
              className="mb-3 rounded-full shadow-lg"
            />
            <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
              Bonnie Green
            </h5>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Visual Designer
            </span>
            <div className="mt-4 flex space-x-3 lg:mt-6">
              <a
                href="#"
                className="inline-flex items-center rounded-lg bg-cyan-700 px-4 py-2 text-center text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
              >
                Add friend
              </a>
              <a
                href="#"
                className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-center text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
              >
                Message
              </a>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
