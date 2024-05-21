"use client";

import firebase from "firebase/compat/app";
import { auth, authUI } from "@/app/config/firebase";
import { FormEvent, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

export default function SignUp() {
  const [displayName, setDisplayName] = useState<string>("");
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

  const handleSignUp = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await createUserWithEmailAndPassword(auth, email, password);

      if (auth.currentUser) {
        await updateProfile(auth.currentUser, { displayName });
      }

      setDisplayName("");
      setEmail("");
      setPassword("");
    } catch (ex) {
      console.error(ex);
    }
  };

  const formClass = "flex flex-col gap-2 w-fit mx-auto text-black";

  return (
    <main>
      <form onSubmit={handleSignUp} className={formClass}>
        <input
          className="border"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          type="text"
          placeholder="Display Name"
        />
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
          Sign Up
        </button>
      </form>
      <div id="firebaseui-auth-container"></div>;
    </main>
  );
}
