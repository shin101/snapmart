import db from "@/lib/db";
import { formatToTimeAgo } from "@/lib/utils";
import {
  ChatBubbleBottomCenterIcon,
  HandThumbUpIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import logo from "../../../public/text-logo.png";
import { Header } from "@/components/header";

async function getPosts() {
  const posts = await db.post.findMany({
    select: {
      id: true,
      title: true,
      description: true,
      views: true,
      created_at: true,
      user: true,
      _count: {
        select: {
          comments: true,
          likes: true,
        },
      },
    },
  });
  return posts;
}

export const metadata = {
  title: "Community",
};

export default async function Community() {
  const posts = await getPosts();
  return (
    <div className="">
      <Header text={"Post"} link={"/community/post"} />
      {posts.length != 0 ? (
        <div className="flex flex-col ">
          {posts.map((post) => (
            <Link href={`/community/${post.id}`} key={post.id}>
              <div className="hover:bg-gray-100 p-4 border-b last:pb-0 last:border-b-0 grid grid-cols-6">
                <div className="col-span-1 h-full items-center flex justify-center flex-col">
                  <Image
                    src={post.user.avatar!}
                    width={64}
                    height={64}
                    alt="user photo"
                    className="size-16 rounded-full object-cover"
                  />
                  <div className="mt-2">{post.user.username}</div>
                </div>
                <div className="w-full col-span-5">
                  <h2 className="text-lg text-purple-400 font-semibold my-2">
                    {post.title}
                  </h2>
                  <p className="text-neutral-400 max-h-72 overflow-hidden">
                    {post.description}
                  </p>
                  <div className="flex items-center justify-between text-sm py-4">
                    <div className="flex gap-4 items-center">
                      <span className="text-neutral-500">
                        {formatToTimeAgo(post.created_at.toString())}
                      </span>
                      <span className="text-neutral-500">·</span>
                      <span className="text-neutral-500">
                        {post.views} views
                      </span>
                    </div>
                    <div className="flex gap-4 items-center *:flex *:gap-1 *:items-center">
                      <span>
                        <HandThumbUpIcon className="size-4" />
                        {post._count.likes}
                      </span>
                      <span>
                        <ChatBubbleBottomCenterIcon className="size-4" />
                        {post._count.comments}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
		  ADD INFINITE SCROLL FEATURE HERE LATER
        </div>
      ) : (
        <div>There are no posts here! Be the first to create one.</div>
      )}
    </div>
  );
}
