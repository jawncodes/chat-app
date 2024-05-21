"use client";

import firebase from "firebase/compat/app";
import { authUI } from "@/app/config/firebase";
import { useEffect } from "react";

export default function SignUp() {
  useEffect(() => {
    const uiConfig = {
      signInSuccessUrl: "/",
      signInFlow: "popup",
      signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      ],
    };

    authUI.start("#firebaseui-auth-container", uiConfig);
  }, []);

  return <div id="firebaseui-auth-container"></div>;
}
