import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Scale, DollarSign, ArrowRight, Package, UserPlus, ShoppingCart, Truck, CheckCircle, Clock, CreditCard, ExternalLink, Copy, HelpCircle, Globe, Zap, Heart } from 'lucide-react';

const Calculator = () => {
  const [weight, setWeight] = useState(1);
  const [value, setValue] = useState(100);
  const TRM = 4100;
  const SHIPPING_RATE = 3.5;

  const totalUSD = weight * SHIPPING_RATE;
  const totalCOP = totalUSD * TRM;

  return (
    <div className="jewel-box scroll-reveal">
      <div className="flex justify-between items-center mb-6">
        <h3 className="flex items-center gap-2 m-0 text-xl font-black">
          <Scale className="text-[#4f46e5]" size={22} /> 
          Cotizador
        </h3>
        <span className="badge-p">Promo: $3.5/lb</span>
      </div>
      
      <div className="space-y-5">
        <div>
          <label className="text-[10px] font-black uppercase text-slate-400 mb-2 block tracking-widest">Peso Estimado</label>
          <div className="relative group">
            <input 
              type="number" 
              value={weight} 
              onChange={(e) => setWeight(Math.max(1, e.target.value))}
              className="w-full bg-slate-50 border-2 border-transparent group-focus-within:border-[#4f46e5]/20 rounded-xl p-4 text-xl font-bold outline-none transition-all"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-black text-sm">LB</span>
          </div>
        </div>

        <div>
           <label className="text-[10px] font-black uppercase text-slate-400 mb-2 block tracking-widest">Valor Comercial</label>
           <div className="relative group">
             <input 
               type="number" 
               value={value} 
               onChange={(e) => setValue(Math.max(1, e.target.value))}
               className="w-full bg-slate-50 border-2 border-transparent group-focus-within:border-[#4f46e5]/20 rounded-xl p-4 text-xl font-bold outline-none transition-all"
             />
             <DollarSign size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" />
           </div>
        </div>

        <div className="bg-[#4f46e5]/5 rounded-2xl p-6 border border-[#4f46e5]/10">
           <div className="flex justify-between items-baseline mb-4">
              <span className="text-sm font-bold text-slate-500">Total a Pagar</span>
              <div className="text-right">
                 <h2 className="text-[#4f46e5] text-4xl font-black mb-0">${totalUSD.toFixed(2)} <span className="text-xs font-bold opacity-60">USD</span></h2>
                 <p className="text-sm font-bold text-slate-400 m-0">≈ ${totalCOP.toLocaleString()} COP</p>
              </div>
           </div>
           
           <Link to="/login" className="btn-premium btn-premium-p w-full shadow-2xl mt-4">
             OBTENER MI CASILLERO <ArrowRight size={18} />
           </Link>
        </div>
      </div>
    </div>
  );
};

