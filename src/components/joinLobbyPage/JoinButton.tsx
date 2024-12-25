import React from 'react';

interface JoinButtonProps {
  onJoin: () => void;
}

const JoinButton: React.FC<JoinButtonProps> = ({ onJoin }) => {
  return (
    <button onClick={onJoin} style={{ padding: "10px 20px", fontSize: "16px" }}>
      Join
    </button>
  );
};

export default JoinButton;
