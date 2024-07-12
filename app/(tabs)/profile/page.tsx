import db from "@/lib/db";
import { getSession } from "@/lib/session";
import Image from "next/image";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import logo from "../../../public/text-logo.png";
import background from "../../../public/default-background.jpg";
import { Header } from "@/components/header";

async function getUser() {
  const session = await getSession();
  if (session.id) {
    const user = await db.user.findUnique({
      where: { id: session.id },
    });
    if (user) {
      console.log();
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
    <div className="flex flex-col border h-screen">
      <div className="p-4 sticky top-0 flex justify-between items-center">
        <Image src={logo} alt={user.username} className="h-20 w-36" />
        <form action={logOut}>
          <button className="primary-btn w-28">Log out</button>
        </form>
      </div>
      <div>
        <div>
          <Image
            src={background}
            alt="background image"
            className="flex w-full h-72"
          />
        </div>
        <div className="flex justify-end items-center p-4 relative">
          <div className="absolute top-0 left-0 transform translate-x-1/4 -translate-y-1/2">
            <Image
              src={user.avatar!}
              alt={user.username}
              width={170}
              height={170}
              className="size-48 rounded-full object-cover"
            />
          </div>
          <div className="flex gap-2">
            <Link
              href="/profile/edit"
              className="items-center border-2 border-[#5547EE] font-medium rounded-full focus:outline-none focus:ring-2 transition-all hover:bg-[#f5f1fc] border-transparent text-[#5547EE] px-6 py-3 flex w-full"
            >
              View Profile
            </Link>
            <Link href="/profile/edit" className="primary-btn">
              Edit Profile
            </Link>
          </div>
        </div>
      </div>
      <div className="flex flex-col space-y-3 my-6 px-4">
        <div>
          <p className="text-2xl font-bold">{user?.username}</p>
        </div>
        <div>
          <div>X Followers</div>
          <div>X Following</div>
        </div>
        <div>
          <div>Joined {new Date(user?.created_at).toLocaleDateString()} </div>
        </div>
      </div>
      <div className="flex py-4 justify-center border-t">
        <div className="p-4 text-gray-500">No posts here!</div>
      </div>
    </div>
  );
}
