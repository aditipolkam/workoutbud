import { useEffect, useState, useContext } from "react";
import AuthContext from "@/context/authContext";
import useGeoLocation from "@/hooks/useGeoLocation";
import Image from "next/image";
import home from "../assets/home.png";
import CustomButton from "@/components/common/CustomButton";
import { Loading } from "@/components/common/Loader";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  const location = useGeoLocation();
  const { user, authReady, isPending, error, registerStatus, login, logout } =
    useContext(AuthContext);

  // useEffect(() => {
  //   if (user) router.push("/app");
  // }, [user]);

  function handleFindBuddy() {
    if (!user) router.push("/signup/name");
    else router.push("/app");
  }

  if (isPending) return <Loading />;
  return (
    <main className="flex items-center justify-between py-24 w-full justify-between">
      <div>
        <p className="text-5xl font-bold pr-16 text-gray-600">
          let&apos;s find your{" "}
          <span className="text-purple-800">fitness buddy</span> match in
          seconds
        </p>
        <div className="flex mt-10">
          {/* <CustomButton variant="outline">Register</CustomButton> */}
          {user && (
            <CustomButton variant="solid" handleClick={handleFindBuddy}>
              Find Buddy
            </CustomButton>
          )}
        </div>

        {/* {location.loaded ? JSON.stringify(location) : "Loading..."} */}
      </div>
      <Image src={home} width={400} height={400} alt="Home Image" />
    </main>
  );
}
