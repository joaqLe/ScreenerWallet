import { useState } from 'react';
import './Leaderboard.css';

export default function Leaderboard() {
  const tabs = ['Top Traders', 'Snipers', 'Influencers'];
  const [activeTab, setActiveTab] = useState(tabs[0]);

  const renderTable = () => (
    <table className="board-table">
      <thead>
        <tr>
          <th>Rank</th>
          <th>Name</th>
          <th>Points</th>
        </tr>
      </thead>
      <tbody>
        {[1, 2, 3].map(i => (
          <tr key={i}>
            <td>{i}</td>
            <td>Player {i}</td>
            <td>{1000 - i * 10}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div>
      <h2>Leaderboard</h2>
      <div className="tabs">
        {tabs.map(tab => (
          <button
            key={tab}
            className={tab === activeTab ? 'active' : ''}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="tab-content">{renderTable()}</div>
      <div className="achievements">
        <h3>Your Points</h3>
        <p>1500</p>
        <h4>Achievements</h4>
        <ul>
          <li>First Trade</li>
          <li>Joined Tournament</li>
        </ul>
      </div>
    </div>
  );
}
