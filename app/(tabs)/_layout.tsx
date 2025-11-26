import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />

      <Tabs.Screen
        name="report"
        options={{
          title: 'Report',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="clock.arrow.circlepath" color={color} />,
        }}
      />

      <Tabs.Screen
        name="qris"
        options={{
          title: 'Qris',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="qrcode.viewfinder" color={color} />,
        }}
      />

      <Tabs.Screen
        name="transfer"
        options={{
          title: 'Transfer',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="rectangle.portrait.and.arrow.right" color={color} />,
        }}
      />

      <Tabs.Screen
        name="record"
        options={{
          title: 'Record',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="doc.badge.plus" color={color} />,
        }}
      />
    </Tabs>
  );
}
