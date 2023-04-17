import { useEffect, useState } from "react";
import { useLogin } from "@/hooks/useLogin";
import { User, UserProfile } from "@/types";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/config/firebase";
import { USERCOLLECTION } from "@/config/dbVars";
import UserCard from "@/components/common/UserCard";

export default function Home() {
  const { login, user, logout } = useLogin();
  const [userDetails, setUserDetails] = useState<User | null>(null);
  const [users, setUsers] = useState<UserProfile[]>([]);
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
      {users.map((user) => (
        <UserCard key={user.nickname} data={user} />
      ))}
    </main>
  );
}
