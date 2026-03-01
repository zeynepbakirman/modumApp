import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { GradientBackground } from '@/components/GradientBackground';
import { router } from 'expo-router';
import { 
  Activity, 
  Moon, 
  Apple, 
  Scale, 
  Dumbbell,
  ChevronLeft
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

const PHYSICAL_CATEGORIES = [
  { id: 'Genel Sağlık', label: 'Sağlık', icon: Activity, route: '/survey?type=Genel Sağlık' },
  { id: 'Uyku', label: 'Uyku', icon: Moon, route: '/survey?type=Uyku' },
  { id: 'Beslenme', label: 'Beslenme', icon: Apple, route: '/survey?type=Beslenme' },
  { id: 'weight', label: 'Boy-Kilo', icon: Scale, route: '/wellbeing/height-weight' },
  { id: 'exercise', label: 'Egzersiz', icon: Dumbbell, route: '/survey?type=Genel Sağlık' },
];

export default function PhysicalWellbeingScreen() {
  return (
    <GradientBackground>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ChevronLeft color="#FFF" size={32} />
        </TouchableOpacity>
        <Text style={styles.title}>Fiziksel İyi Oluş</Text>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>Fiziksel sağlığını nasıl iyileştirebiliriz?</Text>
        </View>

        <View style={styles.gridContainer}>
          {PHYSICAL_CATEGORIES.map((cat) => (
            <TouchableOpacity
              key={cat.id}
              style={[styles.categoryItem]}
              onPress={() => router.push(cat.route as any)}
            >
              <View style={styles.iconCircle}>
                <cat.icon color="#FFF" size={40} />
              </View>
              <Text style={styles.categoryLabel}>{cat.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity 
          style={styles.resultsBtn}
          onPress={() => router.push('/(tabs)/stats')}
        >
          <Text style={styles.resultsBtnText}>Geçmiş Kayıtlarım</Text>
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
    textAlign: 'center',
  },
  gridContainer: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryItem: {
    width: (width - 60) / 2,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  iconCircle: {
    marginBottom: 10,
  },
  categoryLabel: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
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
