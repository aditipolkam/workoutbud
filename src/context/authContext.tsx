import { createContext, useEffect, useState } from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "@/config/firebaseClient";
import { AuthContextTypes } from "@/types";
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
  const [user, setUser] = useState<null | string>(null);
  const [authReady, setAuthReady] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState<boolean>(false);
  const [registerStatus, setRegisterStatus] = useState<boolean>(false);

  function handleChange() {
    window.location.reload();
  }

  //   add user to localStorage
  // const addToLocalStorage = (details: any) => {
  //   if (localStorage) {
  //     const tuser = {
  //       email: details.email,
  //       uid: details.uid,
  //       displayName: details.displayName,
  //     };
  //     setUser(tuser);
  //     localStorage.setItem("workoutbud_user", JSON.stringify(tuser));
  //     console.log("added item to local storage");
  //   } else {
  //     // No support. Use a fallback such as browser cookies or store on the server.
  //   }
  // };

  const storeDetailsToFirestore = (token: string) => {
    fetch("/api/user-login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ accessToken: token }),
    })
      .then((res) => {
        res.json();
      })
      .then((data) => {
        console.log(data);
      });
  };

  const login = async () => {
    setIsPending(true);
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log("auth", auth.currentUser);
        if (auth.currentUser) {
          auth.currentUser.getIdToken().then((token) => {
            console.log("token", token);
            setUser(token);
            //storeDetailsToFirestore(token);
          });
        }
        setRegisterStatus(true);
        setIsPending(false);
        //addToLocalStorage(userDetails);
        //handleChange();
      })
      .catch((error) => {
        console.error("Some error", error.message);
        setRegisterStatus(false);
        setError(error.message);
        setIsPending(false);
      });
  };

  const logout = () => {
    setUser(null);
    //localStorage.removeItem("workoutbud_user");
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
