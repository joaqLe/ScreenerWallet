import './Premium.css';

export default function Premium() {
  return (
    <div className="premium">
      <h2>Go Premium</h2>
      <table className="comparison">
        <thead>
          <tr>
            <th>Feature</th>
            <th>Free</th>
            <th>Premium</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Wallet overview</td>
            <td>✔</td>
            <td>✔</td>
          </tr>
          <tr>
            <td>Swap tokens</td>
            <td>✔</td>
            <td>✔</td>
          </tr>
          <tr>
            <td>Price alerts</td>
            <td>Up to 3</td>
            <td>Unlimited</td>
          </tr>
          <tr>
            <td>Advanced analytics</td>
            <td></td>
            <td>✔</td>
          </tr>
          <tr>
            <td>Priority support</td>
            <td></td>
            <td>✔</td>
          </tr>
        </tbody>
      </table>
      <div className="plans">
        <h3>Choose your plan</h3>
        <div className="plan">
          <h4>Monthly</h4>
          <p>$5 / month</p>
          <button>Subscribe</button>
        </div>
        <div className="plan">
          <h4>Annual</h4>
          <p>$50 / year</p>
          <button>Subscribe</button>
        </div>
      </div>
      <div className="benefits">
        <h3>Premium benefits</h3>
        <ul>
          <li>Unlimited price alerts</li>
          <li>Advanced analytics</li>
          <li>Priority customer support</li>
        </ul>
      </div>
    </div>
  );
}
