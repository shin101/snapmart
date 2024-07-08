import Link from "next/link";
import { PlusIcon } from "@heroicons/react/24/solid";

export default function Live() {
  return (
    <>
      Watch Past Streams :
      <Link
        href="/streams/add"
        className="bg-purple-300 flex items-center justify-center rounded-full size-16 fixed bottom-24 right-8 text-white transition-colors hover:bg-purple-200"
      >
        <PlusIcon className="size-10" />
      </Link>
    </>
  );
}
