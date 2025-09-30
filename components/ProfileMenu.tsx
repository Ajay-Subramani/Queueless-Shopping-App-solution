import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, SafeAreaView } from 'react-native';
import { User, Settings, ShoppingBag, LogOut, X } from 'lucide-react-native';
import { useApp } from '../contexts/AppContext';
import { router } from 'expo-router';

interface ProfileMenuProps {
  visible: boolean;
  onClose: () => void;
}

export default function ProfileMenu({ visible, onClose }: ProfileMenuProps) {
  const { user, setUser, setCurrentStore, clearCart } = useApp();

  const handleLogout = () => {
    setUser(null);
    setCurrentStore(null);
    clearCart();
    onClose();
    router.replace('/');
  };

  const handleProfile = () => {
    onClose();
    router.push('/profile');
  };

  const handlePurchaseHistory = () => {
    onClose();
    router.push('/purchase-history');
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Menu</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <X size={24} color="#666" />
          </TouchableOpacity>
        </View>

        <View style={styles.userInfo}>
          <View style={styles.avatar}>
            <User size={32} color="#2563eb" />
          </View>
          <Text style={styles.userName}>{user?.name}</Text>
          <Text style={styles.userEmail}>{user?.email}</Text>
        </View>

        <View style={styles.menuItems}>
          <TouchableOpacity style={styles.menuItem} onPress={handleProfile}>
            <User size={24} color="#666" />
            <Text style={styles.menuItemText}>User Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={handlePurchaseHistory}>
            <ShoppingBag size={24} color="#666" />
            <Text style={styles.menuItemText}>Purchase History</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
            <LogOut size={24} color="#ef4444" />
            <Text style={[styles.menuItemText, { color: '#ef4444' }]}>Logout</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </Modal>
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
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1e293b',
  },
  closeButton: {
    padding: 4,
  },
  userInfo: {
    backgroundColor: '#fff',
    paddingVertical: 24,
    alignItems: 'center',
    marginBottom: 8,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#eff6ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  userName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: '#64748b',
  },
  menuItems: {
    backgroundColor: '#fff',
    marginTop: 8,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  menuItemText: {
    fontSize: 16,
    color: '#374151',
    marginLeft: 16,
  },
});