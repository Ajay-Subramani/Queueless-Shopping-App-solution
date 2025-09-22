import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, FlatList, Alert } from 'react-native';
import { Search, MapPin, User } from 'lucide-react-native';
import { useApp } from '../contexts/AppContext';
import { mockStores } from '../data/mockData';
import { router } from 'expo-router';
import ProfileMenu from '../components/ProfileMenu';

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [profileMenuVisible, setProfileMenuVisible] = useState(false);
  const { user, setCurrentStore, clearCart } = useApp();

  const filteredStores = mockStores.filter(store =>
    store.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectStore = (store: any) => {
    Alert.alert(
      'Select Store',
      `Do you want to shop at ${store.name}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Select',
          onPress: () => {
            clearCart(); // Clear any existing cart when switching stores
            setCurrentStore(store);
            router.push('/cart');
          }
        }
      ]
    );
  };

  const renderStore = ({ item }: { item: any }) => (
    <TouchableOpacity style={styles.storeCard} onPress={() => handleSelectStore(item)}>
      <View style={styles.storeInfo}>
        <Text style={styles.storeName}>{item.name}</Text>
        <Text style={styles.storeAddress}>{item.address}</Text>
        <View style={styles.distanceContainer}>
          <MapPin size={16} color="#64748b" />
          <Text style={styles.storeDistance}>{item.distance}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.selectButton} onPress={() => handleSelectStore(item)}>
        <Text style={styles.selectButtonText}>Select</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.locationContainer}>
          <MapPin size={20} color="#2563eb" />
          <View style={styles.locationText}>
            <Text style={styles.locationTitle}>Current Location</Text>
            <Text style={styles.locationSubtitle}>Ramapuram, Chennai</Text>
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
        <Text style={styles.welcomeText}>Welcome back, {user?.name}!</Text>
        <Text style={styles.subtitle}>Choose a store to start shopping</Text>

        <View style={styles.searchContainer}>
          <Search size={20} color="#64748b" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for stores..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <Text style={styles.sectionTitle}>Nearby Partnered Stores</Text>

        <FlatList
          data={filteredStores}
          renderItem={renderStore}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.storesList}
        />
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
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    marginLeft: 12,
  },
  locationTitle: {
    fontSize: 12,
    color: '#64748b',
    fontWeight: '500',
  },
  locationSubtitle: {
    fontSize: 16,
    color: '#1e293b',
    fontWeight: '600',
  },
  profileButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#f1f5f9',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748b',
    marginBottom: 24,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#374151',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 16,
  },
  storesList: {
    paddingBottom: 20,
  },
  storeCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  storeInfo: {
    flex: 1,
  },
  storeName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 4,
  },
  storeAddress: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 8,
  },
  distanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  storeDistance: {
    fontSize: 14,
    color: '#64748b',
    marginLeft: 4,
  },
  selectButton: {
    backgroundColor: '#2563eb',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  selectButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});