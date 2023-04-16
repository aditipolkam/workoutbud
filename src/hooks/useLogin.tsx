import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db } from "@/config/firebase";
import { useState } from "react";

import { collection, getDocs, query, where } from "firebase/firestore";
const provider = new GoogleAuthProvider();

export const useLogin = () => {
  const [user, setUser] = useState<any>();
  const [isPending, setIsPending] = useState<boolean>(false);
  const [registerStatus, setRegisterStatus] = useState<boolean>(false);

  const login = async () => {
    setIsPending(true);
    await signInWithPopup(auth, provider)
      .then((result) => {
        const userDetails = result.user;
        console.log(userDetails);

        setUser(userDetails);
        //create a user profile
        setRegisterStatus(true);
        setIsPending(false);
      })
      .catch((error) => {
        setRegisterStatus(false);
        console.error("Some error", error.message);
        setIsPending(false);
      });
    setIsPending(false);
  };

  return { login, user, isPending, registerStatus };
};
