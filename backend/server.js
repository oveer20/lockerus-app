const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const admin = require('firebase-admin');
const { MercadoPagoConfig, Preference } = require('mercadopago');

dotenv.config();

let db = null;

// Inicializar Firebase Admin
async function initFirebase() {
  try {
    let credential;
    if (process.env.FIREBASE_SERVICE_ACCOUNT_JSON) {
      credential = admin.credential.cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON));
    } else {
      try {
        const serviceAccount = require(process.env.GOOGLE_APPLICATION_CREDENTIALS || './serviceAccountKey.json');
        credential = admin.credential.cert(serviceAccount);
      } catch (e) {
        console.log('Firebase credentials not found, using mock mode');
        return null;
      }
    }

    admin.initializeApp({
      credential,
      databaseURL: process.env.FIREBASE_DATABASE_URL || 'https://lockerus-app.firebaseio.com'
    });
    console.log('Firebase Admin SDK inicializado');
    return admin.firestore();
  } catch (error) {
    console.error('Firebase init error:', error.message);
    return null;
  }
}

// Inicializar Mercado Pago
let mpClient = null;
function initMercadoPago() {
  const token = process.env.MP_ACCESS_TOKEN;
  if (token && token.startsWith('APP_USR-') && !token.includes('XXXXX')) {
    mpClient = new MercadoPagoConfig({ accessToken: token });
    console.log('MercadoPago configurado');
  } else {
    console.log('MercadoPago: token no configurado');
  }
}

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: '*' }));
app.use(express.json());

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    firebase: db ? 'connected' : 'mock',
    mercadopago: mpClient ? 'connected' : 'mock'
  });
});

// Obtener perfil de usuario
app.get('/api/user/:email', async (req, res) => {
  try {
    if (!db) {
      return res.json({
        id: 'demo-user',
        email: req.params.email,
        name: 'Usuario Demo',
        suite: 'LK-DEMO' + Math.floor(Math.random() * 9000) + 1000,
        phone: '+57 300 000 0000',
        createdAt: new Date().toISOString()
      });
    }
    
    const usersRef = db.collection('users');
    const snapshot = await usersRef.where('email', '==', req.params.email).get();
    
    if (snapshot.empty) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    
    const doc = snapshot.docs[0];
    res.json({ id: doc.id, ...doc.data() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener paquetes de usuario
app.get('/api/packages/:userId', async (req, res) => {
  try {
    if (!db) {
      // Modo demo
      const demoPackages = [
        { id: '101', name: 'MacBook Pro 14"', tracking: 'TBA192837482', weight: 4.5, status: 'Recibido', price: 45, date: new Date().toISOString() },
        { id: '102', name: 'AirPods Pro', tracking: 'TBA83748291', weight: 0.5, status: 'En transito', price: 15, date: new Date().toISOString() }
      ];
      return res.json(demoPackages);
    }
    
    const packagesRef = db.collection('packages');
    const snapshot = await packagesRef.where('userId', '==', req.params.userId).get();
    
    const userPackages = [];
    snapshot.forEach(doc => {
      userPackages.push({ id: doc.id, ...doc.data() });
    });
    
    res.json(userPackages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Crear pre-alerta de paquete
app.post('/api/pre-alert', async (req, res) => {
  try {
    const { userId, store, tracking, value } = req.body;
    
    if (!db) {
      return res.json({
        id: 'PA-' + Date.now(),
        userId,
        store,
        tracking,
        value,
        status: 'pending',
        createdAt: new Date().toISOString()
      });
    }
    
    const preAlert = {
      userId,
      store,
      tracking,
      value: value || 0,
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    
    const docRef = await db.collection('preAlerts').add(preAlert);
    res.json({ id: docRef.id, ...preAlert });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Crear preferencia de pago MercadoPago
app.post('/api/create-preference', async (req, res) => {
  try {
    const { title, description, price, quantity, packageId } = req.body;
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';

    if (!mpClient) {
      // Modo demo
      return res.json({
        id: 'demo-pref-' + Date.now(),
        init_point: '#demo-mode'
      });
    }

    const preference = new Preference(mpClient);
    const result = await preference.create({
      body: {
        items: [{
          title: title || 'Envío LockerUS',
          description: description || 'Costo de envío internacional',
          quantity: quantity || 1,
          unit_price: Number(price) || 10,
          currency_id: 'COP'
        }],
        back_urls: {
          success: `${frontendUrl}/dashboard?paid=true`,
          failure: `${frontendUrl}/dashboard?failed=true`,
          pending: `${frontendUrl}/dashboard?pending=true`
        },
        auto_return: 'approved',
        external_reference: packageId || null
      }
    });

    res.json({ id: result.id, init_point: result.init_point });
  } catch (error) {
    console.error('MercadoPago error:', error);
    res.status(500).json({ error: 'Error al crear preferencia de pago' });
  }
});

// Webhook de pagos (MercadoPago)
app.post('/api/webhooks/payment', (req, res) => {
  console.log('Webhook recibido:', JSON.stringify(req.body, null, 2));
  
  const { type, data } = req.body;
  
  if (type === 'payment') {
    const paymentId = data?.id;
    console.log('Payment ID:', paymentId);
    // Aquí actualizarías el estado del paquete en Firestore
  }
  
  res.status(200).send('OK');
});

// Obtener tarifas
app.get('/api/tariffs', (req, res) => {
  res.json([
    { weight: '1-4 lb', price: 19, time: '3-5 días', name: 'Basic' },
    { weight: '5-10 lb', price: 2.99, time: '4-6 días', name: 'Standard' },
    { weight: '11-25 lb', price: 2.75, time: '5-7 días', name: 'Economy' },
    { weight: '26-50 lb', price: 2.50, time: '6-8 días', name: 'Bulk' },
    { weight: '50+ lb', price: 2.25, time: '7-10 días', name: 'Super Bulk' }
  ]);
});

// Iniciar servidor
initFirebase().then(firestoreDb => {
  db = firestoreDb;
  initMercadoPago();
  
  app.listen(PORT, () => {
    console.log(`LockerUS API running on port ${PORT}`);
  });
});

module.exports = app;