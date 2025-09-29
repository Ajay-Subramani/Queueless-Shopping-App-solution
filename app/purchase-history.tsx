import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, FlatList } from 'react-native';
import { ArrowLeft, QrCode, Calendar, ShoppingBag } from 'lucide-react-native';
import { useApp } from '../contexts/AppContext';
import { router } from 'expo-router';

export default function PurchaseHistoryScreen() {
  const { purchases } = useApp();

  const renderPurchase = ({ item }: { item: any }) => (
    <View style={styles.purchaseCard}>
      <View style={styles.purchaseHeader}>
        <View style={styles.purchaseInfo}>
          <Text style={styles.purchaseStore}>{item.storeName}</Text>
          <View style={styles.purchaseDate}>
            <Calendar size={16} color="#64748b" />
            <Text style={styles.dateText}>{item.date}</Text>
          </View>
        </View>
        <Text style={styles.purchaseTotal}>Rs.{item.total.toFixed(2)}</Text>
      </View>

      <View style={styles.purchaseItems}>
        {item.items.slice(0, 2).map((product: any, index: number) => (
          <Text key={index} style={styles.itemText}>
            {product.quantity}x {product.name}
          </Text>
        ))}
        {item.items.length > 2 && (
          <Text style={styles.moreItems}>
            +{item.items.length - 2} more items
          </Text>
        )}
      </View>

      <View style={styles.qrSection}>
        <View style={styles.qrInfo}>
          <QrCode size={20} color="#2563eb" />
          <Text style={styles.qrCode}>{item.qrCode}</Text>
        </View>
        <Text style={styles.qrInstruction}>Show at store exit</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color="#374151" />
        </TouchableOpacity>
        <Text style={styles.title}>Purchase History</Text>
      </View>

      <View style={styles.content}>
        {purchases.length === 0 ? (
          <View style={styles.emptyState}>
            <View style={styles.emptyIcon}>
              <ShoppingBag size={48} color="#94a3b8" />
            </View>
            <Text style={styles.emptyTitle}>No Purchase History</Text>
            <Text style={styles.emptySubtitle}>
              Your completed purchases will appear here
            </Text>
          </View>
        ) : (
          <FlatList
            data={purchases}
            renderItem={renderPurchase}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.purchasesList}
          />
        )}
      </View>
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
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  backButton: {
    padding: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1e293b',
    marginLeft: 16,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyIcon: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#f1f5f9',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
    lineHeight: 22,
  },
  purchasesList: {
    paddingBottom: 20,
  },
  purchaseCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  purchaseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  purchaseInfo: {
    flex: 1,
  },
  purchaseStore: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 4,
  },
  purchaseDate: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateText: {
    fontSize: 14,
    color: '#64748b',
    marginLeft: 4,
  },
  purchaseTotal: {
    fontSize: 18,
    fontWeight: '700',
    color: '#22c55e',
  },
  purchaseItems: {
    marginBottom: 12,
  },
  itemText: {
    fontSize: 14,
    color: '#374151',
    marginBottom: 2,
  },
  moreItems: {
    fontSize: 12,
    color: '#64748b',
    fontStyle: 'italic',
  },
  qrSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
  },
  qrInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  qrCode: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2563eb',
    marginLeft: 8,
  },
  qrInstruction: {
    fontSize: 12,
    color: '#64748b',
  },
});