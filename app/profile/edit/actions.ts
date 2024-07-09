"use server";
import { getSession } from "@/lib/session";
import { notFound } from "next/navigation";
import db from "@/lib/db";

const currPhoto = async () => {
  const session = await getSession();
  if (session.id) {
    const curr = await db.user.findUnique({
      where: {
        id: session.id,
      },
      select: {
        avatar: true,
      },
    });
	return curr
  }
};

const updatePhoto = async (newAvatarUrl: string) => {
  const session = await getSession();
  if (session.id) {
    const user = await db.user.update({
      where: { id: session.id },
      data: {
        avatar: newAvatarUrl,
      },
    });
    if (user) {
      return user;
    }
  }
  notFound();
};

export { updatePhoto, currPhoto };
