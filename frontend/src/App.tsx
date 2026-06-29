```tsx
import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

interface Analiticas {
  fecha: string;
  valor: number;
}

const App: React.FC = () => {
  const [analiticas, setAnaliticas] = useState<Analiticas[]>([]);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));

  useEffect(() => {
    if (token) {
      fetch('http://localhost:5000/analiticas', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => setAnaliticas(data))
        .catch((error) => console.error(error));
    }
  }, [token]);

  const handleLogin = () => {
    const usuario = 'usuario';
    const contrasena = 'contrasena';
    fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ usuario, contrasena }),
    })
      .then((response) => response.json())
      .then((data) => {
        localStorage.setItem('token', data.token);
        setToken(data.token);
      })
      .catch((error) => console.error(error));
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  return (
    <div>
      {token ? (
        <div>
          <h1>Dashboard de analíticas</h1>
          <LineChart width={500} height={300} data={analiticas}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="fecha" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="valor" stroke="#8884d8" />
          </LineChart>
          <button onClick={handleLogout}>Cerrar sesión</button>
        </div>
      ) : (
        <div>
          <h1>Iniciar sesión</h1>
          <button onClick={handleLogin}>Iniciar sesión</button>
        </div>
      )}
    </div>
  );
};

export default App;
```