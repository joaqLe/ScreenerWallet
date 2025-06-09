import { useEffect, useState } from 'react';

interface Holder {
  address: string;
  share: number;
}

interface Properties {
  mintable: boolean;
  mutable: boolean;
  authority: string;
}

interface SecurityData {
  token: string;
  score: number;
  topHolders: Holder[];
  properties: Properties;
  critical: boolean;
}

export default function Security() {
  const [data, setData] = useState<SecurityData | null>(null);

  useEffect(() => {
    fetch('http://localhost:3001/api/security?token=solana')
      .then(res => res.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const scoreColor = (score: number) => {
    if (score >= 80) return 'green';
    if (score >= 50) return 'orange';
    return 'red';
  };

  if (!data) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>Contract Security</h2>
      <div style={{ fontSize: '2rem', fontWeight: 'bold', color: scoreColor(data.score) }}>
        Score: {data.score}
      </div>
      {data.critical && (
        <div style={{ color: 'red', fontSize: '1.5rem', margin: '1rem 0' }}>
          Critical Issues Detected!
        </div>
      )}
      <h3>Top Holders</h3>
      <ul>
        {data.topHolders.map((h, i) => (
          <li key={i}>{h.address}: {h.share}%</li>
        ))}
      </ul>
      <h3>Properties</h3>
      <ul>
        <li>Mintable: {data.properties.mintable ? 'Yes' : 'No'}</li>
        <li>Mutable: {data.properties.mutable ? 'Yes' : 'No'}</li>
        <li>Authority: {data.properties.authority}</li>
      </ul>
    </div>
  );
}
