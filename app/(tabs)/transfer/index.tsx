import { useRouter } from 'expo-router';
import { Building2, ChevronDown, ChevronLeft } from 'lucide-react-native';
import React, { useState } from 'react';
import {
  Dimensions,
  FlatList,
  Keyboard,
  Modal,
  SafeAreaView, StatusBar,
  StyleSheet,
  Text,
  TextInput, TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native';

const { width } = Dimensions.get('window');

// --- COLORS ---
const COLORS = {
  primary: '#D98989', // Pink Salmon
  textMain: '#000000',
  textSecondary: '#A0A0A0',
  border: '#E0E0E0',
  error: '#EF4444',   // Merah Error
  bgInput: '#FFFFFF',
  bgScreen: '#FFFFFF',
};

// --- MOCK DATA BANKS ---
const BANKS = [
  { id: '1', name: 'BCA', code: '014' },
  { id: '2', name: 'Mandiri', code: '008' },
  { id: '3', name: 'BNI', code: '009' },
  { id: '4', name: 'BRI', code: '002' },
  { id: '5', name: 'Jago', code: '542' },
];

export default function TransferScreen() {
  const router = useRouter();

  // --- STATE ---
  const [selectedBank, setSelectedBank] = useState<any>(null);
  const [accountNumber, setAccountNumber] = useState('');
  const [error, setError] = useState('');
  const [showBankPicker, setShowBankPicker] = useState(false);

  // --- HANDLERS ---
  const handleNext = () => {
    // Dismiss keyboard dulu biar rapi
    Keyboard.dismiss();

    // 1. Reset Error
    setError('');

    // 2. Validasi
    if (!accountNumber.trim()) {
      setError('The account number is not valid');
      return;
    }

    if (!selectedBank) {
      alert('Please select a bank destination');
      return;
    }

    // 3. Sukses
    console.log("Validasi Sukses. Data:", { bank: selectedBank.name, acc: accountNumber });
    // router.push('/transfer-amount'); 
    router.push({
        pathname: '/(tabs)/transfer/amount',
        params: { 
            bank: selectedBank.name, 
            acc: accountNumber 
        }
    });
  };

  const handleAccountChange = (text: string) => {
    setAccountNumber(text);
    if (error) setError('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* FIX: TouchableWithoutFeedback
         Ini trik supaya kalau user klik area kosong di luar input, keyboard turun.
      */}
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ flex: 1 }}> 
          
          {/* HEADER */}
          <View style={styles.header}>
            <TouchableOpacity style={styles.backButton}
              onPress={() => router.back()}>
              <ChevronLeft color="#000" size={24} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Transfer</Text>
            <View style={{ width: 24 }} /> 
          </View>

          <View style={styles.content}>
            
            {/* 1. BANK DESTINATION */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Choose Bank Destination</Text>
              <TouchableOpacity 
                style={styles.inputWrapper} 
                onPress={() => {
                  Keyboard.dismiss(); // Tutup keyboard kalau mau buka modal
                  setShowBankPicker(true);
                }}
              >
                {selectedBank ? (
                  <View style={styles.selectedBankRow}>
                    <Building2 size={20} color={COLORS.primary} style={{marginRight: 10}} />
                    <Text style={styles.inputText}>{selectedBank.name}</Text>
                  </View>
                ) : (
                  <Text style={styles.placeholderText}>Pick a Bank</Text>
                )}
                <ChevronDown color="#000" size={20} style={styles.inputIcon} />
              </TouchableOpacity>
            </View>

            {/* 2. ACCOUNT NUMBER */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Input account number</Text>
              <View style={[
                styles.inputWrapper, 
                error ? styles.inputError : null
              ]}>
                <TextInput 
                  style={styles.textInput} 
                  placeholder="" 
                  keyboardType="number-pad"
                  value={accountNumber}
                  onChangeText={handleAccountChange}
                />
              </View>
              
              {/* ERROR MESSAGE */}
              {error ? (
                <View style={styles.errorContainer}>
                  {/* Ikon alert opsional, bisa dihapus kalau ga perlu */}
                  <Text style={styles.errorText}>{error}</Text>
                </View>
              ) : null}
            </View>

          </View>

          {/* BOTTOM BUTTON */}
          <View style={styles.footer}>
            <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
              <Text style={styles.nextButtonText}>Next</Text>
            </TouchableOpacity>
          </View>

        </View>
      </TouchableWithoutFeedback>

      {/* --- MODAL: BANK PICKER --- */}
      <Modal visible={showBankPicker} transparent animationType="fade">
        <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={() => setShowBankPicker(false)}>
          <View style={styles.bottomSheet}>
            <View style={styles.bottomSheetHandle} />
            <Text style={styles.bottomSheetTitle}>Select Bank</Text>
            
            <FlatList
              data={BANKS}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity 
                  style={styles.optionItem} 
                  onPress={() => {
                    setSelectedBank(item);
                    setShowBankPicker(false);
                    setError('');
                  }}
                >
                  <View style={styles.optionIconContainer}>
                    <Building2 size={20} color="#555" />
                  </View>
                  <View>
                    <Text style={styles.optionText}>{item.name}</Text>
                    <Text style={styles.optionSubText}>Code: {item.code}</Text>
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bgScreen },
  
  // Header
  header: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    paddingHorizontal: 20, 
    paddingVertical: 15,
    backgroundColor: '#fff' 
  },
  headerTitle: { fontSize: 18, fontWeight: '700', color: COLORS.textMain },
  backButton: { padding: 5, marginLeft: -5 },

  content: { padding: 20, flex: 1 },

  // Input Styles
  inputGroup: { marginBottom: 25 },
  label: { fontSize: 14, fontWeight: '500', color: COLORS.textMain, marginBottom: 10 },
  inputWrapper: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: COLORS.bgInput, 
    borderWidth: 1, 
    borderColor: COLORS.textMain, 
    borderRadius: 8, 
    height: 50, 
    paddingHorizontal: 15 
  },
  inputError: {
    borderColor: COLORS.error, 
  },
  textInput: { flex: 1, fontSize: 16, color: COLORS.textMain, height: '100%' },
  inputText: { flex: 1, fontSize: 16, color: COLORS.textMain },
  placeholderText: { flex: 1, fontSize: 16, color: '#C0C0C0' },
  inputIcon: { marginLeft: 10 },
  
  selectedBankRow: { flex: 1, flexDirection: 'row', alignItems: 'center' },

  // Error Text
  errorContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
  errorText: { color: COLORS.error, fontSize: 12, fontWeight: '500' },

  // Footer Button
  footer: { padding: 20, paddingBottom: 30 },
  nextButton: { 
    backgroundColor: COLORS.primary, 
    height: 50, 
    borderRadius: 25, 
    justifyContent: 'center', 
    alignItems: 'center',
    elevation: 2,
    shadowColor: COLORS.primary,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 5
  },
  nextButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },

  // Modal Styles
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  bottomSheet: { backgroundColor: '#fff', borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 20, maxHeight: '60%' },
  bottomSheetHandle: { width: 40, height: 4, backgroundColor: '#DDD', borderRadius: 2, alignSelf: 'center', marginBottom: 20 },
  bottomSheetTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 15 },
  optionItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: '#F5F5F5' },
  optionIconContainer: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#F0F0F5', justifyContent: 'center', alignItems: 'center', marginRight: 15 },
  optionText: { fontSize: 16, fontWeight: '500', color: '#333' },
  optionSubText: { fontSize: 12, color: '#888' },
});