"use client";

import { HandThumbUpIcon } from "@heroicons/react/24/solid";
import { HandThumbUpIcon as OutlineHandThumbUpIcon } from "@heroicons/react/24/outline";
import { useOptimistic } from "react";
import { dislikePost, likePost } from "@/app/(tabs)/community/[id]/actions";

interface LikeButtonProps {
  isLiked: boolean;
  likeCount: number;
  postId: number;
}

const LikeButton = ({ isLiked, likeCount, postId }: LikeButtonProps) => {
  const [state, reducerFn] = useOptimistic(
    { isLiked, likeCount },
    (previousState, payload) => ({
      isLiked: !previousState.isLiked,
      likeCount: previousState.isLiked
        ? previousState.likeCount - 1
        : previousState.likeCount + 1,
    })
  );
  const onClick = async () => {
    reducerFn(undefined);
    if (isLiked) {
      await dislikePost(postId);
    } else {
      await likePost(postId);
    }
  };

  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 text-neutral-400 text-sm border border-purple-400 rounded-full p-2 transition-colors ${
        state.isLiked && " bg-purple-400 text-white"
      } `}
    >
      {state.isLiked ? (
        <HandThumbUpIcon className="size-5" />
      ) : (
        <OutlineHandThumbUpIcon className="size-5" />
      )}
      {state.isLiked ? (
        <span>({state.likeCount})</span>
      ) : (
        <span>Like ({state.likeCount})</span>
      )}
    </button>
  );
};

export default LikeButton;
