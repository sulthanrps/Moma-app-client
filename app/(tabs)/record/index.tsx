import { format, parseISO } from 'date-fns';
import { useRouter } from 'expo-router';
import {
  Car,
  ChevronLeft,
  ChevronRight,
  Coffee,
  Edit2,
  Home,
  Plus,
  Trash2
} from 'lucide-react-native';
import React, { useState } from 'react';
import {
  SafeAreaView,
  SectionList,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import DeleteModal from '../../../components/DeleteModal';

const MOCK_DATA = [
  {
    title: '2025-05-18',
    data: [
      { id: '1', date: '2025-05-18', category: 'Household', name: 'Beli Sapu Ijuk', wallet: 'Daily Wallet', amount: 15000, type: 'expense', icon: 'home' },
      { id: '2', date: '2025-05-18', category: 'Food', name: 'Pisang Goreng Hj Kadap', wallet: 'Daily Wallet', amount: 16000, type: 'expense', icon: 'coffee' },
      { id: '3', date: '2025-05-18', category: 'Transportation', name: 'Ojek ke Sigura - gura', wallet: 'Daily Wallet', amount: 9000, type: 'expense', icon: 'car' },
    ]
  },
  {
    title: '2025-05-17',
    data: [
      { id: '4', date: '2025-05-17', category: 'Household', name: 'Beli Sapu Ijuk', wallet: 'Daily Wallet', amount: 15000, type: 'expense', icon: 'home' },
      { id: '5', date: '2025-05-17', category: 'Food', name: 'Pisang Goreng Hj Kadap', wallet: 'Daily Wallet', amount: 16000, type: 'expense', icon: 'coffee' },
      { id: '6', date: '2025-05-17', category: 'Transportation', name: 'Ojek ke Sigura - gura', wallet: 'Daily Wallet', amount: 9000, type: 'expense', icon: 'car' },
    ]
  }
];

const formatCurrency = (amount: number) => {
  return `Rp ${amount.toLocaleString('id-ID')},00`;
};

export default function TransactionHistoryScreen() {
  const router = useRouter(); 
  const [currentDate, setCurrentDate] = useState(new Date(2025, 4, 1)); 

  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedIdToDelete, setSelectedIdToDelete] = useState<string | null>(null);

  const handleDeletePress = (id: string) => {
    setSelectedIdToDelete(id); 
    setDeleteModalVisible(true);
  };

  const onConfirmDelete = () => {
    console.log("Menghapus item dengan ID:", selectedIdToDelete);
    
    setDeleteModalVisible(false); 
    setSelectedIdToDelete(null); 
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <TouchableOpacity>
        <ChevronLeft color="#000" size={24} />
      </TouchableOpacity>
      <Text style={styles.monthText}>{format(currentDate, 'MMMM yyyy')}</Text>
      <TouchableOpacity>
        <ChevronRight color="#000" size={24} />
      </TouchableOpacity>
    </View>
  );

  const renderSummary = () => (
    <View style={styles.summaryContainer}>
      <View style={styles.summaryRow}>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Income</Text>
          <Text style={styles.summaryValueGreen}>Rp 3.000.000</Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Expenditure</Text>
          <Text style={styles.summaryValueRed}>Rp 40.000</Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Remain</Text>
          <Text style={styles.summaryValueBlack}>Rp 2.960.000</Text>
        </View>
      </View>
    </View>
  );

  const renderSectionHeader = ({ section: { title, data } }: any) => {
    const dailyTotal = data.reduce((acc: any, item: any) => acc + item.amount, 0);
    const dayStr = format(parseISO(title), 'd');
    const dayName = format(parseISO(title), 'EEE');

    return (
      <View style={styles.sectionHeader}>
        <View style={styles.dateBadge}>
          <Text style={styles.dateBold}>{dayStr}</Text>
          <Text style={styles.dateLight}>{dayName}</Text>
        </View>
        <View style={styles.dateSummary}>
          <Text style={styles.incomeSmall}>Rp 0</Text>
          <Text style={styles.expenseSmall}>{formatCurrency(dailyTotal)}</Text>
        </View>
      </View>
    );
  };

  const renderItem = ({ item }: any) => {
    let IconComponent = Home;
    if (item.icon === 'coffee') IconComponent = Coffee;
    if (item.icon === 'car') IconComponent = Car;

    return (
      <View style={styles.card}>
        <View style={styles.iconContainer}>
          <IconComponent color="#000" size={20} />
        </View>
        
        <View style={styles.detailsContainer}>
          <View style={styles.topRow}>
            <Text style={styles.categoryText}>{item.category}</Text>
            <Text style={styles.descText}>{item.name}</Text>
          </View>
          <Text style={styles.walletText}>{item.wallet}</Text>
        </View>

        <View style={styles.rightContainer}>
          <View style={styles.amountRow}>
            <Text style={styles.amountText}>{formatCurrency(item.amount)}</Text>
            <View style={styles.actionIcons}>
              
              <TouchableOpacity 
                style={styles.iconBtn}
                onPress={() => {
                  router.push({
                    pathname: '/(tabs)/record/edit-transaction',
                    params: {
                      id: item.id,
                      name: item.name,
                      amount: item.amount,
                      date: item.date,
                      category: item.category,
                      wallet: item.wallet,
                      type: item.type
                    }
                  });
                }}
              >
                <Edit2 size={16} color="#Eab308" />
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.iconBtn}
                onPress={() => handleDeletePress(item.id)}
              >
                <Trash2 size={16} color="#EF4444" />
              </TouchableOpacity>

            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {renderHeader()}
      {renderSummary()}

      <SectionList
        sections={MOCK_DATA}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        contentContainerStyle={styles.listContent}
        stickySectionHeadersEnabled={false}
        showsVerticalScrollIndicator={false}
      />

      <TouchableOpacity 
        style={styles.fab}
        onPress={() => router.push('/(tabs)/record/add-transaction')}
      >
        <Plus color="#FFF" size={32} />
      </TouchableOpacity>

      <DeleteModal 
        visible={isDeleteModalVisible}
        onClose={() => setDeleteModalVisible(false)}
        onConfirm={onConfirmDelete}
      />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffffff',
  },
  topBar: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#1a1a1a',
  },
  screenTitle: {
    fontSize: 18,
    color: '#fff', 
    fontWeight: '600',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  monthText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  summaryContainer: {
    backgroundColor: '#fff',
    paddingBottom: 15,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 10,
  },
  summaryItem: {
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  summaryValueGreen: { fontSize: 14, fontWeight: 'bold', color: '#22C55E' },
  summaryValueRed: { fontSize: 14, fontWeight: 'bold', color: '#F87171' },
  summaryValueBlack: { fontSize: 14, fontWeight: 'bold', color: '#000' },
  listContent: {
    paddingBottom: 80,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#E5E7EB',
    marginTop: 10,
  },
  dateBadge: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  dateBold: {
    fontWeight: 'bold',
    fontSize: 16,
    marginRight: 5,
  },
  dateLight: {
    fontSize: 12,
    color: '#666',
    backgroundColor: '#9CA3AF',
    color: 'white',
    paddingHorizontal: 4,
    borderRadius: 4,
    overflow: 'hidden',
  },
  dateSummary: {
    flexDirection: 'row',
    gap: 10,
  },
  incomeSmall: { color: '#22C55E', fontSize: 12, fontWeight: '600' },
  expenseSmall: { color: '#F87171', fontSize: 12, fontWeight: '600' },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 15,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  iconContainer: {
    marginRight: 15,
  },
  detailsContainer: {
    flex: 1,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  categoryText: {
    fontWeight: 'bold',
    fontSize: 14,
    marginRight: 10,
    minWidth: 80,
  },
  descText: {
    fontSize: 14,
    color: '#000',
    flex: 1,
  },
  walletText: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  rightContainer: {
    alignItems: 'flex-end',
  },
  amountRow: {
    alignItems: 'flex-end',
  },
  amountText: {
    color: '#F87171', 
    fontWeight: '600',
    marginBottom: 5,
  },
  actionIcons: {
    flexDirection: 'row',
    gap: 10,
  },
  iconBtn: {
    padding: 2,
  },
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#D98989', 
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});