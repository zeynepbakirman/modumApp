import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Modal,
} from 'react-native';
import { router } from 'expo-router';
import { Info } from 'lucide-react-native';
import { GradientBackground } from '@/components/GradientBackground';
import { useUser } from '@/context/UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Hafızayı silmek için eklendi

export default function LoginScreen() {
  const { setUserData } = useUser();
  const [studentNo, setStudentNo] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('Erkek');
  const [kvkkAccepted, setKvkkAccepted] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  // Fonksiyonu async yaptık ki hafıza temizliğini bekleyebilelim
  const handleLogin = async () => {
    // 1. Boş alan kontrolü
    if (!studentNo || !age) {
      Alert.alert('Hata', 'Lütfen tüm alanları doldurun.');
      return;
    }

    // 2. Öğrenci No hane sayısı kontrolü (Tam olarak 9 hane)
    if (studentNo.length !== 9) {
      Alert.alert('Hata', 'Öğrenci numarası tam olarak 9 haneli olmalıdır.');
      return;
    }

    // 3. Yaş kontrolü
    if (age.length < 1) {
      Alert.alert('Hata', 'Lütfen yaşınızı giriniz.');
      return;
    }

    // 4. KVKK kontrolü
    if (!kvkkAccepted) {
      Alert.alert('Hata', 'Lütfen KVKK metnini onaylayın.');
      return;
    }

    try {
      // 5. ATOM BOMBASI: Telefonun hafızasındaki tüm eski verileri temizler
      await AsyncStorage.clear();

      // 6. GÜVENLİ GİRİŞ: Sadece UserContext'in tanıdığı özellikleri gönderiyoruz
      // Böylece TypeScript hatası (moodHistory vb.) almazsın
      setUserData({
        studentNo: studentNo,
        age: age,
        gender: gender,
      });

      // 7. Yönlendirme
      router.replace('/home');
    } catch (error) {
      console.error("Giriş yapılırken bir hata oluştu:", error);
      Alert.alert('Hata', 'Sistem temizlenirken bir sorun oluştu.');
    }
  };

  return (
    <GradientBackground>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.logoContainer}>
          <Text style={styles.title}>modumApp</Text>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.inputGroup}>
            <View style={styles.labelRow}>
              <Text style={styles.label}>Öğrenci No :</Text>
              <TouchableOpacity onPress={() => setShowInfo(true)}>
                <Info color="#FFF" size={20} />
              </TouchableOpacity>
            </View>
            <TextInput
              style={styles.input}
              placeholder="Örn: 161011***"
              placeholderTextColor="#ccc"
              keyboardType="numeric"
              value={studentNo}
              maxLength={9}
              onChangeText={setStudentNo}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Yaş :</Text>
            <TextInput
              style={styles.input}
              placeholder="Örn: 20"
              placeholderTextColor="#ccc"
              keyboardType="numeric"
              value={age}
              maxLength={2}
              onChangeText={setAge}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Cinsiyet :</Text>
            <View style={styles.genderContainer}>
              <TouchableOpacity
                style={[styles.genderBtn, gender === 'Erkek' && styles.genderBtnActive]}
                onPress={() => setGender('Erkek')}
              >
                <Text style={styles.genderBtnText}>Erkek</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.genderBtn, gender === 'Kadın' && styles.genderBtnActive]}
                onPress={() => setGender('Kadın')}
              >
                <Text style={styles.genderBtnText}>Kadın</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.kvkkContainer}>
            <TouchableOpacity
              style={styles.checkbox}
              onPress={() => setKvkkAccepted(!kvkkAccepted)}
            >
              <View style={[styles.checkboxInner, kvkkAccepted && styles.checkboxActive]} />
            </TouchableOpacity>
            <Text style={styles.kvkkText}>KVKK Metnini Onaylıyorum</Text>
          </View>

          <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
            <Text style={styles.loginBtnText}>GİRİŞ</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.universityName}>Samsun Üniversitesi</Text>
        </View>
      </ScrollView>

      <Modal
        animationType="fade"
        transparent={true}
        visible={showInfo}
        onRequestClose={() => setShowInfo(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowInfo(false)}
        >
          <View style={styles.modalContent}>
            <View style={styles.modalInnerContent}>
              <View style={styles.modalHeader}>
                <Info color="#4C1D95" size={32} />
                <Text style={styles.modalTitle}>Öğrenci No Mantığı</Text>
              </View>

              <View style={styles.formatContainer}>
                <View style={styles.formatItem}>
                  <View style={styles.dottedCircle}>
                    <Text style={styles.formatCircleText}>16</Text>
                  </View>
                  <Text style={styles.formatLabel}>Kayıt yılı</Text>
                </View>
                <Text style={styles.formatArrow}>→</Text>
                <View style={styles.formatItem}>
                  <View style={styles.dottedCircle}>
                    <Text style={styles.formatCircleText}>10</Text>
                  </View>
                  <Text style={styles.formatLabel}>Fakülte</Text>
                </View>
                <Text style={styles.formatArrow}>→</Text>
                <View style={styles.formatItem}>
                  <View style={styles.dottedCircle}>
                    <Text style={styles.formatCircleText}>11</Text>
                  </View>
                  <Text style={styles.formatLabel}>Bölüm</Text>
                </View>
                <Text style={styles.formatArrow}>→</Text>
                <View style={styles.formatItem}>
                  <View style={styles.dottedCircle}>
                    <Text style={styles.formatCircleText}>***</Text>
                  </View>
                  <Text style={styles.formatLabel}>Öğrenci</Text>
                </View>
              </View>

              <Text style={styles.modalNote}>
                Sistemimiz sizin sadece hangi fakülte ve bölümde olduğunuzu bilmek ister. Son üç haneyi (***) anonimlik için gizli tutarız.
              </Text>

              <TouchableOpacity
                style={styles.modalCloseBtn}
                onPress={() => setShowInfo(false)}
              >
                <Text style={styles.modalCloseText}>Anladım</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
    paddingBottom: 40,
  },
  logoContainer: {
    marginTop: 50,
    marginBottom: 40,
  },
  title: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#FFFFFF',
    letterSpacing: 4,
  },
  formContainer: {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    padding: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  label: {
    color: '#FFF',
    fontSize: 16,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 10,
    padding: 12,
    color: '#FFF',
    fontSize: 16,
  },
  genderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  genderBtn: {
    flex: 0.48,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 10,
    padding: 12,
    alignItems: 'center',
  },
  genderBtnActive: {
    backgroundColor: '#7C3AED',
  },
  genderBtnText: {
    color: '#FFF',
    fontSize: 16,
  },
  kvkkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#FFF',
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxInner: {
    width: 14,
    height: 14,
    borderRadius: 3,
  },
  checkboxActive: {
    backgroundColor: '#FFF',
  },
  kvkkText: {
    color: '#FFF',
    fontSize: 14,
  },
  loginBtn: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },
  loginBtnText: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  footer: {
    marginTop: 40,
    alignItems: 'center',
  },
  universityName: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '300',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    width: '95%',
    backgroundColor: '#FFF',
    borderRadius: 25,
    overflow: 'hidden',
  },
  modalInnerContent: {
    padding: 25,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    gap: 12,
  },
  modalTitle: {
    color: '#4C1D95',
    fontSize: 20,
    fontWeight: 'bold',
  },
  formatContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  formatItem: {
    alignItems: 'center',
  },
  dottedCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#7C3AED',
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  formatCircleText: {
    color: '#7C3AED',
    fontSize: 16,
    fontWeight: 'bold',
  },
  formatLabel: {
    fontSize: 9,
    color: '#6B7280',
    textAlign: 'center',
  },
  formatArrow: {
    color: '#7C3AED',
    fontSize: 18,
    marginTop: -15,
  },
  modalNote: {
    fontSize: 13,
    color: '#6B7280',
    lineHeight: 18,
    textAlign: 'center',
    fontStyle: 'italic',
    marginBottom: 20,
  },
  modalCloseBtn: {
    backgroundColor: '#7C3AED',
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
  },
  modalCloseText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});