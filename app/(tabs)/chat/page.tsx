import db from "@/lib/db";
import Link from "next/link";

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
  //   console.log(">>>", allMsg);
  console.log(allMsg.map((msg) => msg.messages));
  return (
    <div>
      <div className="border rounded-md">
        {allMsg.map((msg) => (
          <div
            className="m-2 p-2 border-b border-b-purple-300 last:border-b-0"
            key={msg.id}
          >
            <Link href="/products">{msg.id}</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Chat;
