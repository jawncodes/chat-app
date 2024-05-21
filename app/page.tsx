"use client";

import { useState, useEffect, FormEvent } from "react";
import { addDoc, collection, onSnapshot } from "firebase/firestore";
import { db, auth } from "@/app/config/firebase";

export default function Home() {
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<any[]>([]);

  const user = auth.currentUser;
  const userData = user && {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
  };

  const messageCollectionRef = collection(db, "message");

  useEffect(() => {
    const unsubscribe = onSnapshot(messageCollectionRef, (snapshot) => {
      const updatedMessages = snapshot.docs.map((doc) => doc.data());
      updatedMessages.sort((a, b) => Number(a.createdAt) - Number(b.createdAt));
      setMessages(updatedMessages);
      console.log(updatedMessages);
    });

    return () => unsubscribe();
  }, []);

  const handleSend = async (e: FormEvent) => {
    e.preventDefault();

    if (message.trim() === "") {
      return;
    }

    await addDoc(messageCollectionRef, {
      userData,
      message,
      createdAt: new Date(),
    });

    setMessage("");
  };

  return (
    <main className="text-black">
      <h1>Chat App</h1>
      <p>App for chatting with friends</p>

      {user && (
        <form onSubmit={handleSend}>
          <input
            type="text"
            className="bg-gray-200"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button type="submit">Send</button>
        </form>
      )}

      <ul>
        {messages.map((message, idx) => (
          <li key={idx} className="flex gap-2">
            <h3>[{message.createdAt.toDate().toString()}]</h3>
            <h1 className="font-bold">{message.userData.displayName}:</h1>
            <h2>{message.message}</h2>
          </li>
        ))}
      </ul>
    </main>
  );
}
