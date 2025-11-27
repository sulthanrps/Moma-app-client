import { Stack } from 'expo-router';

export default function AllocationLayout() {
  return (
    <Stack screenOptions={{ headerShown: false, gestureEnabled: false }}>
      <Stack.Screen name="index" options={{ gestureEnabled: false }} />
      <Stack.Screen name="edit" options={{ gestureEnabled: false }} />
    </Stack>
  );
}