import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { GradientBackground } from '@/components/GradientBackground';
import { router } from 'expo-router';
import { MOODS } from '@/constants/theme';
import { useUser } from '@/context/UserContext';
import { BarChart2, TrendingUp, Calendar } from 'lucide-react-native';

const { width } = Dimensions.get('window');

const MOOD_COLORS: Record<string, string> = {
  'Neşeli': '#FFD700',
  'Üzgün': '#4F46E5',
  'Kaygılı': '#F97316',
  'Coşkulu': '#EC4899',
  'Kızgın': '#EF4444',
  'Şaşkın': '#A855F7',
  'Tiksiniyorum': '#10B981',
  'Utanıyorum': '#6B7280',
  'Korkuyorum': '#1F2937',
};

export default function StatsScreen() {
  const { moodHistory } = useUser();

  const stats = useMemo(() => {
    const counts: Record<string, number> = {};
    
    MOODS.forEach(m => counts[m.label] = 0);
    
    moodHistory.forEach(entry => {
      if (counts[entry.mood] !== undefined) {
        counts[entry.mood]++;
      }
    });

    return MOODS.map(m => {
      const count = counts[m.label];
      const percentage = moodHistory.length > 0 
        ? Math.round((count / moodHistory.length) * 100) 
        : 0;
        
      return {
        name: m.label,
        emoji: m.emoji,
        count,
        percentage,
        color: MOOD_COLORS[m.label] || '#FFF'
      };
    });
  }, [moodHistory]);

  const sortedStats = useMemo(() => [...stats].sort((a, b) => b.count - a.count), [stats]);

  return (
    <GradientBackground>
      <View style={styles.header}>
        <BarChart2 color="#FFF" size={32} />
        <Text style={styles.title}>İstatistiklerim</Text>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.summaryCard}>
           <TrendingUp color="#FFF" size={24} style={{ marginBottom: 10 }} />
           <Text style={styles.summaryTitle}>Son 1 Haftalık Durum</Text>
           <Text style={styles.summaryText}>
              Son 7 günde toplam {moodHistory.length} mod seçimi yaptınız. En çok hissettiğiniz mod: 
              <Text style={{ fontWeight: 'bold' }}> {sortedStats[0].count > 0 ? sortedStats[0].name : 'Henüz veri yok'}</Text>
           </Text>
        </View>

        <View style={styles.chartContainer}>
           <Text style={styles.chartTitle}>Mod Dağılımı</Text>
           <View style={styles.barContainer}>
              {stats.map((stat, index) => (
                <View key={index} style={styles.barRow}>
                   <View style={styles.barLabelContainer}>
                      <Text style={styles.barEmoji}>{stat.emoji}</Text>
                      <Text style={styles.barLabel}>{stat.name}</Text>
                   </View>
                   <View style={styles.barBackground}>
                      <View 
                        style={[
                          styles.barForeground, 
                          { 
                            width: `${Math.max(stat.percentage, 2)}%`, 
                            backgroundColor: stat.color 
                          }
                        ]} 
                      />
                   </View>
                   <Text style={styles.barPercent}>%{stat.percentage}</Text>
                </View>
              ))}
           </View>
        </View>

        <View style={styles.historyCard}>
          <View style={styles.historyHeader}>
            <Calendar color="#FFF" size={20} />
            <Text style={styles.historyTitle}>Son Seçimlerin</Text>
          </View>
          {moodHistory.slice(-5).reverse().map((item, index) => (
            <View key={index} style={styles.historyItem}>
              <Text style={styles.historyDate}>{item.date}</Text>
              <View style={styles.historyMood}>
                <Text style={styles.historyEmoji}>{MOODS.find(m => m.label === item.mood)?.emoji}</Text>
                <Text style={styles.historyLabel}>{item.mood}</Text>
              </View>
            </View>
          ))}
          {moodHistory.length === 0 && (
            <Text style={styles.emptyText}>Henüz kayıtlı mod seçiminiz yok.</Text>
          )}
        </View>

        <TouchableOpacity 
          style={styles.evaluateBtn}
          onPress={() => router.push('/home')}
        >
          <Text style={styles.evaluateBtnText}>Modunu Değerlendirmek İçin Tıkla</Text>
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
    justifyContent: 'center',
    paddingHorizontal: 20,
    marginTop: 20,
    gap: 15,
  },
  title: {
    fontSize: 28,
    color: '#FFF',
    fontWeight: 'bold',
  },
  summaryCard: {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 20,
    padding: 20,
    marginTop: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  summaryTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  summaryText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
    lineHeight: 20,
  },
  chartContainer: {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
  },
  chartTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  barContainer: {
    width: '100%',
  },
  barRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  barLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 100,
  },
  barEmoji: {
    fontSize: 18,
    marginRight: 8,
  },
  barLabel: {
    color: '#FFF',
    fontSize: 12,
  },
  barBackground: {
    flex: 1,
    height: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 5,
    marginHorizontal: 10,
    overflow: 'hidden',
  },
  barForeground: {
    height: '100%',
    borderRadius: 5,
  },
  barPercent: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 12,
    width: 35,
    textAlign: 'right',
  },
  historyCard: {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    padding: 20,
    marginBottom: 30,
  },
  historyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    gap: 10,
  },
  historyTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  historyItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  historyDate: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 12,
  },
  historyMood: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  historyEmoji: {
    fontSize: 18,
    marginRight: 8,
  },
  historyLabel: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '500',
  },
  emptyText: {
    color: 'rgba(255, 255, 255, 0.5)',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  evaluateBtn: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.4)',
  },
  evaluateBtnText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
