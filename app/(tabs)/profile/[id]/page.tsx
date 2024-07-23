"use client";

import { Card } from "flowbite-react";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";

import { Header } from "@/components/header";
import BackButton from "@/components/back-button";
import Button from "@/components/button";

import default_pic from "../../../../public/default.jpg";
import showUserIdProfile from "./actions";
import { User } from "@prisma/client";
import { UserContext } from "@/context/UserContext";
import { getPosts } from "../actions";
import Loading from "@/components/loading";

export default function UserProfilePage({
  params,
}: {
  params: { id: string };
}) {
  const [user, setUser] = useState<User | null>(null);
  const me = useContext(UserContext);

  useEffect(() => {
    const getThisUserInfo = async () => {
      const x = await showUserIdProfile(params.id);
      setUser(x);
    };
    getThisUserInfo();
  }, [params.id]);

  const thisUserIsMe = me?.id === user?.id;

  return (
    <div>
      {user ? (
        <div>
          {" "}
          <Header />
          <BackButton />
          <div className="grid grid-cols-2">
            <div className="col-span-1">
              <Card className="max-w-xl">
                <div className="flex flex-col items-center pb-10">
                  <Image
                    alt="user image"
                    height="96"
                    src={user.avatar || default_pic}
                    width="96"
                    className="mb-3 rounded-full shadow-lg w-28 h-28 object-cover"
                  />
                  <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                    {user.username}
                  </h5>

                  {thisUserIsMe ? (
                    ""
                  ) : (
                    <div className="mt-4 flex space-x-3 lg:mt-6">
                      <button className="primary-btn">Follow</button>
                      <button className="secondary-btn">Message</button>
                    </div>
                  )}
                </div>
              </Card>
            </div>
            <div className="col-span-1 bg-red-300">
              <div>Activity</div>
            </div>
          </div>
          <div className="bg-green-300">{user.username}&apos; marketplace</div>
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
}
