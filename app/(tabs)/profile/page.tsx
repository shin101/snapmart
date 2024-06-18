import db from "@/lib/db";
import { getSession } from "@/lib/session";
import Image from "next/image";
import { notFound, redirect } from "next/navigation";

async function getUser() {
  const session = await getSession();
  if (session.id) {
    const user = await db.user.findUnique({
      where: { id: session.id },
    });
    if (user) {
      return user;
    }
  }
  notFound();
}

export default async function Profile() {
  const user = await getUser();
  const logOut = async () => {
    "use server";
    const session = await getSession();
    session.destroy();
    redirect("/");
  };

  return (
    <div>
      <div className="flex justify-between">
        <div className="text-3xl">Welcome, {user?.username} </div>
        <form action={logOut}>
          <button className="bg-gradient-to-tr from-pink-100 via-white to-purple-200 border border-purple-400 font-medium  text-purple-400 rounded-md text-center transition-colors p-2">
            Log out
          </button>
        </form>
      </div>
      <div className="flex flex-col ">
        <Image
          src={user.avatar!}
          alt={user.username}
          width={170}
          height={170}
          className="my-6"
        />
        <button className=" text-purple-400 rounded-md text-center transition-colors p-1 border border-purple-400 hover:bg-gray-100 w-28 ">
          Change Photo
        </button>
      </div>
    </div>
  );
}