function Landing() {
  const [tracking, setTracking] = useState('');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white selection:bg-[#4f46e5]/10 selection:text-[#4f46e5]">
      {/* Premium Navbar */}
      <header className={`nav-p transition-all duration-500 ${scrolled ? 'h-[70px] shadow-lg' : ''}`}>
        <div className="container h-full flex justify-between items-center">
           <Link to="/" className="flex items-center gap-3 no-underline group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#4f46e5] to-[#818cf8] flex items-center justify-center font-black text-white text-xl shadow-premium group-hover:rotate-6 transition-transform">L</div>
              <span className="text-2xl font-black text-slate-900 tracking-tighter">Locker<span className="text-gradient">US</span></span>
           </Link>
           
           <nav className="hidden lg:flex items-center gap-10 text-[13px] font-extrabold uppercase tracking-widest text-slate-500">
              <a href="#proceso" className="hover:text-[#4f46e5] transition-colors">Proceso</a>
              <a href="#beneficios" className="hover:text-[#4f46e5] transition-colors">Beneficios</a>
              <a href="#bodega" className="hover:text-[#4f46e5] transition-colors">Mí Bodega</a>
           </nav>

           <div className="flex items-center gap-6">
              <Link to="/login" className="text-xs font-black uppercase tracking-widest text-slate-500 hover:text-[#4f46e5] transition-colors">Acceso</Link>
              <Link to="/login" className="btn-premium btn-premium-p !py-3 !px-6 text-xs shadow-xl">COMENZAR</Link>
           </div>
        </div>
      </header>

      <main>
        {/* HERO - IMMERSIVE GRID */}
        <section className="section bg-grid relative overflow-hidden flex items-center min-h-[90vh]">
           <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white via-transparent to-white pointer-events-none"></div>
           
           <div className="container grid lg:grid-cols-1 grid-cols-2 gap-24 items-center relative z-10">
              <div className="scroll-reveal">
                 <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#4f46e5]/5 rounded-full border border-[#4f46e5]/10 mb-8">
                    <Zap size={14} className="text-[#4f46e5]" />
                    <span className="font-extrabold text-[10px] text-[#4f46e5] uppercase tracking-[0.2em]">Logística de Alto Alcance</span>
                 </div>
                 <h1 className="mb-8">Importa con <span className="text-gradient">Excelencia</span> Directo a tu Puerta.</h1>
                 <p className="text-xl mb-12 text-slate-500 leading-relaxed max-w-lg font-medium">
                    Transformamos tu experiencia de compra en USA. Seguridad certificada, tarifas competitivas y la velocidad que tu negocio o estilo de vida exige.
                 </p>
                 
                 <div className="flex flex-col gap-8">
                    <div className="flex items-center gap-5">
                       <div className="flex -space-x-4">
                          {[1,2,3,4].map(i => <div key={i} className="w-12 h-12 rounded-full border-4 border-white bg-slate-100 shadow-sm overflow-hidden"><img src={`https://i.pravatar.cc/100?u=${i}`} alt="User" /></div>)}
                       </div>
                       <div>
                          <p className="text-slate-800 font-black mb-0 leading-none">Aprobado por +34k usuarios</p>
                          <div className="flex gap-0.5 mt-1">
                             {[1,2,3,4,5].map(i => <Heart key={i} size={12} className="fill-[#10b981] text-[#10b981]" />)}
                          </div>
                       </div>
                    </div>
                    
                    <div className="flex p-1.5 bg-white border border-slate-200 rounded-2xl shadow-premium max-w-md group focus-within:ring-4 ring-[#4f46e5]/5 transition-all">
                       <input 
                        type="text" 
                        placeholder="Número de Guía (LK-XXXXX)..." 
                        className="flex-1 bg-transparent border-none px-4 font-bold text-slate-600 outline-none"
                        value={tracking}
                        onChange={(e) => setTracking(e.target.value)}
                       />
                       <button className="btn-premium btn-premium-p !py-3 !px-8 text-xs">RASTREAR</button>
                    </div>
                 </div>
              </div>

              <div className="relative">
                 <div className="absolute -top-20 -right-20 w-80 h-80 bg-[#4f46e5]/10 rounded-full blur-[100px] -z-10 animate-pulse"></div>
                 <Calculator />
              </div>
           </div>
        </section>

        {/* TRUST MARQUEE */}
        <div className="py-20 border-y border-slate-50 bg-white">
           <div className="container">
              <p className="text-center text-[10px] font-black uppercase tracking-[0.3em] text-slate-300 mb-12">Aliados Operativos Globales</p>
              <div className="flex flex-wrap justify-between gap-12 items-center grayscale opacity-30 hover:opacity-100 transition-opacity duration-700">
                 <img src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" className="h-6" alt="Amazon" />
                 <img src="https://upload.wikimedia.org/wikipedia/commons/1/1b/EBay_logo.svg" className="h-10" alt="Ebay" />
                 <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" className="h-7" alt="Apple" />
                 <img src="https://upload.wikimedia.org/wikipedia/commons/c/ca/Walmart_logo.svg" className="h-7" alt="Walmart" />
                 <img src="https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg" className="h-5" alt="Nike" />
              </div>
           </div>
        </div>

        {/* PROCESS WITH DEPTH */}
        <section id="proceso" className="section bg-soft relative">
           <div className="container">
              <div className="text-center mb-24 scroll-reveal">
                 <span className="badge-p mb-4">Metodología Elite</span>
                 <h2 className="m-0">Logística de precisón en 3 actos</h2>
              </div>

              <div className="grid md:grid-cols-1 grid-cols-3 gap-10">
                 {[
                   { icon: <UserPlus />, color: 'from-indigo-500 to-indigo-600', title: "Apertura de Suite", desc: "Obtén tu dirección premium en Miami con Suite ID privada y sistema de notificaciones." },
                   { icon: <ShoppingCart />, color: 'from-emerald-500 to-emerald-600', title: "Compras USA", desc: "Compra en tus tiendas favoritas y nosotros consolidamos tus paquetes para ahorrar costos." },
                   { icon: <Truck />, color: 'from-amber-500 to-amber-600', title: "Entrega Final", desc: "Despacho express a cualquier rincón de Colombia con trazabilidad GPS total." }
                 ].map((step, i) => (
                   <div key={i} className="card-premium scroll-reveal group h-full" style={{ animationDelay: `${i * 0.2}s` }}>
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center text-white mb-8 shadow-lg group-hover:scale-110 transition-transform`}>
                         {React.cloneElement(step.icon, { size: 28 })}
                      </div>
                      <h3 className="mb-4 text-slate-900">{step.title}</h3>
                      <p className="m-0 text-sm font-medium leading-relaxed">{step.desc}</p>
                      <div className="mt-8 flex items-center gap-2 text-[#4f46e5] font-black text-[10px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                         Saber más <ArrowRight size={14} />
                      </div>
                   </div>
                 ))}
              </div>
           </div>
        </section>

        {/* BENEFITS - THE POWER SECTION */}
        <section id="beneficios" className="section bg-white overflow-hidden">
           <div className="container grid lg:grid-cols-1 grid-cols-2 gap-24 items-center">
              <div className="scroll-reveal">
                 <h2 className="mb-8">Diseñado para la <span className="text-gradient">Confianza Total.</span></h2>
                 <div className="space-y-8">
                    {[
                      { icon: <ShieldCheck />, title: "Seguridad Grado Bancario", desc: "Tus compras están protegidas por pólizas internacionales desde el minuto uno." },
                      { icon: <Clock />, title: "Velocidad Operativa 24/7", desc: "Equipo en Miami procesando ingresos incluso mientras duermes." },
                      { icon: <Globe />, title: "Cobertura Nacional", desc: "Desde grandes ciudades hasta municipios remotos, LockerUS llega." },
                      { icon: <CreditCard />, title: "Finanzas Transparentes", desc: "Sin costos ocultos. Lo que ves en el cotizador es lo que pagas." }
                    ].map((item, i) => (
                      <div key={i} className="flex gap-6 hover-lift">
                         <div className="w-12 h-12 rounded-xl bg-[#4f46e5]/5 flex-shrink-0 flex items-center justify-center text-[#4f46e5]">{React.cloneElement(item.icon, { size: 24 })}</div>
                         <div>
                            <h4 className="font-bold text-slate-900 mb-1">{item.title}</h4>
                            <p className="text-sm m-0 leading-relaxed font-medium">{item.desc}</p>
                         </div>
                      </div>
                    ))}
                 </div>
              </div>
              
              <div className="relative scroll-reveal">
                 <div className="card-premium !p-0 overflow-hidden shadow-2xl rotate-2">
                    <img src="/enterprise-hero.png" alt="Warehouse" className="w-full h-[500px] object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-transparent"></div>
                    <div className="absolute bottom-10 left-10 text-white">
                       <span className="badge-p border-none bg-white/20 text-white backdrop-blur-md mb-4 block w-fit italic">Miami Office</span>
                       <h3 className="text-white text-3xl mb-2">Presencia Real en USA</h3>
                       <p className="text-white/70 m-0 text-sm font-bold uppercase tracking-widest">7768 NW 64th Street, Doral FL</p>
                    </div>
                 </div>
                 <div className="absolute -bottom-10 -left-10 glass-v2 p-8 rounded-3xl -rotate-3 border border-indigo-100/50">
                    <div className="flex items-center gap-4 mb-4">
                       <div className="w-12 h-12 rounded-full bg-emerald-500 flex items-center justify-center text-white"><Package size={24} /></div>
                       <div>
                          <p className="text-[10px] font-black text-slate-400 m-0 uppercase">Servicio Directo</p>
                          <p className="text-lg font-black text-slate-800 m-0">99.8% Eficacia</p>
                       </div>
                    </div>
                    <p className="text-xs font-bold text-slate-500 m-0">Paquetes entregados <span className="text-emerald-500">A Tiempo</span></p>
                 </div>
              </div>
           </div>
        </section>

        {/* WAREHOUSE - DATA JEWEL */}
        <section id="bodega" className="section bg-soft">
           <div className="container">
              <div className="card-premium lg:p-10 p-24 shadow-2xl border-none bg-grid relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-r from-transparent to-white pointer-events-none"></div>
                 <div className="grid lg:grid-cols-1 grid-cols-2 gap-20 items-center relative z-10">
                    <div>
                       <div className="flex items-center gap-2 text-[#4f46e5] font-black text-xs uppercase tracking-[0.2em] mb-6">
                          <Globe size={16} />
                          Identidad Operativa
                       </div>
                       <h2 className="mb-8">Tus Datos de Envío <span className="text-gradient">Premium</span></h2>
                       <p className="mb-12 text-slate-500 font-medium leading-relaxed">Configura tus tiendas favoritas con nuestra dirección física en Miami. Cada dato es crucial para garantizar el ingreso a tu casillero.</p>
                       
                       <div className="space-y-4">
                          {[
                            { label: "Address Line 1", val: "7768 NW 64th Street", icon: <Package size={14} /> },
                            { label: "City / State / ZIP", val: "Miami, FL 33166", icon: <Globe size={14} /> },
                            { label: "Suite / APT", val: "Nombres + Suite ID (LK-XXXXX)", icon: <UserPlus size={14} /> }
                          ].map((line, i) => (
                            <div key={i} className="flex justify-between items-center p-5 bg-white rounded-2xl border border-slate-100 shadow-sm group hover:border-[#4f46e5]/30 transition-all cursor-pointer">
                               <div className="flex items-center gap-4">
                                  <div className="text-[#4f46e5] opacity-40 group-hover:opacity-100">{line.icon}</div>
                                  <div>
                                     <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-0.5">{line.label}</span>
                                     <span className="font-bold text-slate-800 text-lg">{line.val}</span>
                                  </div>
                               </div>
                               <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-[#4f46e5]/10 group-hover:text-[#4f46e5] transition-all">
                                  <Copy size={18} />
                               </div>
                            </div>
                          ))}
                       </div>
                    </div>
                    
                    <div className="relative">
                       <div className="w-full aspect-square bg-[#4f46e5]/5 rounded-full flex items-center justify-center border-2 border-dashed border-[#4f46e5]/10 animate-spin-slow">
                       </div>
                       <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-2/3 h-2/3 bg-white rounded-3xl shadow-premium flex items-center justify-center p-8 rotate-3 hover:rotate-0 transition-transform duration-700">
                             <div className="text-center">
                                <div className="w-20 h-20 bg-[#4f46e5]/10 rounded-2xl flex items-center justify-center text-[#4f46e5] mx-auto mb-6">
                                   <Truck size={40} />
                                </div>
                                <h4 className="font-black text-slate-900 m-0 text-xl">Bodega Activa</h4>
                                <p className="text-xs font-bold text-slate-400 mt-2 uppercase">Procesamiento Prioritario</p>
                             </div>
                          </div>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </section>
      </main>

      {/* FOOTER PREMIUM */}
      <footer className="bg-[#0f172a] text-white pt-24 pb-12">
         <div className="container grid lg:grid-cols-2 grid-cols-4 gap-20">
            <div className="col-span-1 lg:col-span-1">
               <Link to="/" className="flex items-center gap-3 no-underline mb-10">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#4f46e5] to-[#818cf8] flex items-center justify-center font-black text-white text-xl shadow-premium">L</div>
                  <span className="text-2xl font-black text-white tracking-tighter">Locker<span className="text-gradient">US</span></span>
               </Link>
               <p className="text-sm text-slate-400 mb-10 max-w-xs leading-relaxed font-medium">
                  Líderes en logística transfronteriza, conectando las mejores marcas de USA con la puerta de tu hogar en Colombia. Compromiso, integridad y velocidad.
               </p>
               <div className="flex gap-4">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#4f46e5] transition-all cursor-pointer">
                       <ExternalLink size={18} className="opacity-60" />
                    </div>
                  ))}
               </div>
            </div>

            <div className="flex flex-col gap-6">
               <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#4f46e5]">Soluciones</h4>
               <ul className="space-y-4 text-sm text-slate-400 font-bold">
                  <li><a href="#" className="hover:text-white transition-colors">Casillero Individual</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Importación Pyme</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Agrupación E-commerce</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Seguro de Mercancía</a></li>
               </ul>
            </div>

            <div className="flex flex-col gap-6">
               <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#4f46e5]">Compañía</h4>
               <ul className="space-y-4 text-sm text-slate-400 font-bold">
                  <li><a href="#" className="hover:text-white transition-colors">Sobre Nosotros</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Tarifas 2026</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Ubícanos en Miami</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Contáctenos</a></li>
               </ul>
            </div>

            <div className="flex flex-col gap-6">
               <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#4f46e5]">Legal</h4>
               <ul className="space-y-4 text-sm text-slate-400 font-bold">
                  <li><a href="#" className="hover:text-white transition-colors">Aviso de Privacidad</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Términos del Servicio</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Normatividad DIAN</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Documentos</a></li>
               </ul>
            </div>
         </div>
         
         <div className="container mt-24 pt-10 border-t border-white/5 flex flex-wrap justify-between items-center text-[10px] font-black text-slate-600 uppercase tracking-widest">
            <span>© 2026 LockerUS International Group. All rights reserved.</span>
            <div className="flex gap-8">
               <span className="flex items-center gap-2">PLATAFORMA CERTIFICADA <ShieldCheck size={14} className="text-[#10b981]" /></span>
            </div>
         </div>
      </footer>
    </div>
  );
}

export default Landing;
