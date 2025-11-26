import { Stack } from 'expo-router';

export default function TransferLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* 1. Halaman Pilih Bank (Entry Point folder transfer) */}
      <Stack.Screen name="index" />

      {/* 2. Halaman Input Nominal */}
      <Stack.Screen name="amount" />

      {/* 3. Halaman Review Transaksi */}
      <Stack.Screen name="review" />

      {/* 4. Halaman Input PIN */}
      <Stack.Screen name="pin" />
    </Stack>
  );
}