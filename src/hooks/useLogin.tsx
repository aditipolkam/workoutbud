import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db } from "@/config/firebase";
import { useState } from "react";
import { User } from "@/types";
import { collection, getDocs, query, where } from "firebase/firestore";
const provider = new GoogleAuthProvider();

export const useLogin = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isPending, setIsPending] = useState<boolean>(false);
  const [registerStatus, setRegisterStatus] = useState<boolean>(false);

  const addToLocalStorage = (details: any) => {
    if (localStorage) {
      const tuser = {
        // id: false,
        displayName: details.displayName,
        email: details.email,
        token: details.accessToken,
      };
      setUser(tuser);
      localStorage.setItem("workoutbud_user", JSON.stringify(tuser));
      console.log("added item to local storage");
    } else {
      // No support. Use a fallback such as browser cookies or store on the server.
    }
  };

  const login = async () => {
    setIsPending(true);
    await signInWithPopup(auth, provider)
      .then((result) => {
        const userDetails = result.user;
        console.log(userDetails);
        addToLocalStorage(userDetails);
        //create a user profile
        setRegisterStatus(true);
        setIsPending(false);
        window.location.reload();
      })
      .catch((error) => {
        setRegisterStatus(false);
        console.error("Some error", error.message);
        setIsPending(false);
      });
    setIsPending(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("workoutbud_user");
    window.location.reload();
  };

  return { login, logout, user, isPending, registerStatus };
};
