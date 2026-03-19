import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Scale, DollarSign, ArrowRight, Package, UserPlus, ShoppingCart, Truck, CheckCircle, Clock, CreditCard, ExternalLink, Copy, HelpCircle } from 'lucide-react';

const Calculator = () => {
  const [weight, setWeight] = useState(1);
  const [value, setValue] = useState(100);
  const TRM = 4100; // Updated TRM
  const SHIPPING_RATE = 3.5;

  const totalUSD = weight * SHIPPING_RATE;
  const totalCOP = totalUSD * TRM;

  return (
    <div className="hero-calculator p-8 animate-fade-in">
      <h3 className="mb-6 flex items-center gap-2">
        <Scale className="text-blue" size={24} /> 
        Calculadora de Envío
      </h3>
      
      <div className="space-y-6">
        <div>
          <label className="text-xs font-bold uppercase text-muted mb-2 block">Peso del Paquete (Lbs)</label>
          <div className="relative">
            <input 
              type="number" 
              value={weight} 
              onChange={(e) => setWeight(Math.max(1, e.target.value))}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-lg font-bold outline-none focus:border-blue"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted font-bold">LB</span>
          </div>
        </div>

        <div>
           <label className="text-xs font-bold uppercase text-muted mb-2 block">Valor de la Compra (USD)</label>
           <div className="relative">
             <input 
               type="number" 
               value={value} 
               onChange={(e) => setValue(Math.max(1, e.target.value))}
               className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-lg font-bold outline-none focus:border-blue"
             />
             <DollarSign size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted" />
           </div>
        </div>

        <div className="bg-slate-50 rounded-xl p-6 border border-slate-100">
           <div className="flex justify-between items-end mb-4">
              <span className="text-sm text-muted">Total Estimado</span>
              <div className="text-right">
                 <h2 className="text-blue text-4xl font-extrabold mb-0">${totalUSD.toFixed(2)} <span className="text-sm font-normal text-muted">USD</span></h2>
                 <p className="text-lg font-bold text-slate-400">≈ ${totalCOP.toLocaleString()} COP</p>
              </div>
           </div>
           
           <div className="pt-4 border-t border-slate-200">
              <Link to="/login" className="btn btn-primary w-full py-4 text-center rounded-xl shadow-lg">
                REGISTRARME Y ENVIAR
              </Link>
           </div>
           <p className="text-[10px] text-center mt-4 text-muted">Tarifa base: $3.5 USD/Lb • TRM: $4,100 COP</p>
        </div>
      </div>
    </div>
  );
};

