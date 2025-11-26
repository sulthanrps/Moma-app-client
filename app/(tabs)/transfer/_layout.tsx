import { Stack } from 'expo-router';

export default function TransferLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />

      <Stack.Screen name="amount" />

      <Stack.Screen name="review" />

      <Stack.Screen name="pin" />
    </Stack>
  );
}