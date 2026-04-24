import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Scale, DollarSign, ArrowRight, Package, UserPlus, ShoppingCart, Truck, CheckCircle, Clock, Star, Phone, MessageCircle, Verified, ChevronDown, MapPin, Mail, X } from 'lucide-react';

const WA_NUMBER = '573152597199';

const WhatsAppFloating = () => (
  <a
    href={`https://wa.me/${WA_NUMBER}`}
    target="_blank"
    rel="noopener noreferrer"
    className="fixed bottom-6 right-6 z-50"
    style={{
      background: '#25D366',
      width: '60px',
      height: '60px',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 4px 20px rgba(37, 211, 102, 0.4)',
      animation: 'float 3s ease-in-out infinite'
    }}
  >
    <MessageCircle size={28} fill="white" color="white" />
    <style>{`@keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }`}</style>
  </a>
);

const Calculator = () => {
  const [weight, setWeight] = useState(1);
  const [value, setValue] = useState(100);
  const TRM = 4100;
  const SHIPPING_RATE = 2.99;
  const INSURANCE_RATE = 0.05;

  const shippingCost = weight * SHIPPING_RATE;
  const insurance = value * INSURANCE_RATE;
  const totalUSD = shippingCost + insurance;
  const totalCOP = totalUSD * TRM;
  const dutyFree = value <= 200;

  return (
    <div style={{
      background: 'white',
      borderRadius: '24px',
      padding: '40px',
      boxShadow: '0 25px 50px -12px rgba(0,0,0,0.1)',
      border: '1px solid #e2e8f0'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <h3 style={{ display: 'flex', alignItems: 'center', gap: '12px', margin: 0, fontSize: '20px', fontWeight: '800', color: '#0f172a' }}>
          <Scale color="#4f46e5" size={24} />
          Cotizador
        </h3>
        <span style={{ background: '#dcfce7', color: '#166534', padding: '6px 14px', borderRadius: '20px', fontSize: '12px', fontWeight: '700' }}>
          $2.99/lb
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div>
          <label style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px' }}>
            Peso (libras)
          </label>
          <div style={{ position: 'relative' }}>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(Math.max(1, e.target.value))}
              style={{
                width: '100%',
                background: '#f8fafc',
                border: '2px solid #e2e8f0',
                borderRadius: '12px',
                padding: '16px',
                fontSize: '20px',
                fontWeight: '700',
                outline: 'none'
              }}
            />
            <span style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', fontWeight: '700', fontSize: '14px' }}>LB</span>
          </div>
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px' }}>
            Valor (USD)
          </label>
          <div style={{ position: 'relative' }}>
            <input
              type="number"
              value={value}
              onChange={(e) => setValue(Math.max(1, e.target.value))}
              style={{
                width: '100%',
                background: '#f8fafc',
                border: '2px solid #e2e8f0',
                borderRadius: '12px',
                padding: '16px',
                fontSize: '20px',
                fontWeight: '700',
                outline: 'none'
              }}
            />
            <DollarSign size={18} style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
          </div>
          <p style={{ fontSize: '12px', marginTop: '8px', color: dutyFree ? '#166534' : '#d97706', fontWeight: '600' }}>
            {dutyFree ? '✓ Libre de impuestos' : '⚠️ Aplica impuestos (10% + 19%)'}
          </p>
        </div>

        <div style={{ background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)', borderRadius: '16px', padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '20px' }}>
            <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: '14px', fontWeight: '600' }}>Total</span>
            <div style={{ textAlign: 'right' }}>
              <h2 style={{ color: 'white', fontSize: '36px', fontWeight: '800', margin: 0 }}>${totalUSD.toFixed(2)} <span style={{ fontSize: '12px', fontWeight: '600', opacity: 0.6 }}>USD</span></h2>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px', fontWeight: '600', margin: 0 }}>≈ ${totalCOP.toLocaleString()} COP</p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
            <div style={{ flex: 1, background: 'rgba(255,255,255,0.2)', borderRadius: '12px', padding: '12px', textAlign: 'center' }}>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '10px', fontWeight: '700', textTransform: 'uppercase' }}>Flete</p>
              <p style={{ color: 'white', fontSize: '18px', fontWeight: '800' }}>${shippingCost.toFixed(2)}</p>
            </div>
            <div style={{ flex: 1, background: 'rgba(255,255,255,0.2)', borderRadius: '12px', padding: '12px', textAlign: 'center' }}>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '10px', fontWeight: '700', textTransform: 'uppercase' }}>Seguro</p>
              <p style={{ color: 'white', fontSize: '18px', fontWeight: '800' }}>${insurance.toFixed(2)}</p>
            </div>
          </div>

          <Link
            to="/login"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              background: 'white',
              color: '#4f46e5',
              padding: '16px',
              borderRadius: '12px',
              fontWeight: '800',
              fontSize: '14px',
              textDecoration: 'none'
            }}
          >
            OBTENER CASILLERO <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
};

