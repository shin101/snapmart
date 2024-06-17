import db from "@/app/lib/db";
import { getSession } from "@/app/lib/session";
import { notFound } from "next/navigation";

async function getRoom(id: string) {
  const room = await db.chatRoom.findUnique({
    where: {
      id,
    },
    include: {
      users: {
        select: {
          id: true,
        },
      },
    },
  });

  if (room) {
    const session = await getSession();
    const canEnterChat = Boolean(
      room.users.find((user) => user.id === session.id)
    );
    if (!canEnterChat) {
      return null;
    }
  }
  return room;
}

export default async function ChatRoom({ params }: { params: { id: string } }) {
  const room = await getRoom(params.id);
  if (!room) {
    return notFound();
  }
  return <h1>chat</h1>;
}
