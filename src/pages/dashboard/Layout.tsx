import React from "react";
import { DashboardSidebar } from "@/components/dashboard-sidebar/DashboardSidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ProfileUser } from "@/components/profile-user/profileUser";
import { ModeToggle } from "@/components/mode-toggle/ModeToggle";
import { useGetProfileQuery } from "@/store/service/profile";

interface LayoutProps {
  children: React.JSX.Element;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { data: user } = useGetProfileQuery();

  const avatarAlt = (firstname: string, lastname: string): string => {
    let f = firstname?.charAt(0) ?? "";
    let l = lastname?.charAt(0) ?? "";

    const alt = f + l;
    return alt;
  };

  const data = {
    user: {
      name: user?.data?.user?.username,
      email: user?.data?.user?.email,
      avatar: user?.data?.photo,
      fallbackAvatar: avatarAlt(user?.data?.firstName!, user?.data?.lastName!),
    },
  };

  return (
    <SidebarProvider>
      <DashboardSidebar />
      <SidebarInset>
        <header className="flex justify-between h-16 shrink-0 items-center gap-2 border-b px-4 pr-6">
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
