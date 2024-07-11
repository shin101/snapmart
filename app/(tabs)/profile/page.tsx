import Button from "@/components/button";
import db from "@/lib/db";
import { getSession } from "@/lib/session";
import Image from "next/image";
import Link from "next/link";
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

  const updateProfilePhoto = async () => {
    "use server";
    // console.log(">>>>>");
  };

  const onImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    "use server";

    console.log("!!!!!", event);
    return ">>>>>";
  };

  return (
    <div>
      <div className="flex justify-between ">
        <div className="text-3xl text-gray-500">Welcome, {user?.username} </div>
        <form action={logOut}>
          <Button text="Log out" showLoading={false} />
        </form>
      </div>
      <div className="flex flex-col">
        <Image
          src={user.avatar!}
          alt={user.username}
          width={170}
          height={170}
          className="my-6"
        />
        {/* <button className="text-purple-400 rounded-md text-center transition-colors p-1 border border-purple-400 hover:bg-gradient-to-tr hover:from-pink-100 hover:via-white hover:to-purple-200 hover:border-purple-400 w-28">
          Change Photo
        </button> */}

        <Link
          href="/profile/edit"
          className="text-purple-400 rounded-md text-center transition-colors p-1 border border-purple-400 hover:bg-gradient-to-tr hover:from-pink-100 hover:via-white hover:to-purple-200 hover:border-purple-400 w-28"
        >
          <div>Change Photo</div>
        </Link>

        {/* <form action={updateProfilePhoto}>
          <label
            htmlFor="photo"
            className="text-purple-400 rounded-md text-center transition-colors p-1 border border-purple-400 hover:bg-gradient-to-tr hover:from-pink-100 hover:via-white hover:to-purple-200 hover:border-purple-400 w-28"
          >
            Change Photo
          </label>
          <input
            onChange={onImageChange}
            type="file"
            id="photo"
            className="hidden"
          />
        </form> */}
      </div>
    </div>
  );
}
