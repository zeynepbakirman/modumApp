import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { GradientBackground } from '@/components/GradientBackground';
import { router } from 'expo-router';
import { 
  Brain, 
  ShieldAlert, 
  Heart, 
  Utensils, 
  Moon, 
  Stethoscope, 
  MoreHorizontal,
  ChevronLeft
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

const MENTAL_CATEGORIES = [
  { id: 'Bağımlılık', label: 'Bağımlılık', icon: ShieldAlert },
  { id: 'Anksiyete', label: 'Anksiyete/Depresyon', icon: Brain },
  { id: 'Partner Şiddeti', label: 'Partner Şiddeti', icon: Heart },
  { id: 'Yeme Bozukluğu', label: 'Yeme Bozukluğu', icon: Utensils },
  { id: 'Uyku Bozukluğu', label: 'Uyku Bozukluğu', icon: Moon },
  { id: 'Genel Sağlık', label: 'Genel Sağlık', icon: Stethoscope },
];

export default function MentalWellbeingScreen() {
  return (
    <GradientBackground>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ChevronLeft color="#FFF" size={32} />
        </TouchableOpacity>
        <Text style={styles.title}>Ruhsal İyi Oluş</Text>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>Hangi konuda destek almak istersin?</Text>
        </View>

        <View style={styles.gridContainer}>
          {/* Central circular layout simulation */}
          <View style={styles.centralIcon}>
             <Brain color="#FFF" size={48} />
             <Text style={styles.centralText}>İyi Oluş</Text>
          </View>

          {MENTAL_CATEGORIES.map((cat, index) => {
            // In a real app we'd use polar coordinates or a fixed positions
            // For now, let's use a nice grid or custom positions if possible
            return (
              <TouchableOpacity
                key={cat.id}
                style={[styles.categoryItem]}
                onPress={() => router.push(`/survey?type=${cat.id}`)}
              >
                <View style={styles.iconCircle}>
                  <cat.icon color="#FFF" size={32} />
                </View>
                <Text style={styles.categoryLabel}>{cat.label}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
        
        <TouchableOpacity 
          style={styles.resultsBtn}
          onPress={() => router.push('/(tabs)/stats')}
        >
          <Text style={styles.resultsBtnText}>Sonuçlarım</Text>
        </TouchableOpacity>
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
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  backButton: {
    marginRight: 10,
  },
  title: {
    fontSize: 24,
    color: '#FFF',
    fontWeight: 'bold',
  },
  infoBox: {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 15,
    padding: 15,
    marginTop: 20,
    marginBottom: 30,
    alignItems: 'center',
  },
  infoText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '500',
  },
  gridContainer: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  centralIcon: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },
  centralText: {
    color: '#FFF',
    fontWeight: 'bold',
    marginTop: 5,
  },
  categoryItem: {
    width: (width - 60) / 2,
    alignItems: 'center',
    marginBottom: 25,
  },
  iconCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryLabel: {
    color: '#FFF',
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '500',
  },
  resultsBtn: {
    marginTop: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  resultsBtnText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
