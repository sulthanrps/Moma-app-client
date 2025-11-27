import { HapticTab } from "@/components/haptic-tab";
import { Tabs } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

// Color Palette based on the design
const COLORS = {
  primary: "white", // Rose-400 (Active)
  inactive: "white", // Slate-300 (Inactive)
  bg: "#FF9B9D",
};

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.inactive,
        tabBarShowLabel: false, // We hide default labels to use custom styled ones below
        tabBarStyle: styles.tabBar,
        tabBarButton: HapticTab,
      }}
    >
      {/* 1. Home */}
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <Image
              source={require("../../assets/images/home.png")} // Make sure this path is correct
              style={{
                width: 24,
                height: 24,
                tintColor: focused ? COLORS.primary : COLORS.inactive,
              }}
              resizeMode="contain"
            />
          ),
          tabBarLabel: ({ focused }) => (
            <Text
              style={[
                styles.label,
                { color: focused ? COLORS.primary : COLORS.inactive },
              ]}
            >
              Home
            </Text>
          ),
        }}
      />

      {/* 2. Report */}
      <Tabs.Screen
        name="report"
        options={{
          title: "Report",
          tabBarIcon: ({ focused }) => (
            <Image
              source={require("../../assets/images/report.png")} // Make sure this path is correct
              style={{
                width: 24,
                height: 24,
                tintColor: focused ? COLORS.primary : COLORS.inactive,
              }}
              resizeMode="contain"
            />
          ),
          tabBarLabel: ({ focused }) => (
            <Text
              style={[
                styles.label,
                { color: focused ? COLORS.primary : COLORS.inactive },
              ]}
            >
              Report
            </Text>
          ),
        }}
      />

      {/* 3. QRIS (Floating Button) */}
      <Tabs.Screen
        name="qris"
        options={{
          title: "QRIS",
          // Custom container for the floating effect
          tabBarIcon: ({ focused }) => (
            <View style={styles.qrisButton}>
              <Image
                source={require("../../assets/images/qris.png")} // Make sure this path is correct
                style={{
                  width: 28,
                  height: 28,
                  tintColor: "white", // Icon remains white on pink background
                }}
                resizeMode="contain"
              />
            </View>
          ),
          tabBarLabel: () => (
            <Text style={[styles.label, { color: "#fda4af", marginTop: 20 }]}>
              QRIS
            </Text>
          ),
        }}
      />

      {/* 4. Transfer */}
      <Tabs.Screen
        name="transfer"
        options={{
          title: "Transfer",
          tabBarIcon: ({ focused }) => (
            <Image
              source={require("../../assets/images/transfer.png")} // Make sure this path is correct
              style={{
                width: 24,
                height: 24,
                tintColor: focused ? COLORS.primary : COLORS.inactive,
              }}
              resizeMode="contain"
            />
          ),
          tabBarLabel: ({ focused }) => (
            <Text
              style={[
                styles.label,
                { color: focused ? COLORS.primary : COLORS.inactive },
              ]}
            >
              Transfer
            </Text>
          ),
        }}
      />

      {/* 5. Record */}
      <Tabs.Screen
        name="record"
        options={{
          title: "Record",
          tabBarIcon: ({ focused }) => (
            <Image
              source={require("../../assets/images/record.png")} // Make sure this path is correct
              style={{
                width: 24,
                height: 24,
                tintColor: focused ? COLORS.primary : COLORS.inactive,
              }}
              resizeMode="contain"
            />
          ),
          tabBarLabel: ({ focused }) => (
            <Text
              style={[
                styles.label,
                { color: focused ? COLORS.primary : COLORS.inactive },
              ]}
            >
              Record
            </Text>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 60, // Taller to accommodate the curve and spacing
    backgroundColor: "#FF9B9D",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderTopWidth: 0, // Remove default top line
    // Shadow for iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    // Elevation for Android
    elevation: 10,
  },
  label: {
    fontSize: 10,
    fontWeight: "600",
  },
  qrisButton: {
    position: "relative",
    top: -25, // Move it up to float
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#fca5a5", // Rose-300
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 4,
    borderColor: "#ffffff", // White border to blend with tab bar
    // Shadow
    shadowColor: "#fca5a5",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
  },
});
