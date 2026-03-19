import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Scale, DollarSign, ArrowRight, Package } from 'lucide-react';

const Calculator = () => {
  const [weight, setWeight] = useState(1);
  const [value, setValue] = useState(100);
  const TRM = 4000;
  const SHIPPING_RATE = 4.5; // USD per LB

  const totalUSD = weight * SHIPPING_RATE;
  const totalCOP = totalUSD * TRM;

  return (
    <div className="glass-panel p-8 animate-slide-up">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="flex-col gap-4">
          <label className="text-sm font-semibold flex items-center gap-2">
            <Scale size={16} className="text-primary" /> Peso del paquete (Libras)
          </label>
          <input 
            type="number" 
            value={weight} 
            onChange={(e) => setWeight(Math.max(1, e.target.value))}
            className="w-full bg-[rgba(0,0,0,0.3)] border border-[rgba(255,255,255,0.1)] rounded p-3 text-white"
          />
          
          <label className="text-sm font-semibold mt-4 flex items-center gap-2">
            <DollarSign size={16} className="text-primary" /> Valor declarado (USD)
          </label>
          <input 
            type="number" 
            value={value} 
            onChange={(e) => setValue(Math.max(1, e.target.value))}
            className="w-full bg-[rgba(0,0,0,0.3)] border border-[rgba(255,255,255,0.1)] rounded p-3 text-white"
          />
          
          {value > 200 && (
            <div className="mt-4 p-3 rounded bg-[rgba(245,158,11,0.1)] border border-[rgba(245,158,11,0.3)]">
              <p className="text-xs text-warning">Nota: Compras superiores a $200 USD pagan IVA del 19% en Colombia.</p>
            </div>
          )}
        </div>

        <div className="bg-[rgba(79,70,229,0.1)] rounded-xl p-6 flex-col justify-center items-center text-center border border-[rgba(79,70,229,0.2)]">
          <p className="text-sm text-muted mb-2">Costo estimado de envío</p>
          <h2 className="text-4xl font-bold text-gradient mb-1">${totalUSD.toFixed(2)} USD</h2>
          <p className="text-xl font-semibold text-primary opacity-80">~ ${totalCOP.toLocaleString()} COP</p>
          <div className="w-full h-[1px] bg-[rgba(255,255,255,0.1)] my-6"></div>
          <p className="text-xs text-muted mb-6">Basado en tarifa de $4.5 USD/Lb y TRM referencial $4.000 COP.</p>
          <Link to="/login" className="btn btn-primary w-full group">
            Obtener mi Casillero <ArrowRight size={18} className="group-hover:translate-x-1 transition" />
          </Link>
        </div>
      </div>
    </div>
  );
};


