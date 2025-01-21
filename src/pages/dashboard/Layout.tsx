import React from "react";
import { DashboardSidebar } from "@/components/dashboard-sidebar/DashboardSidebar";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ProfileUser } from "@/components/profile-user/profileUser";
import { ModeToggle } from "@/components/mode-toggle/ModeToggle";

interface LayoutProps {
  children: React.JSX.Element;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const data = {
    user: {
      name: "shadcn",
      email: "m@example.com",
      avatar: "lm",
    },
  };
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <SidebarInset>
        <header className="flex justify-between h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <div className="flex items-center gap-x-4">
            <ProfileUser user={data.user} />
            <ModeToggle />
          </div>
        </header>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
};

export default Layout;
