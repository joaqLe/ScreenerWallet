import { useEffect, useState } from 'react';
import QRCode from 'qrcode';

export default function Receive() {
  const [address, setAddress] = useState('');
  const [qr, setQr] = useState('');

  useEffect(() => {
    const key = localStorage.getItem('wallet');
    if (key) {
      setAddress(key);
      QRCode.toDataURL(key).then(setQr).catch(console.error);
    }
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(address);
  };

  return (
    <div>
      <h2>Recibir Tokens</h2>
      {address ? (
        <div>
          <input
            readOnly
            value={address}
            onClick={handleCopy}
            style={{ width: '100%' }}
          />
          {qr && (
            <img
              src={qr}
              alt="QR"
              style={{ width: '200px', height: '200px' }}
            />
          )}
          <p>Comparte esta dirección para recibir tokens.</p>
        </div>
      ) : (
        <p>No wallet loaded</p>
      )}
    </div>
  );
}
