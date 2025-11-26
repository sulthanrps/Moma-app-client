import { useRouter } from 'expo-router';
import { ChevronLeft as BackIcon, Car, ChevronLeft, ChevronRight, Coffee, Home } from 'lucide-react-native';
import React, { useState } from 'react';
import {
  Dimensions,
  SafeAreaView, ScrollView, StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { PieChart } from 'react-native-chart-kit';

const SCREEN_WIDTH = Dimensions.get('window').width;

const COLORS = {
  primary: '#FF9F9F', 
  secondary: '#8F80F8',
  tertiary: '#56CCF2', 
  bgScreen: '#FFFFFF',
  textMain: '#000000',
  textGray: '#888888',
};

export default function ReportScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'Income' | 'Expenditure'>('Income');
  
  const incomeData = [
    {
      name: "Daily Income",
      population: 3000000,
      color: COLORS.primary,
      legendFontColor: "transparent", 
      legendFontSize: 0  
    }
  ];

  const expenditureData = [
    {
      id: '1',
      name: "Household",
      population: 145000,
      color: COLORS.primary, 
      icon: Home,
      legendFontColor: "transparent", 
      legendFontSize: 0
    },
    {
      id: '2',
      name: "Food",
      population: 125000,
      color: COLORS.secondary,
      icon: Coffee,
      legendFontColor: "transparent",
      legendFontSize: 0
    },
    {
      id: '3',
      name: "Transportation",
      population: 36000,
      color: COLORS.tertiary, 
      icon: Car,
      legendFontColor: "transparent",
      legendFontSize: 0
    }
  ];

  const chartData = activeTab === 'Income' ? incomeData : expenditureData;
  const totalValue = chartData.reduce((acc, item) => acc + item.population, 0);

  const formatCurrency = (amount: number) => {
    return `Rp ${amount.toLocaleString('id-ID')},00`;
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <BackIcon color="#000" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Report</Text>
        <View style={{ width: 24 }} />
      </View>
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        <View style={styles.topSection}>
            <View style={styles.dateSelector}>
              <TouchableOpacity><ChevronLeft color="#000" size={20} /></TouchableOpacity>
              <Text style={styles.dateText}>May 2025</Text>
              <TouchableOpacity><ChevronRight color="#000" size={20} /></TouchableOpacity>
            </View>
            
            <View style={styles.tabContainer}>
              <TouchableOpacity 
                style={[styles.tabItem, activeTab === 'Income' && styles.tabItemActive]}
                onPress={() => setActiveTab('Income')}
              >
                <Text style={styles.tabLabel}>Income</Text>
                <Text style={styles.tabValue}>Rp 3.000.000</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.tabItem, activeTab === 'Expenditure' && styles.tabItemActive]}
                onPress={() => setActiveTab('Expenditure')}
              >
                <Text style={styles.tabLabel}>Expenditure</Text>
                <Text style={styles.tabValue}>Rp 306.000</Text>
              </TouchableOpacity>
            </View>
        </View>

        <View style={styles.contentContainer}>
            <View style={styles.chartCard}>
              <View style={styles.chartWrapper}>
                <PieChart
                  data={chartData}
                  width={SCREEN_WIDTH} 
                  height={220}
                  chartConfig={{
                    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                  }}
                  accessor={"population"}
                  backgroundColor={"transparent"}
                  paddingLeft={(SCREEN_WIDTH / 4).toString()}
                  absolute={false}
                  hasLegend={false} 
                />
                
                <View style={styles.centerLabel}>
                </View>
              </View>
            </View>
            
            <View style={styles.listDivider} />
            
            {chartData.map((item, index) => {
               const percentage = ((item.population / totalValue) * 100).toFixed(2);
               const IconComponent = item.icon || Home;

               return (
                 <View key={index} style={styles.listItem}>
                    <View style={[styles.badgeContainer, { backgroundColor: item.color }]}>
                      <Text style={styles.badgeText}>{percentage}%</Text>
                    </View>

                    <View style={styles.itemMeta}>
                       {activeTab === 'Expenditure' && (
                         <IconComponent size={18} color="#000" style={{ marginRight: 8 }} />
                       )}
                       <Text style={styles.itemName}>{item.name}</Text>
                    </View>

                    <Text style={styles.itemAmount}>{formatCurrency(item.population)}</Text>
                 </View>
               );
            })}

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bgScreen },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 15, backgroundColor: '#FFF' },
  backButton: { padding: 5, marginLeft: -5 },
  headerTitle: { fontSize: 18, fontWeight: '700', color: COLORS.textMain },
  scrollContent: { paddingBottom: 40 },
  topSection: { backgroundColor: '#FFF', paddingBottom: 0, borderBottomWidth: 1, borderBottomColor: '#F0F0F0' },
  dateSelector: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 15, gap: 15 },
  dateText: { fontSize: 16, fontWeight: '700', color: COLORS.textMain },
  tabContainer: { flexDirection: 'row', marginTop: 5 },
  tabItem: { flex: 1, alignItems: 'center', paddingVertical: 12 },
  tabItemActive: { borderBottomWidth: 3, borderBottomColor: COLORS.primary },
  tabLabel: { fontSize: 12, color: COLORS.textMain, fontWeight: '600', marginBottom: 4 },
  tabValue: { fontSize: 14, color: COLORS.textMain, fontWeight: '400' },
  
  contentContainer: { padding: 20 },
  chartCard: { 
    backgroundColor: '#FFF', 
    borderRadius: 16, 
    paddingVertical: 20, 
    elevation: 3, 
    shadowColor: "#000", 
    shadowOffset: {width:0, height:2}, 
    shadowOpacity: 0.1, 
    shadowRadius: 4,
    marginBottom: 20,
    alignItems: 'center'
  },
  chartWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 220,
    width: '100%',
    overflow: 'hidden'
  },
  centerLabel: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },

  listDivider: { height: 1, backgroundColor: 'transparent', marginVertical: 0 },
  listItem: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingVertical: 15, 
    backgroundColor: '#FFF', 
    borderBottomWidth: 1, 
    borderBottomColor: '#F5F5F5',
    marginBottom: 2
  },
  badgeContainer: { 
    paddingHorizontal: 8, 
    paddingVertical: 4, 
    borderRadius: 6, 
    marginRight: 12,
    minWidth: 60,
    alignItems: 'center'
  },
  badgeText: { color: '#FFF', fontSize: 12, fontWeight: 'bold' },
  itemMeta: { flex: 1, flexDirection: 'row', alignItems: 'center' },
  itemName: { fontSize: 14, fontWeight: '500', color: '#000' },
  itemAmount: { fontSize: 14, fontWeight: 'bold', color: '#000' },
});