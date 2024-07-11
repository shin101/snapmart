import TabBar from "@/components/tab-bar";
import { ReactNode } from "react";

export default function TabLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <div className="max-w-screen-xl mx-auto">{children}</div>
      <TabBar />
    </div>
  );
}
