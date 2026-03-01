import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';
import { GradientBackground } from '@/components/GradientBackground';
import { MOODS, COLORS } from '@/constants/theme';
import { router } from 'expo-router';
import { Brain, Activity, Zap, Sparkles, CheckCircle2 } from 'lucide-react-native';
import { useUser } from '@/context/UserContext';

const { width } = Dimensions.get('window');

const MOOD_ADVICES: Record<string, string[]> = {
  'Neşeli': [
    "Bu enerjini sevdiklerinle paylaş!",
    "Bugün yeni bir hobi denemeye ne dersin?",
    "En sevdiğin şarkıyı aç ve dans et."
  ],
  'Üzgün': [
    "Bugün 15 dakika yürüyüş yap.",
    "Bir arkadaşını ara ve sohbet et.",
    "Samsun sahilinde kısa bir yürüyüşe ne dersin?",
    "Kendine sevdiğin bir içecek ısmarla."
  ],
  'Kaygılı': [
    "3 dakika nefes egzersizi yap.",
    "Şu an kontrol edebileceğin tek bir şeye odaklan.",
    "Papatya çayı içmek sakinleşmene yardımcı olabilir.",
    "Duygularını bir kağıda yazmayı dene."
  ],
  'Coşkulu': [
    "Bu yüksek enerjiyi yaratıcı bir işe aktar!",
    "Gelecek planlarını yazmak için harika bir gün.",
    "Arkadaşlarınla bir araya gel."
  ],
  'Kızgın': [
    "Hemen 10'dan geriye doğru say.",
    "Kısa bir süre için ortamdan uzaklaş.",
    "Yastığa vurmak veya bağırmak bazen rahatlatabilir.",
    "Neden böyle hissettiğini anlamaya çalış."
  ],
  'Şaşkın': [
    "Olanları sindirmek için kendine zaman tanı.",
    "Detayları birine anlatarak netleştir.",
    "Biraz dinlen ve düşüncelerini toparla."
  ],
  'Tiksiniyorum': [
    "Ortamı değiştir ve taze hava al.",
    "Dikkatini başka bir yöne çevirecek bir video izle.",
    "Güzel bir koku koklamak iyi gelebilir."
  ],
  'Utanıyorum': [
    "Herkesin hata yapabileceğini unutma.",
    "Kendine karşı nazik ol, sen değerlisin.",
    "Bu durumu bir öğrenme fırsatı olarak gör."
  ],
  'Korkuyorum': [
    "Güvende olduğun bir yere geç.",
    "Derin nefesler al ve ver.",
    "Seni neyin korkuttuğunu rasyonel bir şekilde değerlendir.",
    "Yardım istemekten çekinme."
  ]
};

export default function HomeScreen() {
  const { addMoodSelection, currentMood } = useUser();
  const [selectedMood, setSelectedMood] = useState<null | typeof MOODS[0]>(null);

  useEffect(() => {
    if (currentMood) {
      const mood = MOODS.find(m => m.label === currentMood);
      if (mood) setSelectedMood(mood);
    }
  }, [currentMood]);

  const handleMoodSelect = (mood: typeof MOODS[0]) => {
    setSelectedMood(mood);
    addMoodSelection(mood.label);
  };

  const advices = selectedMood ? MOOD_ADVICES[selectedMood.label] || [] : [];

  return (
    <GradientBackground>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={styles.greeting}>Heyyy!:)</Text>
          <Text style={styles.question}>Bugün nasılsın?</Text>
        </View>

        <View style={styles.moodGrid}>
          {MOODS.map((mood) => (
            <TouchableOpacity
              key={mood.id}
              style={[
                styles.moodItem,
                selectedMood?.id === mood.id && styles.moodItemActive,
              ]}
              onPress={() => handleMoodSelect(mood)}
            >
              <Text style={styles.emoji}>{mood.emoji}</Text>
              <Text style={styles.moodLabel}>{mood.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {selectedMood && (
          <View style={styles.taskSection}>
            <View style={styles.taskCard}>
              <View style={styles.taskHeader}>
                <Zap color="#FFD700" size={24} />
                <Text style={styles.taskTitle}>Günün Görevi</Text>
              </View>
              <Text style={styles.taskDescription}>{selectedMood.task}</Text>
            </View>

            <View style={styles.adviceCard}>
              <View style={styles.adviceHeader}>
                <Sparkles color="#A855F7" size={24} />
                <Text style={styles.adviceTitle}>Sana Tavsiyelerimiz</Text>
              </View>
              {advices.map((advice, index) => (
                <View key={index} style={styles.adviceItem}>
                  <CheckCircle2 color="rgba(255, 255, 255, 0.6)" size={18} />
                  <Text style={styles.adviceText}>{advice}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        <View style={styles.actionGrid}>
          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => router.push('/wellbeing/mental')}
          >
            <Brain color="#FFF" size={32} />
            <Text style={styles.actionText}>Ruhsal İyi Oluş</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => router.push('/wellbeing/physical')}
          >
            <Activity color="#FFF" size={32} />
            <Text style={styles.actionText}>Fiziksel İyi Oluş</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionCardFull}
            onPress={() => router.push('/stress')}
          >
            <Zap color="#FFF" size={32} />
            <Text style={styles.actionText}>Stres Azaltma</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.brand}>modumApp</Text>
        </View>
      </ScrollView>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
    paddingTop: 50, // Emülatörün en üstündeki saate çarpmaması için
    paddingBottom: 120, // En alttaki menü butonlarının arkasında içerik kalmasın diye
  },
  header: {
    marginTop: 20,
    marginBottom: 30,
    alignItems: 'center',
  },
  greeting: {
    fontSize: 24,
    color: '#FFF',
    fontWeight: 'bold',
  },
  question: {
    fontSize: 28,
    color: '#FFF',
    fontWeight: '600',
    marginTop: 5,
  },
  moodGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 30,
  },
  moodItem: {
    width: (width - 60) / 3,
    aspectRatio: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  moodItemActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderColor: '#FFF',
  },
  emoji: {
    fontSize: 32,
    marginBottom: 5,
  },
  moodLabel: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '500',
  },
  taskSection: {
    width: '100%',
    marginBottom: 30,
  },
  taskCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 20,
    padding: 20,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  taskHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  taskTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  taskDescription: {
    color: '#FFF',
    fontSize: 16,
    lineHeight: 22,
  },
  adviceCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  adviceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  adviceTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  adviceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    paddingRight: 20,
  },
  adviceText: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 14,
    marginLeft: 10,
    lineHeight: 20,
  },
  actionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
  },
  actionCard: {
    width: (width - 50) / 2,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    marginBottom: 15,
  },
  actionCardFull: {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    marginBottom: 15,
  },
  actionText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  footer: {
    marginTop: 20,
  },
  brand: {
    fontSize: 32,
    color: '#FFF',
    fontWeight: 'bold',
    letterSpacing: 4,
    opacity: 0.8,
  }
});
