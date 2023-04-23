import { useEffect, useState } from "react";
import { useLogin } from "@/hooks/useLogin";
import { User, UserProfile } from "@/types";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/config/firebase";
import { USERCOLLECTION } from "@/config/dbVars";
import UserCard from "@/components/common/UserCard";
import { Grid, GridItem } from "@chakra-ui/react";
import useGeoLocation from "@/hooks/useGeoLocation";

export default function Home() {
  const { login, user, logout } = useLogin();
  const [userDetails, setUserDetails] = useState<User | null>(null);
  const [users, setUsers] = useState<UserProfile[]>([]);
  const location = useGeoLocation();
  useEffect(() => {
    if (localStorage) {
      let storeduser = localStorage.getItem("workoutbud_user");
      if (storeduser) setUserDetails(JSON.parse(storeduser));
      else setUserDetails(null);
    }
  }, [user]);

  useEffect(() => {
    const fetchUsers = async () => {
      if (userDetails) {
        const collectionRef = collection(db, USERCOLLECTION);
        const data = await getDocs(collectionRef);
        setUsers(data.docs.map((doc) => doc.data() as UserProfile));
      }
    };
    fetchUsers();
  }, [userDetails]);

  console.log(users);

  if (!userDetails) return <div>Sign in first...</div>;
  return (
    <main className="flex flex-col items-center justify-between p-24">
      {location.loaded ? JSON.stringify(location) : "Loading..."}
      <Grid templateColumns="repeat(2, 1fr)" gap={6}>
        {users
          .filter(function (item) {
            return item.email != userDetails.email;
          })
          .map((user) => (
            <GridItem key={user.nickname} w="100%">
              <UserCard data={user} />
            </GridItem>
          ))}
      </Grid>
    </main>
  );
}
