import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Scale, DollarSign, ArrowRight, Package, UserPlus, ShoppingCart, Truck, CheckCircle, Clock, CreditCard } from 'lucide-react';

const Calculator = () => {
  const [weight, setWeight] = useState(1);
  const [value, setValue] = useState(100);
  const TRM = 4000;
  const SHIPPING_RATE = 3.5; // Competitive rate

  const totalUSD = weight * SHIPPING_RATE;
  const totalCOP = totalUSD * TRM;

  return (
    <div className="glass-panel p-10 animate-slide-up">
      <div className="grid md:grid-cols-1 grid-cols-2 gap-12">
        <div className="flex flex-col gap-6">
          <div>
            <label className="text-xs font-black uppercase tracking-widest text-primary mb-3 block">Peso (Libras)</label>
            <div className="relative">
              <input 
                type="number" 
                value={weight} 
                onChange={(e) => setWeight(Math.max(1, e.target.value))}
                className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white text-lg font-bold"
              />
              <Scale size={20} className="absolute right-4 top-1/2 -translate-y-1/2 text-primary/40" />
            </div>
          </div>
          
          <div>
            <label className="text-xs font-black uppercase tracking-widest text-primary mb-3 block">Valor Declarado (USD)</label>
            <div className="relative">
              <input 
                type="number" 
                value={value} 
                onChange={(e) => setValue(Math.max(1, e.target.value))}
                className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white text-lg font-bold"
              />
              <DollarSign size={20} className="absolute right-4 top-1/2 -translate-y-1/2 text-primary/40" />
            </div>
          </div>
          
          {value > 200 && (
            <div className="p-4 rounded-xl bg-secondary/10 border border-secondary/20">
              <p className="text-xs text-secondary font-bold">⚠️ Compras &gt; $200 USD pagan 19% IVA en Colombia.</p>
            </div>
          )}
        </div>

        <div className="bg-primary/5 rounded-2xl p-8 flex flex-col justify-center items-center text-center border border-primary/10">
          <p className="text-xs font-black uppercase tracking-[0.3em] mb-4 opacity-60">Estimación de Envío</p>
          <h2 className="text-5xl font-black text-white mb-1">${totalUSD.toFixed(2)} <span className="text-sm font-normal">USD</span></h2>
          <p className="text-xl font-bold text-primary">~ ${totalCOP.toLocaleString()} COP</p>
          <div className="w-full h-[1px] bg-white/5 my-8"></div>
          <Link to="/login" className="btn btn-primary w-full py-4 text-sm font-black uppercase tracking-widest">
            ¡Quiero mi Casillero Ya!
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
        <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] bg-primary opacity-[0.07] blur-[150px] rounded-full"></div>
        <div className="absolute bottom-[-20%] right-[-20%] w-[60%] h-[60%] bg-secondary opacity-[0.07] blur-[150px] rounded-full"></div>
        <div className="absolute top-[30%] left-[20%] w-[1px] h-[1px] bg-white shadow-[0_0_100vw_2px_rgba(255,255,255,0.1)]"></div>
      </div>

      <header className="glass py-5 z-50 sticky top-0 border-b border-white/5">
        <div className="container flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center font-black text-white text-xl">L</div>
            <h1 className="text-2xl font-black text-white tracking-tight italic">Locker<span className="text-primary not-italic">US</span></h1>
          </div>
          <nav className="flex gap-4 items-center">
            <Link to="/login" className="btn btn-glass px-6 py-2 rounded-full font-bold text-xs uppercase">Login</Link>
            <Link to="/login" className="btn btn-primary px-6 py-2 rounded-full font-black text-xs uppercase shadow-glow">Registro Gratis</Link>
          </nav>
        </div>
      </header>

      <main className="container pt-24 pb-24">
        {/* HERO SECTION */}
        <div className="grid md:grid-cols-1 grid-cols-2 gap-16 items-center mb-40">
          <div className="text-left animate-slide-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              <span className="text-[10px] font-black tracking-widest text-primary uppercase">Envío Miami a Colombia ⚡</span>
            </div>
            <h1 className="text-white mb-8">
              Tus Compras en <span className="text-primary">USA</span>.<br/>Entregadas en <span className="text-secondary italic">Colombia</span>.
            </h1>
            <p className="text-lg mb-10 max-w-lg opacity-80">
              Obtén tu dirección física en Miami gratis hoy mismo. Compra en Amazon, eBay o Apple y nosotros nos encargamos de todo el proceso hasta tu puerta.
            </p>
            <div className="flex flex-wrap gap-5 items-center">
              <Link to="/login" className="btn btn-primary px-10 py-4 rounded-2xl text-base shadow-glow uppercase tracking-widest">Abrir Mi Casillero</Link>
              <div className="flex -space-x-3 ml-2">
                 {[1,2,3,4].map(i => (
                   <div key={i} className="w-10 h-10 rounded-full border-2 border-[#020617] bg-slate-800 flex items-center justify-center text-[8px] font-black text-primary">LK</div>
                 ))}
                 <div className="ml-8 flex flex-col">
                   <span className="text-xs font-bold text-white">4.9/5 Estrellas</span>
                   <span className="text-[10px] text-muted uppercase tracking-wider">De 15,000+ Usuarios</span>
                 </div>
              </div>
            </div>
          </div>
          
          <div className="relative animate-float flex justify-center">
             <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full scale-75 opacity-50"></div>
             <div className="glass-panel p-2 rounded-[2.5rem] border border-white/10 max-w-[500px] overflow-hidden rotate-2 hover:rotate-0 transition-transform duration-700">
               <img src="/hero-shipping.png" alt="Logística Especial" className="w-full h-auto object-cover rounded-[2rem]" />
             </div>
          </div>
        </div>

        {/* HOW IT WORKS */}
        <section className="mb-40">
           <div className="text-center mb-20">
             <h2 className="text-white mb-4 italic">¿Cómo funciona?</h2>
             <p className="max-w-2xl mx-auto">En solo 3 pasos, tus compras de USA estarán en tus manos en Colombia.</p>
           </div>
           
           <div className="grid md:grid-cols-1 grid-cols-3 gap-12">
              <div className="flex flex-col items-center text-center group">
                 <div className="w-20 h-20 rounded-3xl bg-white/5 flex items-center justify-center mb-8 border border-white/5 group-hover:border-primary/50 group-hover:bg-primary/10 transition-all duration-500">
                    <UserPlus size={40} className="text-primary" />
                 </div>
                 <h4 className="text-lg font-black text-white mb-4">1. Regístrate Gratis</h4>
                 <p className="text-sm opacity-60">Obtén tu Suite ID única y nuestra dirección física en Miami al instante sin costos mensuales.</p>
              </div>

              <div className="flex flex-col items-center text-center group">
                 <div className="w-20 h-20 rounded-3xl bg-white/5 flex items-center justify-center mb-8 border border-white/5 group-hover:border-secondary/50 group-hover:bg-secondary/10 transition-all duration-500">
                    <ShoppingCart size={40} className="text-secondary" />
                 </div>
                 <h4 className="text-lg font-black text-white mb-4">2. Compra en USA</h4>
                 <p className="text-sm opacity-60">Usa tu dirección de LockerUS al hacer checkout en cualquier tienda como Amazon, Walmart o eBay.</p>
              </div>

              <div className="flex flex-col items-center text-center group">
                 <div className="w-20 h-20 rounded-3xl bg-white/5 flex items-center justify-center mb-8 border border-white/5 group-hover:border-primary/50 group-hover:bg-primary/10 transition-all duration-500">
                    <Truck size={40} className="text-primary" />
                 </div>
                 <h4 className="text-lg font-black text-white mb-4">3. Recibe en Colombia</h4>
                 <p className="text-sm opacity-60">Nosotros consolidamos, aseguramos y enviamos tus paquetes hasta tu casa en tiempo récord.</p>
              </div>
           </div>
        </section>

        {/* BENEFITS SECTION */}
        <section className="mb-40 py-24 glass-panel border-x-0 rounded-none bg-primary/[0.02]">
           <div className="container grid md:grid-cols-1 grid-cols-2 gap-20 items-center">
              <div>
                 <h2 className="text-white mb-8">¿Por qué elegir <span className="text-primary italic">Locker</span>US?</h2>
                 <div className="grid grid-cols-2 gap-8">
                    <div className="flex gap-4">
                       <CheckCircle size={24} className="text-primary shrink-0" />
                       <div>
                          <h5 className="font-bold text-white mb-1">Sin Cuota Manejo</h5>
                          <p className="text-xs">Paga solo por lo que envías, sin mensualidades.</p>
                       </div>
                    </div>
                    <div className="flex gap-4">
                       <Clock size={24} className="text-primary shrink-0" />
                       <div>
                          <h5 className="font-bold text-white mb-1">Entrega Express</h5>
                          <p className="text-xs">Recibe en 3-5 días hábiles en ciudades principales.</p>
                       </div>
                    </div>
                    <div className="flex gap-4">
                       <ShieldCheck size={24} className="text-primary shrink-0" />
                       <div>
                          <h5 className="font-bold text-white mb-1">Seguro Total</h5>
                          <p className="text-xs">Tus paquetes están protegidos desde Miami.</p>
                       </div>
                    </div>
                    <div className="flex gap-4">
                       <CreditCard size={24} className="text-primary shrink-0" />
                       <div>
                          <h5 className="font-bold text-white mb-1">Pagos en Pesos</h5>
                          <p className="text-xs">Aceptamos tarjetas colombianas y PSE.</p>
                       </div>
                    </div>
                 </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                 <div className="glass-panel p-8 text-center flex flex-col justify-center gap-2">
                    <span className="text-4xl font-black text-primary italic">100%</span>
                    <span className="text-[10px] uppercase font-bold tracking-widest opacity-60">Digital</span>
                 </div>
                 <div className="glass-panel p-8 text-center flex flex-col justify-center gap-2 mt-8">
                    <span className="text-4xl font-black text-secondary italic">0$</span>
                    <span className="text-[10px] uppercase font-bold tracking-widest opacity-60">Registro</span>
                 </div>
              </div>
           </div>
        </section>

        {/* CALCULATOR & TRACKING */}
        <section className="mb-40">
           <div className="text-center mb-16">
              <h2 className="text-white mb-4">Calcula tu Envío</h2>
              <p>Conoce el costo exacto antes de comprar con nuestra tarifa plana.</p>
           </div>
           <Calculator />
           
           <div className="mt-20 flex flex-col items-center">
              <p className="text-sm font-bold text-white mb-6 uppercase tracking-widest opacity-60 italic">¿Ya tienes un paquete en tránsito?</p>
              <div className="tracking-search glass w-full max-w-xl p-2">
                 <input type="text" placeholder="Ingresa tu número de tracking (Ej: TBA123456789)" value={tracking} onChange={(e) => setTracking(e.target.value)} />
                 <button className="btn btn-secondary rounded-full px-8 font-black uppercase tracking-widest text-xs">Rastrear</button>
              </div>
           </div>
        </section>

        {/* WAREHOUSE SECTION */}
        <section className="mb-40">
          <div className="glass-panel p-16 grid md:grid-cols-1 grid-cols-2 gap-16 items-center">
             <div>
                <h2 className="text-white mb-6">Tu Bodega en <span className="text-primary">Miami</span></h2>
                <p className="mb-10 opacity-70">Esta es la dirección que debes usar al comprar en tus tiendas favoritas de USA. Recuerda incluir siempre tu Suite ID (ej. LK-12345).</p>
                <div className="space-y-6">
                   <div className="p-5 rounded-2xl bg-white/5 border border-white/5 flex justify-between items-center group hover:border-primary/30 transition-all">
                      <div className="flex flex-col">
                         <span className="text-[10px] font-black uppercase text-primary tracking-widest mb-1">Address Line 1</span>
                         <span className="text-lg font-bold text-white">7768 NW 64th Street</span>
                      </div>
                      <button className="text-[10px] font-black uppercase text-muted hover:text-primary underline">Copiar</button>
                   </div>
                   <div className="p-5 rounded-2xl bg-white/5 border border-white/5 flex justify-between items-center group hover:border-primary/30 transition-all">
                      <div className="flex flex-col">
                         <span className="text-[10px] font-black uppercase text-primary tracking-widest mb-1">City / State / ZIP</span>
                         <span className="text-lg font-bold text-white">Miami, FL 33166</span>
                      </div>
                      <button className="text-[10px] font-black uppercase text-muted hover:text-primary underline">Copiar</button>
                   </div>
                </div>
             </div>
             <div className="relative flex justify-center">
                <div className="w-full aspect-video rounded-3xl bg-primary/10 animate-float flex items-center justify-center border border-primary/20">
                   <Package size={120} className="text-primary opacity-20" />
                   <div className="absolute inset-x-0 bottom-8 text-center">
                      <h4 className="text-2xl font-black text-white italic">PROCESAMIENTO EXPRESS</h4>
                      <p className="text-[10px] uppercase font-bold tracking-widest text-secondary">Bodega Propia en Florida</p>
                   </div>
                </div>
             </div>
          </div>
        </section>
      </main>

      <footer className="py-24 bg-white/[0.02] border-t border-white/5">
         <div className="container grid md:grid-cols-1 grid-cols-4 gap-20">
            <div className="col-span-1">
               <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center font-black text-white text-xl">L</div>
                  <h1 className="text-2xl font-black text-white tracking-tight italic">Locker<span className="text-primary not-italic">US</span></h1>
               </div>
               <p className="text-xs mb-8">Tu puente tecnológico entre las mejores tiendas de Estados Unidos y tu puerta en Colombia. Logística espacial para el mundo real.</p>
               <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10"></div>
                  <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10"></div>
                  <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10"></div>
               </div>
            </div>
            
            <div className="flex flex-col gap-6">
               <h5 className="text-xs font-black uppercase tracking-widest text-white">Servicios</h5>
               <a href="#" className="text-xs hover:text-primary transition-colors">Casillero Personal</a>
               <a href="#" className="text-xs hover:text-primary transition-colors">Envíos Corporativos</a>
               <a href="#" className="text-xs hover:text-primary transition-colors">Consolidación</a>
               <a href="#" className="text-xs hover:text-primary transition-colors">Seguro de Carga</a>
            </div>

            <div className="flex flex-col gap-6">
               <h5 className="text-xs font-black uppercase tracking-widest text-white">Ayuda</h5>
               <a href="#" className="text-xs hover:text-primary transition-colors">Centro de Soporte</a>
               <a href="#" className="text-xs hover:text-primary transition-colors">Cómo Comprar</a>
               <a href="#" className="text-xs hover:text-primary transition-colors">Prohibidos DIAN</a>
               <a href="#" className="text-xs hover:text-primary transition-colors">Preguntas Frecuentes</a>
            </div>

            <div className="flex flex-col gap-6">
               <h5 className="text-xs font-black uppercase tracking-widest text-white">Contacto</h5>
               <span className="text-xs">Bodega: 7768 NW 64th Street, Miami</span>
               <span className="text-xs">Tel: +1 (305) 592-1234</span>
               <span className="text-xs">Email: info@lockerus.io</span>
            </div>
         </div>
         <div className="container mt-24 pt-8 border-t border-white/5 flex justify-between items-center text-[10px] text-muted font-bold uppercase tracking-widest">
            <span>© 2026 LockerUS Logistics. Todos los derechos reservados.</span>
            <div className="flex gap-8">
               <a href="#">Privacidad</a>
               <a href="#">Términos</a>
            </div>
         </div>
      </footer>
    </div>
  );
}

export default Landing;
