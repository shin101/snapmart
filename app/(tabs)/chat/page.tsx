import db from "@/lib/db";
import Link from "next/link";
import Image from "next/image";

async function getChatMessages() {
  const chatMessages = await db.chatRoom.findMany({
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
  const allMsg = await getChatMessages();
  console.log(allMsg);
  //   const payload = allMsg.flatMap((msg) =>
  //     msg.messages.map((message) => message.payload)
  //   );

  return (
    <div className="max-w-screen-sm mx-auto">
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
        <div>You have no messages</div>
      )}
    </div>
  );
}
export default Chat;
