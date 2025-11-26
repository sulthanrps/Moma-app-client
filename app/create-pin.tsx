import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { MomaLogo } from '@/components/MomaLogo';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert // Kita pakai Alert dulu buat tes kalau Modal macet
} from 'react-native';

import { SuccessModal } from '@/components/SuccessModal';

const COLORS = {
  primary: '#D98989', 
  bgScreen: '#F5F5F5',
  textMain: '#000000',
  textSecondary: '#A0A0A0',
};

export default function CreatePinScreen() {
  const router = useRouter();
  const [pin, setPin] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  
  const handleEnter = () => {
    console.log("PIN saat ini:", pin); // Cek di terminal

    if (pin.length === 6) {
        // Jika 6 digit, buka modal
        setModalVisible(true);
    } else {
        // Jika kurang, kasih peringatan
        Alert.alert("Error", `PIN harus 6 digit. Saat ini: ${pin.length}`);
    }
  };

  const handleModalContinue = () => {
      setModalVisible(false);
      router.replace('/login'); 
  };

  const renderPinBoxes = () => {
    const boxes = [];
    for (let i = 0; i < 6; i++) {
      boxes.push(
        <View key={i} style={[styles.pinBox, pin.length > i ? styles.pinBoxFilled : null]}>
           {pin.length > i && <View style={styles.dot} />}
        </View>
      );
    }
    return boxes;
  };

  return (
    <SafeAreaView style={styles.container}>
       {/* Tekan layar sembarang tempat untuk menutup keyboard jika menghalangi */}
       <TouchableOpacity activeOpacity={1} style={styles.content} onPress={() => {}}>
          
          <MomaLogo size={170} />

          <Text style={styles.title}>Create a 6 digit PIN</Text>
          <Text style={styles.subtitle}>Enter the 6 digit numbers</Text>

          <View style={styles.pinContainer}>
            {renderPinBoxes()}
          </View>

          {/* Input yang menutupi area PIN agar mudah diklik */}
          <TextInput
            style={styles.hiddenInput}
            keyboardType="number-pad"
            maxLength={6}
            onChangeText={setPin}
            value={pin}
            autoFocus={true} 
          />

          <TouchableOpacity style={styles.button} onPress={handleEnter}>
             <Text style={styles.buttonText}>Enter</Text>
          </TouchableOpacity>
       </TouchableOpacity>

       <SuccessModal 
          visible={isModalVisible} 
          onContinue={handleModalContinue} 
       />

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bgScreen },
  content: { flex: 1, padding: 24, alignItems: 'center', justifyContent: 'center' },
  iconWrapper: { marginBottom: 30 },
  logo: { width: 120, height: 120, resizeMode: 'contain' },
  title: { fontSize: 24, fontWeight: 'bold', color: COLORS.textMain, marginBottom: 10 },
  subtitle: { fontSize: 14, color: COLORS.textSecondary, marginBottom: 40 },
  pinContainer: { flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginBottom: 50 },
  pinBox: { width: 45, height: 55, borderRadius: 12, backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E0E0E0', justifyContent: 'center', alignItems: 'center' },
  pinBoxFilled: { borderColor: COLORS.primary, backgroundColor: '#FFF0F0' },
  dot: { width: 12, height: 12, borderRadius: 6, backgroundColor: COLORS.primary },
  // Ubah style hidden input agar pasti berada di atas kotak PIN
  hiddenInput: { 
    position: 'absolute', 
    width: '100%', 
    height: 100, 
    top: '40%', // Sesuaikan biar pas di area kotak PIN
    opacity: 0,
    zIndex: 10 // Pastikan di layer paling atas
  },
  button: { backgroundColor: COLORS.primary, width: '100%', height: 55, borderRadius: 25, justifyContent: 'center', alignItems: 'center', shadowColor: COLORS.primary, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 5, elevation: 5 },
  buttonText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
});