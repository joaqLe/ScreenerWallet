import { useEffect, useState } from 'react';

interface Message {
  text: string;
  timestamp: number;
}

export default function Community() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    const stored = localStorage.getItem('communityFeed');
    if (stored) {
      setMessages(JSON.parse(stored));
    }
  }, []);

  const addMessage = () => {
    if (!input.trim()) return;
    const newMessages = [
      { text: input.trim(), timestamp: Date.now() },
      ...messages,
    ];
    setMessages(newMessages);
    localStorage.setItem('communityFeed', JSON.stringify(newMessages));
    setInput('');
  };

  return (
    <div>
      <h2>Community Feed</h2>
      <div>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Post a message"
        />
        <button onClick={addMessage}>Post</button>
      </div>
      <ul>
        {messages.map((m, i) => (
          <li key={i}>{m.text}</li>
        ))}
      </ul>
    </div>
  );
}

