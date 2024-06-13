"use client";

import { XMarkIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";

const ModalCloseButton = () => {
  const router = useRouter();
  const onClickClose = () => {
    router.back();
  };
  return (
    <div>
      <button
        onClick={onClickClose}
        className="absolute right-20 top-20 text-neutral-200 hover:bg-neutral-400 transition rounded-full p-1"
      >
        <XMarkIcon className="size-10" />
      </button>
    </div>
  );
};

export default ModalCloseButton;
