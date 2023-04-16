import { MdBuild } from "react-icons/md";
import { Button } from "@chakra-ui/react";

const Navbar = () => {
  return (
    <div className="flex justify-between flex-row mb-10">
      <div className="font-bold text-2xl">workoutbud</div>
      <div>
        <Button leftIcon={<MdBuild />} colorScheme="gray" variant="outline">
          Sign In
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
