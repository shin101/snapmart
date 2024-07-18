"use client";

import { Card, Dropdown } from "flowbite-react";
import Image from "next/image";
import { useContext } from "react";
// import { UserContext } from "../../layout";
import { Header } from "@/components/header";
import BackButton from "@/components/back-button";
import Button from "@/components/button";

export default function UserProfilePage() {
  //   const userInfo = useContext(UserContext);
  //   console.log("fadsfaddfasfa", userInfo);
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
              <button className="primary-btn">Add friend</button>
              <button className="secondary-btn">Message</button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
