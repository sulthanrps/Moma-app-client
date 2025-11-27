import { useRouter } from 'expo-router';
import { Eye, EyeOff, LogOut, Monitor, PiggyBank, ShieldCheck, Wallet } from 'lucide-react-native'; // Tambah Eye
import React, { useState } from 'react';
import {
  Dimensions,
  Image, Modal,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

const { width } = Dimensions.get('window');

const COLORS = {
  primary: '#D98989', 
  bgScreen: '#F8F9FA', 
  textMain: '#000000',
  textSecondary: '#666666',
  
  cardSecured: '#86D2A3', 
  cardDaily: '#7F8CBE',   
  cardSaving: '#AED581',  
  cardSos: '#C98B8B',     
};

export default function HomeScreen() {
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  
  const [isBalanceVisible, setIsBalanceVisible] = useState(true);

  const handleLogoutConfirm = () => {
    setModalVisible(false);
    router.replace('/login');
  };

  const displayBalance = (amount: number, prefix = 'Rp') => {
    if (isBalanceVisible) {
      return `${prefix}${amount.toLocaleString('id-ID')}`;
    }
    return '••••••';
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8F9FA" />
      
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          
          <View style={styles.header}>
            <View style={styles.userInfo}>
              <Image 
                source={{ uri: 'https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg' }} 
                style={styles.avatar} 
              />
              <View>
                <Text style={styles.greeting}>Hai,</Text>
                <Text style={styles.username}>Siti Kurnia</Text>
              </View>
            </View>
            
            <TouchableOpacity style={styles.logoutButton} onPress={() => setModalVisible(true)}>
              <LogOut size={16} color="#EF4444" style={{marginRight: 4}} />
              <Text style={styles.logoutText}>logout</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.mainCard}>
             <View style={styles.mainCardLabel}>
                <Text style={{fontSize: 20, marginRight: 5}}>💰</Text>
                <Text style={styles.mainCardTitle}>Total Saldo</Text>
             </View>
             <Text style={styles.mainBalance}>
               {isBalanceVisible ? 'Rp3.000.000,00' : '••••••••'}
             </Text>
          </View>

          <View style={styles.statsRow}>
             <View style={styles.statCard}>
                <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 5}}>
                   <Monitor size={16} color="#555" />
                   <Text style={styles.statLabel}> Daily budget used</Text>
                </View>
                <Text style={styles.statValue}>
                  {isBalanceVisible ? 'Rp 0' : '•••'} 
                  <Text style={{color: '#AAA'}}> / {isBalanceVisible ? 'Rp 80.000' : '•••'}</Text>
                </Text>
             </View>

             <View style={styles.statCard}>
                <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 5}}>
                   <Text style={{color: '#F87171', fontWeight: 'bold', marginRight: 4}}>SOS</Text>
                   <Text style={styles.statLabel}>quota left</Text>
                </View>
                <Text style={styles.statValue}>0/3</Text>
             </View>
          </View>

          <View style={styles.walletSection}>
             <View style={styles.walletHeader}>
                <Text style={styles.sectionTitle}>Wallets</Text>
                
                <TouchableOpacity onPress={() => setIsBalanceVisible(!isBalanceVisible)}>
                  {isBalanceVisible ? (
                    <Eye size={22} color="#000" />
                  ) : (
                    <EyeOff size={22} color="#000" />
                  )}
                </TouchableOpacity>
             </View>

             <View style={styles.gridContainer}>
                
                <TouchableOpacity 
                  style={[styles.walletCard, { backgroundColor: COLORS.cardSecured }]}
                  onPress={() => router.push('/allocation')}
                >
                   <View style={styles.walletIconBg}><ShieldCheck size={24} color="#FFF" /></View>
                   <View style={{marginTop: 10}}>
                      <Text style={styles.walletTitle}>Secured Budget</Text>
                      <Text style={styles.walletAmount}>{displayBalance(0)}</Text>
                      <Text style={styles.walletDesc}>Allocate your money here</Text>
                   </View>
                </TouchableOpacity>

                <View style={[styles.walletCard, { backgroundColor: COLORS.cardDaily }]}>
                   <View style={styles.walletHeaderRow}>
                      <View style={styles.walletIconBg}><Wallet size={24} color="#FFF" /></View>
                      <Text style={styles.quotaText}>1/30</Text>
                   </View>
                   <View style={{marginTop: 10}}>
                      <Text style={styles.walletTitle}>Daily Budget</Text>
                      <Text style={styles.walletAmount}>{displayBalance(2400000)}</Text>
                      <Text style={styles.walletDesc}>Budget you can use in a day</Text>
                   </View>
                </View>

                <View style={[styles.walletCard, { backgroundColor: COLORS.cardSaving }]}>
                   <View style={styles.walletIconBg}><PiggyBank size={24} color="#FFF" /></View>
                   <View style={{marginTop: 10}}>
                      <Text style={styles.walletTitle}>Saving Wallet</Text>
                      <Text style={styles.walletAmount}>{displayBalance(150000)}</Text>
                      <Text style={styles.walletDesc}>Piggybank for saving money</Text>
                   </View>
                </View>

                <View style={[styles.walletCard, { backgroundColor: COLORS.cardSos }]}>
                   <View style={styles.walletIconBg}><Text style={{color:'#FFF', fontWeight:'900', fontSize: 16}}>SOS</Text></View>
                   <View style={{marginTop: 10}}>
                      <Text style={styles.walletTitle}>Emergency Money</Text>
                      <Text style={styles.walletAmount}>{displayBalance(450000)}</Text>
                      <Text style={styles.walletDesc}>Emergency-only budget</Text>
                   </View>
                </View>

             </View>
          </View>

        </ScrollView>
      </SafeAreaView>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            
            <View style={styles.logoutIconContainer}>
               <LogOut size={40} color="#000" style={{ marginLeft: 5 }} /> 
            </View>

            <Text style={styles.modalText}>Are you sure want to logout ?</Text>

            <View style={styles.modalButtonRow}>
              <TouchableOpacity 
                style={styles.cancelButton} 
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.confirmButton} 
                onPress={handleLogoutConfirm}
              >
                <Text style={styles.confirmButtonText}>Continue</Text>
              </TouchableOpacity>
            </View>

          </View>
        </View>
      </Modal>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bgScreen },
  safeArea: { flex: 1 },
  scrollContent: { padding: 20, paddingBottom: 40 },

  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 25 },
  userInfo: { flexDirection: 'row', alignItems: 'center' },
  avatar: { width: 50, height: 50, borderRadius: 25, marginRight: 12, backgroundColor: '#DDD' },
  greeting: { fontSize: 14, color: '#666' },
  username: { fontSize: 18, fontWeight: 'bold', color: '#000' },
  logoutButton: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFE5E5', paddingVertical: 6, paddingHorizontal: 12, borderRadius: 8, borderWidth: 1, borderColor: '#FCA5A5' },
  logoutText: { color: '#EF4444', fontWeight: 'bold', fontSize: 12 },

  mainCard: { backgroundColor: '#FFF', padding: 25, borderRadius: 20, alignItems: 'center', marginBottom: 20, elevation: 2, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 10, shadowOffset: {width:0, height:4} },
  mainCardLabel: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  mainCardTitle: { fontSize: 14, color: '#666', fontWeight: '500' },
  mainBalance: { fontSize: 28, fontWeight: 'bold', color: '#000' },

  statsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 25 },
  statCard: { backgroundColor: '#FFF', padding: 15, borderRadius: 15, width: '48%', elevation: 1 },
  statLabel: { fontSize: 12, color: '#666' },
  statValue: { fontSize: 16, fontWeight: 'bold', color: '#000' },

  walletSection: { marginBottom: 20 },
  walletHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#000' },
  gridContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', rowGap: 15 },
  
  walletCard: { width: '48%', padding: 15, borderRadius: 12, minHeight: 140, justifyContent: 'space-between' },
  walletHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  walletIconBg: { width: 40, height: 40, borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.2)', justifyContent: 'center', alignItems: 'center', alignSelf: 'flex-start' },
  quotaText: { color: '#FFF', fontWeight: 'bold', fontSize: 12 },
  walletTitle: { color: '#FFF', fontWeight: 'bold', fontSize: 14, marginBottom: 2 },
  walletAmount: { color: '#FFF', fontWeight: 'bold', fontSize: 12, marginBottom: 4 },
  walletDesc: { color: '#FFF', fontSize: 10, opacity: 0.9, lineHeight: 14 },

  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { width: width * 0.8, backgroundColor: '#FFF', borderRadius: 20, padding: 25, alignItems: 'center', elevation: 5 },
  logoutIconContainer: { marginBottom: 20 },
  modalText: { fontSize: 16, fontWeight: 'bold', color: '#000', textAlign: 'center', marginBottom: 25 },
  modalButtonRow: { flexDirection: 'row', width: '100%', justifyContent: 'space-between', gap: 15 },
  cancelButton: { flex: 1, backgroundColor: '#333', paddingVertical: 12, borderRadius: 25, alignItems: 'center' },
  cancelButtonText: { color: '#FFF', fontWeight: 'bold' },
  confirmButton: { flex: 1, backgroundColor: '#F87171', paddingVertical: 12, borderRadius: 25, alignItems: 'center' },
  confirmButtonText: { color: '#FFF', fontWeight: 'bold' },
});
