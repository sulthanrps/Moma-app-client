import { useLocalSearchParams, useRouter } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import {
    Keyboard,
    SafeAreaView, StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from 'react-native';

const COLORS = {
  bgScreen: '#FFFFFF',
  textMain: '#000000',
  error: '#EF4444',
  primary: '#FF9F9F', 
};

export default function EditAllocationScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  // State
  const [daily, setDaily] = useState('');
  const [emergency, setEmergency] = useState('');
  const [saving, setSaving] = useState('');
  const [error, setError] = useState('');
  
  // Flag untuk mencegah reset data (Solusi No. 2)
  const [isInitialized, setIsInitialized] = useState(false);

  // Load data awal (HANYA SEKALI)
  useEffect(() => {
    if (!isInitialized) {
      if (params.daily) setDaily(params.daily.toString());
      if (params.emergency) setEmergency(params.emergency.toString());
      if (params.saving) setSaving(params.saving.toString());
      setIsInitialized(true);
    }
  }, [params]);

  // Validasi Real-time Emergency > 30%
  useEffect(() => {
    const val = parseInt(emergency || '0', 10);
    if (val > 30) {
      setError('*Emergency budget allocation can\'t exceed 30%!');
    } else {
      setError('');
    }
  }, [emergency]);

  const handleSave = () => {
    if (error) return;

    const d = parseInt(daily || '0', 10);
    const e = parseInt(emergency || '0', 10);
    const s = parseInt(saving || '0', 10);

    const total = d + e + s;
    if (total !== 100) {
      alert(`Total allocation is ${total}%. It must be exactly 100%.`);
      return;
    }

    // Kembali ke Index dengan data baru
    // Menggunakan navigate agar stack tidak hancur, tapi params terupdate
    router.replace({
      pathname: '/allocation',
      params: { daily: d, emergency: e, saving: s }
    });
  };

  const handleInputChange = (setter: any, val: string) => {
    const numeric = val.replace(/[^0-9]/g, '');
    setter(numeric);
  };

  return (
    // Solusi No 3: Tutup Keypad saat klik area kosong
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />

        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <ChevronLeft color="#000" size={24} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Edit Allocations</Text>
          <View style={{ width: 24 }} /> 
        </View>

        <View style={styles.content}>
          
          {/* DAILY INPUT */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Daily Limitation Budget Allocation</Text>
            <View style={styles.inputWrapper}>
              <TextInput 
                  style={styles.textInput} 
                  value={daily} 
                  onChangeText={(v) => handleInputChange(setDaily, v)}
                  keyboardType="number-pad"
                  placeholder="0"
                  maxLength={3}
              />
              <Text style={styles.suffix}>%</Text>
            </View>
          </View>

          {/* EMERGENCY INPUT */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Emergency Budget Allocation</Text>
            <View style={[styles.inputWrapper, error ? {borderColor: COLORS.error} : null]}>
              <TextInput 
                  style={[styles.textInput, error ? {color: COLORS.error} : null]} 
                  value={emergency} 
                  onChangeText={(v) => handleInputChange(setEmergency, v)}
                  keyboardType="number-pad"
                  placeholder="0"
                  placeholderTextColor={error ? COLORS.error : '#AAA'}
                  maxLength={3}
              />
              <Text style={[styles.suffix, error ? {color: COLORS.error} : null]}>%</Text>
            </View>
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
          </View>

          {/* SAVING INPUT */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Saving Budget Allocation</Text>
            <View style={styles.inputWrapper}>
              <TextInput 
                  style={styles.textInput} 
                  value={saving} 
                  onChangeText={(v) => handleInputChange(setSaving, v)}
                  keyboardType="number-pad"
                  placeholder="0"
                  maxLength={3}
              />
              <Text style={styles.suffix}>%</Text>
            </View>
          </View>

        </View>

        {/* FOOTER */}
        <View style={styles.footer}>
          <TouchableOpacity 
              style={[styles.saveButton, error ? styles.disabledButton : null]} 
              onPress={handleSave}
              disabled={!!error}
          >
              <Text style={styles.saveButtonText}>Save Setting</Text>
          </TouchableOpacity>
        </View>

      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bgScreen },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 20 },
  backButton: { padding: 5, marginLeft: -5 },
  headerTitle: { fontSize: 18, fontWeight: '700', color: COLORS.textMain },
  
  content: { padding: 20, flex: 1 },

  inputGroup: { marginBottom: 25 },
  label: { fontSize: 14, fontWeight: '600', marginBottom: 10, color: '#000' },
  inputWrapper: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    borderWidth: 1, 
    borderColor: '#000', 
    borderRadius: 8, 
    paddingHorizontal: 15,
    height: 50,
    width: 100 
  },
  textInput: { flex: 1, fontSize: 16, fontWeight: 'bold', color: '#000' },
  suffix: { fontSize: 16, fontWeight: 'bold', color: '#000' },

  errorText: { color: COLORS.error, fontSize: 12, marginTop: 5, fontWeight: 'bold' },

  footer: { padding: 20, paddingBottom: 30 },
  saveButton: { backgroundColor: COLORS.primary, height: 50, borderRadius: 25, justifyContent: 'center', alignItems: 'center', elevation: 2 },
  disabledButton: { backgroundColor: '#FFD1D1' },
  saveButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});