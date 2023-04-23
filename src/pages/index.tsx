import { useEffect, useState, useContext } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/config/firebaseClient";
import AuthContext from "@/context/authContext";
import useGeoLocation from "@/hooks/useGeoLocation";
import Image from "next/image";
import home from "../assets/home.png";
import CustomButton from "@/components/common/CustomButton";

export default function Home() {
  const location = useGeoLocation();
  const { user, authReady, isPending, error, registerStatus, login, logout } =
    useContext(AuthContext);

  if (!authReady) return <div>Loading...</div>;
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
