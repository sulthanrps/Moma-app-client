import { useRouter } from 'expo-router';
import { ArrowLeft, Hammer, QrCode } from 'lucide-react-native';
import React from 'react';
import {
    Dimensions,
    SafeAreaView, StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

const { width } = Dimensions.get('window');

const COLORS = {
  primary: '#D98989',
  bgScreen: '#FFFFFF',
  textMain: '#000000',
  textSecondary: '#888888',
  lightPink: '#FFF0F0',
};

export default function QrisScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>QRIS Payment</Text>
      </View>

      <View style={styles.content}>
        
        <View style={styles.illustrationContainer}>
            <View style={styles.circleBig}>
                <View style={styles.circleSmall}>
                    <QrCode size={60} color={COLORS.primary} />
                    <View style={styles.badgeIcon}>
                        <Hammer size={20} color="#FFF" fill="#FFF" />
                    </View>
                </View>
            </View>
        </View>

        {/* TEXT INFO */}
        <Text style={styles.title}>Fitur ini sedang dibangun!</Text>
        <Text style={styles.subtitle}>
          Tim kami sedang bekerja keras untuk menghadirkan fitur pembayaran QRIS yang aman dan cepat untukmu. Nantikan update selanjutnya!
        </Text>

        {/* ACTION BUTTON */}
        <TouchableOpacity 
            style={styles.button}
            onPress={() => router.replace('/(tabs)')}
        >
            <ArrowLeft size={20} color="#FFF" style={{marginRight: 10}} />
            <Text style={styles.buttonText}>Kembali ke Home</Text>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bgScreen },
  
  header: { 
    paddingVertical: 20, 
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5'
  },
  headerTitle: { fontSize: 18, fontWeight: '700', color: COLORS.textMain },

  content: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    paddingHorizontal: 40 
  },

  illustrationContainer: { marginBottom: 40, alignItems: 'center', justifyContent: 'center' },
  circleBig: {
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: COLORS.lightPink, 
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleSmall: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    position: 'relative',
  },
  badgeIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: COLORS.primary,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#FFF',
  },

  title: { 
    fontSize: 22, 
    fontWeight: 'bold', 
    color: COLORS.textMain, 
    marginBottom: 10,
    textAlign: 'center'
  },
  subtitle: { 
    fontSize: 14, 
    color: COLORS.textSecondary, 
    textAlign: 'center', 
    lineHeight: 22,
    marginBottom: 40 
  },

  button: {
    flexDirection: 'row',
    backgroundColor: COLORS.primary,
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    alignItems: 'center',
    elevation: 3,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});