import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Package, MapPin, Search, Bell, LogOut, Loader2, ChevronDown, CheckSquare, PlusCircle } from 'lucide-react';

function Dashboard() {
  const [user, setUser] = useState(null);
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // States para Consolidación y Pre-Alerta
  const [selectedPackages, setSelectedPackages] = useState([]);
  const navigate = useNavigate();
  const [showPreAlertModal, setShowPreAlertModal] = useState(false);
  const [newTracking, setNewTracking] = useState('');
  const [newCarrier, setNewCarrier] = useState('Amazon');

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userRes = await fetch(`${API_URL}/api/user/user@example.com`);
        const userData = await userRes.json();
        setUser(userData);

        if (userData && userData.id) {
          const pkgsRes = await fetch(`${API_URL}/api/packages/${userData.id}`);
          const pkgs = await pkgsRes.json();
          setPackages(pkgs);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handlePayment = async (pkg) => {
    try {
      const response = await fetch(`${API_URL}/api/create-preference`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: `Envío Casillero: ${pkg.name}`,
          quantity: 1,
          price: pkg.weight * 4.5 * 4000 // Aprox a Pesos Colombianos usando una TRM referencial
        })
      });
      const data = await response.json();
      
      if (data.init_point) {
        // Redirigir al usuario al Checkout Segurio de MercadoPago
        window.location.href = data.init_point;
      }
    } catch (error) {
      console.error('Error procesando pago:', error);
      alert('Hubo un error al iniciar la sesión de pago.');
    }
  };

  const handleToggleSelect = (pkgId) => {
    setSelectedPackages(prev => 
      prev.includes(pkgId) ? prev.filter(id => id !== pkgId) : [...prev, pkgId]
    );
  };

  const handleConsolidatedPayment = () => {
    if (selectedPackages.length === 0) return;
    const items = packages.filter(p => selectedPackages.includes(p.id));
    const totalWeight = items.reduce((acc, curr) => acc + curr.weight, 0);
    
    // Aquí invocaríamos el endpoint con la sumatoria de libras (Ahorro por lote)
    alert(`Iniciando Consolidación de ${items.length} paquetes.\nPeso Total: ${totalWeight.toFixed(2)} lbs.\nSe aplicará tarifa especial por volumen.`);
  };

  const handlePreAlertSubmit = (e) => {
    e.preventDefault();
    alert(`Pre-Alerta registrada exitosamente. Tracking: ${newTracking}`);
    setShowPreAlertModal(false);
    setNewTracking('');
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-900">
        <Loader2 className="animate-spin text-primary" size={48} />
      </div>
    );
  }
  return (
    <div className="flex h-screen bg-slate-900 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 glass-panel m-4 flex-col justify-between hidden md:flex">
        <div>
          <div className="p-6 border-b border-[rgba(255,255,255,0.1)]">
            <h2 className="text-xl font-bold text-gradient">LockerUS</h2>
          </div>
          <nav className="p-4 flex-col gap-2">
            <a href="#" className="flex items-center gap-3 p-3 rounded-lg bg-[rgba(255,255,255,0.1)] text-white font-semibold">
              <Package size={20} /> Mis Paquetes
            </a>
            <a href="#" className="flex items-center gap-3 p-3 rounded-lg hover:bg-[rgba(255,255,255,0.05)] text-muted transition">
              <MapPin size={20} /> Mi Casillero
            </a>
            <a href="#" className="flex items-center gap-3 p-3 rounded-lg hover:bg-[rgba(255,255,255,0.05)] text-muted transition">
              Pagos & Tarifas
            </a>
          </nav>
        </div>
        <div className="p-4">
          <Link to="/" className="flex items-center gap-3 p-3 rounded-lg hover:bg-[rgba(255,100,100,0.1)] text-error transition w-full">
            <LogOut size={20} /> Cerrar Sesión
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-4 md:p-8">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold">Mis Paquetes</h1>
            <p className="text-muted">Rastrea y gestiona tus envíos a Colombia, {user?.name.split(' ')[0]}</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center font-bold">
              {user?.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
            </div>
          </div>
        </header>

        {/* Address Widget */}
        <section className="glass-panel p-6 mb-8 animate-slide-up">
          <h3 className="flex items-center gap-2 text-lg font-semibold mb-4">
            <MapPin size={20} className="text-primary" />
            Dirección en USA
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-[rgba(0,0,0,0.2)] rounded-lg border border-[rgba(255,255,255,0.05)]">
              <p className="text-sm text-muted">Nombre</p>
              <p className="font-semibold">{user?.name} - {user?.suite}</p>
            </div>
            <div className="p-4 bg-[rgba(0,0,0,0.2)] rounded-lg border border-[rgba(255,255,255,0.05)]">
              <p className="text-sm text-muted">Dirección</p>
              <p className="font-semibold">8400 NW 25th St, Suite 100</p>
            </div>
            <div className="p-4 bg-[rgba(0,0,0,0.2)] rounded-lg border border-[rgba(255,255,255,0.05)]">
              <p className="text-sm text-muted">Ciudad / Estado / Zip</p>
              <p className="font-semibold">Doral, FL 33122</p>
            </div>
            <div className="p-4 bg-[rgba(0,0,0,0.2)] rounded-lg border border-[rgba(255,255,255,0.05)]">
              <p className="text-sm text-muted">Teléfono</p>
              <p className="font-semibold">{user?.phone}</p>
            </div>
          </div>
        </section>

        {/* Packages List */}
        <section className="glass-panel p-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">En Tránsito ({packages.length})</h2>
            <div className="flex gap-4">
              {selectedPackages.length > 1 && (
                <button onClick={handleConsolidatedPayment} className="btn bg-green-600 hover:bg-green-700 text-white flex items-center gap-2 text-sm py-2 px-4 animate-fade-in">
                  <CheckSquare size={16} /> Consolidar para Enviar ({selectedPackages.length})
                </button>
              )}
              <button onClick={() => setShowPreAlertModal(true)} className="btn btn-primary flex items-center gap-2 text-sm py-2 px-4 shadow-[0_0_15px_rgba(79,70,229,0.3)]">
                <PlusCircle size={16} /> Pre-Alertar Compra
              </button>
            </div>
          </div>
          
          {packages.length === 0 ? (
            <div className="p-8 text-center bg-[rgba(0,0,0,0.2)] rounded-lg border border-[rgba(255,255,255,0.05)] text-muted">
              No tienes paquetes en tránsito en este momento.
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {packages.map((pkg) => (
                <div 
                  key={pkg.id} 
                  onClick={() => handleToggleSelect(pkg.id)}
                  className={`glass-panel p-6 hover:translate-y-[-5px] transition-all cursor-pointer ${
                    selectedPackages.includes(pkg.id) ? 'border-primary shadow-[0_0_15px_rgba(79,70,229,0.2)]' : ''
                  }`}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-3 rounded-xl bg-[rgba(79,70,229,0.1)] text-primary">
                      <Package size={24} />
                    </div>
                    {selectedPackages.includes(pkg.id) && (
                      <CheckSquare size={20} className="text-primary" />
                    )}
                  </div>
                  <h4 className="font-semibold text-lg mb-1">{pkg.name}</h4>
                  <p className="text-sm text-muted mb-4">Tracking: {pkg.tracking}</p>
                  <div className="flex justify-between items-center">
                    <span className="inline-block px-3 py-1 rounded-full bg-[rgba(245,158,11,0.2)] text-warning text-xs font-bold">
                      {pkg.status}
                    </span>
                    <p className="text-sm text-muted">Peso: {pkg.weight} lbs</p>
                  </div>
                  <button className="btn btn-primary text-sm py-1 px-3 w-full mt-4" onClick={(e) => { e.stopPropagation(); handlePayment(pkg); }}>
                    Pagar Envío (${(pkg.weight * 4.5).toFixed(2)})
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Modal de Pre-Alerta */}
      {showPreAlertModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="glass-panel w-full max-w-md p-8 relative">
            <button 
              onClick={() => setShowPreAlertModal(false)}
              className="absolute top-4 right-4 text-muted hover:text-white"
            >
              x
            </button>
            <h3 className="text-2xl font-bold mb-2">Pre-Alertar Paquete</h3>
            <p className="text-muted text-sm mb-6">Avisa a nuestra bodega en Miami que tienes un paquete en camino para procesarlo más rápido.</p>
            
            <form onSubmit={handlePreAlertSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-1">Empresa de Transporte (Courier)</label>
                <select 
                  value={newCarrier} 
                  onChange={(e) => setNewCarrier(e.target.value)}
                  className="w-full bg-[rgba(0,0,0,0.3)] border border-[rgba(255,255,255,0.1)] rounded p-3 text-white"
                >
                  <option value="Amazon">Amazon Logistics</option>
                  <option value="UPS">UPS</option>
                  <option value="USPS">USPS / Correo de USA</option>
                  <option value="Fedex">FedEx</option>
                  <option value="SHEIN">SHEIN</option>
                  <option value="Temu">Temu</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-semibold mb-1">Número de Seguimiento (Tracking)</label>
                <input 
                  type="text" 
                  value={newTracking}
                  className="w-full bg-[rgba(0,0,0,0.3)] border border-[rgba(255,255,255,0.1)] rounded p-3 text-white"
                  placeholder="Ej. TBA123456789"
                  onChange={(e) => setNewTracking(e.target.value)}
                  required
                />
              </div>

              <div className="p-4 rounded bg-[rgba(245,158,11,0.1)] border border-[rgba(245,158,11,0.3)] mt-2">
                <p className="text-xs text-warning">Recuerda: Los paquetes sin factura incurrirán en un cobro aduanero del 19% si no podemos verificar que cuestan menos de $200 USD.</p>
              </div>

              <button type="submit" className="btn btn-primary w-full mt-4">Registrar Alerta</button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

export default Dashboard;
