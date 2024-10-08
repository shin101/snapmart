import db from "@/lib/db";
import { getSession } from "@/lib/session";
import Image from "next/image";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import logo from "../../../public/text-logo.png";
import { getPosts } from "./actions";
import CoverPhoto from "@/components/cover-photo";
import ProfileAvatar from "@/components/profile-avatar";

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
  const posts = await getPosts(user);

  const logOut = async () => {
    "use server";
    const session = await getSession();
    session.destroy();
    redirect("/");
  };

  return (
    <div className="flex flex-col border h-full">
      <div className="p-4 sticky top-0 flex justify-between items-center bg-white z-10">
        <Image
          src={logo}
          alt={user.username || "username"}
          className="h-20 w-36"
        />
        <form action={logOut}>
          <button className="primary-btn w-28">Log out</button>
        </form>
      </div>
      <div>
        <div>
          <CoverPhoto user={user} />
        </div>
        <div className="flex justify-end items-center p-4 relative">
          <ProfileAvatar />
          <div className="flex gap-3 w-80">
            <Link href="/profile/edit" className="primary-btn">
              Edit Profile
            </Link>
            <Link href={`/profile/${user.id}`} className="secondary-btn">
              View Profile
            </Link>
          </div>
        </div>
      </div>
      <div className="flex flex-col space-y-3 my-6 px-4">
        <div>
          <p className="text-2xl font-bold">{user.username}</p>
        </div>
        <div>
          <div>0 Followers</div>
          <div>0 Following</div>
        </div>
        <div>
          <div>Joined {new Date(user.created_at).toLocaleDateString()} </div>
        </div>
      </div>
      <div className="flex py-4 justify-center border-t">
        <div>
          {posts.length != 0 ? (
            <div>
              {posts.map((post) => (
                <div
                  key={post.id}
                  className="max-w-6xl border rounded-xl p-3 space-y-2"
                >
                  <div className="text-lg font-bold">{post.title}</div>
                  <div>{post.description}</div>
                  <div className="text-sm">{post.views} views</div>
                  <div className="text-sm">
                    posted {post.created_at.toString()}
                  </div>
                </div>
              ))}
              add infinite scroll feature later here
            </div>
          ) : (
            <div className="p-4 text-gray-500">No posts here!</div>
          )}
        </div>
      </div>
    </div>
  );
}
