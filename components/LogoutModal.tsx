import { Feather } from "@expo/vector-icons";
import React from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface LogoutModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function LogoutModal({
  visible,
  onClose,
  onConfirm,
}: LogoutModalProps) {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        {/* Modal Card */}
        <View style={styles.modalCard}>
          {/* Icon Besar */}
          <View style={styles.iconContainer}>
            <Feather name="log-out" size={56} color="black" />
          </View>

          {/* Title */}
          <Text style={styles.title}>Are you sure want to logout ?</Text>

          {/* Buttons Action */}
          <View style={styles.buttonRow}>
            {/* Cancel Button */}
            <TouchableOpacity
              onPress={onClose}
              style={[styles.button, styles.cancelButton]}
              activeOpacity={0.8}
            >
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>

            {/* Continue Button */}
            <TouchableOpacity
              onPress={onConfirm}
              style={[styles.button, styles.confirmButton]}
              activeOpacity={0.8}
            >
              <Text style={styles.confirmText}>Continue</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  modalCard: {
    backgroundColor: "white",
    width: "90%",
    borderRadius: 10,
    padding: 24,
    alignItems: "center",
    // Shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10,
  },
  iconContainer: {
    marginBottom: 24,
    marginTop: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "500",
    color: "black", // slate-800
    marginBottom: 32,
    textAlign: "center",
  },
  buttonRow: {
    flexDirection: "row",
    gap: 16,
    width: "100%",
    marginBottom: 8,
  },
  button: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  cancelButton: {
    backgroundColor: "#222222", // slate-700
  },
  confirmButton: {
    backgroundColor: "#FF8A8A", // Custom Pink
    shadowColor: "#FF8A8A",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  cancelText: {
    color: "white",
    fontSize: 16,
    fontWeight: "semibold",
  },
  confirmText: {
    color: "white",
    fontSize: 16,
    fontWeight: "semibold",
  },
});
