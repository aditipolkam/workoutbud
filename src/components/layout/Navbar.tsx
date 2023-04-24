import { MdAccountCircle, MdBuild } from "react-icons/md";
import { BsChevronDown } from "react-icons/bs";
import { Button, Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { useContext } from "react";
import CustomButton from "../common/CustomButton";
import Link from "next/link";
import AuthContext from "@/context/authContext";

const Navbar = () => {
  const { user, authReady, isPending, error, registerStatus, login, logout } =
    useContext(AuthContext);

  return (
    <div className="flex justify-between flex-row mb-10">
      <Link href={"/"}>
        <div className="font-bold text-2xl text-purple-700">workoutbud</div>
      </Link>
      <div>
        {user ? (
          // <Menu>
          //   <MenuButton as={Button} rightIcon={<BsChevronDown />}>
          //     <div className="flex justify-center items-center">
          //       <p className="mx-1">User</p>
          //       <MdAccountCircle />
          //     </div>
          //   </MenuButton>
          //   <MenuList>
          //     <MenuItem>Profile</MenuItem>
          //     <MenuItem>Setting</MenuItem>
          //     <MenuItem onClick={logout}>Logout</MenuItem>
          //   </MenuList>
          // </Menu>
          <CustomButton variant="outline" handleClick={logout}>
            <p className="mx-1">Log Out</p>
          </CustomButton>
        ) : (
          <CustomButton variant="outline" handleClick={login}>
            <p className="mx-1">Log In</p>
          </CustomButton>
        )}
        {/*  */}
      </div>
    </div>
  );
};

export default Navbar;
