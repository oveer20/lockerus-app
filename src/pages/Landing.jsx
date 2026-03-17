import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';

function Landing() {
  return (
    <div className="flex-col h-full bg-slate-900">
      <header className="glass py-4 z-10 sticky top-0">
        <div className="container flex justify-between items-center">
          <h1 className="text-xl font-bold text-gradient">LockerUS</h1>
          <nav className="flex gap-4">
            <Link to="/login" className="btn btn-secondary">Inicia Sesión</Link>
            <Link to="/login" className="btn btn-primary">Crear Casillero</Link>
          </nav>
        </div>
      </header>

      <main className="container py-24 flex-col items-center text-center">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="text-left animate-slide-up">
            <h1 className="text-5xl md:text-6xl font-black mb-6 leading-tight slide-up">
              Tu propio <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">Casillero</span> en Miami, entregas en todo Colombia.
            </h1>
            <p className="text-lg text-muted mb-8 max-w-xl slide-up" style={{ animationDelay: '0.1s' }}>
              Compra en Amazon, eBay, Nike y más tiendas de USA. Nosotros recibimos tus paquetes y los enviamos a la puerta de tu casa. Pagos locales con Nequi o PSE.
            </p>
            <div className="mt-8 flex gap-4">
              <Link to="/login" className="btn btn-primary">Empieza Gratis</Link>
              <a href="#como-funciona" className="btn btn-glass">¿Cómo funciona?</a>
            </div>
            
            <div className="mt-12 flex gap-4 text-sm text-muted">
              <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-success"></div>Entregas en 3-5 días</div>
              <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-success"></div>Soporte 24/7</div>
            </div>
          </div>
          
          <div className="relative animate-float">
            <div className="absolute inset-0 bg-primary opacity-20 blur-3xl rounded-full"></div>
            <img src="/hero-shipping.png" alt="Shipping concept" className="relative z-10 w-full rounded-2xl border border-[rgba(255,255,255,0.1)] shadow-glow" />
          </div>
        </div>
      </main>

      {/* Calculator Section */}
      <section className="py-20 relative z-10">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Calculadora de Envíos</h2>
            <p className="text-muted">Estima el costo aproximado de tu próximo envío desde Miami a Colombia.</p>
          </div>
          
          <Calculator />
        </div>
      </section>

      {/* Info Section (DIAN) */}
      <section className="py-16 relative z-10 border-t border-[rgba(255,255,255,0.05)] bg-[rgba(0,0,0,0.2)]">
        <div className="container mx-auto px-6 max-w-6xl">
          <h2 className="text-2xl font-bold mb-8 text-center"><ShieldCheck className="inline mr-2 text-primary" /> Información Importante DIAN</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="glass-panel p-6">
              <h3 className="font-bold mb-2">0% IVA hasta $200 USD</h3>
              <p className="text-sm text-muted">Aprovecha el Tratado de Libre Comercio. Las compras con valor declarado inferior a $200 dólares están exentas del pago de IVA (19%).</p>
            </div>
            <div className="glass-panel p-6">
              <h3 className="font-bold mb-2">Límite de Unidades</h3>
              <p className="text-sm text-muted">Para ser considerado envío urgente, no envíes más de 6 artículos de la misma clase (ej. 6 camisetas idénticas) por paquete.</p>
            </div>
            <div className="glass-panel p-6">
              <h3 className="font-bold mb-2">Topes Aduaneros</h3>
              <p className="text-sm text-muted">El peso máximo por paquete es de 110 Libras (50 Kg) y el valor declarado no debe superar los $2000 dólares americanos.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
    </div>
  );
}

export default Landing;
