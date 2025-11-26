import { useLocalSearchParams, useRouter } from 'expo-router';
import { Check, ChevronLeft, Delete, Hourglass, X } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  Modal,
  SafeAreaView, StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

const { width, height } = Dimensions.get('window');

const COLORS = {
  primary: '#D98989',
  textMain: '#000000',
  textSecondary: '#A0A0A0',
  error: '#EF4444',
  success: '#22C55E',
  warning: '#F59E0B',
  bgScreen: '#FFFFFF',
  bgKeypad: '#F2F2F2',
};

const CORRECT_PIN = "000000";

export default function PinScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  
  const amount = parseInt(params.amount?.toString() || '0', 10);
  const bankName = params.bank?.toString() || 'BCA';
  const recipientName = "Adelia Kusumawati";

  const [pin, setPin] = useState('');
  const [status, setStatus] = useState<'idle' | 'failed' | 'validating' | 'success'>('idle');

  const handlePressKey = (val: string) => {
    if (status !== 'idle') return; 

    if (val === 'backspace') {
      setPin((prev) => prev.slice(0, -1));
    } else {
      if (pin.length < 6) {
        setPin((prev) => prev + val);
      }
    }
  };

  useEffect(() => {
    if (pin.length === 6) {
      if (pin === CORRECT_PIN) {
        startValidation();
      } else {
        setStatus('failed');
      }
    }
  }, [pin]);

  const startValidation = () => {
    setStatus('validating');
    
    setTimeout(() => {
      setStatus('success');
    }, 5000);
  };

  const handleRetry = () => {
    setPin('');
    setStatus('idle');
  };

  const handleDone = () => {
    router.dismissAll(); 

    setTimeout(() => {
        router.push('/(tabs)/record');
    })
  };

  const renderDots = () => {
    return (
      <View style={styles.dotsContainer}>
        {[...Array(6)].map((_, i) => (
          <View 
            key={i} 
            style={[
              styles.dot, 
              i < pin.length ? styles.dotFilled : styles.dotEmpty
            ]} 
          />
        ))}
      </View>
    );
  };

  const formatRupiah = (num: number) => `Rp ${num.toLocaleString('id-ID')}`;

  if (status === 'validating' || status === 'success') {
    const isSuccess = status === 'success';

    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />
        
        <View style={styles.resultContent}>
            
            <View style={styles.resultIconContainer}>
                {isSuccess ? (
                   <View style={styles.successBadge}>
                       <Check size={40} color="#FFF" strokeWidth={3} />
                   </View>
                ) : (
                   <Hourglass size={60} color="#000" strokeWidth={1.5} />
                )}
            </View>

            <Text style={styles.statusTitle}>
                {isSuccess ? 'Transaction Success' : 'Validating Transaction...'}
            </Text>

            <View style={styles.receiptCard}>
                <View style={styles.receiptHeader}>
                    <View style={styles.bankIconPlaceholder}>
                        <Text style={{color:'#FFF', fontWeight:'bold'}}>{bankName[0]}</Text>
                    </View>
                    <View>
                        <Text style={styles.receiptName}>{recipientName}</Text>
                        <Text style={styles.receiptBank}>{bankName}</Text>
                    </View>
                </View>

                <View style={styles.divider} />

                <View style={styles.amountRow}>
                    <Text style={styles.receiptAmount}>{formatRupiah(amount)}</Text>
                    <View style={[
                        styles.statusBadge, 
                        isSuccess ? { backgroundColor: '#D1FAE5' } : { backgroundColor: '#FEF3C7' }
                    ]}>
                        <Text style={[
                            styles.statusBadgeText,
                            isSuccess ? { color: COLORS.success } : { color: COLORS.warning }
                        ]}>
                            {isSuccess ? 'Success' : 'Validating'}
                        </Text>
                    </View>
                </View>

                {isSuccess ? (
                    <View style={styles.detailContainer}>
                        <View style={styles.detailRow}>
                            <Text style={styles.detailLabel}>Transaction ID</Text>
                            <Text style={styles.detailValue}>25000113</Text>
                        </View>
                        <View style={styles.detailRow}>
                            <Text style={styles.detailLabel}>Account Source</Text>
                            <Text style={styles.detailValue}>{params.wallet || 'Daily Wallet'}</Text>
                        </View>
                        <View style={styles.detailRow}>
                            <Text style={styles.detailLabel}>Date & Time</Text>
                            <Text style={styles.detailValue}>17 May 2025, 18:45 WIB</Text>
                        </View>
                    </View>
                ) : (
                    <View style={styles.validatingBox}>
                        <Text style={styles.validatingTextBold}>Please wait...</Text>
                        <Text style={styles.validatingText}>
                            We're still waiting for confirmation from Provider
                        </Text>
                    </View>
                )}
            </View>
        </View>

        <View style={styles.footer}>
             <TouchableOpacity 
                style={[styles.doneButton, !isSuccess && styles.doneButtonDisabled]} 
                onPress={handleDone}
                disabled={!isSuccess}
             >
                 <Text style={styles.doneButtonText}>Done</Text>
             </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <ChevronLeft color="#000" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Enter PIN</Text>
        <View style={{ width: 24 }} /> 
      </View>

      <View style={styles.pinArea}>
          {renderDots()}
      </View>

      <View style={styles.keypadContainer}>
         {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
           <TouchableOpacity key={num} style={styles.keypadBtn} onPress={() => handlePressKey(num.toString())}>
             <Text style={styles.keypadText}>{num}</Text>
           </TouchableOpacity>
         ))}
         <View style={styles.keypadBtn} /> 
         <TouchableOpacity style={styles.keypadBtn} onPress={() => handlePressKey('0')}>
             <Text style={styles.keypadText}>0</Text>
         </TouchableOpacity>
         <TouchableOpacity style={styles.keypadBtn} onPress={() => handlePressKey('backspace')}>
             <Delete size={24} color="#000" />
         </TouchableOpacity>
      </View>

      <Modal visible={status === 'failed'} transparent animationType="fade">
        <View style={styles.modalOverlay}>
           <View style={styles.errorCard}>
              <View style={styles.crossIconContainer}>
                 <X size={50} color={COLORS.error} strokeWidth={4} />
              </View>

              <Text style={styles.errorMainText}>
                You Inputted the wrong PIN !
              </Text>

              <TouchableOpacity style={styles.retryButton} onPress={handleRetry}>
                 <Text style={styles.retryButtonText}>Retry</Text>
              </TouchableOpacity>
           </View>
        </View>
      </Modal>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bgScreen },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 20 },
  headerTitle: { fontSize: 18, fontWeight: '700' },
  backButton: { padding: 5, marginLeft: -5 },

  pinArea: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingBottom: 50 },
  dotsContainer: { flexDirection: 'row', gap: 20 },
  dot: { width: 16, height: 16, borderRadius: 8 },
  dotEmpty: { backgroundColor: '#E0E0E0' },
  dotFilled: { backgroundColor: COLORS.primary },

  keypadContainer: { flexDirection: 'row', flexWrap: 'wrap', backgroundColor: COLORS.bgKeypad, paddingVertical: 20, borderTopLeftRadius: 30, borderTopRightRadius: 30 },
  keypadBtn: { width: width / 3, height: 80, justifyContent: 'center', alignItems: 'center' },
  keypadText: { fontSize: 24, fontWeight: '600', color: '#000' },

  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
  errorCard: { backgroundColor: '#fff', width: width * 0.8, padding: 30, borderRadius: 20, alignItems: 'center', elevation: 10 },
  crossIconContainer: { marginBottom: 20 },
  errorMainText: { fontSize: 16, textAlign: 'center', fontWeight: 'bold', color: '#000', marginBottom: 25 },
  retryButton: { backgroundColor: '#FF9F9F', paddingVertical: 12, paddingHorizontal: 40, borderRadius: 25 },
  retryButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 14 },

  resultContent: { flex: 1, alignItems: 'center', paddingTop: 40, paddingHorizontal: 20 },
  resultIconContainer: { marginBottom: 20 },
  successBadge: { width: 80, height: 80, borderRadius: 40, backgroundColor: COLORS.success, justifyContent: 'center', alignItems: 'center', elevation: 5 },
  statusTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 30 },
  
  receiptCard: { width: '100%', backgroundColor: '#FFF', borderRadius: 16, padding: 20, elevation: 3, shadowColor: "#000", shadowOffset: {width:0, height:2}, shadowOpacity: 0.1, shadowRadius: 4 },
  receiptHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
  bankIconPlaceholder: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#00529C', justifyContent: 'center', alignItems: 'center', marginRight: 15 },
  receiptName: { fontSize: 14, fontWeight: 'bold' },
  receiptBank: { fontSize: 12, color: COLORS.textSecondary },
  divider: { height: 1, backgroundColor: '#E0E0E0', marginVertical: 10 },
  
  amountRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  receiptAmount: { fontSize: 24, fontWeight: 'bold', color: '#000' },
  statusBadge: { paddingHorizontal: 12, paddingVertical: 4, borderRadius: 12 },
  statusBadgeText: { fontSize: 12, fontWeight: 'bold' },

  validatingBox: { backgroundColor: '#F9F9F9', padding: 15, borderRadius: 12 },
  validatingTextBold: { fontWeight: 'bold', marginBottom: 5 },
  validatingText: { color: '#888', fontSize: 12 },

  detailContainer: { marginTop: 10 },
  detailRow: { marginBottom: 15 },
  detailLabel: { fontSize: 12, color: '#888', marginBottom: 4 },
  detailValue: { fontSize: 14, fontWeight: '500', color: '#000' },

  footer: { padding: 20, paddingBottom: 30 },
  doneButton: { backgroundColor: COLORS.primary, height: 50, borderRadius: 25, justifyContent: 'center', alignItems: 'center', elevation: 5 },
  doneButtonDisabled: { backgroundColor: '#FFD1D1' },
  doneButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});