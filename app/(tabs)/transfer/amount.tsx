import { useLocalSearchParams, useRouter } from 'expo-router';
import { ChevronDown, ChevronLeft, Wallet, X } from 'lucide-react-native';
import React, { useState } from 'react';
import {
  Dimensions,
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native';

const { width } = Dimensions.get('window');

const COLORS = {
  primary: '#D98989',
  textMain: '#000000',
  textSecondary: '#A0A0A0',
  error: '#EF4444',
  bgScreen: '#FFFFFF',
};

const WALLETS = [
  { id: '1', name: 'Daily Budget wallet', balance: 50000, type: 'daily' },
  { id: '2', name: 'Emergency wallet', balance: 450000, type: 'emergency' },
];

const EMERGENCY_USAGE_COUNT = 3;
const EMERGENCY_LIMIT = 3;

export default function TransferAmountScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const [amount, setAmount] = useState('');
  const [selectedWallet, setSelectedWallet] = useState(WALLETS[0]);
  const [showWalletPicker, setShowWalletPicker] = useState(false);
  const [showLimitModal, setShowLimitModal] = useState(false);
  const [error, setError] = useState('');

  const handleWalletSelect = (wallet: any) => {
    if (wallet.type === 'emergency') {
      if (EMERGENCY_USAGE_COUNT >= EMERGENCY_LIMIT) {
        setShowWalletPicker(false);
        setTimeout(() => setShowLimitModal(true), 300);
        return;
      }
    }

    setSelectedWallet(wallet);
    setShowWalletPicker(false);
    setError('');
  };

  const handleNext = () => {
    Keyboard.dismiss();
    const currentAmount = parseInt(amount || '0', 10);

    if (currentAmount < 10000) {
      setError('Minimum transfer is Rp 10.000');
      return;
    }

    if (currentAmount > selectedWallet.balance) {
      setError("You don't have enough balance");
      return;
    }

    console.log("Transfer Valid:", {
      to: params.bank,
      acc: params.acc,
      amount: currentAmount,
      wallet: selectedWallet.name
    });

    router.push({
      pathname: '/(tabs)/transfer/review',
      params: {
        bank: params.bank,
        acc: params.acc,
        amount: currentAmount,
        wallet: selectedWallet.name
      }
    });
  };

  const handleAmountChange = (text: string) => {
    const numericValue = text.replace(/[^0-9]/g, '');
    setAmount(numericValue);
    if (error) setError('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 50 : 0}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{ flex: 1 }}>

            <View style={styles.header}>
              <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                <ChevronLeft color="#000" size={24} />
              </TouchableOpacity>
              <Text style={styles.headerTitle}>Payment</Text>
              <View style={{ width: 24 }} />
            </View>

            <ScrollView
              contentContainerStyle={styles.scrollContent}
              keyboardShouldPersistTaps="handled"
            >

              <View style={styles.recipientCard}>
                <View style={styles.bankIconPlaceholder}>
                  <Text style={{ fontWeight: 'bold', color: '#fff' }}>{params.bank ? params.bank[0] : 'B'}</Text>
                </View>
                <View>
                  <Text style={styles.recipientName}>Adella Kusumawati</Text>
                  <Text style={styles.recipientBank}>{params.bank || 'BCA'} • {params.acc || '12345678'}</Text>
                </View>
              </View>

              <View style={styles.amountContainer}>
                <View style={styles.inputRow}>
                  <Text style={styles.currencyPrefix}>Rp</Text>
                  <TextInput
                    style={styles.amountInput}
                    value={amount}
                    onChangeText={handleAmountChange}
                    placeholder="0"
                    placeholderTextColor="#DDD"
                    keyboardType="number-pad"
                    autoFocus={true}
                  />
                </View>

                <View style={[styles.underline, error ? { backgroundColor: COLORS.error } : null]} />

                {error ? (
                  <Text style={styles.errorText}>{error}</Text>
                ) : (
                  <Text style={styles.helperText}>*Enter amount to be paid</Text>
                )}
              </View>

              <View style={styles.walletSelectorContainer}>
                <View style={styles.walletSelectorLeftContainer}>
                  <Text style={styles.fromText}>From</Text>
                  <TouchableOpacity style={styles.walletBtn} onPress={() => {
                    Keyboard.dismiss();
                    setShowWalletPicker(true);
                  }}>
                    <Text style={styles.walletBtnText}>{selectedWallet.name}</Text>
                    <ChevronDown size={16} color="#000" />
                  </TouchableOpacity>
                </View>
                <Text style={styles.balanceText}>
                  Rp {selectedWallet.balance.toLocaleString('id-ID')}
                </Text>
              </View>

            </ScrollView>

            <View style={styles.footer}>
              <TouchableOpacity
                style={[styles.nextButton, !amount ? styles.nextButtonDisabled : null]}
                onPress={handleNext}
                disabled={!amount}
              >
                <Text style={styles.nextButtonText}>Next</Text>
              </TouchableOpacity>
            </View>

          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>

      <Modal visible={showWalletPicker} transparent animationType="fade">
        <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={() => setShowWalletPicker(false)}>
          <View style={styles.bottomSheet}>
            <View style={styles.bottomSheetHandle} />
            <Text style={styles.bottomSheetTitle}>Select Source Wallet</Text>
            <FlatList
              data={WALLETS}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.walletOption} onPress={() => handleWalletSelect(item)}>
                  <View style={styles.walletIconBg}>
                    <Wallet size={20} color="#555" />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.walletName}>{item.name}</Text>
                    {item.type === 'emergency' && (
                      <Text style={styles.quotaText}>
                        Usage: <Text style={{ color: COLORS.error }}>{EMERGENCY_USAGE_COUNT}/3 used</Text>
                      </Text>
                    )}
                  </View>
                  <Text style={styles.walletBalance}>Rp {item.balance.toLocaleString('id-ID')}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>

      <Modal visible={showLimitModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.limitCard}>
            <View style={styles.crossIconContainer}>
              <X size={50} color={COLORS.error} strokeWidth={4} />
            </View>
            <Text style={styles.limitMainText}>
              You have reach your limit on using the Emergency budget!
            </Text>
            <TouchableOpacity style={styles.returnButton} onPress={() => setShowLimitModal(false)}>
              <Text style={styles.returnButtonText}>Return</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bgScreen },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 20, backgroundColor: '#fff' },
  headerTitle: { fontSize: 18, fontWeight: '700' },
  backButton: { padding: 5, marginLeft: -5 },

  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 20
  },

  recipientCard: { flexDirection: 'row', alignItems: 'center', marginBottom: 30 },
  bankIconPlaceholder: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#00529C', justifyContent: 'center', alignItems: 'center', marginRight: 15 },
  recipientName: { fontSize: 16, fontWeight: 'bold' },
  recipientBank: { fontSize: 14, color: COLORS.textSecondary },

  amountContainer: { marginBottom: 30 },
  inputRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 5 },
  currencyPrefix: { fontSize: 32, fontWeight: 'bold', color: COLORS.textMain, marginRight: 5 },
  amountInput: { flex: 1, fontSize: 32, fontWeight: 'bold', color: COLORS.textMain, padding: 0 },

  underline: { height: 1, backgroundColor: '#E0E0E0', width: '100%', marginBottom: 8 },
  helperText: { fontSize: 12, color: COLORS.error },
  errorText: { fontSize: 12, color: COLORS.error, fontWeight: 'bold' },

  walletSelectorContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  fromText: { color: COLORS.textSecondary, marginRight: 10 },
  walletBtn: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  walletBtnText: { fontWeight: 'bold', fontSize: 14, borderBottomWidth: 4, borderBottomColor: COLORS.primary, paddingBottom: 4 },
  balanceText: { fontWeight: 'bold', fontSize: 14 },

  footer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: 10,
    backgroundColor: '#fff',
  },

  nextButton: { backgroundColor: COLORS.primary, height: 50, borderRadius: 25, justifyContent: 'center', alignItems: 'center', shadowColor: COLORS.primary, shadowOpacity: 0.3, shadowRadius: 5, elevation: 5 },
  nextButtonDisabled: { backgroundColor: '#E0E0E0', shadowOpacity: 0, elevation: 0 },
  nextButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },

  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  bottomSheet: { backgroundColor: '#fff', borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 20 },
  bottomSheetHandle: { width: 40, height: 4, backgroundColor: '#DDD', alignSelf: 'center', marginBottom: 20, borderRadius: 2 },
  bottomSheetTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 15 },
  walletOption: { flexDirection: 'row', alignItems: 'center', paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: '#F5F5F5' },
  walletIconBg: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#F0F0F5', justifyContent: 'center', alignItems: 'center', marginRight: 15 },
  walletName: { fontSize: 14, fontWeight: 'bold' },
  walletBalance: { fontSize: 14, fontWeight: 'bold' },
  quotaText: { fontSize: 12, color: '#888', marginTop: 2 },
  limitCard: { backgroundColor: '#fff', margin: 40, padding: 20, borderRadius: 20, alignItems: 'center', alignSelf: 'center', marginBottom: 'auto', marginTop: 'auto', elevation: 10 },
  limitHeaderSmall: { fontSize: 10, color: '#000', marginBottom: 15 },
  crossIconContainer: { marginBottom: 15 },
  limitMainText: { fontSize: 14, textAlign: 'center', fontWeight: 'bold', color: '#000', marginBottom: 20, paddingHorizontal: 10 },
  returnButton: { backgroundColor: '#FF9F9F', paddingVertical: 10, paddingHorizontal: 30, borderRadius: 20 },
  returnButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 14 },
  walletSelectorLeftContainer: {
    flexDirection: 'row'
  }
});