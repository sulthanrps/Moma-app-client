import { useLocalSearchParams, useRouter } from 'expo-router';
import { Calendar, ChevronDown, ChevronLeft } from 'lucide-react-native';
import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput, TouchableOpacity,
  View
} from 'react-native';

const COLORS = {
  primary: '#D98989', 
  textMain: '#000000',
  textSecondary: '#A0A0A0',
  border: '#E0E0E0',
  bgInput: '#FFFFFF',
  bgDisabled: '#EFEFEF',
  bgScreen: '#FFFFFF'
};

export default function EditTransactionScreen() {
  const router = useRouter();
  const params = useLocalSearchParams(); 

  const [activeTab, setActiveTab] = useState(params.type === 'income' ? 'Income' : 'Expenditure');
  const [date, setDate] = useState(params.date?.toString() || ''); 
  const [amount, setAmount] = useState(params.amount?.toString() || '');
  const [note, setNote] = useState(params.name?.toString() || '');
  const [wallet, setWallet] = useState(params.wallet?.toString() || '');
  const [category, setCategory] = useState(params.category?.toString() || '');

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <ChevronLeft color="#000" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{activeTab}</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* TABS (Income / Expenditure) */}
      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tabItem, activeTab === 'Income' && styles.tabItemActive]}
          onPress={() => setActiveTab('Income')}
        >
          <Text style={[styles.tabText, activeTab === 'Income' && styles.tabTextActive]}>Income</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.tabItem, activeTab === 'Expenditure' && styles.tabItemActive]}
          onPress={() => setActiveTab('Expenditure')}
        >
          <Text style={[styles.tabText, activeTab === 'Expenditure' && styles.tabTextActive]}>Expenditure</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.formContainer} showsVerticalScrollIndicator={false}>
        
        {/* DATE FIELD */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Date</Text>
          <View style={styles.inputWrapper}>
            <TextInput style={styles.textInput} value={date} onChangeText={setDate} />
            <Calendar color="#000" size={20} style={styles.inputIcon} />
          </View>
        </View>

        {/* AMOUNT FIELD */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Amount</Text>
          <View style={styles.inputWrapper}>
            <TextInput style={styles.textInput} keyboardType="numeric" value={amount} onChangeText={setAmount} />
          </View>
        </View>

        {/* WALLET FIELD */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Wallet</Text>
          <TouchableOpacity style={styles.inputWrapper}>
            <Text style={styles.inputText}>{wallet || "Select Wallet"}</Text>
            <ChevronDown color="#000" size={20} style={styles.inputIcon} />
          </TouchableOpacity>
        </View>

        {/* NOTE FIELD */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Note</Text>
          <View style={styles.inputWrapper}>
            <TextInput style={styles.textInput} value={note} onChangeText={setNote} />
          </View>
        </View>

        {/* CATEGORY FIELD */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Category</Text>
          <TouchableOpacity style={styles.inputWrapper}>
            <Text style={styles.inputText}>{category || "Select Category"}</Text>
            <ChevronDown color="#000" size={20} style={styles.inputIcon} />
          </TouchableOpacity>
        </View>

        {/* TYPE FIELD (Read Only) */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Type</Text>
          <View style={[styles.inputWrapper, styles.disabledInput]}>
            <Text style={styles.disabledText}>{activeTab}</Text>
          </View>
        </View>

        {/* EDIT BUTTON */}
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>Edit</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bgScreen },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 15 },
  headerTitle: { fontSize: 18, fontWeight: '700', color: COLORS.textMain },
  backButton: { padding: 5, marginLeft: -5 },
  tabContainer: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#F0F0F0' },
  tabItem: { flex: 1, alignItems: 'center', paddingVertical: 15, borderBottomWidth: 3, borderBottomColor: 'transparent' },
  tabItemActive: { borderBottomColor: COLORS.primary },
  tabText: { fontSize: 16, color: COLORS.textSecondary, fontWeight: '500' },
  tabTextActive: { color: COLORS.textMain, fontWeight: '700' },
  formContainer: { padding: 20, paddingBottom: 50 },
  inputGroup: { marginBottom: 20 },
  label: { fontSize: 14, fontWeight: '700', color: COLORS.textMain, marginBottom: 8 },
  inputWrapper: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.bgInput, borderWidth: 1, borderColor: COLORS.border, borderRadius: 12, height: 50, paddingHorizontal: 15, shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2, elevation: 1 },
  textInput: { flex: 1, fontSize: 14, color: COLORS.textMain, height: '100%' },
  inputText: { flex: 1, fontSize: 14, color: COLORS.textMain },
  inputIcon: { marginLeft: 10 },
  disabledInput: { backgroundColor: COLORS.bgDisabled, borderColor: 'transparent', shadowOpacity: 0, elevation: 0 },
  disabledText: { color: COLORS.textMain, fontSize: 14 },
  addButton: { backgroundColor: COLORS.primary, borderRadius: 25, height: 50, justifyContent: 'center', alignItems: 'center', marginTop: 20, shadowColor: COLORS.primary, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 5, elevation: 5 },
  addButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});