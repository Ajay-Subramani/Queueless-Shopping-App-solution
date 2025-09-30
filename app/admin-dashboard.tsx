import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, FlatList, ScrollView } from 'react-native';
import { BarChart, ShoppingBag, Users, DollarSign, LogOut, ArrowLeft } from 'lucide-react-native';
import { useApp } from '../contexts/AppContext';
import { router } from 'expo-router';

export default function AdminDashboard() {
  const { user, setUser, purchases, clearCart, setCurrentStore } = useApp();
  
  const today = new Date().toLocaleDateString();
  const todaySales = purchases.filter(p => p.date === today);
  const totalRevenue = todaySales.reduce((sum, p) => sum + p.total, 0);
  const totalOrders = todaySales.length;
  const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

  const handleLogout = () => {
    setUser(null);
    setCurrentStore(null);
    clearCart();
    router.replace('/');
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <ArrowLeft size={24} color="#374151" />
        </TouchableOpacity>
        <Text style={styles.title}>Admin Dashboard</Text>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <LogOut size={24} color="#ef4444" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <Text style={styles.welcomeText}>Welcome, {user?.name}</Text>
        <Text style={styles.subtitle}>Store Performance Overview</Text>

        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <View style={[styles.statIcon, { backgroundColor: '#eff6ff' }]}>
              <DollarSign size={24} color="#2563eb" />
            </View>
            <Text style={styles.statValue}>Rs.{totalRevenue.toFixed(2)}</Text>
            <Text style={styles.statLabel}>Today's Revenue</Text>
          </View>

          <View style={styles.statCard}>
            <View style={[styles.statIcon, { backgroundColor: '#f0fdf4' }]}>
              <ShoppingBag size={24} color="#22c55e" />
            </View>
            <Text style={styles.statValue}>{totalOrders}</Text>
            <Text style={styles.statLabel}>Orders Today</Text>
          </View>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <View style={[styles.statIcon, { backgroundColor: '#fffbeb' }]}>
              <BarChart size={24} color="#f59e0b" />
            </View>
            <Text style={styles.statValue}>Rs.{avgOrderValue.toFixed(2)}</Text>
            <Text style={styles.statLabel}>Avg. Order Value</Text>
          </View>

          <View style={styles.statCard}>
            <View style={[styles.statIcon, { backgroundColor: '#fef2f2' }]}>
              <Users size={24} color="#ef4444" />
            </View>
            <Text style={styles.statValue}>{purchases.length}</Text>
            <Text style={styles.statLabel}>Total Orders</Text>
          </View>
        </View>

        {/* Recent Orders */}
        <Text style={styles.sectionTitle}>Recent Orders</Text>
        {todaySales.length > 0 ? (
          <FlatList
            data={todaySales.slice(0, 5)}
            scrollEnabled={false}
            renderItem={({ item }) => (
              <View style={styles.orderItem}>
                <View style={styles.orderInfo}>
                  <Text style={styles.orderStore}>{item.storeName}</Text>
                  <Text style={styles.orderId}>Order #{item.id.slice(-6)}</Text>
                </View>
                <View style={styles.orderDetails}>
                  <Text style={styles.orderDate}>{item.date}</Text>
                  <Text style={styles.orderTotal}>Rs.{item.total.toFixed(2)}</Text>
                </View>
              </View>
            )}
            keyExtractor={(item) => item.id}
          />
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No orders today</Text>
          </View>
        )}

        {/* Admin Actions */}
        <Text style={styles.sectionTitle}>Management</Text>
        <View style={styles.actionsContainer}>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionText}>View All Purchase</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionText}>Manage Products</Text>
          </TouchableOpacity>
          
        </View>
      </ScrollView>
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
  backButton: {
    padding: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1e293b',
  },
  logoutButton: {
    padding: 8,
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
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 6,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  statIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#64748b',
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
    marginTop: 24,
    marginBottom: 16,
  },
  orderItem: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  orderInfo: {
    marginBottom: 8,
  },
  orderStore: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 4,
  },
  orderId: {
    fontSize: 12,
    color: '#64748b',
  },
  orderDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderDate: {
    fontSize: 14,
    color: '#64748b',
  },
  orderTotal: {
    fontSize: 16,
    fontWeight: '600',
    color: '#22c55e',
  },
  emptyState: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  emptyText: {
    fontSize: 16,
    color: '#64748b',
  },
  actionsContainer: {
    marginBottom: 24,
  },
  actionButton: {
    backgroundColor: '#2563eb',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  actionText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});