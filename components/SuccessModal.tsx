import { BadgeCheck } from 'lucide-react-native';
import React from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface SuccessModalProps {
  visible: boolean;
  onContinue: () => void;
}

export function SuccessModal({ visible, onContinue }: SuccessModalProps) {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onContinue} // Tutup modal jika tombol back ditekan
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          
          {/* Icon Centang Hijau */}
          <View style={styles.iconContainer}>
            <BadgeCheck color="#22C55E" size={80} strokeWidth={1.5} />
          </View>

          {/* Teks Pesan */}
          <Text style={styles.messageText}>
            Your account has been created !{'\n'}please proceed to login
          </Text>

          {/* Tombol Continue */}
          <TouchableOpacity style={styles.button} onPress={onContinue}>
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>

        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Efek gelap transparan di background
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '85%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    elevation: 10, // Shadow untuk Android
    shadowColor: '#000', // Shadow untuk iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  iconContainer: {
    marginBottom: 20,
  },
  messageText: {
    fontSize: 16,
    color: '#000',
    textAlign: 'center',
    fontWeight: '600',
    marginBottom: 30,
    lineHeight: 24,
  },
  button: {
    backgroundColor: '#F08080', // Warna Salmon/Pink sesuai desain
    width: '100%',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});