function Landing() {
  const [tracking, setTracking] = useState('');

  return (
    <div className="flex-col h-full overflow-x-hidden">
      {/* Space Background Layer */}
      <div className="fixed inset-0 z-[-1] bg-[#020617]">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary opacity-10 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary opacity-10 blur-[120px] rounded-full"></div>
      </div>

      <header className="glass py-4 z-50 sticky top-0 border-b border-[rgba(255,255,255,0.05)]">
        <div className="container flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center font-black text-white">L</div>
            <h1 className="text-2xl font-black text-white tracking-tight">Locker<span className="text-primary italic">US</span></h1>
          </div>
          <nav className="flex gap-4 items-center">
            <Link to="/login" className="btn btn-secondary text-sm px-6 py-2 rounded-full font-bold">Inicia Sesión</Link>
            <Link to="/login" className="btn btn-primary text-sm px-6 py-2 rounded-full font-bold">Registrarme</Link>
          </nav>
        </div>
      </header>

      <main className="container pt-32 pb-24 flex-col items-center">
        {/* Tracking Search Home */}
        <div className="w-full max-w-2xl mx-auto mb-16 animate-fade-in">
          <div className="tracking-search glass">
            <input 
              type="text" 
              placeholder="Rastrea tu paquete (Ejem: TBA123456789)" 
              value={tracking}
              onChange={(e) => setTracking(e.target.value)}
              className="flex-1"
            />
            <button className="btn btn-primary rounded-full px-8">Rastrear</button>
          </div>
          <div className="flex justify-center gap-6 mt-4 text-xs text-muted font-medium uppercase tracking-widest opacity-60">
             <span>🚀 Entregas Rápidas</span>
             <span>🛡️ Seguro Incluido</span>
             <span>💳 Pagos en Pesos</span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="text-left animate-slide-up">
            <h1 className="text-6xl md:text-7xl font-black mb-8 leading-[0.9] text-white">
              Tu Casillero en <span className="text-primary">USA</span> para <span className="text-secondary italic underline decoration-4 underline-offset-8">Colombia</span>.
            </h1>
            <p className="text-xl text-muted/80 mb-10 max-w-xl font-light">
              Compra en tus tiendas favoritas de Estados Unidos y recibe en tiempo récord. Sin complicaciones aduaneras y con las mejores tarifas del país.
            </p>
            <div className="flex gap-4 items-center">
              <Link to="/login" className="btn btn-primary px-10 py-4 rounded-xl text-lg shadow-glow">Empezar Mi Envío</Link>
              <div className="flex -space-x-3 ml-4 items-center">
                {[1,2,3].map(i => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-bg-color bg-slate-800 flex items-center justify-center text-[10px] font-bold">+500k</div>
                ))}
                <span className="ml-4 text-sm font-semibold opacity-70 italic text-primary">+500,000 Usuarios confían</span>
              </div>
            </div>
          </div>
          
          <div className="relative animate-float">
             <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-secondary/30 blur-[60px] rounded-full scale-75"></div>
             <div className="glass-panel p-2 rounded-3xl border border-white/10 hover:border-primary/40 transition-colors duration-500">
               <img src="/hero-shipping.png" alt="App Preview" className="w-full rounded-2xl grayscale-[0.2] hover:grayscale-0 transition-all duration-700" />
             </div>
          </div>
        </div>

        {/* Pricing/Plans Section */}
        <div className="mt-32 w-full">
           <div className="text-center mb-16">
             <h2 className="text-4xl font-black text-white mb-4">Planes de Envío</h2>
             <p className="text-muted text-lg">Selecciona la velocidad y tarifa que mejor se adapte a ti.</p>
           </div>
           
           <div className="grid md:grid-cols-3 gap-8">
              <div className="feature-card flex-col items-center">
                 <div className="text-primary mb-4 p-4 rounded-2xl bg-primary/10">Standard</div>
                 <h3 className="text-3xl font-black text-white">$4.50 <span className="text-sm font-normal text-muted">/ LB</span></h3>
                 <p className="text-sm text-center text-muted mb-8 py-4 border-b border-white/5 w-full">Ideal para compras personales ocasionales. Entrega 4-6 días.</p>
                 <Link to="/login" className="btn btn-glass w-full rounded-full">Suscribirme</Link>
              </div>

              <div className="feature-card flex-col items-center ring-2 ring-primary relative">
                 <div className="absolute top-0 right-8 transform -translate-y-1/2 bg-primary text-black text-[10px] font-black px-4 py-1 rounded-full tracking-widest">MOST POPULAR</div>
                 <div className="text-secondary mb-4 p-4 rounded-2xl bg-secondary/10 font-bold">Rocket Prime</div>
                 <h3 className="text-3xl font-black text-white">$3.90 <span className="text-sm font-normal text-muted">/ LB</span></h3>
                 <p className="text-sm text-center text-muted mb-8 py-4 border-b border-white/5 w-full">Para compradores frecuentes. Prioridad en bodega. Entrega 3-5 días.</p>
                 <Link to="/login" className="btn btn-primary w-full rounded-full">Lo quiero ahora</Link>
              </div>

              <div className="feature-card flex-col items-center">
                 <div className="text-muted mb-4 p-4 rounded-2xl bg-white/5">Business</div>
                 <h3 className="text-3xl font-black text-white">$3.20 <span className="text-sm font-normal text-muted">/ LB</span></h3>
                 <p className="text-sm text-center text-muted mb-8 py-4 border-b border-white/5 w-full">Mayoreo y tiendas. Consolidación gratuita. Entrega 2-4 días.</p>
                 <Link to="/login" className="btn btn-glass w-full rounded-full">Contactar Ventas</Link>
              </div>
           </div>
        </div>

        <section className="mt-40 w-full max-w-5xl mx-auto">
          <div className="flex-col items-center text-center mb-16">
            <h2 className="text-4xl font-black text-white mb-4 italic">Calcula tu Ahorro</h2>
            <p className="text-muted">Sin costos ocultos, solo transparencia radical.</p>
          </div>
          <Calculator />
        </section>
      </main>

      {/* Warehouse Section */}
      <section className="py-24 bg-white/5 border-y border-white/5">
         <div className="container grid md:grid-cols-2 gap-16 items-center">
            <div className="animate-slide-up">
              <h2 className="text-4xl font-black text-white mb-6">Tu Dirección en Miami</h2>
              <p className="text-muted text-lg mb-8">Usa estos datos al realizar tus compras en cualquier tienda de USA. Nosotros nos encargamos del resto.</p>
              
              <div className="glass-panel p-8 space-y-6">
                 <div className="flex-col">
                    <span className="text-xs uppercase text-primary font-bold tracking-[0.2em] mb-2">Address Line 1</span>
                    <p className="text-xl font-bold text-white">7768 NW 64th Street</p>
                 </div>
                 <div className="flex-col">
                    <span className="text-xs uppercase text-primary font-bold tracking-[0.2em] mb-2">City / State / ZIP</span>
                    <p className="text-xl font-bold text-white">Miami, FL 33166</p>
                 </div>
                 <div className="p-4 rounded-xl bg-secondary/5 border border-secondary/20 flex justify-between items-center">
                    <span className="text-sm text-secondary font-bold">Tu Casillero ID: LK-00000 (Pendiente)</span>
                    <Link to="/login" className="text-xs underline hover:text-white transition">Obtener ID Real</Link>
                 </div>
              </div>
            </div>
            <div className="relative">
               <div className="feature-card aspect-square flex items-center justify-center">
                  <Package size={120} className="text-primary opacity-20 absolute" />
                  <div className="text-center z-10">
                    <h3 className="text-5xl font-black text-white mb-2 italic">3-5 Días</h3>
                    <p className="text-secondary font-bold tracking-widest uppercase">Promedio de Entrega</p>
                  </div>
               </div>
            </div>
         </div>
      </section>

      <footer className="py-20 container border-t border-white/5 flex flex-wrap justify-between gap-12 text-sm">
         <div className="flex-col gap-4 max-w-xs">
           <h3 className="text-xl font-black text-white">Locker<span className="text-primary">US</span></h3>
           <p className="text-muted">Líderes en logística USA-Colombia con tecnología espacial.</p>
         </div>
         <div className="flex flex-wrap gap-20">
           <div className="flex-col gap-4">
             <h4 className="font-bold text-white uppercase tracking-widest text-[10px]">Links Rápidos</h4>
             <a href="#" className="text-muted hover:text-white transition">Rastreo</a>
             <a href="#" className="text-muted hover:text-white transition">Planes</a>
             <a href="#" className="text-muted hover:text-white transition">Ayuda</a>
           </div>
           <div className="flex-col gap-4">
             <h4 className="font-bold text-white uppercase tracking-widest text-[10px]">DIAN</h4>
             <a href="#" className="text-muted hover:text-white transition">Tratado TLC</a>
             <a href="#" className="text-muted hover:text-white transition">Calculadora IVA</a>
           </div>
         </div>
      </footer>
    </div>
  );
}

export default Landing;
