"use server";
import { redirect } from "next/navigation";
import db from "../lib/db";

export const deleteProduct = async (id: number) => {
  await db.product.delete({
    where: { id },
  });

  redirect("/products");
};
