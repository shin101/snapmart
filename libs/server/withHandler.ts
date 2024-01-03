import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
export interface ResponseType {
  ok: boolean;
  [key: string]: any;
}
export default function withHandler(
  method: "GET" | "POST" | "DELETE",
  handler: (req: NextApiRequest, res: NextApiResponse) => void
) {
  return async function (
    req: NextApiRequest,
    res: NextApiResponse
  ): Promise<any> {
    if (req.method !== method) {
      console.log("no method");
      res.status(405).end();
    }
    try {
      await handler(req, res);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error });
    }
  };
}