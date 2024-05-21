"use client";

import { useState, useEffect } from "react";
import { addDoc, collection, onSnapshot } from "firebase/firestore";
import { db, auth } from "@/app/config/firebase";
import {
  useCreateUserWithEmailAndPassword,
  useSignInWithGoogle,
} from "react-firebase-hooks/auth";

export default function Home() {
  const [texts, setTexts] = useState<any[]>([]);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [createUserWithEmailAndPassword] =
    useCreateUserWithEmailAndPassword(auth);
  const [signInWithGoogle] = useSignInWithGoogle(auth);

  useEffect(() => {
    const textCollectionRef = collection(db, "test");
    const unsubscribe = onSnapshot(textCollectionRef, (snapshot) => {
      const updatedTexts = snapshot.docs.map((doc) => doc.data().text);
      setTexts(updatedTexts);
      console.log(updatedTexts);
    });

    return () => unsubscribe();
  }, []);

  const [text, setText] = useState("");

  const handleSend = async () => {
    if (text.trim() === "") {
      return;
    }

    await addDoc(collection(db, "test"), {
      text,
    });

    setText("");
  };

  const handleSignUp = async (e: any) => {
    e.preventDefault();

    try {
      const res = await createUserWithEmailAndPassword(email, password);
      console.log(res);
      setEmail("");
      setPassword("");
    } catch (ex) {
      console.error(ex);
    }
  };

  return (
    <main className="text-black">
      <h1>Chat App</h1>
      <p>App for chatting with friends</p>

      <div>
        <input
          type="text"
          className="bg-gray-200"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button onClick={handleSend}>Send</button>
      </div>

      <ul>
        {texts.map((text, idx) => (
          <li key={idx}>{text}</li>
        ))}
      </ul>

      <form onSubmit={handleSignUp}>
        <input
          className="border"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
        />
        <input
          className="border"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
        />
        <button type="submit">Sign Up</button>
      </form>

      <button onClick={() => signInWithGoogle()}>Sign in with Google</button>
    </main>
  );
}
