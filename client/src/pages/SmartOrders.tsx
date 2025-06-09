import { useState } from 'react';

interface Order {
  id: number;
  pair: string;
  side: 'buy' | 'sell';
  price: number;
  quantity: number;
  expiresIn: number; // minutes
  stopLossTrigger?: number;
  stopLossPrice?: number;
  takeProfitTrigger?: number;
  takeProfitPrice?: number;
}

export default function SmartOrders() {
  const [pair, setPair] = useState('SOL/USDC');
  const [side, setSide] = useState<'buy' | 'sell'>('buy');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [expiresIn, setExpiresIn] = useState('');
  const [stopLossTrigger, setStopLossTrigger] = useState('');
  const [stopLossPrice, setStopLossPrice] = useState('');
  const [takeProfitTrigger, setTakeProfitTrigger] = useState('');
  const [takeProfitPrice, setTakeProfitPrice] = useState('');
  const [orders, setOrders] = useState<Order[]>([]);
  const [editId, setEditId] = useState<number | null>(null);

  const clearForm = () => {
    setPair('SOL/USDC');
    setSide('buy');
    setPrice('');
    setQuantity('');
    setExpiresIn('');
    setStopLossTrigger('');
    setStopLossPrice('');
    setTakeProfitTrigger('');
    setTakeProfitPrice('');
    setEditId(null);
  };

  const handleSubmit = () => {
    const priceNum = parseFloat(price);
    const quantityNum = parseFloat(quantity);
    const expiresNum = parseInt(expiresIn, 10);
    if (Number.isNaN(priceNum) || Number.isNaN(quantityNum) || Number.isNaN(expiresNum)) {
      alert('Please enter valid price, quantity and expiration.');
      return;
    }

    const summary =
      `Pair: ${pair}\n` +
      `Side: ${side}\n` +
      `Price: ${priceNum}\n` +
      `Quantity: ${quantityNum}\n` +
      `Expires in: ${expiresNum} min\n` +
      (stopLossTrigger ? `Stop Loss Trigger: ${stopLossTrigger}\n` : '') +
      (stopLossPrice ? `Stop Loss Limit: ${stopLossPrice}\n` : '') +
      (takeProfitTrigger ? `Take Profit Trigger: ${takeProfitTrigger}\n` : '') +
      (takeProfitPrice ? `Take Profit Limit: ${takeProfitPrice}\n` : '');

    if (!window.confirm(`Place order?\n\n${summary}`)) {
      return;
    }

    const newOrder: Order = {
      id: editId ?? Date.now(),
      pair,
      side,
      price: priceNum,
      quantity: quantityNum,
      expiresIn: expiresNum,
      stopLossTrigger: stopLossTrigger ? parseFloat(stopLossTrigger) : undefined,
      stopLossPrice: stopLossPrice ? parseFloat(stopLossPrice) : undefined,
      takeProfitTrigger: takeProfitTrigger ? parseFloat(takeProfitTrigger) : undefined,
      takeProfitPrice: takeProfitPrice ? parseFloat(takeProfitPrice) : undefined,
    };

    setOrders(prev => {
      if (editId !== null) {
        return prev.map(o => (o.id === editId ? newOrder : o));
      }
      return [...prev, newOrder];
    });

    clearForm();
  };

  const handleEdit = (id: number) => {
    const order = orders.find(o => o.id === id);
    if (!order) return;
    setPair(order.pair);
    setSide(order.side);
    setPrice(order.price.toString());
    setQuantity(order.quantity.toString());
    setExpiresIn(order.expiresIn.toString());
    setStopLossTrigger(order.stopLossTrigger?.toString() ?? '');
    setStopLossPrice(order.stopLossPrice?.toString() ?? '');
    setTakeProfitTrigger(order.takeProfitTrigger?.toString() ?? '');
    setTakeProfitPrice(order.takeProfitPrice?.toString() ?? '');
    setEditId(id);
  };

  const handleCancel = (id: number) => {
    setOrders(prev => prev.filter(o => o.id !== id));
    if (editId === id) {
      clearForm();
    }
  };

  return (
    <div>
      <h2>Smart Orders</h2>
      <div style={{ display: 'flex', flexDirection: 'column', maxWidth: '400px' }}>
        <label>
          Pair
          <input value={pair} onChange={e => setPair(e.target.value)} />
        </label>
        <label>
          Side
          <select value={side} onChange={e => setSide(e.target.value as 'buy' | 'sell')}>
            <option value="buy">Buy</option>
            <option value="sell">Sell</option>
          </select>
        </label>
        <label>
          Limit Price
          <input value={price} onChange={e => setPrice(e.target.value)} type="number" />
        </label>
        <label>
          Quantity
          <input value={quantity} onChange={e => setQuantity(e.target.value)} type="number" />
        </label>
        <label>
          Expiration (minutes)
          <input value={expiresIn} onChange={e => setExpiresIn(e.target.value)} type="number" />
        </label>
        <fieldset>
          <legend>Stop Loss</legend>
          <label>
            Trigger Price
            <input value={stopLossTrigger} onChange={e => setStopLossTrigger(e.target.value)} type="number" />
          </label>
          <label>
            Limit Price
            <input value={stopLossPrice} onChange={e => setStopLossPrice(e.target.value)} type="number" />
          </label>
        </fieldset>
        <fieldset>
          <legend>Take Profit</legend>
          <label>
            Trigger Price
            <input value={takeProfitTrigger} onChange={e => setTakeProfitTrigger(e.target.value)} type="number" />
          </label>
          <label>
            Limit Price
            <input value={takeProfitPrice} onChange={e => setTakeProfitPrice(e.target.value)} type="number" />
          </label>
        </fieldset>
        <button onClick={handleSubmit}>{editId === null ? 'Place Order' : 'Update Order'}</button>
        {editId !== null && <button onClick={clearForm}>Cancel Edit</button>}
      </div>
      <h3>Open Orders</h3>
      <table>
        <thead>
          <tr>
            <th>Pair</th>
            <th>Side</th>
            <th>Price</th>
            <th>Qty</th>
            <th>Expires In</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id}>
              <td>{order.pair}</td>
              <td>{order.side}</td>
              <td>{order.price}</td>
              <td>{order.quantity}</td>
              <td>{order.expiresIn}m</td>
              <td>
                <button onClick={() => handleEdit(order.id)}>Edit</button>
                <button onClick={() => handleCancel(order.id)}>Cancel</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
