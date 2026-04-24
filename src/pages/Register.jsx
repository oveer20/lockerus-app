import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { Loader2, UserPlus, Mail, Lock, Phone } from 'lucide-react';

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { name, phone, email, password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      setLoading(false);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await updateProfile(user, { displayName: name });

      const suiteNumber = 'LK-' + Math.random().toString(36).substring(2, 7).toUpperCase();

      await setDoc(doc(db, 'users', user.uid), {
        name,
        phone,
        email,
        suite: suiteNumber,
        createdAt: new Date().toISOString()
      });

      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      if (err.code === 'auth/email-already-in-use') {
        setError('Este correo ya está registrado');
      } else if (err.code === 'auth/invalid-email') {
        setError('Correo electrónico inválido');
      } else {
        setError('Error al registrar: ' + err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{
      background: 'radial-gradient(circle at center, var(--bg-color) 0%, #050510 100%)'
    }}>
      <div className="glass-panel p-8 max-w-md w-full animate-fade-in" style={{ maxHeight: '90vh', overflowY: 'auto' }}>
        <div className="flex items-center justify-center gap-2 mb-2">
          <UserPlus size={24} className="text-primary" />
          <h2 className="text-gradient text-2xl">Crear Cuenta</h2>
        </div>
        <p className="text-center text-muted mb-6 text-sm">Tu casillero virtual gratis en Miami</p>

        <form onSubmit={handleRegister} className="flex-col gap-3">
          {error && (
            <div className="p-3 mb-2 rounded bg-[rgba(239,68,68,0.2)] text-error text-sm text-center border border-[rgba(239,68,68,0.5)]">
              {error}
            </div>
          )}

          <div>
            <label className="text-xs font-semibold mb-1 block text-muted">Nombre completo</label>
            <div className="relative">
              <UserPlus size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
              <input
                type="text"
                name="name"
                placeholder="Juan Pérez"
                value={formData.name}
                onChange={handleChange}
                required
                className="pl-10"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold mb-1 block text-muted">Teléfono (WhatsApp)</label>
            <div className="relative">
              <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
              <input
                type="tel"
                name="phone"
                placeholder="+57 300 123 4567"
                value={formData.phone}
                onChange={handleChange}
                required
                className="pl-10"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold mb-1 block text-muted">Correo electrónico</label>
            <div className="relative">
              <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
              <input
                type="email"
                name="email"
                placeholder="tu@correo.com"
                value={formData.email}
                onChange={handleChange}
                required
                className="pl-10"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold mb-1 block text-muted">Contraseña</label>
            <div className="relative">
              <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
                className="pl-10"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold mb-1 block text-muted">Confirmar contraseña</label>
            <div className="relative">
              <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
              <input
                type="password"
                name="confirmPassword"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="pl-10"
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary w-full mt-4" disabled={loading}>
            {loading ? <Loader2 className="animate-spin" size={20} /> : 'Crear Cuenta Gratis'}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-muted">
          ¿Ya tienes cuenta? <Link to="/login" className="text-primary font-semibold">Ingresar</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;