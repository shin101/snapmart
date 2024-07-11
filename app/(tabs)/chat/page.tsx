import db from "@/lib/db";
import Link from "next/link";
import Image from "next/image";
import { getSession } from "@/lib/session";
import { NoMessages } from "@/components/no-messages";

async function getChatMessages(userId: number) {
  const chatMessages = await db.chatRoom.findMany({
    where: {
      users: {
        some: {
          id: userId,
        },
      },
      messages: {
        some: {},
      },
    },
    select: {
      id: true,
      users: {
        select: {
          username: true,
          avatar: true,
        },
      },
      updated_at: true,
      messages: true,
    },
  });
  return chatMessages;
}
async function Chat() {
  const user = await getSession();
  const allMsg = await getChatMessages(+user.id!);
  //   console.log(allMsg);
  //   const payload = allMsg.flatMap((msg) =>
  //     msg.messages.map((message) => message.payload)
  //   );

  return (
    <div className=" grid grid-cols-3 h-screen border">
      <div className=" col-span-1 border-r bg-yellow-200">left menu</div>
      <div className="col-span-2">
        {allMsg.length > 0 ? (
          allMsg.map((msg) => (
            <div
              className="border rounded-md m-2 hover:bg-purple-50"
              key={msg.id}
            >
              <Link href={`/chats/${msg.id}`}>
                <div className="m-2 p-2 border-b border-b-purple-300 last:border-b-0 flex justify-between">
                  <div>
                    <Image
                      src={msg.users[0].avatar!}
                      width={40}
                      height={40}
                      alt={msg.users[0].username}
                      className="rounded-full"
                    />
                    {msg.users[0].username}
                  </div>

                  {msg.id}
                </div>
              </Link>
            </div>
          ))
        ) : (
          <NoMessages />
        )}
      </div>
    </div>
  );
}
export default Chat;
