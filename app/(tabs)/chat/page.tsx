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

  return (
    <div>
      {allMsg.length > 0 ? (
        allMsg.map((msg) => (
          <div className="border rounded-md" key={msg.id}>
            <div className="m-2 p-2 border-b border-b-purple-300 last:border-b-0">
              <Link href="/products">{msg.id}</Link>
            </div>
          </div>
        ))
      ) : (
        <div>You have no messages</div>
      )}
    </div>
  );
}
export default Chat;