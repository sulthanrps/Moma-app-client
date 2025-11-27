import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import LogoutModal from "../../components/LogoutModal";
import WalletCard from "../../components/WalletCard";

const { width } = Dimensions.get("window");

export default function HomeScreen() {
  const router = useRouter();
  const [isLogoutModalOpen, setLogoutModalOpen] = useState(false);
  const [isBalanceVisible, setBalanceVisible] = useState(true);

  const handleLogoutClick = () => setLogoutModalOpen(true);
  const handleCancel = () => setLogoutModalOpen(false);
  const handleContinue = () => {
    setLogoutModalOpen(false);
    console.log("User logged out");
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F5F6FA" />

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.topArea}>
          {/* --- Header --- */}
          <View style={styles.header}>
            <View style={styles.profileSection}>
              <View style={styles.avatarContainer}>
                <Image
                  source={{
                    uri: "https://api.dicebear.com/7.x/avataaars/png?seed=Siti&backgroundColor=ffdfbf&clothing=collarAndSweater",
                  }}
                  style={styles.avatarImage}
                  resizeMode="cover"
                />
              </View>
              <View>
                <Text style={styles.greetingText}>Hai,</Text>
                <Text style={styles.nameText}>Siti Kurnia</Text>
              </View>
            </View>

            {/* Tombol Logout */}
            <TouchableOpacity
              onPress={handleLogoutClick}
              style={styles.logoutButton}
              activeOpacity={0.7}
            >
              <Feather name="log-out" size={16} color="red" />
              <Text style={styles.logoutText}>logout</Text>
            </TouchableOpacity>
          </View>

          {/* --- Total Saldo Card --- */}
          <View style={styles.balanceCard}>
            <View style={styles.balanceContent}>
              <View style={styles.balanceLabelContainer}>
                <Image source={require("../../assets/images/money-bag.png")} />
                <Text style={styles.balanceLabel}>Total Saldo</Text>
              </View>
              <Text style={styles.balanceAmount}>
                {isBalanceVisible ? "Rp3.000.000,00" : "Rp ••••••••"}
              </Text>
            </View>
          </View>

          {/* --- Stats Row --- */}
          <View style={styles.statsRow}>
            {/* Daily Budget */}
            <View style={styles.statCard}>
              <View style={styles.statHeader}>
                <Image
                  source={require("../../assets/images/budget-pict.png")}
                />
                <Text style={styles.statTitle}>Daily budget used</Text>
              </View>
              <Text style={styles.statValue}>
                Rp 0 <Text style={styles.statTotal}>/ Rp 80.000</Text>
              </Text>
            </View>

            {/* SOS Quota */}
            <View style={styles.quotaCard}>
              <View style={styles.statHeader}>
                <Image source={require("../../assets/images/sos-quota.png")} />
                <Text style={styles.statTitle}>quota left</Text>
              </View>
              <Text style={styles.statValueLarge}>3/3</Text>
            </View>
          </View>
        </View>

        <View style={styles.walletContainer}>
          {/* --- Wallets Section --- */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Wallets</Text>
            <TouchableOpacity
              onPress={() => setBalanceVisible(!isBalanceVisible)}
              style={styles.eyeButton}
            >
              {isBalanceVisible ? (
                <Feather name="eye-off" size={20} color="black" />
              ) : (
                <Feather name="eye" size={20} color="black" />
              )}
            </TouchableOpacity>
          </View>

          {/* Grid Wallets */}
          <View style={styles.gridContainer}>
            <View style={styles.gridRow}>
              {/* 1. Secured Budget (Green) */}
              <View style={styles.gridItem}>
                <WalletCard
                  color="#81D5A2"
                  icon={require("../../assets/images/secured-icon.png")}
                  title="Secured Budget"
                  amount={isBalanceVisible ? "Rp0" : "••••"}
                  subtext="Remaining budget this month"
                  // Langsung panggil onPress di sini
                  onPress={() => router.push("../allocation")}
                />
              </View>

              {/* 2. Daily Budget (Blue/Purple) */}
              <View style={styles.gridItem}>
                <WalletCard
                  color="#8192D5"
                  icon={require("../../assets/images/daily-icon.png")}
                  title="Daily Budget"
                  amount={isBalanceVisible ? "Rp2.400.000" : "••••"}
                  subtext="Budget you can use in a day"
                  badge="1/30"
                />
              </View>
            </View>

            <View style={styles.gridRow}>
              {/* 3. Saving Wallet (Lime/Light Green) */}
              <View style={styles.gridItem}>
                <WalletCard
                  color="#ACD581"
                  icon={require("../../assets/images/saving-icon.png")}
                  title="Saving Wallet"
                  amount={isBalanceVisible ? "Rp150.000" : "••••"}
                  subtext="Piggybank for saving money"
                />
              </View>

              {/* 4. Emergency Money (Pink/Red) */}
              <View style={styles.gridItem}>
                <WalletCard
                  color="#D58181"
                  icon={require("../../assets/images/sos-icon.png")}
                  title="Emergency Money"
                  amount={isBalanceVisible ? "Rp450.000" : "••••"}
                  subtext="Emergency-only budget"
                />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* --- LOGOUT MODAL --- */}
      <LogoutModal
        visible={isLogoutModalOpen}
        onClose={handleCancel}
        onConfirm={handleContinue}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F6FA",
  },
  scrollView: {
    flex: 1,
    paddingTop: 8,
  },
  scrollContent: {
    paddingBottom: 110,
  },
  topArea: {
    paddingHorizontal: 24,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
    marginTop: 16,
  },
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  avatarContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#ffedd5", // orange-100
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "white",
    // Shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  avatarImage: {
    width: "100%",
    height: "100%",
  },
  greetingText: {
    fontSize: 12,
    color: "grey", // slate-400
    fontWeight: "500",
    marginBottom: 2,
  },
  nameText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black", // slate-800
    lineHeight: 22,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#FF9B9D",
    borderWidth: 1,
    borderColor: "black", // rose-300
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderRadius: 10,
    // Shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: "semibold",
    color: "white", // rose-400
    letterSpacing: 0.5,
  },
  balanceCard: {
    backgroundColor: "white",
    borderRadius: 20,
    paddingVertical: 30,
    paddingHorizontal: 24,
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "white",
    // Shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  balanceContent: {
    alignItems: "center",
    gap: 12,
  },
  balanceLabelContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    opacity: 0.8,
  },
  balanceLabel: {
    fontSize: 11,
    fontWeight: "semibold",
    color: "black", // slate-400
    letterSpacing: 1.5,
  },
  balanceAmount: {
    fontSize: 28,
    fontWeight: "700",
    color: "black", // slate-800
    letterSpacing: -0.5,
  },
  statsRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 2,
  },
  statCard: {
    width: "auto",
    backgroundColor: "white",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "white",
    // Shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 2,
  },
  quotaCard: {
    flex: 1,
    backgroundColor: "white",
    padding: 16,
    gap: 0,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "white",
    // Shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 2,
  },
  statHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
    marginBottom: 12,
  },
  iconBox: {
    backgroundColor: "#f1f5f9", // slate-100
    padding: 6,
    borderRadius: 8,
  },
  statTitle: {
    fontSize: 12,
    fontWeight: "semibold",
    color: "black", // slate-400
    flex: 1,
    lineHeight: 14,
  },
  statValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black", // slate-800
  },
  statTotal: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black", // slate-300
  },
  sosBadge: {
    backgroundColor: "#fff1f2", // rose-50
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  statValueLarge: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black", // slate-800
  },
  walletContainer: {
    backgroundColor: "white",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    padding: 10,
    marginTop: 20,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    marginTop: 10,
    paddingHorizontal: 10,
  },
  sectionTitle: {
    fontSize: 23,
    fontWeight: "700",
    color: "black", // slate-800
  },
  eyeButton: {
    padding: 4,
  },
  gridContainer: {
    marginHorizontal: -6, // Compensate for item padding
    backgroundColor: "white",
  },
  gridRow: {
    flexDirection: "row",
    marginBottom: 12,
  },
  gridItem: {
    width: "50%",
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
});
