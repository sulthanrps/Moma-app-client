import React from 'react';
import { Image, ImageStyle, StyleProp, StyleSheet, View } from 'react-native';

// Kita buat props supaya ukurannya bisa diatur beda-beda tiap halaman kalau perlu
interface MomaLogoProps {
  size?: number; // Opsional, defaultnya nanti kita set 100
  style?: StyleProp<ImageStyle>; // Kalau mau nambah margin custom
}

export function MomaLogo({ size = 100, style }: MomaLogoProps) {
  return (
    <View style={styles.container}>
      <Image 
        // Ganti path ini sesuai nama file gambar kamu
        // Jika belum ada gambar, bisa pakai placeholder dulu: { uri: '...' }
        source={require('@/assets/images/moma-logo.png')} // Contoh pakai aset bawaan dulu
        style={[
            styles.image, 
            { width: size, height: size }, 
            style
        ]} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20, // Default jarak ke bawah
  },
  image: {
    resizeMode: 'contain',
  },
});