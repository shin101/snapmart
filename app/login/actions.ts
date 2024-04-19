"use server";

import { redirect } from "next/navigation";

export const handleForm = async (prevState: any, formData: FormData) => {
  await new Promise((resolve) => setTimeout(resolve, 5000));
  // console.log(formData.get("email"), formData.get("password"));
  redirect("/");
  return {
    errors: ["wrong password", "password too short"],
  };
};
