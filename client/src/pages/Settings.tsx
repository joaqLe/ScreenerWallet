import { useEffect, useState } from 'react';

export default function Settings() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [security, setSecurity] = useState(false);
  const [notifications, setNotifications] = useState(true);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || savedTheme === 'light') {
      setTheme(savedTheme);
      document.body.classList.remove('light', 'dark');
      document.body.classList.add(savedTheme);
    }
    const savedSecurity = localStorage.getItem('securityEnabled');
    if (savedSecurity) {
      setSecurity(savedSecurity === 'true');
    }
    const savedNotifications = localStorage.getItem('notificationsEnabled');
    if (savedNotifications) {
      setNotifications(savedNotifications === 'true');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.body.classList.remove('light', 'dark');
    document.body.classList.add(newTheme);
  };

  const toggleSecurity = () => {
    const newValue = !security;
    setSecurity(newValue);
    localStorage.setItem('securityEnabled', String(newValue));
  };

  const toggleNotifications = () => {
    const newValue = !notifications;
    setNotifications(newValue);
    localStorage.setItem('notificationsEnabled', String(newValue));
  };

  return (
    <div>
      <h2>Configuración General</h2>
      <div>
        <label>
          Modo oscuro:
          <input type="checkbox" checked={theme === 'dark'} onChange={toggleTheme} />
        </label>
      </div>
      <div>
        <label>
          Seguridad biométrica/PIN:
          <input type="checkbox" checked={security} onChange={toggleSecurity} />
        </label>
      </div>
      <div>
        <label>
          Notificaciones globales:
          <input type="checkbox" checked={notifications} onChange={toggleNotifications} />
        </label>
      </div>
    </div>
  );
}
