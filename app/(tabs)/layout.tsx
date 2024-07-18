"use client";
import { createContext, useContext, useEffect, useState } from "react";
import TabBar from "@/components/tab-bar";
import { ReactNode } from "react";
import { User } from "@prisma/client";
import { getSession } from "@/lib/session";
import { getUser } from "@/lib/user";

export const UserContext = createContext<User | null>(null);



export default function TabLayout({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);


//   useEffect(() => {
//     async function userInfo() {
//       const getUserInfo = await getUser();
//       setUser(getUserInfo);
//     }
//     userInfo();
//   }, []);

  return (
    <div>
      <UserContext.Provider value={user}>
        <div className="max-w-screen-xl mx-auto">{children}</div>
        <TabBar />
      </UserContext.Provider>
    </div>
  );
}
