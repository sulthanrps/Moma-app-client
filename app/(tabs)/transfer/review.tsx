import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowDown, Car, ChevronDown, ChevronLeft, Coffee, Home, MoreHorizontal, User } from 'lucide-react-native';
import React, { useState } from 'react';
import {
  Dimensions,
  FlatList,
  Modal,
  SafeAreaView, StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

const { width } = Dimensions.get('window');

const COLORS = {
  primary: '#D98989',
  textMain: '#000000',
  textSecondary: '#A0A0A0',
  bgScreen: '#FFFFFF',
  bgInput: '#F5F5F5', // Abu-abu muda untuk input pill
  arrowColor: '#FF8C90',
};

// --- MOCK CATEGORIES ---
const CATEGORIES = [
  { id: '1', name: 'Food', icon: Coffee },
  { id: '2', name: 'Transport', icon: Car },
  { id: '3', name: 'Household', icon: Home },
  { id: '4', name: 'Others', icon: MoreHorizontal },
];

export default function ReviewTransactionScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  // State
  const [note, setNote] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(CATEGORIES[0]); // Default Food
  const [showCategoryPicker, setShowCategoryPicker] = useState(false);

  // Data dari halaman sebelumnya
  const amount = parseInt(params.amount?.toString() || '0', 10);
  const walletName = params.wallet?.toString() || 'Daily budget wallet';
  const bankName = params.bank?.toString() || 'BCA';
  const recipientName = "Adelia Kusumawati"; // Mock Name

  const formatRupiah = (num: number) => {
    return `Rp ${num.toLocaleString('id-ID')}`;
  };

  const handlePayNow = () => {
    console.log("Processing Payment...", { 
      ...params, 
      category: selectedCategory.name, 
      note 
    });
    router.push({
      pathname: '/(tabs)/transfer/pin',
      params: { 
        amount: amount, 
        bank: bankName,
        wallet: walletName,
        acc: params.acc // Bawa terus nomor rekeningnya
      }
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <ChevronLeft color="#000" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Review Transaction</Text>
        <View style={{ width: 24 }} /> 
      </View>

      <View style={styles.content}>
        
        {/* --- FLOW SECTION (FROM -> TO) --- */}
        <View style={styles.flowContainer}>
            
            {/* FROM */}
            <View style={styles.flowItem}>
                <View style={styles.iconCirclePurple}>
                    <User size={20} color="#8F80F8" />
                </View>
                <Text style={styles.flowText}>{walletName}</Text>
            </View>

            {/* ARROW CONNECTOR */}
            <View style={styles.connectorContainer}>
                <View style={styles.dotsLine} />
                <ArrowDown size={20} color={COLORS.arrowColor} />
            </View>

            {/* TO */}
            <View style={styles.flowItem}>
                <View style={styles.iconCircleBlue}>
                    {/* Placeholder Bank Icon */}
                    <Text style={{color:'#FFF', fontWeight:'bold'}}>{bankName[0]}</Text>
                </View>
                <View>
                    <Text style={styles.flowText}>{recipientName}</Text>
                    <Text style={styles.subText}>{bankName}</Text>
                </View>
            </View>
        </View>

        {/* --- AMOUNT SECTION --- */}
        <View style={styles.amountRow}>
            <Text style={styles.amountLabel}>Amount</Text>
            <Text style={styles.amountValue}>{formatRupiah(amount)}</Text>
        </View>

        {/* --- INPUTS SECTION (CATEGORY & NOTES) --- */}
        <View style={styles.inputRow}>
            
            {/* 1. CATEGORY PILL */}
            <TouchableOpacity 
                style={styles.categoryPill} 
                onPress={() => setShowCategoryPicker(true)}
            >
                <Text style={styles.categoryText}>{selectedCategory.name}</Text>
            </TouchableOpacity>

            {/* 2. NOTES PILL */}
            <View style={styles.notePill}>
                <TextInput
                    style={styles.noteInput}
                    placeholder="Notes (optional)"
                    placeholderTextColor="#A0A0A0"
                    value={note}
                    onChangeText={setNote}
                />
            </View>
        </View>

      </View>

      {/* FOOTER BUTTON */}
      <View style={styles.footer}>
         <TouchableOpacity style={styles.payButton} onPress={handlePayNow}>
             <Text style={styles.payButtonText}>Pay Now</Text>
         </TouchableOpacity>
      </View>


      {/* --- MODAL: CATEGORY PICKER --- */}
      <Modal visible={showCategoryPicker} transparent animationType="fade">
        <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={() => setShowCategoryPicker(false)}>
          <View style={styles.bottomSheet}>
            <View style={styles.bottomSheetHandle} />
            <Text style={styles.bottomSheetTitle}>Select Category</Text>
            <FlatList
              data={CATEGORIES}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => {
                const Icon = item.icon;
                return (
                  <TouchableOpacity 
                    style={styles.optionItem} 
                    onPress={() => {
                        setSelectedCategory(item);
                        setShowCategoryPicker(false);
                    }}
                  >
                    <View style={styles.optionIconContainer}>
                      <Icon size={20} color="#555" />
                    </View>
                    <Text style={styles.optionText}>{item.name}</Text>
                    {selectedCategory.id === item.id && (
                         <View style={{marginLeft: 'auto'}}>
                            <ChevronDown size={16} color={COLORS.primary} style={{transform: [{rotate:'-90deg'}]}} />
                         </View>
                    )}
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        </TouchableOpacity>
      </Modal>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bgScreen },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 20 },
  headerTitle: { fontSize: 18, fontWeight: '700' },
  backButton: { padding: 5, marginLeft: -5 },

  content: { padding: 20, flex: 1 },

  // Flow Section
  flowContainer: { marginBottom: 40 },
  flowItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 5 },
  iconCirclePurple: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#EFEAFF', justifyContent: 'center', alignItems: 'center', marginRight: 15 },
  iconCircleBlue: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#00529C', justifyContent: 'center', alignItems: 'center', marginRight: 15 },
  flowText: { fontSize: 14, fontWeight: '500', color: COLORS.textMain },
  subText: { fontSize: 12, color: COLORS.textSecondary },
  
  connectorContainer: { paddingLeft: 10, marginVertical: 5, marginBottom: 20, alignItems: 'flex-start' },
  dotsLine: { width: 1, height: 10, backgroundColor: 'transparent' }, 

  // Amount
  amountRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 30 },
  amountLabel: { fontSize: 14, color: COLORS.textMain },
  amountValue: { fontSize: 18, fontWeight: 'bold', color: COLORS.textMain },

  // Inputs
  inputRow: { flexDirection: 'row', gap: 10 },
  
  categoryPill: { 
    backgroundColor: '#E0E0E0', 
    paddingHorizontal: 20, 
    paddingVertical: 12, 
    borderRadius: 12,
    justifyContent: 'center' 
  },
  categoryText: { fontSize: 14, fontWeight: '500' },

  notePill: { 
    flex: 1, 
    backgroundColor: '#E0E0E0', 
    borderRadius: 12, 
    paddingHorizontal: 15,
    justifyContent: 'center'
  },
  noteInput: { fontSize: 14, color: COLORS.textMain, height: 45 },

  // Footer
  footer: { padding: 20, paddingBottom: 30 },
  payButton: { backgroundColor: COLORS.primary, height: 50, borderRadius: 25, justifyContent: 'center', alignItems: 'center', elevation: 5, shadowColor: COLORS.primary, shadowOpacity: 0.3, shadowRadius: 5 },
  payButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },

  // Modal
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  bottomSheet: { backgroundColor: '#fff', borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 20 },
  bottomSheetHandle: { width: 40, height: 4, backgroundColor: '#DDD', alignSelf: 'center', marginBottom: 20, borderRadius: 2 },
  bottomSheetTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 15 },
  optionItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: '#F5F5F5' },
  optionIconContainer: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#F0F0F5', justifyContent: 'center', alignItems: 'center', marginRight: 15 },
  optionText: { fontSize: 16, fontWeight: '500', color: '#333' },
});