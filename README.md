# LockerUS - Tu Casillero Virtual (USA -> Colombia)

LockerUS es una plataforma integral (Web + Backend + Móvil) diseñada para que los usuarios en Colombia puedan obtener una dirección física en Estados Unidos, realizar compras en sus tiendas favoritas y gestionar el envío internacional de sus paquetes pagando con métodos locales (Nequi, PSE, Tarjetas).

## Características Principales
- **Diseño Premium**: Interfaz moderna con Dark Mode, Glassmorphism y animaciones fluidas.
- **Autenticación Real**: Firebase Auth integrado (Registro + Login).
- **Base de Datos**: Firebase Firestore para usuarios y paquetes.
- **Pagos**: MercadoPago integrado (preferencias de pago).
- **Backend API**: Node.js/Express preparado para Firebase Admin y webhooks.
- **App Móvil**: React Native (Expo) con código compartido.

## Estructura del Proyecto
```
/                       # Frontend Web (React + Vite + Tailwind)
/backend                 # Servidor API (Node.js + Express)
/mobile                 # App Móvil (React Native + Expo)
```

## Cómo Ejecutar

### 1. Backend (Terminal 1)
```bash
cd backend
npm install
node server.js
```
API disponible en `http://localhost:5000`

### 2. Frontend Web (Terminal 2)
```bash
npm install
npm run dev
```
Web disponible en `http://localhost:5173`

### 3. App Móvil (Terminal 3)
```bash
cd mobile
npm install
npx expo start
```

## Configuración Requerida

### Firebase (ya configurado con credenciales de prueba)
- Frontend: `src/firebase.js` - Configuración cliente
- Backend: `backend/.env` - Service Account Key

### MercadoPago
Editar `backend/.env` y reemplazar:
```
MP_ACCESS_TOKEN="APP_USR-tu-token-real"
```

## Rutas de la Aplicación
- `/` - Landing Page con cotizador
- `/login` - Inicio de sesión
- `/register` - Registro de nuevos usuarios
- `/dashboard` - Panel del usuario (requiere auth)

## Próximos Pasos
1. Obtener el Service Account Key de Firebase desde la consola
2. Configurar credenciales reales de MercadoPago
3. Desplegar a producción (Vercel/Render)