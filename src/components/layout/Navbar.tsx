import { MdAccountCircle, MdBuild } from "react-icons/md";
import { BsChevronDown } from "react-icons/bs";
import { Button, Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { useLogin } from "@/hooks/useLogin";
import { useEffect, useState } from "react";
import { User } from "@/types";
import CustomButton from "../common/CustomButton";
import Link from "next/link";

const Navbar = () => {
  const { login, user, logout } = useLogin();
  const [userDetails, setUserDetails] = useState<User | null>(null);

  useEffect(() => {
    if (localStorage) {
      let storeduser = localStorage.getItem("workoutbud_user");
      if (storeduser) setUserDetails(JSON.parse(storeduser));
      else setUserDetails(null);
    }
  }, [user]);

  return (
    <div className="flex justify-between flex-row mb-10">
      <Link href={"/"}>
        <div className="font-bold text-2xl text-purple-700">workoutbud</div>
      </Link>
      <div>
        {userDetails ? (
          <Menu>
            <MenuButton as={Button} rightIcon={<BsChevronDown />}>
              {userDetails.displayName}
            </MenuButton>
            <MenuList>
              <MenuItem>Profile</MenuItem>
              <MenuItem>Setting</MenuItem>
              <MenuItem onClick={logout}>Logout</MenuItem>
            </MenuList>
          </Menu>
        ) : (
          <CustomButton variant="outline" handleClick={login}>
            <p className="mx-1">Log In</p>
            <MdBuild />
          </CustomButton>
        )}
      </div>
    </div>
  );
};

export default Navbar;
