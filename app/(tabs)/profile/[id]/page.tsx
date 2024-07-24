"use client";

import { Card } from "flowbite-react";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";

import { Header } from "@/components/header";
import BackButton from "@/components/back-button";
import Button from "@/components/button";

import default_pic from "../../../../public/default.jpg";
import showUserIdProfile from "./actions";
import { Post, Product, User } from "@prisma/client";
import { UserContext } from "@/context/UserContext";
import { getPosts } from "../actions";
import Loading from "@/components/loading";
import Link from "next/link";

export default function UserProfilePage({
  params,
}: {
  params: { id: string };
}) {
  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [products, setProducts] = useState<Product | null>(null);
  const me = useContext(UserContext);

  console.log("my posts are", posts);
  // const posts = await getPosts(me.id)
  //   console.log(posts)

  useEffect(() => {
    const getThisUserInfo = async () => {
      const userInfo = await showUserIdProfile(params.id);
      setUser(userInfo);
      if (userInfo) {
        const posts = await getPosts(userInfo);
        setPosts(posts);
      }
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
          <div className="grid grid-cols-2 gap-6">
            <div className="col-span-1">
              <Card className="h-full">
                <div className="flex flex-col items-center">
                  <Image
                    alt="user image"
                    height="96"
                    src={user.avatar || default_pic}
                    width="96"
                    className="mb-3 rounded-full shadow-lg w-28 h-28 object-cover"
                  />
                  <h5 className="mb-1 text-xl font-medium text-gray-600 dark:text-white">
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
            <div className="col-span-1 flex items-center justify-center border rounded-lg shadow-lg max-h-80">
              {posts && posts.length != 0 ? (
                <div className="w-full h-full">
                  <div className="text-lg flex justify-center p-3 bg-warm-blue text-white rounded-t-lg w-full">
                    Recent Activity
                  </div>
                  {posts.slice(0, 5).map((post, idx) => (
                    <>
                      <Link href={`/community/${post.id}`}>
                        <div
                          key={post.id}
                          className={`border-b last:border-none hover:bg-gray-100 text-gray-600 p-4 ${idx === 4 && "rounded-b-lg"}`}
                        >
                          {post.title}
                        </div>
                      </Link>
                    </>
                  ))}
                </div>
              ) : (
                <div className="text-gray-600">This user has no post</div>
              )}
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
