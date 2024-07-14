import db from "@/lib/db";
import { User } from "@prisma/client";
import React from "react";

export const getPosts = async (user: User) => {
	const myPosts = await db.post.findMany({
	  where: {
		userId: user.id,
	  },
	});
	return myPosts;
  };
  