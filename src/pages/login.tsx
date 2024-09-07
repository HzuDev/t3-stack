import React, { useState } from 'react';
import { useRouter } from 'next/router';

export default function Login() {
  const [ci, setCi] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ci, password }),
      });

      const data = await response.json();

      if (response.ok) {
        router.push('/portal');
      } else {
        setError(data.error || 'Error en el login');
      }
    } catch (error) {
      setError('Error al conectar con el servidor');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md">
        <form onSubmit={handleSubmit} className="mb-4 rounded bg-white px-8 pb-8 pt-6 shadow-md">
          <div className="mb-4">
            <label className="mb-2 block text-sm font-bold text-gray-700" htmlFor="ci">
              CI
            </label>
            <input
              className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
              id="ci"
              type="text"
              value={ci}
              onChange={(e) => setCi(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label className="mb-2 block text-sm font-bold text-gray-700" htmlFor="password">
              Contraseña
            </label>
            <input
              className="focus:shadow-outline mb-3 w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="mb-4 text-xs italic text-red-500">{error}</p>}
          <div className="flex items-center justify-between">
            <button
              className="focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
              type="submit"
            >
              Iniciar sesión
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}