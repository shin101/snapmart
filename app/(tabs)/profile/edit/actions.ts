"use server";
import bcrypt from "bcrypt";
import { z } from "zod";
import { getSession } from "@/lib/session";
import { notFound, redirect } from "next/navigation";
import db from "@/lib/db";
import {
  PASSWORD_MIN_LENGTH,
  PASSWORD_REGEX,
  PASSWORD_REGEX_ERROR,
} from "@/lib/constants";
import { useContext } from "react";
import { UserContext } from "@/context/UserContext";

const updatePhoto = async (newAvatarUrl: string) => {
  const session = await getSession();
  if (session.id) {
    const newProfilePic = await db.user.update({
      where: { id: session.id },
      data: {
        avatar: newAvatarUrl,
      },
    });
    return newProfilePic;
  }
};

const formSchema = z
  .object({
    username: z
      .string({
        invalid_type_error: "Username must be a string",
        required_error: "Username is required.",
      })
      .toLowerCase()
      .trim(),
    password: z
      .string()
      .min(PASSWORD_MIN_LENGTH)
      .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
    confirm_password: z.string().min(PASSWORD_MIN_LENGTH),
  })
  .superRefine(async ({ username }, ctx) => {
    const user = await db.user.findUnique({
      where: {
        username,
      },
      select: { id: true },
    });
    if (user) {
      ctx.addIssue({
        code: "custom",
        message: "This username is already taken",
        path: ["username"],
        fatal: true,
      });
      return z.NEVER;
    }
  })
  .refine(({ password, confirm_password }) => password === confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
  });

const UpdateProfile = async (prevState: any, formData: FormData) => {
  const session = await getSession();
  const data = {
    username: formData.get("username"),
    password: formData.get("password"),
    confirm_password: formData.get("confirm_password"),
  };
  const result = await formSchema.safeParseAsync(data);
  if (!result.success) {
    return result.error.flatten();
  } else {
    const hashedPassword = await bcrypt.hash(result.data.password, 12);

    await db.user.update({
      where: { id: session.id },
      data: {
        username: result.data.username,
        password: hashedPassword,
      },
    });
    redirect("/profile");
  }
};

export { updatePhoto, UpdateProfile };
