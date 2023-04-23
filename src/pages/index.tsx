import { useEffect, useState } from "react";
import { useLogin } from "@/hooks/useLogin";
import { User, UserProfile } from "@/types";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/config/firebase";
import { USERCOLLECTION } from "@/config/dbVars";
import useGeoLocation from "@/hooks/useGeoLocation";
import Image from "next/image";
import home from "../assets/home.png";
import CustomButton from "@/components/common/CustomButton";

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

  return (
    <main className="flex items-center justify-between py-24 w-full justify-between">
      <div>
        <p className="text-5xl font-bold pr-16">
          let&apos;s find your{" "}
          <span className="text-purple-400">fitness buddy</span> match in
          seconds
        </p>
        <div className="flex mt-10">
          <CustomButton variant="outline">Register</CustomButton>
          <CustomButton variant="solid">Find Buddy</CustomButton>
        </div>

        {/* {location.loaded ? JSON.stringify(location) : "Loading..."} */}
      </div>
      <Image src={home} width={400} height={400} alt="Home Image" />
    </main>
  );
}
