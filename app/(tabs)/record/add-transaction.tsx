import { useRouter } from 'expo-router';
import { Calendar as CalendarIcon, Car, Check, ChevronDown, ChevronLeft, Coffee, Home, MoreHorizontal, User } from 'lucide-react-native';
import React, { useState } from 'react';
import {
  Dimensions,
  FlatList,
  Modal,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput, TouchableOpacity,
  View
} from 'react-native';
import { Calendar, DateData } from 'react-native-calendars'; // Library Kalender

const { width } = Dimensions.get('window');

const COLORS = {
  primary: '#D98989', 
  textMain: '#000000',
  textSecondary: '#A0A0A0',
  border: '#E0E0E0',
  bgInput: '#FFFFFF',
  bgScreen: '#FFFFFF',
  successGreen: '#22C55E'
};

const WALLETS = [
  { id: '1', name: 'Daily Budget wallet', icon: User },
  { id: '2', name: 'Emergency wallet', icon: User },
];

const CATEGORIES = [
  { id: '1', name: 'Household', icon: Home },
  { id: '2', name: 'Food', icon: Coffee },
  { id: '3', name: 'Transportation', icon: Car },
  { id: '4', name: 'Others', icon: MoreHorizontal },
];

export default function AddTransactionScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'Income' | 'Expenditure'>('Income');
  
  const [date, setDate] = useState('');
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [selectedWallet, setSelectedWallet] = useState<any>(null);
  const [selectedCategory, setSelectedCategory] = useState<any>(null);

  const [showCalendar, setShowCalendar] = useState(false);
  const [showWalletPicker, setShowWalletPicker] = useState(false);
  const [showCategoryPicker, setShowCategoryPicker] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleDayPress = (day: DateData) => {
    setDate(day.dateString);
    setShowCalendar(false);
  };

  const handleSave = () => {
    if (!amount) return; 
    setShowSuccessModal(true);
  };

  const handleFinish = () => {
    setShowSuccessModal(false);
    router.back();
  };

  const SelectionModal = ({ visible, onClose, title, data, onSelect }: any) => (
    <Modal visible={visible} transparent animationType="fade">
      <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={onClose}>
        <View style={styles.bottomSheet}>
          <View style={styles.bottomSheetHandle} />
          <Text style={styles.bottomSheetTitle}>{title}</Text>
          <FlatList
            data={data}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
              const Icon = item.icon;
              return (
                <TouchableOpacity 
                  style={styles.optionItem} 
                  onPress={() => {
                    onSelect(item);
                    onClose();
                  }}
                >
                  <View style={styles.optionIconContainer}>
                    <Icon size={20} color="#555" />
                  </View>
                  <Text style={styles.optionText}>{item.name}</Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </TouchableOpacity>
    </Modal>
  );

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

      {/* TABS */}
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
        
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Date</Text>
          <TouchableOpacity style={styles.inputWrapper} onPress={() => setShowCalendar(true)}>
            <Text style={date ? styles.inputText : styles.placeholderText}>
              {date || "Select date"}
            </Text>
            <CalendarIcon color="#000" size={20} style={styles.inputIcon} />
          </TouchableOpacity>
        </View>

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

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Wallet</Text>
          <TouchableOpacity style={styles.inputWrapper} onPress={() => setShowWalletPicker(true)}>
            <Text style={selectedWallet ? styles.inputText : styles.placeholderText}>
              {selectedWallet?.name || "Select Wallet"}
            </Text>
            <ChevronDown color="#000" size={20} style={styles.inputIcon} />
          </TouchableOpacity>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Note</Text>
          <View style={styles.inputWrapper}>
            <TextInput 
              style={styles.textInput} 
              value={note}
              onChangeText={setNote}
            />
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Category</Text>
          <TouchableOpacity style={styles.inputWrapper} onPress={() => setShowCategoryPicker(true)}>
            <Text style={selectedCategory ? styles.inputText : styles.placeholderText}>
              {selectedCategory?.name || "Select Category"}
            </Text>
            <ChevronDown color="#000" size={20} style={styles.inputIcon} />
          </TouchableOpacity>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Type</Text>
          <View style={[styles.inputWrapper, styles.disabledInput]}>
            <Text style={styles.disabledText}>{activeTab}</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.addButton} onPress={handleSave}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>

      </ScrollView>

      <Modal visible={showCalendar} transparent animationType="fade">
        <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={() => setShowCalendar(false)}>
          <View style={styles.calendarContainer}>
            <Calendar
              onDayPress={handleDayPress}
              markedDates={{
                [date]: {selected: true, disableTouchEvent: true, selectedDotColor: 'orange'}
              }}
              theme={{
                selectedDayBackgroundColor: '#00adf5', // Biru lingkaran sesuai gambar
                todayTextColor: '#00adf5',
                arrowColor: 'blue',
              }}
            />
          </View>
        </TouchableOpacity>
      </Modal>

      <SelectionModal 
        visible={showWalletPicker}
        onClose={() => setShowWalletPicker(false)}
        title="Select Wallet"
        data={WALLETS}
        onSelect={setSelectedWallet}
      />

      <SelectionModal 
        visible={showCategoryPicker}
        onClose={() => setShowCategoryPicker(false)}
        title="Select Category"
        data={CATEGORIES}
        onSelect={setSelectedCategory}
      />

      <Modal visible={showSuccessModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.successCard}>
            <View style={styles.successIconContainer}>
               <View style={styles.successCircle}>
                  <Check size={40} color={COLORS.successGreen} />
               </View>
            </View>

            <Text style={styles.successTitle}>Transaction has been added !</Text>
            
            <TouchableOpacity style={styles.successButton} onPress={handleFinish}>
              <Text style={styles.successButtonText}>Next</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

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
  inputWrapper: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.bgInput, borderWidth: 1, borderColor: COLORS.border, borderRadius: 12, height: 50, paddingHorizontal: 15 },
  textInput: { flex: 1, fontSize: 14, color: COLORS.textMain, height: '100%' },
  inputText: { flex: 1, fontSize: 14, color: COLORS.textMain },
  placeholderText: { flex: 1, fontSize: 14, color: '#C0C0C0' },
  inputIcon: { marginLeft: 10 },
  disabledInput: { backgroundColor: '#EFEFEF', borderColor: 'transparent' },
  disabledText: { color: COLORS.textMain, fontSize: 14 },
  
  addButton: { backgroundColor: COLORS.primary, borderRadius: 25, height: 50, justifyContent: 'center', alignItems: 'center', marginTop: 20, elevation: 5 },
  addButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' },

  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
  
  calendarContainer: { width: width - 40, backgroundColor: '#fff', borderRadius: 15, padding: 10, elevation: 5 },

  bottomSheet: { width: '100%', backgroundColor: '#fff', borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 20, position: 'absolute', bottom: 0, maxHeight: '50%' },
  bottomSheetHandle: { width: 40, height: 4, backgroundColor: '#DDD', borderRadius: 2, alignSelf: 'center', marginBottom: 20 },
  bottomSheetTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 15 },
  optionItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: '#F5F5F5' },
  optionIconContainer: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#F0F0F5', justifyContent: 'center', alignItems: 'center', marginRight: 15 },
  optionText: { fontSize: 16, fontWeight: '500', color: '#333' },

  successCard: { width: width - 60, backgroundColor: '#fff', borderRadius: 20, padding: 30, alignItems: 'center', elevation: 10 },
  successIconContainer: { marginBottom: 20 },
  successCircle: { width: 80, height: 80, borderRadius: 40, borderWidth: 3, borderColor: COLORS.successGreen, justifyContent: 'center', alignItems: 'center', borderStyle: 'dashed' }, // Simple imitation of starburst
  successTitle: { fontSize: 16, fontWeight: 'bold', textAlign: 'center', marginBottom: 25 },
  successButton: { backgroundColor: '#FF9F9F', width: '100%', paddingVertical: 12, borderRadius: 25, alignItems: 'center' },
  successButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' }
});