import React from "react";
import { ModeToggle } from "../mode-toggle/ModeToggle";
import { useGetProfileQuery } from "@/store/service/profile";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { ChevronsUpDown, LogOut, Sparkles } from "lucide-react";
import { Link } from "react-router";
import { useLogoutMutation } from "@/store/service/auth";
import { getErrorObject } from "@/lib/helpers/error-message";
import { toast } from "@/hooks/use-toast";
import Cookies from "js-cookie";

interface NavbarProps { }

const Navbar: React.FC<NavbarProps> = () => {
  const role = JSON.parse(localStorage.getItem("role") || "null");
  const { data: user } = useGetProfileQuery();
  const [Logout] = useLogoutMutation();

  const avatarAlt = (firstname: string, lastname: string): string => {
    let f = firstname?.charAt(0) ?? "";
    let l = lastname?.charAt(0) ?? "";

    const alt = f + l;
    return alt;
  };

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
      window.location.replace('/login')
    } catch (error) {
      console.log(error);
    }
  }

  const data = {
    user: {
      name: user?.data?.user?.username,
      email: user?.data?.user?.email,
      avatar: user?.data?.photo,
      fallbackAvatar: avatarAlt(user?.data?.firstName!, user?.data?.lastName!),
    },
  };

  return (
    <nav className="w-full bg-[#4B2E83] text-white py-4 px-6">
      <div className="container mx-auto flex justify-between items-center">
        <Link to={'/'} className="flex items-center gap-4">
          <img src="https://depts.washington.edu/compfin/web/wp-content/uploads/2015/09/cropped-UW-logo-512.png" alt="" className="h-11" />
          <div className="text-2xl font-bold">UW LIB</div>
        </Link>
        <div className="flex items-center space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center space-x-2 cursor-pointer rounded-lg p-1 hover:bg-white/10 transition-colors duration-200">
                <Avatar className="text-black text-dark-white">
                  <AvatarImage
                   src={`http://localhost:5000/public/${data?.user?.avatar}`}
                   alt={data?.user?.name}
                   className="dark:invert-0 invert-0"
                  />
                  <AvatarFallback className="rounded-lg dark:bg-gray-700 bg-gray-200">{data?.user.fallbackAvatar}</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{data?.user.name}</span>
                  <span className="truncate text-xs opacity-70">{data?.user.email}</span>
                </div>
                <ChevronsUpDown className="ml-auto size-4 dark:text-white text-white" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
              side={"bottom"}
              align="end"
              sideOffset={4}
            >
              <DropdownMenuLabel className="p-0 font-normal">
                  <Link to={"/settings/profile"}>
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm hover:bg-accent">
                  <Avatar className="text-black text-dark-white">
                    <AvatarImage
                      src={`http://localhost:5000/public/${data?.user?.avatar}`}
                      alt={data?.user?.name}
                      className="dark:invert-0 invert-0"
                      />
                    <AvatarFallback className="rounded-lg dark:bg-gray-700 bg-gray-200">{data?.user.fallbackAvatar}</AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">{data?.user.name}</span>
                    <span className="truncate text-xs opacity-70">{data?.user.email}</span>
                  </div>
                </div>
                  </Link>
              </DropdownMenuLabel>
              {role === "USER" && (
                <>
                  <DropdownMenuSeparator />
                  <Link to={'/my-borrowing-book'}>
                    <DropdownMenuItem className="hover:bg-accent">
                      <Sparkles className="mr-2 dark:text-white" />
                      My borrowing
                    </DropdownMenuItem>
                  </Link>
                </>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={handleLogout}
                className="hover:bg-accent"
              >
                <LogOut className="mr-2 dark:text-white" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <ModeToggle />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
