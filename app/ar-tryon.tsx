import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { ArrowLeft, RotateCcw, Camera, Plus } from 'lucide-react-native';
import { router, useLocalSearchParams } from 'expo-router';

export default function ARTryOnScreen() {
  const { productId } = useLocalSearchParams();
  const [isRecording, setIsRecording] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      {/* AR Camera View - Mock Implementation */}
      <View style={styles.cameraContainer}>
        <View style={styles.arOverlay}>
          <Text style={styles.arText}>AR Try-On View</Text>
          <Text style={styles.arSubtext}>Product ID: {productId}</Text>
          <Text style={styles.instruction}>
            Move around to see how the item looks on you
          </Text>
        </View>
      </View>

      {/* Header Controls */}
      <View style={styles.headerControls}>
        <TouchableOpacity 
          onPress={() => router.back()} 
          style={styles.controlButton}
        >
          <ArrowLeft size={24} color="#fff" />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.controlButton}>
          <RotateCcw size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Bottom Controls */}
      <View style={styles.bottomControls}>
        <TouchableOpacity 
          style={styles.captureButton}
          onPress={() => setIsRecording(!isRecording)}
        >
          <Camera size={32} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.addToCartButton}
          onPress={() => router.back()}
        >
          <Plus size={20} color="#fff" />
          <Text style={styles.addToCartText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>

      {/* AR Features Info */}
      <View style={styles.infoPanel}>
        <Text style={styles.infoTitle}>AR Try-On Features</Text>
        <Text style={styles.infoText}>• Real-time virtual fitting</Text>
        <Text style={styles.infoText}>• 360° product view</Text>
        <Text style={styles.infoText}>• Size and fit recommendations</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  cameraContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  arOverlay: {
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
    borderRadius: 12,
    padding: 24,
  },
  arText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 8,
  },
  arSubtext: {
    color: '#94a3b8',
    fontSize: 16,
    marginBottom: 16,
  },
  instruction: {
    color: '#e2e8f0',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
  headerControls: {
    position: 'absolute',
    top: 60,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  controlButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomControls: {
    position: 'absolute',
    bottom: 40,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  captureButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderWidth: 4,
    borderColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addToCartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#22c55e',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  addToCartText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  infoPanel: {
    position: 'absolute',
    top: 140,
    left: 20,
    backgroundColor: 'rgba(0,0,0,0.8)',
    borderRadius: 12,
    padding: 16,
    maxWidth: 200,
  },
  infoTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  infoText: {
    color: '#94a3b8',
    fontSize: 14,
    marginBottom: 4,
  },
});