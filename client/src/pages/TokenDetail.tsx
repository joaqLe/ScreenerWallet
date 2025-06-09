import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

interface Message {
  text: string;
  timestamp: number;
}

interface Ratings {
  up: number;
  down: number;
}

export default function TokenDetail() {
  const { name } = useParams();
  const token = name || '';
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [ratings, setRatings] = useState<Ratings>({ up: 0, down: 0 });

  useEffect(() => {
    const storedChat = localStorage.getItem(`chat_${token}`);
    if (storedChat) {
      setMessages(JSON.parse(storedChat));
    }
    const storedRating = localStorage.getItem(`rating_${token}`);
    if (storedRating) {
      setRatings(JSON.parse(storedRating));
    }
  }, [token]);

  const addMessage = () => {
    if (!input.trim()) return;
    const newMessages = [
      { text: input.trim(), timestamp: Date.now() },
      ...messages,
    ];
    setMessages(newMessages);
    localStorage.setItem(`chat_${token}`, JSON.stringify(newMessages));
    setInput('');
  };

  const vote = (type: 'up' | 'down') => {
    const newRatings = { ...ratings, [type]: ratings[type] + 1 };
    setRatings(newRatings);
    localStorage.setItem(`rating_${token}`, JSON.stringify(newRatings));
  };

  return (
    <div>
      <h2>{token} Details</h2>
      <div>
        <button onClick={() => vote('up')}>👍 {ratings.up}</button>
        <button onClick={() => vote('down')}>👎 {ratings.down}</button>
      </div>
      <div>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`Chat about ${token}`}
        />
        <button onClick={addMessage}>Send</button>
      </div>
      <ul>
        {messages.map((m, i) => (
          <li key={i}>{m.text}</li>
        ))}
      </ul>
    </div>
  );
}

