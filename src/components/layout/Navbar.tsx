import { MdAccountCircle, MdBuild } from "react-icons/md";
import { Button } from "@chakra-ui/react";
import { useLogin } from "@/hooks/useLogin";

const Navbar = () => {
  const { login, isPending, registerStatus, user } = useLogin();
  return (
    <div className="flex justify-between flex-row mb-10">
      <div className="font-bold text-2xl">workoutbud</div>
      <div>
        {registerStatus ? (
          <Button colorScheme="gray" variant="outline">
            <MdAccountCircle /> &nbsp; {user.displayName}
          </Button>
        ) : (
          <Button
            leftIcon={<MdBuild />}
            colorScheme="gray"
            variant="outline"
            onClick={login}
          >
            Sign In
          </Button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
