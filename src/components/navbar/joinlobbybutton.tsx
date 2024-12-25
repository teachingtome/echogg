"use client";

import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface JoinLobbyButtonProps {
  className?: string;
}

const JoinLobbyButton: React.FC<JoinLobbyButtonProps> = ({ className }) => {
  const [code, setCode] = useState('');
  const router = useRouter();

  const handleJoinLobby = () => {
    router.push(`/join`);
  };

  return (
    <div>
      <button className={className} onClick={handleJoinLobby}>Join Lobby</button>
    </div>
  );
};

export default JoinLobbyButton;