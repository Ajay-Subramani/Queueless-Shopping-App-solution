import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { AppProvider } from '../contexts/AppContext';

export default function RootLayout() {
  useFrameworkReady();

  return (
    <AppProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="register" />
        <Stack.Screen name="home" />
        <Stack.Screen name="admin-dashboard" />
        <Stack.Screen name="cart" />
        <Stack.Screen name="scanner" />
        <Stack.Screen name="payment" />
        <Stack.Screen name="ar-tryon" />
        <Stack.Screen name="profile" />
        <Stack.Screen name="purchase-history" />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </AppProvider>
  );
}