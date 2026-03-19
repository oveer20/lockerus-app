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

      <main className="container pt-20 pb-24 flex-col items-center">
        {/* Tracking Search Home */}
        <div className="w-full flex flex-col items-center mb-16 animate-fade-in">
          <div className="tracking-search glass">
            <input 
              type="text" 
              placeholder="Rastrea tu paquete..." 
              value={tracking}
              onChange={(e) => setTracking(e.target.value)}
            />
            <button className="btn btn-primary rounded-full px-6">Rastrear</button>
          </div>
          <p className="text-[10px] mt-4 uppercase tracking-[0.3em] opacity-40">Entregas Rápidas • Seguro Incluido • Pagos en Pesos</p>
        </div>

        <div className="grid md:grid-cols-1 grid-cols-2 gap-12 items-center">
          <div className="text-left animate-slide-up">
            <h1 className="text-white mb-6">
              Tu Casillero en <span className="text-primary">USA</span> para <span className="text-secondary italic">Colombia</span>.
            </h1>
            <p className="text-lg mb-8 max-w-lg">
              Compra en tus tiendas favoritas de Estados Unidos y recibe en tiempo récord sin complicaciones aduaneras.
            </p>
            <div className="flex gap-4 items-center">
              <Link to="/login" className="btn btn-primary px-8 py-3 rounded-xl shadow-glow">Empezar Mi Envío</Link>
              <div className="hidden md:flex items-center gap-2 ml-4">
                <div className="w-2 h-2 rounded-full bg-success animate-pulse"></div>
                <span className="text-xs font-bold text-success/80">Sistemas en línea</span>
              </div>
            </div>
          </div>
          
          <div className="relative animate-float flex justify-center">
             <div className="absolute inset-0 bg-primary/10 blur-[80px] rounded-full scale-75"></div>
             <div className="glass-panel p-1 rounded-3xl border border-white/5 max-w-[450px] overflow-hidden">
               <img src="/hero-shipping.png" alt="App Preview" className="w-full h-auto object-cover rounded-2xl" />
             </div>
          </div>
        </div>

        {/* Pricing/Plans Section */}
        <div className="mt-32 w-full">
           <div className="text-center mb-16">
             <h2 className="text-white mb-3">Planes de Envío</h2>
             <p className="">Tarifas competitivas para cada necesidad.</p>
           </div>
           
           <div className="grid md:grid-cols-1 grid-cols-3 gap-6">
              <div className="glass-panel p-8 flex-col items-center text-center">
                 <div className="text-primary text-xs font-black uppercase tracking-widest mb-4">Standard</div>
                 <h3 className="text-2xl font-black text-white mb-2">$4.50 <span className="text-xs font-normal opacity-50">/ LB</span></h3>
                 <p className="text-xs mb-8">Personal ocasional. Entrega 4-6 días.</p>
                 <Link to="/login" className="btn btn-glass w-full rounded-full">Elegir</Link>
              </div>

              <div className="glass-panel p-8 flex-col items-center text-center border-primary/30 bg-primary/5">
                 <div className="text-secondary text-xs font-black uppercase tracking-widest mb-4">Rocket Prime</div>
                 <h3 className="text-2xl font-black text-white mb-2">$3.90 <span className="text-xs font-normal opacity-50">/ LB</span></h3>
                 <p className="text-xs mb-8">Compradores frecuentes. Entrega 3-5 días.</p>
                 <Link to="/login" className="btn btn-primary w-full rounded-full">Elegir</Link>
              </div>

              <div className="glass-panel p-8 flex-col items-center text-center">
                 <div className="text-muted text-xs font-black uppercase tracking-widest mb-4">Business</div>
                 <h3 className="text-2xl font-black text-white mb-2">$3.20 <span className="text-xs font-normal opacity-50">/ LB</span></h3>
                 <p className="text-xs mb-8">Mayoreo y tiendas. Entrega 2-4 días.</p>
                 <Link to="/login" className="btn btn-glass w-full rounded-full">Elegir</Link>
              </div>
           </div>
        </div>

        <section className="mt-32 w-full max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-white mb-3 italic">Calcula tu Ahorro</h2>
            <p className="">Transparencia radical en tus envíos.</p>
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
