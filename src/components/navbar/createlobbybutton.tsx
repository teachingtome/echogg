"use client";

import { useRouter } from 'next/navigation';
let port = process.env.API_PORT || 5000;
interface CreateLobbyButtonProps {
  className?: string;
}

const CreateLobbyButton: React.FC<CreateLobbyButtonProps> = ({ className }) => {
  const router = useRouter();

  const generateCode = (): string => {
    return Array(5)
      .fill(null)
      .map(() => String.fromCharCode(65 + Math.floor(Math.random() * 26)))
      .join('');
  };

  const handleCreateLobby = async () => {
    const code = generateCode();

    const response = await fetch(`http://localhost:${port}/api/lobbies`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code }),
    });

    if (response.ok) {
      router.push(`/lobby?code=${code}`);
    } else {
      console.error('Failed to create lobby');
    }
  };

  return <button className={className} onClick={handleCreateLobby}>Create Lobby</button>;
};

export default CreateLobbyButton;