import { useRouter } from 'expo-router';
import { Calendar, ChevronDown, ChevronLeft } from 'lucide-react-native';
import React, { useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

const COLORS = {
  primary: '#D98989', // Warna Pink/Salmon tombol & tab
  textMain: '#000000',
  textSecondary: '#A0A0A0',
  border: '#E0E0E0',
  bgInput: '#FFFFFF',
  bgDisabled: '#EFEFEF', // Untuk field 'Type'
  bgScreen: '#FFFFFF'
};

export default function AddTransactionScreen() {
  // State untuk Tab (Income vs Expenditure)
  const [activeTab, setActiveTab] = useState<'Income' | 'Expenditure'>('Income');
  
  // State Form (Dummy untuk UI)
  const [date, setDate] = useState('');
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');

  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}
            onPress={() => router.back()}
        >
          <ChevronLeft color="#000" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{activeTab}</Text> 
        {/* Title berubah dynamic ikut tab, atau bisa di-hardcode 'Income' jika mau statis */}
        <View style={{ width: 24 }} /> 
      </View>

      {/* TABS (Income / Expenditure) */}
      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tabItem, activeTab === 'Income' && styles.tabItemActive]}
          onPress={() => setActiveTab('Income')}
        >
          <Text style={[styles.tabText, activeTab === 'Income' && styles.tabTextActive]}>
            Income
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.tabItem, activeTab === 'Expenditure' && styles.tabItemActive]}
          onPress={() => setActiveTab('Expenditure')}
        >
          <Text style={[styles.tabText, activeTab === 'Expenditure' && styles.tabTextActive]}>
            Expenditure
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.formContainer} showsVerticalScrollIndicator={false}>
        
        {/* 1. DATE FIELD */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Date</Text>
          <View style={styles.inputWrapper}>
            <TextInput 
              style={styles.textInput} 
              placeholder="Select date"
              value={date}
              onChangeText={setDate}
            />
            <Calendar color="#000" size={20} style={styles.inputIcon} />
          </View>
        </View>

        {/* 2. AMOUNT FIELD */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Amount</Text>
          <View style={styles.inputWrapper}>
            <TextInput 
              style={styles.textInput} 
              placeholder=""
              keyboardType="numeric"
              value={amount}
              onChangeText={setAmount}
            />
          </View>
        </View>

        {/* 3. WALLET FIELD (Dropdown UI) */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Wallet</Text>
          <TouchableOpacity style={styles.inputWrapper}>
            <Text style={styles.placeholderText}>Select Wallet</Text> 
            {/* Ganti Text ini dengan state wallet terpilih nanti */}
            <ChevronDown color="#000" size={20} style={styles.inputIcon} />
          </TouchableOpacity>
        </View>

        {/* 4. NOTE FIELD */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Note</Text>
          <View style={styles.inputWrapper}>
            <TextInput 
              style={styles.textInput} 
              placeholder=""
              value={note}
              onChangeText={setNote}
            />
          </View>
        </View>

        {/* 5. CATEGORY FIELD (Dropdown UI) */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Category</Text>
          <TouchableOpacity style={styles.inputWrapper}>
            <Text style={styles.placeholderText}>Select Category</Text>
            <ChevronDown color="#000" size={20} style={styles.inputIcon} />
          </TouchableOpacity>
        </View>

        {/* 6. TYPE FIELD (Read Only / Disabled Look) */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Type</Text>
          <View style={[styles.inputWrapper, styles.disabledInput]}>
            <Text style={styles.disabledText}>{activeTab}</Text>
          </View>
        </View>

        {/* ADD BUTTON */}
        <TouchableOpacity 
            style={styles.addButton}
            onPress={() => router.back()}
            >
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bgScreen,
  },
  // --- HEADER ---
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.textMain,
  },
  backButton: {
    padding: 5,
    marginLeft: -5,
  },

  // --- TABS ---
  tabContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 3,
    borderBottomColor: 'transparent',
  },
  tabItemActive: {
    borderBottomColor: COLORS.primary, // Garis merah muda di bawah tab aktif
  },
  tabText: {
    fontSize: 16,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  tabTextActive: {
    color: COLORS.textMain,
    fontWeight: '700',
  },

  // --- FORM ---
  formContainer: {
    padding: 20,
    paddingBottom: 50, // Space for bottom scroll
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.textMain,
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.bgInput,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    height: 50,
    paddingHorizontal: 15,
    // Shadow tipis biar mirip screenshot
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  textInput: {
    flex: 1,
    fontSize: 14,
    color: COLORS.textMain,
    height: '100%',
  },
  inputIcon: {
    marginLeft: 10,
  },
  placeholderText: {
    flex: 1,
    fontSize: 14,
    color: '#C0C0C0', // Warna placeholder abu-abu
  },
  
  // Disabled / Read Only Style
  disabledInput: {
    backgroundColor: COLORS.bgDisabled,
    borderColor: 'transparent',
    shadowOpacity: 0,
    elevation: 0,
  },
  disabledText: {
    color: COLORS.textMain,
    fontSize: 14,
  },

  // --- BUTTON ---
  addButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 25, // Membuat tombol rounded
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});