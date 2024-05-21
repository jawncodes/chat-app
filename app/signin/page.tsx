"use client";

import firebase from "firebase/compat/app";
import { FormEvent, useState, useEffect } from "react";
import { auth, authUI } from "../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function SignIn() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  useEffect(() => {
    const uiConfig = {
      signInSuccessUrl: "/",
      signInFlow: "popup",
      signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
    };

    authUI.start("#firebaseui-auth-container", uiConfig);
  }, []);

  const handleSignIn = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      setEmail("");
      setPassword("");
    } catch (ex) {
      console.error(ex);
    }
  };

  const formClass = "flex flex-col gap-2 w-fit mx-auto text-black";

  return (
    <main>
      <form onSubmit={handleSignIn} className={formClass}>
        <input
          className="border"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Email"
        />
        <input
          className="border"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
        />
        <button type="submit" className="bg-stone-400 hover:bg-stone-500">
          Sign In
        </button>
      </form>
      <div id="firebaseui-auth-container"></div>;
    </main>
  );
}
