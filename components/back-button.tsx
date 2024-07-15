"use client";

import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();
  const onClickClose = () => {
    router.back();
  };
  return (
    <div className="w-full top-0 left-0 p-5 flex justify-between items-center">
      <button
        onClick={onClickClose}
        className="relative bg-warm-blue flex rounded-full size-14 items-center justify-center text-white transition-colors hover:bg-purple-400 right-0 "
      >
        <ChevronLeftIcon className="size-8" />
      </button>
    </div>
  );
}
