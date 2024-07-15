"use client";

import BackButton from "@/components/back-button";
import Button from "@/components/button";
import Input from "@/components/input";
import createNewPost from "./actions";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";

const CommunityPostForm = () => {
  const router = useRouter();
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const res = await createNewPost(formData);
    if (res) {
      router.push("/community");
    }
  };

  return (
    <div>
      <div className="max-w-screen-sm mx-auto">
        <BackButton />
        <form className="p-5 flex flex-col gap-5" onSubmit={onSubmit}>
          {/* SHOW ERROR MESSAGES IF MESSAGE DOESNT MEET LENGTH REQUIREMENT */}
          <Input name="title" required placeholder="Title" type="text" />
          <textarea
            name="description"
            required
            placeholder="Description"
            className="bg-transparent rounded-md w-full h-10 focus:outline-none ring-2 focus:ring-4 ring-neutral-200 focus:ring-purple-300 border-none placeholder:text-neutral-400 transition min-h-28"
          />

          <Button text="Submit" />
        </form>
      </div>
    </div>
  );
};

export default CommunityPostForm;
