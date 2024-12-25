"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import CodeInput from "../../components/joinLobbyPage/CodeInput";
import JoinButton from "../../components/joinLobbyPage/JoinButton";

const JoinLobbyPage: React.FC = () => {
  const [code, setCode] = useState<string[]>(Array(5).fill(""));
  const router = useRouter();

  const handleChange = (index: number, value: string) => {
    if (/^[A-Za-z]?$/.test(value)) {
      const updatedCode = [...code];
      updatedCode[index] = value.toUpperCase();
      setCode(updatedCode);
    }
  };

  const handleJoin = () => {
    const joinedCode = code.join("");
    if (joinedCode.length === 5) {
      router.push(`/lobby?code=${joinedCode}`);
    } else {
      alert("Please enter a complete 5-letter code.");
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px", paddingTop: "80px" }}>
      <h1>Enter 5-Letter Code</h1>
      <CodeInput code={code} onChange={handleChange} />
      <JoinButton onJoin={handleJoin} />
    </div>
  );
};

export default JoinLobbyPage;