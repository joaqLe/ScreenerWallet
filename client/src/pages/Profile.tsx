import { useEffect, useState } from 'react';
import './Profile.css';

interface Settings {
  alias: string;
  avatar: string; // base64 image string
  language: string;
  currency: string;
  twofa: boolean;
}

export default function Profile() {
  const [settings, setSettings] = useState<Settings>({
    alias: '',
    avatar: '',
    language: 'es',
    currency: 'USD',
    twofa: false,
  });

  useEffect(() => {
    const stored = localStorage.getItem('profile');
    if (stored) {
      setSettings(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('profile', JSON.stringify(settings));
  }, [settings]);

  const handleAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setSettings({ ...settings, avatar: reader.result as string });
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="profile">
      <h2>Perfil de Usuario</h2>
      <div className="profile-section">
        <label>
          Alias:
          <input
            value={settings.alias}
            onChange={e => setSettings({ ...settings, alias: e.target.value })}
          />
        </label>
        <label>
          Avatar:
          <input type="file" accept="image/*" onChange={handleAvatar} />
        </label>
        {settings.avatar && (
          <img src={settings.avatar} alt="avatar" className="avatar" />
        )}
      </div>

      <div className="profile-section">
        <h3>Estadísticas</h3>
        <p>Operaciones totales: 0</p>
        <p>Volumen (placeholder): 0</p>
      </div>

      <div className="profile-section">
        <h3>Logros</h3>
        <ul>
          <li>Explorador Inicial</li>
          <li>Primer Swap</li>
        </ul>
      </div>

      <div className="profile-section">
        <h3>Configuración</h3>
        <label>
          Idioma:
          <select
            value={settings.language}
            onChange={e => setSettings({ ...settings, language: e.target.value })}
          >
            <option value="es">Español</option>
            <option value="en">English</option>
          </select>
        </label>
        <label>
          Moneda preferida:
          <select
            value={settings.currency}
            onChange={e => setSettings({ ...settings, currency: e.target.value })}
          >
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
          </select>
        </label>
        <label>
          Seguridad adicional (2FA):
          <input
            type="checkbox"
            checked={settings.twofa}
            onChange={e => setSettings({ ...settings, twofa: e.target.checked })}
          />
        </label>
      </div>
    </div>
  );
}

export default function Profile() {
  return (
    <div>
      <h2>Perfil</h2>
      <p>Configuración de usuario (próximamente)</p>
    </div>
  );
}
