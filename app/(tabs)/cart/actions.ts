"use server";

import { UserContext } from "@/context/UserContext";
import db from "@/lib/db";
import { getSession } from "@/lib/session";
import { MouseEvent, useContext } from "react";

async function getUser() {
  const session = await getSession();
  return session.id;
}

export const getMyCart = async () => {
  const userId = await getUser();
  const myItems = await db.cart.findUnique({
    where: {
      userId,
    },
    include: {
      product: true,
    },
  });
  return myItems;
};

const addToCart = async (id: number) => {
  const userId = await getUser();

  await db.cart.upsert({
    where: {
      userId,
    },
    update: {
      product: {
        connect: {
          id,
        },
      },
    },
    create: {
      user: {
        connect: {
          id: userId,
        },
      },
      product: {
        connect: {
          id,
        },
      },
    },
  });
};

export const removeItem = async (productId: number) => {
  const userId = await getUser();
  await db.cart.update({
    where: {
      userId,
    },
    data: {
      product: {
        disconnect: { id: productId },
      },
    },
  });
};

export default addToCart;
