import { MomaLogo } from '@/components/MomaLogo';
import { Stack, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Dimensions, StatusBar, StyleSheet, Text, View } from 'react-native';

const { width } = Dimensions.get('window');

const CustomSplashScreen = () => {
  return (
    <View style={splashStyles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#D98989" />
      
      <View style={splashStyles.logoContainer}>
        <MomaLogo size={170} />
      </View>

      <View style={splashStyles.textContainer}>
        <Text style={splashStyles.brandName}>Moma</Text>
        <Text style={splashStyles.tagline}>Your Personalized Money Management System</Text>
      </View>
    </View>
  );
};

const splashStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D98989',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    paddingBottom: 80, 
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  brandName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
    letterSpacing: 1,
  },
  tagline: {
    fontSize: 14,
    color: '#FFFFFF',
    textAlign: 'center',
    opacity: 0.9,
    lineHeight: 20,
  }
});

export default function RootLayout() {
  const [isShowSplash, setIsShowSplash] = useState(true);
   const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsShowSplash(false);
      router.navigate('/login');
    }, 5000);

    return () => clearTimeout(timer); 
  }, []);

  if (isShowSplash) {
    return <CustomSplashScreen />;
  }

  return (
    <Stack>
      <Stack.Screen 
        name="login" 
        options={{ 
          headerShown: false,
          gestureEnabled: false 
        }} 
      />
      <Stack.Screen 
        name="register" 
        options={{ 
          headerShown: false,
          gestureEnabled: false 
        }} 
      />
      <Stack.Screen 
        name="create-pin" 
        options={{ 
          headerShown: false,
          gestureEnabled: false 
        }} 
      />
      <Stack.Screen 
        name="(tabs)" 
        options={{ 
          headerShown: false,
          gestureEnabled: false 
        }} 
      />
      <Stack.Screen 
        name="allocation" 
        options={{ 
          headerShown: false,
        }}
      />
      
    </Stack>
  );
}