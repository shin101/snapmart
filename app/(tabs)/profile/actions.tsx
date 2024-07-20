'use server'

import db from "@/lib/db";
import { User } from "@prisma/client";


export const getPosts = async (user: User) => {
  const myPosts = await db.post.findMany({
    where: {
      userId: user.id,
    },
  });
  return myPosts;
};

export const uploadCoverPhoto = async (user: User, coverPhoto: string) => {
  const newPhoto = await db.user.update({
    where: {
      id: user.id,
    },
    data: {
      cover_photo: coverPhoto,
    },
  });
  return newPhoto;
};

