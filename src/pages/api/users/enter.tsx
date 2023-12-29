// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { client } from "@libs/server/client";
import withHandler from "@libs/server/withHandler";
import type { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { phone, email } = req.body;
  const payload = phone ? { phone } : { email };
  const user = await client.user.upsert({
    where: {
      ...payload,
    },
    create: {
      name: "Anonymous",
      ...payload,
    },
    update: {},
  });
  const token = await client.token.create({
    data: {
      payload: "",
      user: {
        connectOrCreate: {
          where: {
            ...payload,
          },
          create: {
            name: "Anonymous",
            ...payload,
          },
        },
      },
    },
  });
  console.log(token);

  return res.status(200).end();
}

export default withHandler("POST", handler);
