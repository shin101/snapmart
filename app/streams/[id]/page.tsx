import db from "@/lib/db";
import Image from "next/image";
import { UserIcon } from "@heroicons/react/24/solid";
import { notFound } from "next/navigation";
import { getSession } from "@/lib/session";

async function getStream(id: number) {
  const stream = await db.liveStream.findUnique({
    where: {
      id,
    },
    select: {
      title: true,
      stream_key: true,
      stream_id: true,
      userId: true,
      user: {
        select: {
          avatar: true,
          username: true,
        },
      },
    },
  });
  return stream;
}

export default async function StreamDetail({
  params,
}: {
  params: { id: string };
}) {
  const id = Number(params.id);
  if (isNaN(id)) {
    return notFound();
  }

  const stream = await getStream(id);
  if (!stream) {
    return notFound();
  }
  const session = await getSession();

  return (
    <>
      <div className="p-10">
        <div className="relative aspect-video">
          <iframe
            src={`https://${process.env.CLOUDFLARE_DOMAIN}/834e21c5aeef5b8a11481d50980b8878/iframe`}
            allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
            className="w-full h-full rounded-md"
          ></iframe>
        </div>
        <div className="p-5 flex items-center gap-3 border-b border-neutral-700">
          <div className="size-10 overflow-hidden rounded-full">
            {stream.user.avatar !== null ? (
              <Image
                src={stream.user.avatar}
                width={40}
                height={40}
                alt={stream.user.username}
              />
            ) : (
              <UserIcon />
            )}
          </div>
          <div>
            <h3>{stream.user.username}</h3>
          </div>
        </div>
        <div className="p-5">
          <h1 className="text-2xl font-semibold">{stream.title}</h1>
        </div>
        {stream.userId === session.id! ? (
          <div className="bg-yellow-200 text-black p-5 rounded-md">
            <div className="flex gap-2">
              <div className="font-semibold">Stream URL:</div>
              <div>rtmps://live.cloudflare.com:443/live/</div>
            </div>
            <div className="flex flex-wrap overflow-scroll">
              <div className="font-semibold">Secret Key:</div>
              <div>{stream.stream_key}</div>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
}