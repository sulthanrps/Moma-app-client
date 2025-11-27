import { Tabs, usePathname } from 'expo-router';
import {
  FilePlus,
  History,
  Home,
  LogOut,
  Scan
} from 'lucide-react-native';
import React from 'react';
import { Dimensions, Platform, StyleSheet, View } from 'react-native';

const { width } = Dimensions.get('window');

const COLORS = {
  primary: '#D98989', 
  active: '#FFFFFF',  
  inactive: '#FFCacC',
  bg: '#FFFFFF',
};

export default function TabLayout() {
  const pathname = usePathname();

  const hideTabBarRoutes = [
    '/transfer/amount',
    '/transfer/review',
    '/transfer/pin',
    '/record/add',  
    '/record/edit', 
    '/allocation',  
    '/allocation/edit'
  ];

  const isTabBarHidden = hideTabBarRoutes.some(route => pathname.includes(route));

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: COLORS.active,
        tabBarInactiveTintColor: COLORS.inactive,
        tabBarStyle: isTabBarHidden 
          ? { display: 'none' } 
          : styles.tabBar,
        tabBarLabelStyle: styles.tabLabel,
      }}
    >
      {/* 1. HOME */}
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <Home size={24} color={color} strokeWidth={2.5} />
          ),
        }}
      />

      {/* 2. REPORT */}
      <Tabs.Screen
        name="report" 
        options={{
          title: 'Report',
          tabBarIcon: ({ color }) => (
            <History size={24} color={color} strokeWidth={2.5} />
          ),
        }}
      />

      {/* 3. QRIS */}
      <Tabs.Screen
        name="qris" 
        options={{
          title: 'QRIS',
          tabBarIcon: ({ focused }) => (
            <View style={styles.qrisButtonContainer}>
              <View style={styles.qrisButton}>
                <Scan size={30} color='#FFF' strokeWidth={2.5} />
              </View>
            </View>
          ),
          tabBarLabelStyle: styles.qrisLabel, 
          tabBarStyle: { display: 'none' } 
        }}
      />

      {/* 4. TRANSFER */}
      <Tabs.Screen
        name="transfer" 
        options={{
          title: 'Transfer',
          tabBarIcon: ({ color }) => (
            <LogOut size={24} color={color} strokeWidth={2.5} style={{ transform: [{ rotate: '0deg' }] }} />
          ),
        }}
      />

      {/* 5. RECORD */}
      <Tabs.Screen
        name="record" 
        options={{
          title: 'Record',
          tabBarIcon: ({ color }) => (
            <FilePlus size={24} color={color} strokeWidth={2.5} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.primary, 
    height: Platform.OS === 'ios' ? 90 : 70, 
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderTopWidth: 0, 
    elevation: 10, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    paddingBottom: Platform.OS === 'ios' ? 25 : 10,
    paddingTop: 10,
  },
  tabLabel: {
    fontSize: 10,
    fontWeight: '600',
    marginTop: 0,
  },
  qrisButtonContainer: {
    top: -25,
    justifyContent: 'center',
    alignItems: 'center',
    width: 70,
    height: 70,
    borderRadius: 40,
    backgroundColor: '#FFFFFF',
    elevation: 5,
  },
  qrisButton: {
    width: 55,
    height: 55,
    borderRadius: 30,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  qrisLabel: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 15, 
  }
});
