import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView, 
  Dimensions,
} from 'react-native';
import { GradientBackground } from '@/components/GradientBackground';
import { router, useLocalSearchParams } from 'expo-router';
import { 
  ChevronLeft, 
  ChevronRight,
  Calendar,
  Award
} from 'lucide-react-native';
import { COLORS } from '@/constants/theme';
import { useUser } from '@/context/UserContext';

const { width } = Dimensions.get('window');

import { SURVEY_QUESTIONS, POSITIVE_QUESTIONS } from '@/constants/surveys';

const OPTIONS = [
  { value: 1, label: 'Kesin Katılmıyor' },
  { value: 2, label: 'Katılmıyor' },
  { value: 3, label: 'Kararsız' },
  { value: 4, label: 'Katılıyor' },
  { value: 5, label: 'Kesin Katılıyor' },
];

export default function SurveyScreen() {
  const { addSurveyResult } = useUser();
  const params = useLocalSearchParams();
  const surveyType = (params.type as string) || 'Genel Sağlık';
  const QUESTIONS = SURVEY_QUESTIONS[surveyType] || SURVEY_QUESTIONS['Genel Sağlık'];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>(new Array(QUESTIONS.length).fill(0));
  const [isFinished, setIsFinished] = useState(false);
  const [finalResult, setFinalResult] = useState<any>(null);

  const handleSelect = (value: number) => {
    const newAnswers = [...answers];
    newAnswers[currentIndex] = value;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentIndex < QUESTIONS.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      finishSurvey();
    }
  };

  const finishSurvey = () => {
    // Scoring logic (Corrected):
    // For Negative statements (default): 1 (Best) to 5 (Worst)
    // For Positive statements: 1 (Worst) to 5 (Best)
    // Map everything to a 1-5 scale where 1 is BEST and 5 is WORST
    
    const mappedAnswers = answers.map((val, idx) => {
      const positives = POSITIVE_QUESTIONS[surveyType] || [];
      if (positives.includes(idx)) {
        // Positive statement: 1 -> 5, 2 -> 4, 3 -> 3, 4 -> 2, 5 -> 1
        return 6 - val;
      }
      // Negative statement: 1 -> 1, 2 -> 2, 3 -> 3, 4 -> 4, 5 -> 5
      return val;
    });

    const totalScore = mappedAnswers.reduce((a, b) => a + b, 0);
    const avgScore = totalScore / mappedAnswers.length;
    
    // Status based on avgScore (1=Best, 5=Worst)
    let status = 'İyi';
    let statusColor = '#4CAF50';
    
    if (avgScore >= 4) {
      status = 'Destek Almalısınız';
      statusColor = '#FF5252';
    } else if (avgScore >= 3) {
      status = 'Kötü';
      statusColor = '#FF9800';
    } else if (avgScore >= 2) {
      status = 'Orta';
      statusColor = '#FFD700';
    }

    const result = {
      name: surveyType,
      score: parseFloat(avgScore.toFixed(1)),
      status,
      date: new Date().toLocaleDateString('tr-TR'),
    };

    setFinalResult({ ...result, statusColor });
    addSurveyResult(result);
    setIsFinished(true);
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const progress = (currentIndex + 1) / QUESTIONS.length;

  if (isFinished && finalResult) {
    return (
      <GradientBackground>
        <View style={styles.resultContainer}>
          <Text style={styles.resultHeader}>Sonuçlarım</Text>
          <View style={styles.resultCard}>
            <View style={styles.resultIconBox}>
              <Award color="#FFD700" size={60} />
            </View>
            <Text style={styles.surveyName}>{finalResult.name}</Text>
            <View style={styles.scoreBox}>
               <Text style={styles.scoreLabel}>Ortalama Puan</Text>
               <Text style={styles.scoreValue}>{finalResult.score}</Text>
            </View>
            <View style={styles.statusBox}>
              <Text style={styles.statusLabel}>Durum:</Text>
              <Text style={[styles.statusValue, { color: finalResult.statusColor }]}>{finalResult.status}</Text>
            </View>
            <View style={styles.dateBox}>
               <Calendar color="rgba(255, 255, 255, 0.6)" size={16} />
               <Text style={styles.dateText}>{finalResult.date}</Text>
            </View>
            <TouchableOpacity 
              style={styles.doneBtn}
              onPress={() => router.replace('/home')}
            >
              <Text style={styles.doneBtnText}>TAMAMLA</Text>
            </TouchableOpacity>
          </View>
        </View>
      </GradientBackground>
    );
  }

  return (
    <GradientBackground>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ChevronLeft color="#FFF" size={32} />
        </TouchableOpacity>
        <Text style={styles.title}>Anket</Text>
      </View>

      <View style={styles.progressContainer}>
        <View style={styles.progressLabel}>
          <Text style={styles.questionCount}>{currentIndex + 1}/{QUESTIONS.length}</Text>
          <Text style={styles.percentText}>{Math.round(progress * 100)}%</Text>
        </View>
        <View style={styles.progressBarBackground}>
          <View style={[styles.progressBarForeground, { width: `${progress * 100}%` }]} />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.questionCard}>
          <Text style={styles.questionText}>{QUESTIONS[currentIndex]}</Text>
        </View>

        <View style={styles.optionsContainer}>
          {OPTIONS.map((opt) => (
            <TouchableOpacity
              key={opt.value}
              style={[
                styles.optionItem,
                answers[currentIndex] === opt.value && styles.optionSelected
              ]}
              onPress={() => handleSelect(opt.value)}
            >
              <View style={[
                styles.radioOuter,
                answers[currentIndex] === opt.value && styles.radioOuterSelected
              ]}>
                {answers[currentIndex] === opt.value && <View style={styles.radioInner} />}
              </View>
              <Text style={[
                styles.optionLabel,
                answers[currentIndex] === opt.value && styles.optionLabelSelected
              ]}>
                {opt.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.navigation}>
          <TouchableOpacity 
            style={[styles.navBtn, currentIndex === 0 && styles.navBtnDisabled]} 
            onPress={handlePrev}
            disabled={currentIndex === 0}
          >
            <ChevronLeft color="#FFF" size={24} />
            <Text style={styles.navBtnText}>ÖNCEKİ</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.navBtn, answers[currentIndex] === 0 && styles.navBtnDisabled]} 
            onPress={handleNext}
            disabled={answers[currentIndex] === 0}
          >
            <Text style={styles.navBtnText}>{currentIndex === QUESTIONS.length - 1 ? 'BİTİR' : 'SONRAKİ'}</Text>
            <ChevronRight color="#FFF" size={24} />
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
  progressContainer: {
    paddingHorizontal: 25,
    marginTop: 20,
    marginBottom: 20,
  },
  progressLabel: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  questionCount: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  percentText: {
    color: 'rgba(255, 255, 255, 0.7)',
  },
  progressBarBackground: {
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 4,
  },
  progressBarForeground: {
    height: 8,
    backgroundColor: '#FFF',
    borderRadius: 4,
  },
  questionCard: {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 20,
    padding: 30,
    marginBottom: 30,
    minHeight: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  questionText: {
    color: '#FFF',
    fontSize: 20,
    textAlign: 'center',
    fontWeight: '600',
    lineHeight: 28,
  },
  optionsContainer: {
    width: '100%',
    marginBottom: 40,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 18,
    borderRadius: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  optionSelected: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },
  radioOuter: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  radioOuterSelected: {
    borderColor: '#FFF',
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#FFF',
  },
  optionLabel: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 16,
    fontWeight: '500',
  },
  optionLabelSelected: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  navBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 15,
  },
  navBtnDisabled: {
    opacity: 0.5,
  },
  navBtnText: {
    color: '#FFF',
    fontWeight: 'bold',
    marginHorizontal: 5,
  },
  resultContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resultHeader: {
    fontSize: 32,
    color: '#FFF',
    fontWeight: 'bold',
    marginBottom: 30,
  },
  resultCard: {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 25,
    padding: 30,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  resultIconBox: {
    marginBottom: 20,
  },
  surveyName: {
    fontSize: 24,
    color: '#FFF',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginBottom: 20,
    textAlign: 'center',
  },
  scoreBox: {
    alignItems: 'center',
    marginBottom: 20,
  },
  scoreLabel: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 16,
    marginBottom: 5,
  },
  scoreValue: {
    color: '#FFF',
    fontSize: 48,
    fontWeight: 'bold',
  },
  statusBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 15,
  },
  statusLabel: {
    color: '#FFF',
    fontSize: 18,
    marginRight: 10,
  },
  statusValue: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  dateBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  dateText: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 14,
    marginLeft: 8,
  },
  doneBtn: {
    backgroundColor: '#FFF',
    width: '100%',
    paddingVertical: 15,
    borderRadius: 15,
    alignItems: 'center',
  },
  doneBtnText: {
    color: COLORS.primary,
    fontSize: 18,
    fontWeight: 'bold',
  },
});
