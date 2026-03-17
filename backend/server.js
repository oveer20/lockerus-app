const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const admin = require('firebase-admin');
const { MercadoPagoConfig, Preference } = require('mercadopago');

dotenv.config();

// Inicializar Firebase Admin
// En producción, esto debería usar credenciales de una service account de Google Cloud (.json)
// Por ahora usamos default para no tumbar la app localmente si no existen las credenciales
try {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: "https://lockerus-app-demo.firebaseio.com"
  });
} catch (error) {
  console.log("Firebase admin mock inicializado - (Faltan credenciales reales)");
}

const db = admin.firestore?.() || null;

// Inicializar Mercado Pago con token de prueba (Sandbox)
const client = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN || 'TEST-82928923982392-09823-fake-234234234' });

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'LockerUS Backend Server API is running (Firebase Ready)' });
});

// User profile API - Firebase Integrado
app.get('/api/user/:email', async (req, res) => {
  try {
    if (!db) return res.json({ id: 1, email: req.params.email, name: 'Usuario Demo (Mock)', suite: 'LUS9021', phone: '+1 (305) 555-0192' });
    
    const usersRef = db.collection('users');
    const snapshot = await usersRef.where('email', '==', req.params.email).get();
    
    if (snapshot.empty) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    const userData = snapshot.docs[0].data();
    res.json({ id: snapshot.docs[0].id, ...userData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// User packages API - Firebase Integrado
app.get('/api/packages/:userId', async (req, res) => {
  try {
    if (!db) return res.json([{ id: 101, userId: req.params.userId, name: 'MacBook Pro 14" (Mock)', tracking: 'TBA192837482', weight: 4.5, status: 'Recibido en Miami', date: new Date().toISOString() }]);

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

// MercadoPago Checkout Preference Route
app.post('/api/create-preference', async (req, res) => {
  try {
    const { title, quantity, price } = req.body;

    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";

    const body = {
      items: [
        {
          title: title,
          quantity: Number(quantity),
          unit_price: Number(price),
          currency_id: 'COP',
        },
      ],
      back_urls: {
        success: `${frontendUrl}/dashboard`,
        failure: `${frontendUrl}/dashboard`,
        pending: `${frontendUrl}/dashboard`,
      },
      auto_return: "approved",
    };

    const preference = new Preference(client);
    const result = await preference.create({ body });
    // result.init_point es la URL a la que hay que redirigir al usuario para pagar
    res.json({ id: result.id, init_point: result.init_point });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al generar la preferencia de pago' });
  }
});

// Payment webhook (Placeholder for ePayco/MercadoPago)
app.post('/api/webhooks/payment', (req, res) => {
  console.log('Webhook de pago recibido:', req.body);
  // Logica para confirmar pago y actualizar estado de envío del paquete
  res.status(200).send('OK');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
