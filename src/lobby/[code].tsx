import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const Lobby = () => {
  const router = useRouter();
  const { code } = router.query;
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState('');
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    if (!code) return;

    const ws = new WebSocket(`ws://${window.location.host}/api/socket`);
    setSocket(ws);

    ws.onopen = () => {
      ws.send(JSON.stringify({ action: 'join', code }));
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setMessages((prev) => [...prev, data.message]);
    };

    return () => {
      ws.send(JSON.stringify({ action: 'leave', code }));
      ws.close();
    };
  }, [code]);

  const handleSendMessage = () => {
    if (socket) {
      socket.send(JSON.stringify({ action: 'message', code, payload: { message: input } }));
      setMessages((prev) => [...prev, input]); // Local echo
      setInput('');
    }
  };

  return (
    <div>
      <h1>Lobby Code: {code}</h1>
      <div>
        {messages.map((msg, index) => (
          <p key={index}>{msg}</p>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type a message"
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
};

export default Lobby;
