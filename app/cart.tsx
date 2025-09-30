import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, FlatList, Image, Alert } from 'react-native';
import { ArrowLeft, User, Plus, CreditCard, Scan, Trash2 } from 'lucide-react-native';
import { useApp } from '../contexts/AppContext';
import { router } from 'expo-router';
import ProfileMenu from '../components/ProfileMenu';

export default function CartScreen() {
  const [profileMenuVisible, setProfileMenuVisible] = useState(false);
  const { currentStore, cart, removeFromCart, clearCart } = useApp();

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleBack = () => {
    Alert.alert(
      'Go Back',
      'Going back will clear your current cart. Continue?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Go Back',
          onPress: () => {
            clearCart();
            router.replace('/home');
          }
        }
      ]
    );
  };

  const handleScanItem = () => {
    router.push('/scanner');
  };

  const handlePayment = () => {
    if (cart.length === 0) {
      Alert.alert('Empty Cart', 'Please add items to your cart before proceeding to payment');
      return;
    }
    router.push('/payment');
  };

  const handleARTryOn = (item: any) => {
    router.push({
      pathname: '/ar-tryon',
      params: { productId: item.id }
    });
  };

  const renderCartItem = ({ item }: { item: any }) => (
    <View style={styles.cartItem}>
      <Image source={{ uri: item.image }} style={styles.itemImage} />
      <View style={styles.itemInfo}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemStore}>{item.storeName}</Text>
        <Text style={styles.itemPrice}>Rs.{item.price.toFixed(2)} x {item.quantity}</Text>
        {item.canTryOn && (
          <TouchableOpacity 
            style={styles.tryOnButton}
            onPress={() => handleARTryOn(item)}
          >
            <Text style={styles.tryOnButtonText}>Try in AR</Text>
          </TouchableOpacity>
        )}
      </View>
      <TouchableOpacity 
        style={styles.removeButton}
        onPress={() => removeFromCart(item.id)}
      >
        <Trash2 size={20} color="#ef4444" />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <ArrowLeft size={24} color="#374151" />
          </TouchableOpacity>
          <View style={styles.storeInfo}>
            <Text style={styles.storeName}>{currentStore?.name || 'No Store Selected'}</Text>
            <Text style={styles.storeDistance}>{currentStore?.distance}</Text>
          </View>
        </View>
        <TouchableOpacity 
          style={styles.profileButton}
          onPress={() => setProfileMenuVisible(true)}
        >
          <User size={24} color="#374151" />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        {cart.length === 0 ? (
          <View style={styles.emptyCart}>
            <Text style={styles.emptyCartTitle}>Your cart is empty</Text>
            <Text style={styles.emptyCartSubtitle}>Scan items to add them to your cart</Text>
          </View>
        ) : (
          <FlatList
            data={cart}
            renderItem={renderCartItem}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.cartList}
          />
        )}

        {cart.length > 0 && (
          <View style={styles.totalContainer}>
            <Text style={styles.totalText}>Total: Rs.{total.toFixed(2)}</Text>
          </View>
        )}
      </View>

      <View style={styles.bottomButtons}>
        <TouchableOpacity style={styles.actionButton} onPress={handleBack}>
          <ArrowLeft size={20} color="#374151" />
          <Text style={styles.actionButtonText}>Change Store</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.scanButton} onPress={handleScanItem}>
          <Plus size={20} color="#fff" />
          <Text style={styles.scanButtonText}>Add Item</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.paymentButton, cart.length === 0 && styles.disabledButton]} 
          onPress={handlePayment}
          disabled={cart.length === 0}
        >
          <CreditCard size={20} color="#fff" />
          <Text style={styles.paymentButtonText}>Payment</Text>
        </TouchableOpacity>
      </View>

      <ProfileMenu
        visible={profileMenuVisible}
        onClose={() => setProfileMenuVisible(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  backButton: {
    padding: 8,
    marginRight: 8,
  },
  storeInfo: {
    flex: 1,
  },
  storeName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
  },
  storeDistance: {
    fontSize: 14,
    color: '#64748b',
  },
  profileButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#f1f5f9',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  emptyCart: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyCartTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  emptyCartSubtitle: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
  },
  cartList: {
    paddingBottom: 20,
  },
  cartItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  itemInfo: {
    flex: 1,
    marginLeft: 12,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 4,
  },
  itemStore: {
    fontSize: 12,
    color: '#64748b',
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 14,
    color: '#2563eb',
    fontWeight: '500',
    marginBottom: 8,
  },
  tryOnButton: {
    backgroundColor: '#22c55e',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  tryOnButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },
  removeButton: {
    padding: 8,
  },
  totalContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  totalText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1e293b',
    textAlign: 'center',
  },
  bottomButtons: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    gap: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f1f5f9',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    flex: 1,
  },
  actionButtonText: {
    color: '#374151',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
  scanButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2563eb',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    flex: 1,
  },
  scanButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
  paymentButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#22c55e',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    flex: 1,
  },
  disabledButton: {
    backgroundColor: '#9ca3af',
  },
  paymentButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
});