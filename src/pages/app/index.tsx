import { useEffect, useState } from "react";
import UserCard from "@/components/common/UserCard";
import { Grid, GridItem } from "@chakra-ui/react";
import useGeoLocation from "@/hooks/useGeoLocation";
import Image from "next/image";
import home from "../assets/home.jpg";

export default function Home() {
  const [userDetails, setUserDetails] = useState<any | null>(null);
  const [users, setUsers] = useState<any>([]);
  const location = useGeoLocation();
  useEffect(() => {
    if (localStorage) {
      let storeduser = localStorage.getItem("workoutbud_user");
      if (storeduser) setUserDetails(JSON.parse(storeduser));
      else setUserDetails(null);
    }
  }, []);

  return (
    <main className="flex flex-col items-center justify-between p-24">
      <Image src={home} width={400} height={400} alt="Home Image" />
      {location.loaded ? JSON.stringify(location) : "Loading..."}
      <Grid templateColumns="repeat(2, 1fr)" gap={6}>
        {users.map((user: any) => (
          <GridItem key={user.nickname} w="100%">
            <UserCard data={user} />
          </GridItem>
        ))}
      </Grid>
    </main>
  );
}
