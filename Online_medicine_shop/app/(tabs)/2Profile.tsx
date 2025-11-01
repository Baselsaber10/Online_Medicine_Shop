// Profile.tsx
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Profile() {
  const router = useRouter();

  const handleLogout = () => {
    router.replace('/1Login'); // Navigate to login and prevent back
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>My Profile</Text>

      <View style={styles.profileCard}>
        {/* User Info */}
        <View style={styles.userInfo}>
          <View style={styles.userText}>
            <Text style={styles.userName}>Jessica Miller</Text>
            <Text style={styles.userEmail}>jessica.miller@example.com</Text>
          </View>
        </View>

        {/* Personal Information */}
        <View style={styles.personalInfo}>
          <Text style={styles.sectionTitle}>Personal Information</Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Shipping Address</Text>
            <Text style={styles.infoValue}>123 Wellness Ave, Suite 4B, Healthville, ST 54321</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Phone Number</Text>
            <Text style={styles.infoValue}>(555) 123-4567</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Email Address</Text>
            <Text style={styles.infoValue}>jessica.miller@example.com</Text>
          </View>
        </View>

        {/* Account Actions */}
        <View style={styles.actionsRow}>
          <TouchableOpacity onPress={handleLogout}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>

          <View style={styles.rightButtons}>
            <TouchableOpacity style={styles.editButton}>
              <Text style={styles.editButtonText}>Edit Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.changePassButton}>
              <Text style={styles.changePassText}>Change Password</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA', padding: 16 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 20, color: '#333333' },
  profileCard: { backgroundColor: '#fff', borderRadius: 12, padding: 20, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 10, elevation: 5 },
  userInfo: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  userText: { flex: 1 },
  userName: { fontSize: 18, fontWeight: 'bold', color: '#333333' },
  userEmail: { fontSize: 14, color: '#666666', marginTop: 2 },
  personalInfo: { borderTopWidth: 1, borderTopColor: '#E0E0E0', paddingTop: 15 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 10, color: '#333333' },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  infoLabel: { fontSize: 14, color: '#666666' },
  infoValue: { fontSize: 14, fontWeight: '500', flex: 1, textAlign: 'right', color: '#333333' },
  actionsRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginTop: 20 
  },
  rightButtons: { flexDirection: 'row', gap: 10 },
  editButton: { backgroundColor: '#2E8BC0', paddingVertical: 10, paddingHorizontal: 15, borderRadius: 8 },
  editButtonText: { color: '#fff', fontWeight: 'bold' },
  changePassButton: { backgroundColor: '#A1D9A6', paddingVertical: 10, paddingHorizontal: 15, borderRadius: 8 },
  changePassText: { color: '#fff', fontWeight: 'bold' },
  logoutText: { color: '#da0505ff', fontWeight: 'bold', fontSize: 16 },
});
