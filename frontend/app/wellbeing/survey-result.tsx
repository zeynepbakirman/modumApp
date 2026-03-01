import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  FlatList,
} from 'react-native';
import { GradientBackground } from '@/components/GradientBackground';
import { router } from 'expo-router';
import { 
  ChevronLeft, 
  ClipboardList,
} from 'lucide-react-native';
import { useUser } from '@/context/UserContext';

export default function SurveyResultList() {
  const { surveyResults } = useUser();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'İyi': return '#4CAF50';
      case 'Kötü': return '#FF9800';
      case 'Destek Almalısınız': return '#FF5252';
      default: return '#FFF';
    }
  };

  return (
    <GradientBackground>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ChevronLeft color="#FFF" size={32} />
        </TouchableOpacity>
        <View style={styles.titleRow}>
          <View style={styles.iconBox}>
            <ClipboardList color="#FFF" size={24} />
          </View>
          <Text style={styles.title}>Sonuçlarım</Text>
        </View>
      </View>

      <FlatList
        data={surveyResults}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Henüz bir anket tamamlamadınız.</Text>
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.resultCard}>
             <Text style={styles.surveyName}>Anket : {item.name}</Text>
             <Text style={styles.infoText}>Puan : {item.score}</Text>
             <Text style={styles.infoText}>
                Sonuç : <Text style={{ color: getStatusColor(item.status), fontWeight: 'bold' }}>{item.status}</Text>
             </Text>
             <Text style={styles.infoText}>Tarih : {item.date}</Text>
          </View>
        )}
      />
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 10,
  },
  backButton: {
    marginRight: 10,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconBox: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  title: {
    fontSize: 24,
    color: '#FFF',
    fontWeight: 'bold',
  },
  listContainer: {
    padding: 20,
  },
  resultCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 20,
    padding: 20,
    marginBottom: 15,
    borderLeftWidth: 5,
    borderLeftColor: 'rgba(255, 255, 255, 0.3)',
  },
  surveyName: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  infoText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 15,
    marginBottom: 4,
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 100,
  },
  emptyText: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 16,
  },
});
