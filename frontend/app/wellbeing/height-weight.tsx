import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  TextInput, 
  ScrollView,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { GradientBackground } from '@/components/GradientBackground';
import { router } from 'expo-router';
import { ChevronLeft, ChevronRight, Home } from 'lucide-react-native';
import { useUser } from '@/context/UserContext';

export default function HeightWeightScreen() {
  const { userData, updateUserData } = useUser();
  const [step, setStep] = useState(1); // 1: Height, 2: Weight
  const [height, setHeight] = useState(userData?.height || '');
  const [weight, setWeight] = useState(userData?.weight || '');

  const handleNext = () => {
    if (step === 1) {
      setStep(2);
    } else {
      updateUserData({ height, weight });
      router.back();
    }
  };

  const handlePrev = () => {
    if (step === 2) {
      setStep(1);
    } else {
      router.back();
    }
  };

  return (
    <GradientBackground>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.replace('/home')}>
          <Home color="#FFF" size={28} />
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.questionCard}>
            <Text style={styles.questionText}>
              {step === 1 
                ? "Boyunuz (Lütfen cm cinsinden belirtiniz. 180, 165 vb...)" 
                : "Kilonuz (Lütfen kg cinsinden belirtiniz. 75, 60 vb...)"
              }
            </Text>
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Lütfen bir cevap yaz"
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
              keyboardType="numeric"
              value={step === 1 ? height : weight}
              onChangeText={step === 1 ? setHeight : setWeight}
              autoFocus
            />
          </View>

          {userData?.height && userData?.weight && (
             <View style={styles.currentInfo}>
               <Text style={styles.currentText}>Kayıtlı: Boy: {userData.height} cm, Kilo: {userData.weight} kg</Text>
             </View>
          )}

          <View style={styles.navigation}>
            <TouchableOpacity style={styles.navBtn} onPress={handlePrev}>
              <ChevronLeft color="#FFF" size={20} />
              <Text style={styles.navBtnText}>Önceki</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.navBtn} onPress={handleNext}>
              <Text style={styles.navBtnText}>{step === 1 ? 'Sonraki' : 'Tamamla'}</Text>
              <ChevronRight color="#FFF" size={20} />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
    paddingBottom: 40,
    justifyContent: 'center',
    flexGrow: 1,
  },
  header: {
    paddingTop: 50,
    paddingHorizontal: 30,
    alignItems: 'center',
  },
  questionCard: {
    width: '100%',
    backgroundColor: 'rgba(50, 0, 80, 0.4)',
    borderRadius: 15,
    padding: 25,
    marginBottom: 40,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  questionText: {
    color: '#FFF',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
  inputContainer: {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    height: 120,
    justifyContent: 'center',
  },
  input: {
    color: '#FFF',
    fontSize: 16,
    textAlign: 'left',
  },
  currentInfo: {
    marginBottom: 30,
  },
  currentText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
    fontStyle: 'italic',
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 40,
  },
  navBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    width: '45%',
    justifyContent: 'center',
  },
  navBtnText: {
    color: '#FFF',
    fontWeight: 'bold',
    marginHorizontal: 5,
  },
});
