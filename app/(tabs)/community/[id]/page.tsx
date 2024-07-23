import db from "@/lib/db";
import { notFound } from "next/navigation";
import { EyeIcon, HandThumbUpIcon } from "@heroicons/react/24/solid";
import { HandThumbUpIcon as OutlineHandThumbUpIcon } from "@heroicons/react/24/outline";
import { formatToTimeAgo } from "@/lib/utils";
import Image from "next/image";
import { getSession } from "@/lib/session";
import { revalidateTag, unstable_cache } from "next/cache";
import Link from "next/link";
import BackButton from "@/components/back-button";

async function getPost(id: number) {
  try {
    const post = await db.post.update({
      where: {
        id,
      },
      data: {
        views: { increment: 1 },
      },
      include: {
        user: {
          select: {
            username: true,
            avatar: true,
          },
        },
        _count: {
          select: {
            comments: true,
          },
        },
      },
    });
    return post;
  } catch (e) {
    return null;
  }
}

const getCachedPost = unstable_cache(getPost, ["post-detail"], {
  tags: ["post-detail"],
  revalidate: 60,
});

async function getLikeStatus(postId: number, userId: number) {
  //   const session = await getSession();
  const isLiked = await db.like.findUnique({
    where: {
      id: {
        postId,
        userId,
      },
    },
  });
  const likeCount = await db.like.count({
    where: {
      postId,
    },
  });
  return {
    likeCount,
    isLiked: Boolean(isLiked),
  };
}

async function getCachedLikeStatus(postId: number) {
  const session = await getSession();
  const userId = session.id;
  const cachedOperation = unstable_cache(
    getLikeStatus,
    ["product-like-status"],
    { tags: [`like-status-${postId}`] }
  );
  return cachedOperation(postId, userId!);
}

export default async function PostDetail({
  params,
}: {
  params: { id: string };
}) {
  const id = Number(params.id);
  if (isNaN(id)) {
    return notFound();
  }
  const post = await getCachedPost(id);
  if (!post) {
    return notFound();
  }

  const session = await getSession();
  const myId = session.id;

  const likePost = async () => {
    "use server";
    try {
      await db.like.create({
        data: {
          postId: id,
          userId: myId!,
        },
      });
      revalidateTag(`like-status-${id}`);
    } catch (e) {}
  };
  const dislikePost = async () => {
    "use server";
    try {
      await db.like.delete({
        where: {
          id: {
            postId: id,
            userId: myId!,
          },
        },
      });
      revalidateTag(`like-status-${id}`);
    } catch (e) {}
  };
  const { likeCount, isLiked } = await getCachedLikeStatus(id);

  return (
    <div className="p-5">
      <BackButton />
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
            <span className="text-sm font-semibold">{post.user.username}</span>
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
          <form action={isLiked ? dislikePost : likePost}>
            <button
              className={`flex items-center gap-2 text-neutral-400 text-sm border border-purple-400 rounded-full p-2 transition-colors ${
                isLiked && " bg-purple-400 text-white"
              } `}
            >
              {isLiked ? (
                <HandThumbUpIcon className="size-5" />
              ) : (
                <OutlineHandThumbUpIcon className="size-5" />
              )}
              {isLiked ? (
                <span>({likeCount})</span>
              ) : (
                <span>Like ({likeCount})</span>
              )}
            </button>
          </form>
          {myId === post.userId ? (
            <button className="bg-red-400 p-2.5 rounded-full text-white text-sm hover:bg-red-300">
              Delete Post
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
