import db from "@/lib/db";
import Link from "next/link";
import Image from "next/image";
import { getSession } from "@/lib/session";
import { NoMessages } from "@/components/no-messages";
import { PencilSquareIcon } from "@heroicons/react/24/outline";

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
      <div className=" col-span-1 border-r">
        <div>
          <div className="flex justify-between px-4 pt-4 items-center">
            <div className="text-gray-600 text-xl font-bold">Messages</div>
            <button>
              <PencilSquareIcon className="size-9 hover:bg-gray-100 rounded-full p-2" />
            </button>
          </div>
          <div className="py-4 flex justify-center">
            <input
              className="p-4 m-4 border rounded-full w-full"
              placeholder="Search Messages"
            />
          </div>
        </div>
      </div>
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
                      width={64}
                      height={64}
                      alt={msg.users[0].username}
                      className="rounded-full object-cover size-16"
                    />
                    <div className="text-gray-500">{msg.users[0].username}</div>
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
