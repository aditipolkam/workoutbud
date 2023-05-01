import { createContext, useEffect, useState } from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "@/config/firebaseClient";
import { AuthContextTypes } from "@/types";
import axios from "axios";
import { useRouter } from "next/router";
const provider = new GoogleAuthProvider();

const AuthContext = createContext<AuthContextTypes>({
  user: null,
  authReady: false,
  isPending: true,
  error: null,
  registerStatus: false,
  login: () => {},
  logout: () => {},
});

export const AuthContextProvider = ({ children }: { children: any }) => {
  const router = useRouter();
  const [user, setUser] = useState<null | string>(null);
  const [authReady, setAuthReady] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState<boolean>(false);
  const [registerStatus, setRegisterStatus] = useState<boolean>(false);

  console.log(user);
  useEffect(() => {
    const user = localStorage.getItem("workoutbud_user");
    if (user) {
      setUser(user);
    }
  }, []);

  function handleChange() {
    window.location.reload();
  }

  // add user to localStorage
  const addToLocalStorage = (uid: string) => {
    if (localStorage) {
      localStorage.setItem("workoutbud_user", uid);
      console.log("added item to local storage");
    } else {
      // No support. Use a fallback such as browser cookies or store on the server.
    }
  };

  const storeDetailsToFirestore = async (token: string) => {
    const res = await axios.post(
      "/api/user-login",
      { accessToken: token },
      { headers: { "Content-Type": "application/json" } }
    );

    let path = "/";
    if (res.status === 200 || res.status === 201) {
      setUser(res.data.uid);
      setRegisterStatus(true);
      setAuthReady(true);
      setError(null);
      console.log("res.data", res);
      addToLocalStorage(res.data.uid);

      if (!res.data.name) path = "/signup/name";
      else if (!res.data.gender) path = "/signup/gender";
      else if (!res.data.bio) path = "/signup/bio";
      else if (!res.data.activities) path = "/signup/activities";
      else if (
        res.data.name &&
        res.data.gender &&
        res.data.bio &&
        res.data.activities
      )
        path = "/app";
      //check which page to redirect to
    } else {
      setRegisterStatus(false);
      path = "/signup/name";
      setError(res.data.message);
    }
    router.push(path);
  };

  const login = async () => {
    setIsPending(true);
    try {
      await signInWithPopup(auth, provider);
      if (auth.currentUser) {
        const token = await auth.currentUser.getIdToken();
        console.log("token", token);
        await storeDetailsToFirestore(token);
        setIsPending(false);
      }
    } catch (error: any) {
      console.error("Some error", error.message);
      setRegisterStatus(false);
      setError(error.message);
      setIsPending(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("workoutbud_user");
    router.push("/");
    //handleChange();
  };

  // useEffect(() => {
  // if (localStorage) {
  //   let storeduser = localStorage.getItem("workoutbud_user");
  //   if (storeduser != "") setUserToken(storeduser);
  //   else setUserToken("");
  // }
  // }, []);

  const value = {
    user,
    authReady,
    isPending,
    error,
    registerStatus,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
