import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useCookies } from "react-cookie";
import { NavLink, useNavigate } from "react-router-dom";
import EditProfileForm from "./form/EditProfileForm";
import EditPasswordForm from "./form/EditPasswordForm";
import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "@/lib/getData";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const navigate = useNavigate();
  const [isEditPassword, setIsEditPassword] = useState(false);
  const [isEditProfile, setIsEditProfile] = useState(false);
  const [cookies, _, removeCookie] = useCookies(["accessToken"]);

  const { data: currentUser } = useQuery({
    queryKey: ["currentUser"],
    queryFn: () => getCurrentUser(cookies.accessToken),
  });

  return (
    <header className="flex items-center justify-between gap-5 py-3 px-4 md:px-10 border-b border-b-gray-300 sticky inset-0 bg-white z-50">
      <DropdownMenu>
        <DropdownMenuTrigger className="outline-none">
          <div className="flex gap-2 items-center">
            <Avatar>
              <AvatarImage src={currentUser?.profile_image} />
              <AvatarFallback>AN</AvatarFallback>
            </Avatar>
            <p className="max-md:hidden">{currentUser?.name}</p>
          </div>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="bg-black text-white p-2 rounded-md space-y-3 ml-5 flex flex-col items-start">
          <Dialog
            onOpenChange={(open) => setIsEditProfile(open)}
            open={isEditProfile}>
            <DialogTrigger className="text-base ml-2 hover:text-gray-300">
              Edit Profile
            </DialogTrigger>

            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Edit profile</DialogTitle>
                <DialogDescription>
                  Make changes to your profile here. Click save when you're
                  done.
                </DialogDescription>
              </DialogHeader>

              <EditProfileForm
                setIsEditProfile={setIsEditProfile}
                currentUser={currentUser!}
                accessToken={cookies.accessToken}
              />
            </DialogContent>
          </Dialog>

          <Dialog
            onOpenChange={(open) => setIsEditPassword(open)}
            open={isEditPassword}>
            <DialogTrigger className="text-base ml-2 hover:text-gray-300">
              Edit Password
            </DialogTrigger>

            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Edit Password</DialogTitle>
                <DialogDescription>
                  Make changes to your password here. Click save when you're
                  done.
                </DialogDescription>
              </DialogHeader>

              <EditPasswordForm
                setIsEditPassword={setIsEditPassword}
                accessToken={cookies.accessToken}
              />
            </DialogContent>
          </Dialog>

          <button
            onClick={() => {
              removeCookie("accessToken");
              navigate("/login");
              window.location.reload();
            }}
            className="ml-2 hover:text-gray-300">
            Logout
          </button>
        </DropdownMenuContent>
      </DropdownMenu>

      <div className="space-x-5">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "underline underline-offset-4" : ""
          }>
          Dashboard
        </NavLink>
        <NavLink
          to="/coupon"
          className={({ isActive }) =>
            isActive ? "underline underline-offset-4" : ""
          }>
          Coupon
        </NavLink>
        <NavLink
          to="/order"
          className={({ isActive }) =>
            isActive ? "underline underline-offset-4" : ""
          }>
          Order
        </NavLink>
      </div>
    </header>
  );
};

export default Navbar;