const Tariffs = () => {
  const rates = [
    { weight: '1-4 lb', price: '$19.00', time: '3-5 días', badge: 'Popular' },
    { weight: '5-10 lb', price: '$2.99/lb', time: '4-6 días', badge: null },
    { weight: '11-25 lb', price: '$2.75/lb', time: '5-7 días', badge: null },
    { weight: '26-50 lb', price: '$2.50/lb', time: '6-8 días', badge: 'Mejor Valor' },
    { weight: '50+ lb', price: '$2.25/lb', time: '7-10 días', badge: null },
  ];

  return (
    <section style={{ padding: '80px 0', background: '#f8fafc' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <span style={{ background: '#e0e7ff', color: '#4f46e5', padding: '8px 16px', borderRadius: '20px', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase' }}>
            Tarifas 2026
          </span>
          <h2 style={{ fontSize: '36px', fontWeight: '800', color: '#0f172a', margin: '24px 0 16px 0' }}>
            Precios Transparentes
          </h2>
          <p style={{ color: '#64748b', fontSize: '18px', maxWidth: '500px', margin: '0 auto', fontWeight: '500' }}>
            Lo que ves es lo que pagas. Sin costos ocultos.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '48px' }}>
          {rates.map((rate, i) => (
            <div key={i} style={{
              position: 'relative',
              background: 'white',
              borderRadius: '20px',
              padding: '24px',
              boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
              border: rate.badge ? '2px solid #4f46e5' : '1px solid #e2e8f0',
              transition: 'all 0.3s'
            }}>
              {rate.badge && (
                <span style={{
                  position: 'absolute',
                  top: '-12px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  background: '#4f46e5',
                  color: 'white',
                  padding: '4px 12px',
                  borderRadius: '20px',
                  fontSize: '11px',
                  fontWeight: '700'
                }}>
                  {rate.badge}
                </span>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                <div>
                  <p style={{ color: '#94a3b8', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', margin: '0 0 4px 0' }}>{rate.weight}</p>
                  <p style={{ fontSize: '28px', fontWeight: '800', color: '#0f172a', margin: 0 }}>{rate.price}</p>
                </div>
                <Clock size={20} color="#4f46e5" />
              </div>
              <p style={{ color: '#64748b', fontSize: '14px', fontWeight: '500', margin: 0 }}>Entrega en {rate.time}</p>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '24px' }}>
          {['Seguro incluido', 'Consolidación gratis', 'Trazabilidad total', 'Sin costos ocultos'].map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#475569', fontWeight: '600' }}>
              <CheckCircle size={18} color="#22c55e" />
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Coverage = () => {
  const cities = [
    { city: 'Bogotá', time: '3-4 días' },
    { city: 'Medellín', time: '3-5 días' },
    { city: 'Cali', time: '3-5 días' },
    { city: 'Barranquilla', time: '4-6 días' },
    { city: 'Cartagena', time: '4-6 días' },
    { city: 'Bucaramanga', time: '4-6 días' },
    { city: 'Pereira', time: '4-6 días' },
    { city: 'Manizales', time: '4-6 días' },
    { city: 'Cúcuta', time: '5-7 días' },
    { city: 'Ibagué', time: '5-7 días' },
    { city: 'Pasto', time: '5-7 días' },
    { city: 'Villavicencio', time: '3-4 días' },
  ];

  return (
    <section style={{ padding: '80px 0', background: 'white' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <span style={{ background: '#dbeafe', color: '#1d4ed8', padding: '8px 16px', borderRadius: '20px', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase' }}>
            Cobertura Nacional
          </span>
          <h2 style={{ fontSize: '36px', fontWeight: '800', color: '#0f172a', margin: '24px 0 16px 0' }}>
            Envíos a Toda Colombia
          </h2>
          <p style={{ color: '#64748b', fontSize: '18px', maxWidth: '500px', margin: '0 auto', fontWeight: '500' }}>
            Entregamos en más de 50 ciudades
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '12px' }}>
          {cities.map((c, i) => (
            <div key={i} style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '16px 20px',
              background: '#f8fafc',
              borderRadius: '12px',
              transition: 'background 0.3s'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <MapPin size={18} color="#4f46e5" />
                <span style={{ fontWeight: '700', color: '#334155' }}>{c.city}</span>
              </div>
              <p style={{ color: '#94a3b8', fontSize: '12px', margin: 0 }}>{c.time}</p>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <a
            href={`https://wa.me/${WA_NUMBER}?text=Hola,%20quiero%20saber%20si%20envían%20a%20mi%20ciudad`}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: '#25D366',
              color: 'white',
              padding: '14px 28px',
              borderRadius: '12px',
              fontWeight: '700',
              textDecoration: 'none'
            }}
          >
            <MessageCircle size={20} />
            Consultar otra ciudad
          </a>
        </div>
      </div>
    </section>
  );
};

const FAQ = () => {
  const faqs = [
    { q: '¿El casillero tiene costo mensual?', a: 'No. El casillero es 100% gratis. Solo pagas cuando envías tus paquetes.' },
    { q: '¿Cuánto tardan en llegar?', a: '3-10 días hábiles dependiendo del peso y la ciudad.' },
    { q: '¿El seguro está incluido?', a: 'Sí, todas las tarifas incluyen seguro básico.' },
    { q: '¿Puedo consolidar varios paquetes?', a: '¡Sí! Consolidamos hasta 5 paquetes sin costo adicional.' },
    { q: '¿Qué pasa si mi paquete se pierde?', a: 'Te devolvemos el valor declarado o reponemos el artículo.' },
    { q: '¿Cómo calculo los impuestos?', a: 'Si el valor es menor a $200 USD, está libre de impuestos.' },
  ];

  const [open, setOpen] = useState(null);

  return (
    <section style={{ padding: '80px 0', background: '#f8fafc' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <span style={{ background: '#e0e7ff', color: '#4f46e5', padding: '8px 16px', borderRadius: '20px', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase' }}>
            FAQ
          </span>
          <h2 style={{ fontSize: '36px', fontWeight: '800', color: '#0f172a', margin: '24px 0 16px 0' }}>
            Preguntas Frecuentes
          </h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {faqs.map((faq, i) => (
            <div key={i} style={{ background: 'white', borderRadius: '16px', overflow: 'hidden', border: '1px solid #e2e8f0' }}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                style={{
                  width: '100%',
                  padding: '20px 24px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
              >
                <span style={{ fontWeight: '700', color: '#334155', fontSize: '16px' }}>{faq.q}</span>
                <ChevronDown
                  size={20}
                  color="#94a3b8"
                  style={{ transform: open === i ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }}
                />
              </button>
              {open === i && (
                <div style={{ padding: '0 24px 20px 24px', color: '#64748b', fontWeight: '500' }}>
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CTA = () => (
  <section style={{
    padding: '80px 0',
    background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
    position: 'relative',
    overflow: 'hidden'
  }}>
    <div style={{
      position: 'absolute',
      inset: 0,
      opacity: 0.1,
      backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
      backgroundSize: '32px 32px'
    }} />
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 24px', textAlign: 'center', position: 'relative', zIndex: 1 }}>
      <h2 style={{ fontSize: '36px', fontWeight: '800', color: 'white', margin: '0 0 16px 0' }}>
        ¿Listo para recibir tus compras de USA?
      </h2>
      <p style={{ color: '#94a3b8', fontSize: '18px', marginBottom: '32px', fontWeight: '500' }}>
        Regístrate gratis en 30 segundos. Sin tarjeta de crédito.
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '16px' }}>
        <Link
          to="/register"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: '#4f46e5',
            color: 'white',
            padding: '16px 32px',
            borderRadius: '12px',
            fontWeight: '800',
            fontSize: '16px',
            textDecoration: 'none'
          }}
        >
          <UserPlus size={20} />
          Regístrate Gratis
        </Link>
        <a
          href={`https://wa.me/${WA_NUMBER}`}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(255,255,255,0.1)',
            color: 'white',
            padding: '16px 32px',
            borderRadius: '12px',
            fontWeight: '800',
            fontSize: '16px',
            textDecoration: 'none',
            border: '1px solid rgba(255,255,255,0.2)'
          }}
        >
          <MessageCircle size={20} />
          Escríbenos
        </a>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer style={{ background: '#0f172a', color: 'white', padding: '60px 0 30px 0' }}>
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '48px', marginBottom: '48px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: '800',
              fontSize: '18px'
            }}>M</div>
            <span style={{ fontSize: '20px', fontWeight: '800' }}>Mis<span style={{ background: 'linear-gradient(135deg, #818cf8, #c084fc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>ComprasUSA</span></span>
          </div>
          <p style={{ color: '#94a3b8', fontSize: '14px', fontWeight: '500', marginBottom: '16px' }}>
            Tu casillero virtual en Miami. Envíos rápidos y seguros a Colombia.
          </p>
          <div style={{ display: 'flex', gap: '12px' }}>
            <a href={`https://wa.me/${WA_NUMBER}`} style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#25D366', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <MessageCircle size={18} color="white" />
            </a>
            <a href={`tel:+573152597199`} style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Phone size={18} color="white" />
            </a>
          </div>
        </div>

        <div>
          <h4 style={{ fontWeight: '700', marginBottom: '16px', color: '#818cf8' }}>Servicios</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {['Casillero Virtual', 'Consolidación', 'Envío Express', 'Seguro'].map((item, i) => (
              <li key={i}><a href="#" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '14px', fontWeight: '500' }}>{item}</a></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 style={{ fontWeight: '700', marginBottom: '16px', color: '#818cf8' }}>Contacto</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <li style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#94a3b8', fontSize: '14px', fontWeight: '500' }}>
              <MessageCircle size={16} /> +57 315 259 7199
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#94a3b8', fontSize: '14px', fontWeight: '500' }}>
              <MapPin size={16} /> Miami, FL, USA
            </li>
          </ul>
        </div>
      </div>

      <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '24px', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ color: '#64748b', fontSize: '14px' }}>© 2026 MisComprasUSA. Todos los derechos reservados.</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748b', fontSize: '14px' }}>
          <ShieldCheck size={14} color="#22c55e" />
          Servicio seguro y garantizado
        </div>
      </div>
    </div>
  </footer>
);

const HowItWorks = () => (
  <section style={{ padding: '80px 0', background: 'white' }}>
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <span style={{ background: '#e0e7ff', color: '#4f46e5', padding: '8px 16px', borderRadius: '20px', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase' }}>
          Cómo Funciona
        </span>
        <h2 style={{ fontSize: '36px', fontWeight: '800', color: '#0f172a', margin: '24px 0 16px 0' }}>
          En 3 pasos simples
        </h2>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '40px' }}>
        {[
          { icon: <UserPlus size={32} />, color: '#4f46e5', bg: '#e0e7ff', title: '1. Regístrate', desc: 'Crea tu cuenta gratis y obtén tu dirección en Miami.' },
          { icon: <ShoppingCart size={32} />, color: '#16a34a', bg: '#dcfce7', title: '2. Compra en USA', desc: 'Usa tu dirección de Miami en cualquier tienda.' },
          { icon: <Truck size={32} />, color: '#d97706', bg: '#fef3c7', title: '3. Recibe en Casa', desc: 'Entregamos en tu puerta con tracking completo.' },
        ].map((step, i) => (
          <div key={i} style={{ textAlign: 'center', padding: '32px' }}>
            <div style={{
              width: '80px',
              height: '80px',
              borderRadius: '20px',
              background: step.bg,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 24px auto',
              color: step.color
            }}>
              {step.icon}
            </div>
            <h3 style={{ fontSize: '20px', fontWeight: '800', color: '#0f172a', marginBottom: '12px' }}>{step.title}</h3>
            <p style={{ color: '#64748b', fontWeight: '500', fontSize: '16px', margin: 0 }}>{step.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

function Landing() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div style={{ background: 'white', minHeight: '100vh' }}>
      <WhatsAppFloating />

      {/* Header */}
      <header style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: scrolled ? 'white' : 'rgba(255,255,255,0.95)',
        backdropFilter: 'blur(10px)',
        boxShadow: scrolled ? '0 4px 20px rgba(0,0,0,0.1)' : 'none',
        transition: 'all 0.3s'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px', height: '70px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: '800',
              fontSize: '18px',
              color: 'white'
            }}>M</div>
            <span style={{ fontSize: '20px', fontWeight: '800', color: '#0f172a' }}>
              Mis<span style={{ background: 'linear-gradient(135deg, #4f46e5, #7c3aed)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>ComprasUSA</span>
            </span>
          </Link>

          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <a href={`https://wa.me/${WA_NUMBER}`} style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#25D366', fontWeight: '700', textDecoration: 'none', fontSize: '14px' }}>
              <MessageCircle size={18} />
              +57 315 259 7199
            </a>
            <Link to="/login" style={{
              background: '#4f46e5',
              color: 'white',
              padding: '10px 20px',
              borderRadius: '10px',
              fontWeight: '700',
              fontSize: '13px',
              textDecoration: 'none'
            }}>
              ACCEDER
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section style={{
        paddingTop: '140px',
        paddingBottom: '80px',
        background: 'linear-gradient(180deg, #f8fafc 0%, white 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: '100px',
          right: '-100px',
          width: '400px',
          height: '400px',
          background: '#e0e7ff',
          borderRadius: '50%',
          filter: 'blur(100px)'
        }} />
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '60px', alignItems: 'center' }}>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 16px', background: '#e0e7ff', borderRadius: '20px', marginBottom: '24px' }}>
                <span style={{ fontSize: '12px', fontWeight: '700', color: '#4f46e5' }}>🏆 #1 en Satisfacción</span>
              </div>
              <h1 style={{ fontSize: '48px', fontWeight: '800', color: '#0f172a', lineHeight: '1.1', margin: '0 0 24px 0' }}>
                Compra en USA<br />
                <span style={{ background: 'linear-gradient(135deg, #4f46e5, #7c3aed)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  Recibe en Colombia
                </span>
              </h1>
              <p style={{ fontSize: '20px', color: '#64748b', fontWeight: '500', marginBottom: '32px', maxWidth: '500px' }}>
                Tu casillero virtual gratis en Miami. Tarifas claras, seguro incluido y entrega en tu puerta.
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', marginBottom: '32px' }}>
                {[
                  { icon: <Verified size={18} />, text: 'Casillero gratis' },
                  { icon: <ShieldCheck size={18} />, text: 'Seguro incluido' },
                  { icon: <Clock size={18} />, text: '3-10 días' },
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#475569', fontWeight: '600' }}>
                    <span style={{ color: '#22c55e' }}>{item.icon}</span>
                    {item.text}
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', gap: '16px' }}>
                <a href={`https://wa.me/${WA_NUMBER}`} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: '#4f46e5',
                  color: 'white',
                  padding: '16px 32px',
                  borderRadius: '12px',
                  fontWeight: '800',
                  fontSize: '16px',
                  textDecoration: 'none'
                }}>
                  <MessageCircle size={20} />
                  Escríbenos
                </a>
              </div>
            </div>

            <div>
              <Calculator />
            </div>
          </div>
        </div>
      </section>

      <HowItWorks />
      <Tariffs />
      <Coverage />
      <FAQ />
      <CTA />
      <Footer />
    </div>
  );
}

export default Landing;