"use server";
import db from "@/lib/db";
import { redirect } from "next/navigation";


export const deleteProduct = async (id: number) => {
  await db.product.delete({
    where: { id },
  });

  redirect("/products");
};
