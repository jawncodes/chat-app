"use client";

import { useState, useEffect } from "react";
import { addDoc, collection, onSnapshot } from "firebase/firestore";
import { db } from "@/app/config/firebase";

export default function Home() {
  const [texts, setTexts] = useState<any[]>([]);

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

  return (
    <main>
      <h1>Chat App</h1>
      <p>App for chatting with friends</p>

      <div>
        <input
          type="text"
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
    </main>
  );
}
