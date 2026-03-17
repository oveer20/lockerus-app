# 📦 LockerUS - Tu Casillero Virtual (USA -> Colombia)

LockerUS es una plataforma integral (Web + Backend + Móvil) diseñada para que los usuarios en Colombia puedan obtener una dirección física en Estados Unidos, realizar compras en sus tiendas favoritas y gestionar el envío internacional de sus paquetes pagando con métodos locales (Nequi, PSE, Tarjetas).

## 🌟 Características Principales
- **Diseño Premium**: Interfaz moderna con *Dark Mode*, *Glassmorphism* y animaciones fluidas.
- **Plataforma Web (React/Vite)**: Landing page atractiva, inicio de sesión y un Dashboard completo para la gestión de paquetes.
- **Backend API (Node.js/Express)**: Servidor RESTful preparado para conectar con bases de datos (Firebase/Supabase) y webhooks de pasarelas de pago.
- **Aplicación Móvil (React Native/Expo)**: App nativa (iOS/Android) para rastrear paquetes desde el celular con la misma estética premium.

## 🚀 Estructura del Proyecto
El proyecto está dividido en tres carpetas principales:
1. **`/` (Raíz - Web)**: Aplicación frontend en React + Vite.
2. **`/backend`**: Servidor Node.js con Express.
3. **`/mobile`**: Código fuente de la aplicación nativa en React Native (Expo).

---

## 🛠️ Cómo Ejecutar el Proyecto Localmente

Para ver el proyecto completo en tu máquina, necesitas ejecutar los tres entornos:

### 1. Iniciar el Backend (Servidor)
Abre una terminal, navega a la carpeta del backend y arranca el servidor:
```bash
cd backend
npm install
node server.js
```
*El servidor correrá en `http://localhost:5000` y proveerá los datos al Dashboard.*

### 2. Iniciar la Plataforma Web
Abre **otra** terminal, navega a la raíz del proyecto y arranca React:
```bash
npm install
npm run dev
```
*Abre tu navegador en `http://localhost:5173` para ver la web y el Dashboard interactivo.*

### 3. Iniciar la Aplicación Móvil
Abre una **tercera** terminal, navega a la carpeta móvil y arranca Expo:
```bash
cd mobile
npm install
npx expo start
```
*Escanea el código QR con la app **Expo Go** en tu celular (iOS/Android) para ver la aplicación nativa.*

---

## 🔒 Siguientes Pasos para Producción
Este proyecto es la base técnica exploratoria y visual. Para llevarlo a producción real con usuarios:

### 1. Variables de Entorno (.env)
Se han generado dos plantillas base llamadas `.env` en la raíz de la plataforma y dentro de `/backend`. Debes abrirlos y llenarlos con tus llaves reales:
- **Firebase**: Descarga la llave privada desde tu consola Cloud (Archivo `.json`) y configúrala en el backend. 
- **MercadoPago**: Copia tu Access Token y pégalo.

### 2. Base de Datos / Auth
Las colecciones `users` y `packages` se generarán automáticamente en Firestore una vez esté conectado el backend de manera correcta.

### 3. Compilación e Infraestructura
- **Despliegue Web**: Subir el Frontend de React a Vercel o Netlify.
- **Despliegue Backend**: Montar el servidor Node.js en Render, AWS o Heroku.
- **Despliegue Móvil**: Compilar la App Móvil nativa usando EAS Build (Expo) para las tiendas (App Store/Play Store).

¡Disfruta de tu nueva plataforma! 🚀
