import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Alert } from 'react-native';
import { ArrowLeft, Scan, CircleCheck as CheckCircle } from 'lucide-react-native';
import { useApp } from '../contexts/AppContext';
import { mockProducts } from '../data/mockData';
import { router } from 'expo-router';

export default function ScannerScreen() {
  const [isScanning, setIsScanning] = useState(true);
  const { currentStore, addToCart, cart } = useApp();

  // Mock scanning - simulate finding a product after 2 seconds
  useEffect(() => {
    if (isScanning) {
      const timer = setTimeout(() => {
        handleMockScan();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isScanning]);

 // Update scanner.tsx
const handleMockScan = () => {
  const storeProducts = mockProducts.filter(
    product => product.storeId === (currentStore?.id || '1')
  );
  const randomProduct = storeProducts.length > 0 
    ? storeProducts[Math.floor(Math.random() * storeProducts.length)]
    : mockProducts[Math.floor(Math.random() * mockProducts.length)];
  const success = addToCart(randomProduct);
  setIsScanning(false);
  
  if (success) {
    Alert.alert(
      'Item Added!',
      `${randomProduct.name} has been added to your cart.`,
      [
        { text: 'Continue Shopping', onPress: () => setIsScanning(true) },
        { text: 'View Cart', onPress: () => router.back() }
      ]
    );
  }
};

  const handleManualBack = () => {
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleManualBack} style={styles.backButton}>
          <ArrowLeft size={24} color="#374151" />
        </TouchableOpacity>
        <Text style={styles.title}>Scan Item</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.scannerContainer}>
          <View style={styles.scannerFrame}>
            <View style={[styles.corner, styles.topLeft]} />
            <View style={[styles.corner, styles.topRight]} />
            <View style={[styles.corner, styles.bottomLeft]} />
            <View style={[styles.corner, styles.bottomRight]} />
            
            {isScanning ? (
              <View style={styles.scanningIndicator}>
                <Scan size={48} color="#2563eb" />
                <Text style={styles.scanningText}>Scanning...</Text>
              </View>
            ) : (
              <View style={styles.scanningIndicator}>
                <CheckCircle size={48} color="#22c55e" />
                <Text style={styles.successText}>Item Found!</Text>
              </View>
            )}
          </View>
          
          <Text style={styles.instruction}>
            {isScanning 
              ? 'Point your camera at the product barcode or QR code'
              : 'Product scanned successfully!'
            }
          </Text>
        </View>

        {!isScanning && (
          <View style={styles.actionButtons}>
            <TouchableOpacity 
              style={styles.scanAgainButton}
              onPress={() => setIsScanning(true)}
            >
              <Text style={styles.scanAgainButtonText}>Scan Another Item</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.viewCartButton}
              onPress={handleManualBack}
            >
              <Text style={styles.viewCartButtonText}>View Cart</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
  backButton: {
    padding: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
    marginLeft: 16,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  scannerContainer: {
    alignItems: 'center',
  },
  scannerFrame: {
    width: 250,
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
    position: 'relative',
  },
  corner: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderColor: '#2563eb',
    borderWidth: 4,
  },
  topLeft: {
    top: 0,
    left: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  topRight: {
    top: 0,
    right: 0,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
  },
  bottomLeft: {
    bottom: 0,
    left: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
  },
  bottomRight: {
    bottom: 0,
    right: 0,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  scanningIndicator: {
    alignItems: 'center',
  },
  scanningText: {
    color: '#2563eb',
    fontSize: 16,
    fontWeight: '500',
    marginTop: 12,
  },
  successText: {
    color: '#22c55e',
    fontSize: 16,
    fontWeight: '500',
    marginTop: 12,
  },
  instruction: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 48,
  },
  actionButtons: {
    width: '100%',
    gap: 12,
  },
  scanAgainButton: {
    backgroundColor: '#2563eb',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  scanAgainButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  viewCartButton: {
    backgroundColor: '#22c55e',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  viewCartButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});