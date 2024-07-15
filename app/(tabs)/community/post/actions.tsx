"use server";

import db from "@/lib/db";
import { getSession } from "@/lib/session";
import { z } from "zod";

const formSchema = z.object({
  title: z.string().min(2),
  description: z.string().min(5),
});

async function getUser() {
  const session = await getSession();
  if (session.id) {
    const user = await db.user.findUnique({
      where: { id: session.id },
    });
    if (user) {
      return user;
    }
  }
}

const createNewPost = async (formData: FormData) => {
  const data = {
    title: formData.get("title"),
    description: formData.get("description"),
  };

  const result = await formSchema.safeParse(data);
  if (!result.success) {
    return result.error.flatten();
  } else {
    const user = await getUser();
    if (user) {
      const post = await db.post.create({
        data: {
          title: result.data.title,
          description: result.data.description,
          userId: user.id,
        },
      });
      return post;
    }
  }
};

export default createNewPost;
