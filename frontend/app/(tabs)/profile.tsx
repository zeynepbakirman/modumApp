import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { GradientBackground } from '@/components/GradientBackground';
import { router } from 'expo-router';
import { User, MessageSquare, LogOut, ChevronRight, ClipboardList } from 'lucide-react-native';
import { useUser } from '@/context/UserContext';

export default function ProfileScreen() {
  const { userData } = useUser();

  return (
    <GradientBackground>
      <View style={styles.header}>
        <Text style={styles.title}>Profilim</Text>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.profileCard}>
          <View style={styles.avatarCircle}>
             <User color="#FFF" size={48} />
          </View>
          <Text style={styles.studentName}>Öğrenci #{userData?.studentNo || '000000'}</Text>
          <View style={styles.studentInfoContainer}>
            <Text style={styles.studentDetails}>Yaş: {userData?.age || '20'}</Text>
            <Text style={styles.studentDetails}>Cinsiyet: {userData?.gender || 'Erkek'}</Text>
            {userData?.height && userData?.weight && (
              <Text style={styles.studentDetails}>Boy: {userData.height} cm | Kilo: {userData.weight} kg</Text>
            )}
          </View>
        </View>

        <View style={styles.menuContainer}>
          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => router.push('/wellbeing/survey-result')}
          >
            <View style={styles.menuItemLeft}>
              <ClipboardList color="#FFF" size={24} />
              <Text style={styles.menuItemText}>Anket Sonuçlarım</Text>
            </View>
            <ChevronRight color="rgba(255, 255, 255, 0.5)" size={24} />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => router.push('/complaint')}
          >
            <View style={styles.menuItemLeft}>
              <MessageSquare color="#FFF" size={24} />
              <Text style={styles.menuItemText}>Şikayet / Öneri</Text>
            </View>
            <ChevronRight color="rgba(255, 255, 255, 0.5)" size={24} />
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.menuItem, styles.logoutItem]}
            onPress={() => router.replace('/')}
          >
            <View style={styles.menuItemLeft}>
              <LogOut color="#FF4500" size={24} />
              <Text style={[styles.menuItemText, { color: '#FF4500' }]}>Çıkış Yap</Text>
            </View>
            <ChevronRight color="rgba(255, 69, 0, 0.5)" size={24} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
    paddingBottom: 40,
  },
  header: {
    paddingHorizontal: 20,
    marginTop: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    color: '#FFF',
    fontWeight: 'bold',
  },
  profileCard: {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 20,
    padding: 30,
    marginTop: 30,
    alignItems: 'center',
    marginBottom: 30,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  avatarCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  studentName: {
    color: '#FFF',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  studentInfoContainer: {
    alignItems: 'center',
  },
  studentDetails: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 16,
    marginBottom: 4,
  },
  menuContainer: {
    width: '100%',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 18,
    borderRadius: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 15,
  },
  logoutItem: {
    marginTop: 20,
    borderColor: 'rgba(255, 69, 0, 0.2)',
  },
});

