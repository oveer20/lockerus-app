import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, SafeAreaView, StatusBar, Dimensions, TextInput } from 'react-native';
import { Package, MapPin, CreditCard } from 'lucide-react-native';
import { auth } from './firebase';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';

const { width } = Dimensions.get('window');

// Datos Mock (idealmente se traerían desde la API como en React web)
const demoUser = {
  name: 'José Gaviria',
  suite: 'LUS9021',
  phone: '+1 (305) 555-0192',
  address: '8400 NW 25th St, Suite 100',
  city: 'Doral, FL 33122'
};

const packages = [
  { id: 101, name: 'MacBook Pro 14" (Amazon)', tracking: 'TBA192837482', weight: 4.5, status: 'Recibido en Miami' }
];

export default function App() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error(error);
      // Fallback para demo
      setUser(demoUser);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
  };

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={{ color: 'white' }}>Cargando LockerUS...</Text>
      </View>
    );
  }

  // Si no hay usuario autenticado, mostrar pantalla de Login
  if (!user) {
    return (
      <SafeAreaView style={[styles.container, { justifyContent: 'center', padding: 20 }]}>
        <StatusBar barStyle="light-content" backgroundColor="#0d0f1a" />
        <View style={styles.loginCard}>
          <Text style={styles.title}>LockerUS</Text>
          <Text style={styles.subtitle}>Inicia sesión para gestionar tus paquetes</Text>
          
          <TextInput 
            style={styles.input}
            placeholder="Correo electrónico"
            placeholderTextColor="rgba(255,255,255,0.5)"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput 
            style={styles.input}
            placeholder="Contraseña"
            placeholderTextColor="rgba(255,255,255,0.5)"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          
          <TouchableOpacity style={styles.payButton} onPress={handleLogin}>
            <Text style={styles.payButtonText}>Ingresar</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0d0f1a" />
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Mis Paquetes</Text>
            <Text style={styles.subtitle}>Rastrea tus envíos, {user?.name?.split(' ')[0] || 'Usuario'}</Text>
          </View>
          <TouchableOpacity style={styles.avatar} onPress={handleLogout}>
            <Text style={styles.avatarText}>SALIR</Text>
          </TouchableOpacity>
        </View>

        {/* Address Widget */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <MapPin size={20} color="#4f46e5" />
            <Text style={styles.cardTitle}>Dirección en USA</Text>
          </View>
          
          <View style={styles.addressGrid}>
            <View style={styles.addressItem}>
              <Text style={styles.label}>Nombre</Text>
              <Text style={styles.value}>{demoUser.name} - {demoUser.suite}</Text>
            </View>
            <View style={styles.addressItem}>
              <Text style={styles.label}>Dirección</Text>
              <Text style={styles.value}>{demoUser.address}</Text>
            </View>
            <View style={styles.addressItem}>
              <Text style={styles.label}>Ciudad / Estado</Text>
              <Text style={styles.value}>{demoUser.city}</Text>
            </View>
            <View style={styles.addressItem}>
              <Text style={styles.label}>Teléfono</Text>
              <Text style={styles.value}>{demoUser.phone}</Text>
            </View>
          </View>
        </View>

        {/* Packages List */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>En Tránsito ({packages.length})</Text>
          
          {packages.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>No tienes paquetes en tránsito en este momento.</Text>
            </View>
          ) : (
            packages.map(pkg => (
              <View key={pkg.id} style={styles.packageItem}>
                <View style={styles.packageLeft}>
                  <View style={styles.iconContainer}>
                    <Package size={24} color="#4f46e5" />
                  </View>
                  <View>
                    <Text style={styles.packageName}>{pkg.name}</Text>
                    <Text style={styles.packageTracking}>Tracking: {pkg.tracking}</Text>
                  </View>
                </View>
                
                <View style={styles.packageRight}>
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>{pkg.status}</Text>
                  </View>
                  <Text style={styles.packageWeight}>Peso: {pkg.weight} lbs</Text>
                  <TouchableOpacity style={styles.payButton}>
                    <Text style={styles.payButtonText}>Pagar (${(pkg.weight * 4.5).toFixed(2)})</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))
          )}
        </View>

      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Package size={24} color="#4f46e5" />
          <Text style={[styles.navText, { color: '#4f46e5' }]}>Paquetes</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <MapPin size={24} color="#f1f2f6" opacity={0.5} />
          <Text style={styles.navText}>Casillero</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <CreditCard size={24} color="#f1f2f6" opacity={0.5} />
          <Text style={styles.navText}>Tarifas</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d0f1a',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 100,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#f1f2f6',
  },
  subtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.6)',
    marginTop: 4,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#4f46e5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
  card: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#f1f2f6',
    marginLeft: 8,
  },
  addressGrid: {
    gap: 12,
  },
  addressItem: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  label: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.5)',
    marginBottom: 4,
  },
  value: {
    fontSize: 14,
    fontWeight: '600',
    color: '#f1f2f6',
  },
  emptyState: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    padding: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  emptyText: {
    color: 'rgba(255,255,255,0.5)',
  },
  packageItem: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
    marginTop: 12,
  },
  packageLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: 'rgba(79,70,229,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  packageName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#f1f2f6',
  },
  packageTracking: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.5)',
    marginTop: 2,
  },
  packageRight: {
    alignItems: 'flex-start',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
    paddingTop: 12,
  },
  badge: {
    backgroundColor: 'rgba(245,158,11,0.2)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 8,
  },
  badgeText: {
    color: '#f59e0b',
    fontSize: 12,
    fontWeight: 'bold',
  },
  packageWeight: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.5)',
    marginBottom: 12,
  },
  payButton: {
    backgroundColor: '#4f46e5',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  payButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
    backgroundColor: 'rgba(13,15,26,0.95)',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: 20,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    width: width / 3,
  },
  navText: {
    fontSize: 12,
    marginTop: 4,
    color: 'rgba(255,255,255,0.5)',
  },
  loginCard: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  input: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: 8,
    padding: 16,
    color: 'white',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  }
});
