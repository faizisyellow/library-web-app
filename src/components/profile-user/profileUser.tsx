import { ChevronsUpDown, LogOut, Sparkles } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, } from "@/components/ui/sidebar";
import { useLogoutMutation } from "@/store/service/auth";
import Cookies from "js-cookie";
import { getErrorObject } from "@/lib/helpers/error-message";
import { toast } from "@/hooks/use-toast";
import { Link, useNavigate } from "react-router";

export function ProfileUser({
  user,
}: {
  user: {
    name: string;
    email: string;
    avatar: string;
    fallbackAvatar: string;
  };
}) {
  const [Logout] = useLogoutMutation();
  const role = JSON.parse(localStorage.getItem("role") || "null");
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      const response = await Logout();

      const error = getErrorObject(response.error);
      if (error) {
        toast({
          variant: "destructive",
          title: error.messages,
        });
        return;
      }

      localStorage.clear();
      Cookies.remove("token");
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-full">
                <AvatarImage
                  src={`http://localhost:5000/public/${user.avatar}`}
                  alt={user.name}
                />
                <AvatarFallback className="rounded-full">{user.fallbackAvatar}</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{user.name}</span>
                <span className="truncate text-xs">{user.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={"bottom"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <Link to={"/dashboard/settings/profile"}>
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-full">
                  <AvatarImage
                    src={`http://localhost:5000/public/${user.avatar}`}
                    alt={user.name}
                    />
                  <AvatarFallback className="rounded-full">{user.fallbackAvatar}</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{user.name}</span>
                  <span className="truncate text-xs">{user.email}</span>
                </div>
              </div>
                </Link>
            </DropdownMenuLabel>
            {role === "USER" && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Sparkles />
                  My borrowing
                </DropdownMenuItem>
              </>
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
