'use server'
import db from "@/lib/db";

const showUserIdProfile = async (id: string) => {
  const user = await db.user.findUnique({
    where: {
      id: +id,
    },
  });
  return user;
};

export default showUserIdProfile;
