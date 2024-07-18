'use client'
import { createContext, useContext, useState } from "react";
import TabBar from "@/components/tab-bar";
import { ReactNode } from "react";
import { User } from "@prisma/client";

// const UserContext = createContext<User | null>(null);
export const UserContext = createContext<string>("");

export default function TabLayout({ children }: { children: ReactNode }) {
  const [test, setTest] = useState("heyyy");
  return (
    <div>
		<UserContext.Provider value={test}>

      <div className="max-w-screen-xl mx-auto">{children}</div>
      <TabBar />
		</UserContext.Provider>
    </div>
  );
}
