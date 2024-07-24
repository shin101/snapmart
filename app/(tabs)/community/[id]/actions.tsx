"use server";

import db from "@/lib/db";

const deletePost = async (post) => {
  console.log("**");

  const toDelete = await db.post.delete({
    where: {},
  });
};

export default deletePost;
