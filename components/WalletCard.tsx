import React from "react";
import {
  GestureResponderEvent,
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface WalletCardProps {
  color: string; // Sekarang masukkan kode HEX, contoh: "#5DDCA6"
  icon: ImageSourcePropType;
  title: string;
  amount: string;
  subtext: string;
  badge?: string;
  isSOS?: boolean;
  onPress?: (event: GestureResponderEvent) => void; // Tambahkan prop onPress di sini
}

export default function WalletCard({
  color,
  icon,
  title,
  amount,
  subtext,
  badge,
  isSOS,
  onPress, // Terima prop onPress
}: WalletCardProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={[styles.card, { backgroundColor: color }]}
      onPress={onPress} // Pasang fungsi onPress ke komponen utama
    >
      {/* Badge di pojok kanan atas */}
      {badge && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{badge}</Text>
        </View>
      )}

      {/* Bagian Atas: Icon */}
      <Image source={icon} />

      {/* Bagian Tengah: Judul & Jumlah */}
      <View>
        <View style={styles.titleRow}>
          {isSOS && <Text style={styles.sosLabel}>SOS</Text>}
          <Text style={styles.cardTitle} numberOfLines={2}>
            {isSOS ? title.replace("SOS", "").trim() : title}
          </Text>
        </View>
        <Text style={styles.amountText}>{amount}</Text>
      </View>

      {/* Bagian Bawah: Subtext */}
      <Text style={styles.subtext}>{subtext}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 10,
    height: 170, // Height fixed agar seragam
    justifyContent: "space-between",
    // Shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  badge: {
    position: "absolute",
    top: 16,
    right: 16,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  badgeText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
  iconContainer: {
    marginBottom: 8,
  },
  iconWrapper: {
    backgroundColor: "rgba(255,255,255,0.2)",
    width: 44,
    height: 44,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  sosLabel: {
    color: "white",
    fontWeight: "800",
    fontSize: 16,
    marginRight: 4,
  },
  cardTitle: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
    lineHeight: 18,
    flex: 1,
  },
  amountText: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
  subtext: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 10,
    lineHeight: 12,
    paddingRight: 8,
  },
});
