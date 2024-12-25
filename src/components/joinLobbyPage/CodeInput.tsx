import React from "react";

interface CodeInputProps {
  code: string[];
  onChange: (index: number, value: string) => void;
}

const CodeInput: React.FC<CodeInputProps> = ({ code, onChange }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        gap: "10px",
        marginBottom: "20px",
      }}
    >
      {code.map((letter, index) => (
        <input
          key={index}
          type="text"
          value={letter}
          maxLength={1}
          onChange={(e) => onChange(index, e.target.value)}
          style={{
            width: "40px",
            height: "40px",
            fontSize: "20px",
            textAlign: "center",
            textTransform: "uppercase",
            backgroundColor: "#2c3e50", // Set background to black
            color: "white", // Set text color to white
            border: "1px solid #2c3e50", // Optional: Add a white border
          }}
        />
      ))}
    </div>
  );
};

export default CodeInput;
