import db from "@/lib/db";
import { getSession } from "@/lib/session";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { User } from "@prisma/client";

const UserContext = createContext<User | null>(null);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

//   useEffect(() => {
//     async function fetchUser() {
//       const session = await getSession();
//       if (session.id) {
//         const user = await db.user.findUnique({
//           where: { id: session.id },
//         });
//         if (user) {
//           setUser(user);
//         }
//       }
//     }
//     fetchUser();
//   }, []);

//   return (
// 	<UserContext.Provider>
// 	</UserContext.Provider>
//   )
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser muest be used within a UserProvider");
  }
  return context;
}