function Landing() {
  const [tracking, setTracking] = useState('');

  return (
    <div className="min-h-screen bg-white">
      {/* Top Navbar */}
      <header className="navbar sticky top-0 bg-white/90 backdrop-blur-md z-[100]">
        <div className="container flex justify-between items-center">
           <Link to="/" className="flex items-center gap-3 no-underline">
              <div className="w-10 h-10 rounded-lg bg-blue flex items-center justify-center font-black text-white text-xl shadow-lg">L</div>
              <span className="text-2xl font-black text-slate-800 tracking-tight">Locker<span className="text-blue">US</span></span>
           </Link>
           
           <nav className="hidden lg:flex items-center gap-8 text-sm font-bold text-slate-600">
              <a href="#proceso" className="hover:text-blue transition-colors">¿Cómo funciona?</a>
              <a href="#tarifas" className="hover:text-blue transition-colors">Tarifas</a>
              <a href="#contacto" className="hover:text-blue transition-colors">Contacto</a>
           </nav>

           <div className="flex items-center gap-4">
              <Link to="/login" className="text-sm font-bold text-slate-600 hover:text-blue transition-colors px-4">Ingresar</Link>
              <Link to="/login" className="btn btn-primary rounded-lg text-sm px-6">Crear Cuenta</Link>
           </div>
        </div>
      </header>

      <main>
        {/* HERO SECTION */}
        <section className="section bg-slate-50 overflow-hidden relative">
           <div className="absolute top-0 right-0 w-1/2 h-full bg-blue/5 skew-x-[-12deg] translate-x-1/4 z-0 lg:hidden"></div>
           
           <div className="container grid lg:grid-cols-1 grid-cols-2 gap-20 items-center relative z-10">
              <div className="animate-fade-in">
                 <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue/10 rounded-full border border-blue/20 mb-6 font-bold text-xs text-blue">
                    COMPRA EN USA, RECIBE EN COLOMBIA
                 </div>
                 <h1 className="mb-8">Tu <span className="text-blue">Casillero Virtual</span> Profesional y Seguro.</h1>
                 <p className="text-xl mb-10 text-slate-600 leading-relaxed max-w-xl">
                    Importamos tus compras desde Estados Unidos con la logística más confiable del mercado. Sin trámites complicados y con entrega puerta a puerta.
                 </p>
                 
                 <div className="flex flex-col gap-6">
                    <div className="flex items-center gap-6">
                       <div className="flex -space-x-3">
                          {[1,2,3,4].map(i => <div key={i} className="w-12 h-12 rounded-full border-4 border-white bg-slate-200"></div>)}
                       </div>
                       <div className="text-sm">
                          <p className="text-slate-900 font-bold mb-0">Más de 25,000 envíos exitosos</p>
                          <p className="text-xs text-muted">Confianza total en cada entrega</p>
                       </div>
                    </div>
                    
                    <div className="tracking-input-group max-w-md shadow-sm">
                       <input 
                        type="text" 
                        placeholder="Rastrea tu paquete..." 
                        value={tracking}
                        onChange={(e) => setTracking(e.target.value)}
                       />
                       <button className="btn btn-primary rounded-md px-6 text-sm">Rastrear</button>
                    </div>
                 </div>
              </div>

              <div className="relative">
                 <Calculator />
              </div>
           </div>
        </section>

        {/* TRUST BAR */}
        <div className="py-12 border-b border-slate-100 opacity-40 grayscale">
           <div className="container flex flex-wrap justify-center gap-16 items-center">
              <span className="text-2xl font-black italic">AMAZON</span>
              <span className="text-2xl font-black italic">EBAY</span>
              <span className="text-2xl font-black italic">APPLE</span>
              <span className="text-2xl font-black italic">WALMART</span>
              <span className="text-2xl font-black italic">NIKE</span>
           </div>
        </div>

        {/* PROCESS SECTION */}
        <section id="proceso" className="section bg-white">
           <div className="container">
              <div className="text-center mb-20 max-w-3xl mx-auto">
                 <h2 className="mb-4">Tu envío en 3 pasos sencillos</h2>
                 <p>Diseñamos nuestra plataforma para que importar sea tan fácil como comprar localmente.</p>
              </div>

              <div className="grid md:grid-cols-1 grid-cols-3 gap-12">
                 {[
                   { icon: <UserPlus />, title: "1. Regístrate", desc: "Crea tu cuenta gratis y obtén tu Suite ID y dirección física en Miami al instante." },
                   { icon: <ShoppingCart />, title: "2. Compra", desc: "Usa tu dirección de LockerUS al comprar en cualquier tienda online de USA." },
                   { icon: <Truck />, title: "3. Recibe", desc: "Nosotros recibimos, procesamos y entregamos tus paquetes en tu puerta en Colombia." }
                 ].map((step, i) => (
                   <div key={i} className="card text-center flex flex-col items-center">
                      <div className="w-16 h-16 bg-blue/10 rounded-2xl flex items-center justify-center text-blue mb-6">
                         {React.cloneElement(step.icon, { size: 32 })}
                      </div>
                      <h3 className="mb-4">{step.title}</h3>
                      <p className="text-sm">{step.desc}</p>
                   </div>
                 ))}
              </div>
           </div>
        </section>

        {/* BENEFITS SECTION */}
        <section className="section bg-slate-50">
           <div className="container grid lg:grid-cols-1 grid-cols-2 gap-20 items-center">
              <div>
                 <h2 className="mb-8">¿Por qué somos la mejor opción para tus compras?</h2>
                 <div className="grid grid-cols-2 lg:grid-cols-1 gap-8">
                    {[
                      { icon: <CheckCircle />, title: "Sin Cuota Mensual", desc: "Registro gratis y sin cobros de manejo de cuenta." },
                      { icon: <Clock />, title: "Entrega Express", desc: "Tus paquetes llegan en un promedio de 3 a 5 días hábiles." },
                      { icon: <ShieldCheck />, title: "Asegurado al 100%", desc: "Garantizamos la seguridad de tu carga desde Miami hasta tu casa." },
                      { icon: <CreditCard />, title: "Pagos Flexibles", desc: "Aceptamos tarjetas locales, transferencias y PSE." }
                    ].map((item, i) => (
                      <div key={i} className="flex gap-4">
                         <div className="text-blue mt-1">{React.cloneElement(item.icon, { size: 24 })}</div>
                         <div>
                            <h4 className="font-bold text-slate-800 mb-1">{item.title}</h4>
                            <p className="text-xs">{item.desc}</p>
                         </div>
                      </div>
                    ))}
                 </div>
                 <div className="mt-12 pt-8 border-t border-slate-200">
                    <Link to="/login" className="btn btn-primary shadow-lg">Comenzar Ahora</Link>
                 </div>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                 <div className="card p-12 bg-blue text-white flex flex-col items-center justify-center rotate-[-3deg]">
                    <span className="text-5xl font-black mb-2">0$</span>
                    <span className="text-xs uppercase font-bold tracking-widest opacity-80">Costo Fijo</span>
                 </div>
                 <div className="card p-12 bg-orange text-white flex flex-col items-center justify-center rotate-[3deg] mt-12">
                    <span className="text-5xl font-black mb-2">24h</span>
                    <span className="text-xs uppercase font-bold tracking-widest opacity-80">Procesamiento</span>
                 </div>
              </div>
           </div>
        </section>

        {/* WAREHOUSE SECTION */}
        <section className="section bg-white border-y border-slate-100">
           <div className="container">
              <div className="card lg:p-12 p-20 grid lg:grid-cols-1 grid-cols-2 gap-20 items-center shadow-2xl border-none">
                 <div>
                    <div className="flex items-center gap-2 text-blue font-bold mb-4">
                       <Package size={20} />
                       Tu Dirección en Miami
                    </div>
                    <h2 className="mb-6">Cómo enviar tus pedidos</h2>
                    <p className="mb-10 text-slate-600">Usa estos datos exactos al hacer el checkout en tiendas como Amazon, Walmart o eBay.</p>
                    
                    <div className="space-y-4">
                       {[
                         { label: "Address Line 1", val: "7768 NW 64th Street" },
                         { label: "City / State / ZIP", val: "Miami, FL 33166" },
                         { label: "Suite / APT", val: "Tus nombres + LK-XXXXX" }
                       ].map((line, i) => (
                         <div key={i} className="flex justify-between items-center p-4 bg-slate-50 rounded-xl border border-slate-100">
                            <div>
                               <span className="text-[10px] font-bold text-muted uppercase tracking-widest block mb-1">{line.label}</span>
                               <span className="font-bold text-slate-800">{line.val}</span>
                            </div>
                            <button className="text-blue hover:text-primary-dark transition-colors">
                               <Copy size={18} />
                            </button>
                         </div>
                       ))}
                    </div>
                 </div>
                 
                 <div className="relative">
                    <div className="w-full aspect-square bg-slate-50 rounded-full flex items-center justify-center border-2 border-dashed border-slate-200">
                       <img src="/enterprise-hero.png" alt="Warehouse Premium" className="w-[80%] h-[80%] object-cover rounded-3xl shadow-2xl animate-float" />
                    </div>
                    <div className="absolute top-10 right-10 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-4 border border-slate-50">
                       <Truck className="text-blue" />
                       <div className="text-left">
                          <p className="text-xs font-bold text-slate-500 mb-0">Envío en camino</p>
                          <p className="text-sm font-black text-slate-800">LK-9283-COL</p>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="bg-slate-900 text-white py-24">
         <div className="container grid lg:grid-cols-2 grid-cols-4 gap-20">
            <div className="col-span-1 lg:col-span-1">
               <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 rounded-lg bg-blue flex items-center justify-center font-black text-white text-xl shadow-lg">L</div>
                  <span className="text-2xl font-black text-white tracking-tight italic">Locker<span className="text-blue not-italic">US</span></span>
               </div>
               <p className="text-sm text-slate-400 mb-8 max-w-xs leading-relaxed">
                  Exportamos la excelencia de la logística americana a la comodidad de tu hogar en Colombia. Seguridad, rapidez y transparencia en cada paquete.
               </p>
               <div className="flex gap-4">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-blue transition-colors cursor-pointer">
                       <ExternalLink size={18} />
                    </div>
                  ))}
               </div>
            </div>

            <div className="flex flex-col gap-6">
               <h4 className="text-xs font-black uppercase tracking-widest text-slate-500">Servicios</h4>
               <ul className="space-y-4 text-sm text-slate-300">
                  <li><a href="#" className="hover:text-white transition-colors">Casillero Personal</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Envíos Corporativos</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Agrupación de Paquetes</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Seguro de Carga</a></li>
               </ul>
            </div>

            <div className="flex flex-col gap-6">
               <h4 className="text-xs font-black uppercase tracking-widest text-slate-500">Soporte</h4>
               <ul className="space-y-4 text-sm text-slate-300">
                  <li><a href="#" className="hover:text-white transition-colors">Centro de Ayuda</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Preguntas Frecuentes</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Contáctenos</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Tracking Directo</a></li>
               </ul>
            </div>

            <div className="flex flex-col gap-6">
               <h4 className="text-xs font-black uppercase tracking-widest text-slate-500">Legal</h4>
               <ul className="space-y-4 text-sm text-slate-300">
                  <li><a href="#" className="hover:text-white transition-colors">Términos y Condiciones</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Política de Privacidad</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">DIAN & Aduanas</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Contratos</a></li>
               </ul>
            </div>
         </div>
         
         <div className="container mt-20 pt-8 border-t border-white/5 flex flex-wrap justify-between items-center text-[10px] font-bold text-slate-500 uppercase tracking-widest">
            <span>© 2026 LockerUS Logistics SAS. Todos los derechos reservados.</span>
            <div className="flex gap-8">
               <span>Hecho con ❤️ para Colombia</span>
            </div>
         </div>
      </footer>
    </div>
  );
}

export default Landing;
