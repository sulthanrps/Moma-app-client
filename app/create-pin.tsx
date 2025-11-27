import { MomaLogo } from '@/components/MomaLogo';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
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
    console.log("PIN saat ini:", pin); 

    if (pin.length === 6) {
       setModalVisible(true);
    } else {
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
       {/* Gunakan TouchableWithoutFeedback untuk menutup keyboard saat klik area kosong */}
       <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <KeyboardAvoidingView 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.content}
          >
             
             <View style={styles.logoContainer}>
                <MomaLogo size={170} />
             </View>

             <View style={styles.textContainer}>
                <Text style={styles.title}>Create a 6 digit PIN</Text>
                <Text style={styles.subtitle}>Enter the 6 digit numbers</Text>
             </View>

             {/* Container khusus untuk PIN dan Input */}
             <View style={styles.pinInputWrapper}>
                <View style={styles.pinContainer}>
                  {renderPinBoxes()}
                </View>

                {/* Input Transparan yang menutupi area PIN */}
                <TextInput
                  style={styles.hiddenInput}
                  keyboardType="number-pad"
                  maxLength={6}
                  onChangeText={setPin}
                  value={pin}
                  autoFocus={true} 
                  caretHidden={true}
                />
             </View>

             <TouchableOpacity style={styles.button} onPress={handleEnter}>
                <Text style={styles.buttonText}>Enter</Text>
             </TouchableOpacity>

          </KeyboardAvoidingView>
       </TouchableWithoutFeedback>

       <SuccessModal 
          visible={isModalVisible} 
          onContinue={handleModalContinue} 
       />

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bgScreen },
  content: { 
    flex: 1, 
    padding: 24, 
    alignItems: 'center', 
    justifyContent: 'center' // Ini akan menengahkan konten secara vertikal
  },
  logoContainer: {
    marginBottom: 30,
    alignItems: 'center',
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: { fontSize: 24, fontWeight: 'bold', color: COLORS.textMain, marginBottom: 10 },
  subtitle: { fontSize: 14, color: COLORS.textSecondary },
  
  // Wrapper untuk memastikan input berada di posisi yang sama dengan kotak PIN
  pinInputWrapper: {
    width: '100%',
    marginBottom: 50,
    position: 'relative', // Penting untuk positioning absolute anak-anaknya
    height: 60, // Tinggi area PIN
    justifyContent: 'center',
  },
  pinContainer: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    width: '100%', 
  },
  pinBox: { width: 45, height: 55, borderRadius: 12, backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E0E0E0', justifyContent: 'center', alignItems: 'center' },
  pinBoxFilled: { borderColor: COLORS.primary, backgroundColor: '#FFF0F0' },
  dot: { width: 12, height: 12, borderRadius: 6, backgroundColor: COLORS.primary },
  
  // Style Input Rahasia yang diperbaiki
  hiddenInput: { 
    position: 'absolute', 
    width: '100%', 
    height: '100%', 
    opacity: 0, // Tetap invisible
    zIndex: 10, // Pastikan di atas
  },
  
  button: { backgroundColor: COLORS.primary, width: '100%', height: 55, borderRadius: 25, justifyContent: 'center', alignItems: 'center', shadowColor: COLORS.primary, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 5, elevation: 5 },
  buttonText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
});