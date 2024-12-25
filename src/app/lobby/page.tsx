"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
let port = process.env.API_PORT || 5000;
const LobbyPage = () => {
  const searchParams = useSearchParams();
  const code = searchParams ? searchParams.get("code") : null;
  const [isValid, setIsValid] = useState<boolean | null>(null);

  useEffect(() => {
    const validateLobbyCode = async () => {
      if (code) {
        const response = await fetch(`http://localhost:${port}/api/lobbies?code=${code}`);
        const { exists } = await response.json();
        setIsValid(exists);
      }
    };

    validateLobbyCode();
  }, [code]);

  if (isValid === false) {
    return (
      <div style={{ textAlign: "center", padding: "20px", paddingTop: "80px" }}>
        <h1>Error: Invalid Lobby Code</h1>
      </div>
    );
  }

  return (
    <div style={{ textAlign: "center", padding: "20px", paddingTop: "80px" }}>
      <h1>Lobby Code: {code}</h1>
      {/* Add your lobby page content here */}
    </div>
  );
};

export default LobbyPage;
