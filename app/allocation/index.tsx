import { useLocalSearchParams, useRouter } from 'expo-router';
import { ChevronLeft, ShieldCheck } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import {
    Dimensions,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

const { width, height } = Dimensions.get('window');

const COLORS = {
  primary: '#6EE7B7', // Hijau Tosca sesuai desain (Background atas)
  bgScreen: '#FFFFFF',
  textMain: '#000000',
  textWhite: '#FFFFFF',
  barDaily: '#1e293b', // Biru Tua/Hitam (Daily)
  barEmergency: '#6366f1', // Ungu/Biru (Emergency)
  barSaving: '#818cf8', // Ungu Muda (Saving)
};

const MOCK_TOTAL_BUDGET = 3000000;

export default function SecuredBudgetScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const [allocations, setAllocations] = useState({
    daily: 0,
    emergency: 0,
    saving: 0
  });

  const [isAllocated, setIsAllocated] = useState(false);

  useEffect(() => {
    if (params.daily || params.emergency || params.saving) {
      setAllocations({
        daily: Number(params.daily || 0),
        emergency: Number(params.emergency || 0),
        saving: Number(params.saving || 0)
      });
      setIsAllocated(true);
    }
  }, [params.daily, params.emergency, params.saving]);

  const formatRupiah = (num: number) => `Rp ${num.toLocaleString('id-ID')}`;

  // Hitung Nominal
  const valDaily = (allocations.daily / 100) * MOCK_TOTAL_BUDGET;
  const valEmergency = (allocations.emergency / 100) * MOCK_TOTAL_BUDGET;
  const valSaving = (allocations.saving / 100) * MOCK_TOTAL_BUDGET;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />

      {/* BACKGROUND HALF GREEN (Solusi No. 1) */}
      <View style={styles.greenBackground} />

      <SafeAreaView style={styles.safeArea}>
        {/* HEADER TRANSPARAN */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.navigate('/(tabs)')} style={styles.backButton}>
            <ChevronLeft color="#FFF" size={28} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Secured Budget</Text>
          <View style={{ width: 28 }} /> 
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          
          {/* MAIN ICON & INFO */}
          <View style={styles.mainInfoContainer}>
              <View style={styles.iconWrapper}>
                  <ShieldCheck size={40} color="#FFF" strokeWidth={1.5} />
              </View>
              <Text style={styles.accountId}>55020011105431 ❐</Text>
              <Text style={styles.mainBalance}>{formatRupiah(MOCK_TOTAL_BUDGET)}</Text>
          </View>

          {/* PROGRESS BAR (FULL WIDTH) */}
          <View style={styles.progressBarContainer}>
              <View style={[styles.barSegment, { flex: allocations.daily || 1, backgroundColor: isAllocated ? COLORS.barDaily : 'rgba(255,255,255,0.3)' }]} />
              <View style={[styles.barSegment, { flex: allocations.emergency || 0, backgroundColor: COLORS.barEmergency }]} />
              <View style={[styles.barSegment, { flex: allocations.saving || 0, backgroundColor: COLORS.barSaving }]} />
          </View>

          {/* LEGEND SECTION */}
          <View style={styles.legendContainer}>
              <Text style={styles.legendTitle}>Budget Allocations</Text>
              
              <View style={styles.legendItem}>
                  <View style={[styles.legendIcon, { backgroundColor: COLORS.barDaily }]} />
                  <Text style={styles.legendText}>{allocations.daily}% daily limitation budget</Text>
              </View>
              <View style={styles.legendItem}>
                  <View style={[styles.legendIcon, { backgroundColor: COLORS.barEmergency }]} />
                  <Text style={styles.legendText}>{allocations.emergency}% emergency budget</Text>
              </View>
              <View style={styles.legendItem}>
                  <View style={[styles.legendIcon, { backgroundColor: COLORS.barSaving }]} />
                  <Text style={styles.legendText}>{allocations.saving}% saving budget</Text>
              </View>
                {isAllocated && (
                    <TouchableOpacity 
                    style={styles.smallBlackButton}
                    onPress={() => router.push({
                        pathname: '/allocation/edit',
                        params: { ...allocations }
                    })}
                >
                    <Text style={styles.blackButtonText}>Edit Allocations</Text>
                </TouchableOpacity>
                )}
                
          </View>

          {/* BOTTOM SECTION (WHITE AREA) */}
          <View style={styles.bottomSheet}>
              {!isAllocated ? (
                  <View style={styles.emptyState}>
                      <Text style={styles.emptyTextSmall}>you don't have any allocations</Text>
                      <Text style={styles.emptyTextLarge}>Start Allocate your{'\n'}budget now !</Text>
                      
                      <TouchableOpacity 
                          style={styles.blackButton}
                          onPress={() => router.push({
                              pathname: '/allocation/edit',
                              params: { ...allocations }
                          })}
                      >
                          <Text style={styles.blackButtonText}>Edit Allocations</Text>
                      </TouchableOpacity>
                  </View>
              ) : (
                  <View style={styles.filledState}>
                      {/* LIST ITEMS */}
                      <View style={styles.detailList}>
                          {/* Daily */}
                          <View style={styles.detailItem}>
                              <View style={[styles.circleBadge, {borderColor: COLORS.barDaily}]}>
                                  <Text style={[styles.circleText, {color: COLORS.barDaily}]}>DLB</Text>
                              </View>
                              <View style={styles.detailInfo}>
                                  <Text style={styles.detailTitle}>Daily Limitation Budget</Text>
                                  <Text style={styles.detailSubtitle}>1 Januari 2025</Text>
                              </View>
                              <Text style={[styles.detailAmount, {color: COLORS.barDaily}]}>- {formatRupiah(valDaily)}</Text>
                          </View>

                          {/* Saving */}
                          <View style={styles.detailItem}>
                              <View style={[styles.circleBadge, {borderColor: COLORS.barSaving}]}>
                                  <Text style={[styles.circleText, {color: COLORS.barSaving}]}>SB</Text>
                              </View>
                              <View style={styles.detailInfo}>
                                  <Text style={styles.detailTitle}>Saving Budget</Text>
                                  <Text style={styles.detailSubtitle}>1 Januari 2025</Text>
                              </View>
                              <Text style={[styles.detailAmount, {color: COLORS.barSaving}]}>- {formatRupiah(valSaving)}</Text>
                          </View>

                          {/* Emergency */}
                          <View style={styles.detailItem}>
                              <View style={[styles.circleBadge, {borderColor: COLORS.barEmergency}]}>
                                  <Text style={[styles.circleText, {color: COLORS.barEmergency}]}>EB</Text>
                              </View>
                              <View style={styles.detailInfo}>
                                  <Text style={styles.detailTitle}>Emergency Budget</Text>
                                  <Text style={styles.detailSubtitle}>1 Januari 2025</Text>
                              </View>
                              <Text style={[styles.detailAmount, {color: COLORS.barEmergency}]}>- {formatRupiah(valEmergency)}</Text>
                          </View>
                      </View>
                  </View>
              )}
          </View>

        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bgScreen },
  
  // Solusi No 1: Background Hijau Setengah Layar (Absolute)
  greenBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: height * 0.60, // Setengah lebih dikit
    backgroundColor: COLORS.primary,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },

  safeArea: { flex: 1 },
  
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingTop: 10, paddingBottom: 10 },
  headerTitle: { fontSize: 18, fontWeight: '600', color: '#FFF' },
  backButton: { padding: 5 },

  scrollContent: { paddingHorizontal: 25, paddingTop: 10 },

  mainInfoContainer: { alignItems: 'center', marginBottom: 25 },
  iconWrapper: { width: 60, height: 60, borderRadius: 20, borderWidth: 2, borderColor: '#FFF', justifyContent: 'center', alignItems: 'center', marginBottom: 15 },
  accountId: { color: '#FFF', fontSize: 14, marginBottom: 5, opacity: 0.9 },
  mainBalance: { color: '#FFF', fontSize: 32, fontWeight: 'bold' },

  progressBarContainer: { flexDirection: 'row', height: 16, borderRadius: 8, overflow: 'hidden', marginBottom: 25, backgroundColor: 'rgba(0,0,0,0.1)' },
  barSegment: { height: '100%' },

  legendContainer: { marginBottom: 40 },
  legendTitle: { color: '#FFF', fontWeight: 'bold', marginBottom: 10, fontSize: 14 },
  legendItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  legendIcon: { width: 14, height: 14, borderRadius: 4, marginRight: 10 },
  legendText: { color: '#FFF', fontWeight: '600', fontSize: 14 },

  // BOTTOM SHEET (WHITE AREA)
  bottomSheet: { 
    backgroundColor: '#FFF', 
    minHeight: 400, // Biar scrollable
    marginHorizontal: -25, // Jebol padding parent biar full width
    paddingHorizontal: 25,
    paddingTop: 30,
    borderTopLeftRadius: 0, // Sesuai desain flat aja atau rounded dikit
  },

  // EMPTY STATE
  emptyState: { alignItems: 'center', paddingTop: 20 },
  emptyTextSmall: { color: '#AAA', fontSize: 16, fontWeight: '600', marginBottom: 5 },
  emptyTextLarge: { color: '#000', fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 30 },
  blackButton: { backgroundColor: '#000', paddingVertical: 15, paddingHorizontal: 40, borderRadius: 12, shadowColor: '#000', shadowOpacity: 0.3, shadowOffset: {width:0, height:4}, elevation: 5 },
  blackButtonText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },

  // FILLED STATE
  filledState: {},
  smallBlackButton: { backgroundColor: '#000', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 12, alignSelf: 'flex-start', marginTop: 10 },
  
  detailList: { gap: 20 },
  detailItem: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  circleBadge: { width: 45, height: 45, borderRadius: 25, borderWidth: 2, justifyContent: 'center', alignItems: 'center', marginRight: 15 },
  circleText: { fontWeight: 'bold', fontSize: 12 },
  detailInfo: { flex: 1 },
  detailTitle: { fontWeight: 'bold', fontSize: 14, color: '#000' },
  detailSubtitle: { color: '#AAA', fontSize: 12 },
  detailAmount: { fontWeight: 'bold', fontSize: 14 },
});