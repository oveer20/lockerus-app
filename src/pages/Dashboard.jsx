import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { Package, MapPin, Bell, LogOut, Loader2 } from 'lucide-react';

function Dashboard() {
  const [user, setUser] = useState({ name: 'Cargando...', suite: 'LK-XXXXX', phone: '+57 --- --- -- --' });
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [showPreAlertModal, setShowPreAlertModal] = useState(false);
  const [newTracking, setNewTracking] = useState('');

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        navigate('/login');
        return;
      }
      
      try {
        const userRes = await fetch(`${API_URL}/api/user/${currentUser.email}`);
        const userData = await userRes.json();
        
        if (userRes.ok && userData.id) {
          setUser({ name: userData.name, suite: userData.suite, phone: userData.phone });
        } else {
          setUser({ 
            name: currentUser.displayName || 'Usuario', 
            suite: 'LK-' + currentUser.uid.substring(0, 5).toUpperCase(),
            phone: '+57 --- --- -- --'
          });
        }
        
        const pkgsRes = await fetch(`${API_URL}/api/packages/${currentUser.uid}`);
        const pkgs = await pkgsRes.json();
        setPackages(pkgs || []);
      } catch (error) {
        console.error('Error:', error);
        setUser({ name: currentUser.displayName || 'Usuario', suite: 'LK-UNKNOWN', phone: '+57 --- --- -- --' });
      } finally {
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/');
  };

  const handlePreAlertSubmit = (e) => {
    e.preventDefault();
    alert('Paquete pre-alertado correctamente');
    setShowPreAlertModal(false);
  };

  const MIAMI_ADDRESS = { line1: '7768 NW 64th Street', city: 'Miami', state: 'FL', zip: '33166', phone: '+1 (305) 592-1234' };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#020617]">
        <Loader2 className="animate-spin text-primary" size={48} />
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#020617] overflow-hidden">
      <aside className="w-72 glass-panel m-4 flex-col justify-between hidden lg:flex border-r border-white/5">
        <div>
          <div className="p-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center font-black text-white">L</div>
              <h1 className="text-xl font-black text-white italic">Locker<span className="text-primary not-italic">US</span></h1>
            </div>
            <nav className="flex-col gap-3">
              <button className="flex items-center gap-4 p-4 rounded-2xl bg-primary/10 text-primary font-bold transition-all">
                <Package size={22} /> Mis Envíos
              </button>
              <button className="flex items-center gap-4 p-4 rounded-2xl hover:bg-white/5 text-muted transition-all">
                <MapPin size={22} /> Mi Bodega
              </button>
            </nav>
          </div>
          <div className="mx-6 p-6 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 border border-white/10">
            <p className="text-[10px] font-black tracking-widest text-primary uppercase mb-4 text-center">Tu Locker ID</p>
            <h2 className="text-2xl font-black text-white text-center mb-2 tracking-tighter">{user.suite}</h2>
            <div className="w-full h-[1px] bg-white/10 my-4"></div>
            <p className="text-[10px] text-center text-muted font-bold">Usa siempre este ID</p>
          </div>
        </div>
        <div className="p-8">
          <button onClick={handleLogout} className="flex items-center gap-3 p-4 rounded-2xl hover:bg-error/10 text-error/80 transition-all font-bold w-full bg-transparent border-none cursor-pointer text-left">
            <LogOut size={20} /> Salir
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto p-6 md:p-12">
        <header className="flex justify-between items-end mb-12">
          <div>
            <span className="text-xs font-black tracking-[0.3em] text-primary uppercase">Panel</span>
            <h1 className="text-4xl font-black text-white mt-1">Hola, {user.name.split(' ')[0]}</h1>
          </div>
          <button onClick={() => setShowPreAlertModal(true)} className="btn btn-secondary px-8 py-3 rounded-xl font-black text-sm uppercase tracking-wider">
            Pre-Alertar
          </button>
        </header>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-12">
          <div className="xl:col-span-2 feature-card p-8">
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-xl font-black text-white italic">Direccion de Recepcion (Miami)</h3>
              <div className="px-3 py-1 rounded bg-secondary/20 text-secondary text-[10px] font-black uppercase">Fisica</div>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div><p className="text-[10px] font-bold text-primary uppercase tracking-widest mb-1">Nombre y Suite</p><p className="text-lg font-bold text-white">{user.name} - {user.suite}</p></div>
                <div><p className="text-[10px] font-bold text-primary uppercase tracking-widest mb-1">Linea 1</p><p className="text-lg font-bold text-white">{MIAMI_ADDRESS.line1}</p></div>
              </div>
              <div className="space-y-4">
                <div><p className="text-[10px] font-bold text-primary uppercase tracking-widest mb-1">ZIP / State</p><p className="text-lg font-bold text-white">{MIAMI_ADDRESS.zip} - {MIAMI_ADDRESS.state}</p></div>
                <div><p className="text-[10px] font-bold text-primary uppercase tracking-widest mb-1">Telefono</p><p className="text-lg font-bold text-white">{MIAMI_ADDRESS.phone}</p></div>
              </div>
            </div>
          </div>
          <div className="glass-panel p-8 flex-col justify-center items-center text-center">
            <h4 className="text-muted text-sm font-bold mb-4">Total Paquetes</h4>
            <div className="text-6xl font-black text-white mb-2">{packages.length}</div>
            <p className="text-xs text-primary font-black uppercase tracking-widest">En Transito</p>
          </div>
        </div>

        <section>
          <h2 className="text-2xl font-black text-white mb-8 italic">Paquetes</h2>
          {packages.length === 0 ? (
            <div className="p-20 text-center glass-panel rounded-3xl border-dashed border-white/10">
              <Package size={48} className="mx-auto mb-4 text-white/10" />
              <p className="text-muted">No hay paquetes</p>
              <button onClick={() => setShowPreAlertModal(true)} className="text-primary font-bold mt-2 text-sm underline">Pre-alertar</button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
              {packages.map(pkg => (
                <div key={pkg.id} className="glass-panel p-6 flex flex-wrap justify-between items-center gap-6 hover:border-primary/40 transition-all group">
                  <div className="flex items-center gap-6">
                    <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-black transition-all">
                      <Package size={28} />
                    </div>
                    <div><h4 className="font-black text-white text-lg">{pkg.name}</h4><p className="text-xs text-muted">Tracking: <span className="font-mono text-primary">{pkg.tracking}</span></p></div>
                  </div>
                  <div className="flex gap-12 items-center">
                    <div className="text-right"><p className="text-[10px] font-black text-muted uppercase tracking-widest">Peso</p><p className="font-bold text-white">{pkg.weight} Lbs</p></div>
                    <div className="text-right"><p className="text-[10px] font-black text-muted uppercase tracking-widest">Estado</p><p className="font-bold text-secondary uppercase text-[10px] tracking-widest">{pkg.status}</p></div>
                    <button className="btn btn-primary rounded-xl px-8 font-black uppercase text-xs">Pagar</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      {showPreAlertModal && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-[100] p-4 animate-fade-in backdrop-blur-xl">
          <div className="feature-card w-full max-w-lg p-10 relative">
            <button onClick={() => setShowPreAlertModal(false)} className="absolute top-6 right-8 text-muted hover:text-white text-2xl font-black">x</button>
            <h2 className="text-3xl font-black text-white italic mb-2">Pre-Alertar Paquete</h2>
            <p className="text-muted text-sm mb-8">Avisa sobre tu compra</p>
            <form onSubmit={handlePreAlertSubmit} className="space-y-6">
              <div className="flex-col gap-2">
                <label className="text-[10px] font-black text-primary uppercase tracking-widest">Tienda</label>
                <input type="text" placeholder="Amazon, Shein" className="bg-white/5 border-white/10 rounded-xl" required />
              </div>
              <div className="flex-col gap-2">
                <label className="text-[10px] font-black text-primary uppercase tracking-widest">Tracking</label>
                <input type="text" value={newTracking} onChange={(e) => setNewTracking(e.target.value)} placeholder="TBA123456789" className="bg-white/5 border-white/10 rounded-xl" />
              </div>
              <button type="submit" className="btn btn-primary w-full py-4 rounded-xl font-black uppercase tracking-wider text-sm">Registrar</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;