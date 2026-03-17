import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { Loader2 } from 'lucide-react';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      // Intentar login real con Firebase
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      // Para motivos de demostración, si falla por credenciales inválidas (mocked project) 
      // Igual lo dejamos pasar al Dashboard para que puedas ver la maqueta 
      // (Quitar este navigate en producción real)
      navigate('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{
      background: 'radial-gradient(circle at center, var(--bg-color) 0%, #050510 100%)'
    }}>
      <div className="glass-panel p-8 max-w-md w-full animate-fade-in">
        <h2 className="text-center text-gradient mb-2">Bienvenido de vuelta</h2>
        <p className="text-center text-muted mb-8 text-sm">Ingresa para administrar tu casillero</p>

        <form onSubmit={handleLogin} className="flex-col gap-4">
          {error && <div className="p-3 mb-4 rounded bg-[rgba(239,68,68,0.2)] text-error text-sm text-center border border-[rgba(239,68,68,0.5)]">{error}</div>}
          
          <div>
            <label className="text-sm font-semibold mb-2 block">Correo electrónico</label>
            <input 
              type="email" 
              placeholder="tu@correo.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>
          <div className="mt-4">
            <label className="text-sm font-semibold mb-2 block">Contraseña</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>

          <button type="submit" className="btn btn-primary w-full mt-8" disabled={loading}>
            {loading ? <Loader2 className="animate-spin" size={20} /> : 'Ingresar'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-muted">
          ¿No tienes cuenta? <Link to="/" className="text-primary font-semibold">Regístrate</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
