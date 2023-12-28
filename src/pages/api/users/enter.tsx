// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { client } from "@libs/server/client";
import withHandler from "@libs/server/withHandler";
import type { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  return res.status(200).end();
}

export default withHandler("POST", handler);
