"use client";

import { EyeIcon } from "@heroicons/react/24/solid";
import { formatToTimeAgo } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import BackButton from "@/components/back-button";
import LikeButton from "@/components/like-button";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/context/UserContext";
import { Post, Prisma } from "@prisma/client";
import { getCachedLikeStatus, getCachedPost } from "./actions";
import Loading from "@/components/loading";
import { deletePost } from "./actions";

type PostWithUser = Prisma.PostGetPayload<{
  include: {
    user: {
      select: {
        username: true;
        avatar: true;
      };
    };
  };
}>;

export default function PostDetail({ params }: { params: { id: string } }) {
  const [post, setMyPost] = useState<PostWithUser | null>(null);
  const [likeStatus, setLikeStatus] = useState({
    likeCount: 0,
    isLiked: false,
  });

  const user = useContext(UserContext);
  const myId = user?.id;

  useEffect(() => {
    const fetchData = async () => {
      const id = Number(params.id);
      const fetchedPost = await getCachedPost(id);
      setMyPost(fetchedPost);
      const likeData = await getCachedLikeStatus(id);
      setLikeStatus(likeData);
    };
    fetchData();
  }, [params.id]);

  function handleDelete() {
    deletePost(post!.id);
  }

  return (
    <div className="p-5">
      <BackButton />
      {post ? (
        <>
          <div className="flex items-center gap-2 mb-2">
            <Link href={`../profile/${post.userId}`}>
              <Image
                width={28}
                height={28}
                className="size-7 rounded-full"
                src={post.user.avatar!}
                alt={post.user.username}
              />
              <div>
                <span className="text-sm font-semibold">
                  {post.user.username}
                </span>
                <div className="text-xs">
                  <span>{formatToTimeAgo(post.created_at.toString())}</span>
                </div>
              </div>
            </Link>
          </div>
          <h2 className="text-lg font-semibold">{post.title}</h2>
          <p className="mb-5">{post.description}</p>
          <div className="flex flex-col gap-5 items-start">
            <div className="flex items-center gap-2 text-neutral-400 text-sm">
              <EyeIcon className="size-5" />
              <span>{post.views} Views</span>
            </div>
            <div className="flex gap-2">
              <LikeButton
                isLiked={likeStatus.isLiked}
                likeCount={likeStatus.likeCount}
                postId={post.id}
              />
              {myId === post.userId ? (
                <button
                  className="bg-red-400 p-2.5 rounded-full text-white text-sm hover:bg-red-300"
                  onClick={handleDelete}
                >
                  Delete Post
                </button>
              ) : null}
            </div>
          </div>
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
}
