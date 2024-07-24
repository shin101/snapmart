"use server";
import db from "@/lib/db";

export const getMoreProducts = async (page: number) => {
  const products = await db.product.findMany({
    select: {
      title: true,
      price: true,
      created_at: true,
      photo: true,
      id: true,
    },
    skip: page * 5,
    take: 5,
    orderBy: {
      created_at: "desc",
    },
  });
  return products;
};

export const getMyProducts = async (userId: number) => {
  const products = await db.product.findMany({
    where: {
      userId,
    },
  });
  return products;
};
