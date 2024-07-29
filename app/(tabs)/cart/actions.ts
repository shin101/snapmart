"use server";

import { UserContext } from "@/context/UserContext";
import db from "@/lib/db";
import { getSession } from "@/lib/session";
import { MouseEvent, useContext } from "react";

async function getUser() {
  const session = await getSession();
  return session.id;
}

const addToCart = async (id: number) => {
  const userId = await getUser();


    // await db.cart.upsert({
    //   where: {
    //     userId,
    //   },
    //   update: {

  	// },
    //   create: {},
    // });
};

export default addToCart;
