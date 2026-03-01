import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Linking,
  ScrollView,
  TextInput,
  AppState,
  Platform
} from 'react-native';
import { GradientBackground } from '@/components/GradientBackground';
import { router } from 'expo-router';
import {
  Zap,
  Moon,
  ChevronLeft,
  Star,
  Youtube
} from 'lucide-react-native';

export default function StressManagementScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [ratingVisible, setRatingVisible] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [currentVideo, setCurrentVideo] = useState('');
  const [isVideoOpening, setIsVideoOpening] = useState(false);

  const appState = useRef(AppState.currentState);

  // YouTube'dan geri dönüşü takip eden sistem
  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      // Kullanıcı YouTube'a gitti (background) ve şimdi geri geldi (active)
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active' &&
        isVideoOpening
      ) {
        setRatingVisible(true);
        setIsVideoOpening(false);
      }
      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  }, [isVideoOpening]);

  const handleOpenVideo = (type: 'stress' | 'sleep') => {
    setCurrentVideo(type === 'stress' ? 'Stres Yönetimi' : 'İyi Uyku');
    setModalVisible(true);
  };

  const handleWatch = async () => {
    setModalVisible(false);

    const videoUrl = currentVideo === 'Stres Yönetimi'
      ? 'https://www.youtube.com/watch?v=rPH2-KLdR3Q'
      : 'https://www.youtube.com/watch?v=3fNkaQBszYE';

    // ÖNEMLİ: Alert'i kaldırdık, doğrudan Linking'e geçiyoruz
    try {
      setIsVideoOpening(true); // Geri dönüş takibini başlat
      await Linking.openURL(videoUrl); // Gerçek YouTube yönlendirmesi
    } catch (error) {
      setIsVideoOpening(false);
      console.error("Link açılamadı:", error);
    }
  };

  const handleRatingSubmit = () => {
    setRatingVisible(false);
    setRating(0);
    setComment('');
    alert('Değerlendirmeniz alındı, teşekkürler!');
  };

  return (
    <GradientBackground>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <ChevronLeft color="#FFF" size={32} />
        </TouchableOpacity>
        <Text style={styles.title}>Stresini Yönet</Text>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <TouchableOpacity style={styles.actionBtn} onPress={() => handleOpenVideo('stress')}>
          <Zap color="#FFD700" size={40} />
          <Text style={styles.btnText}>Stresini Yönet</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionBtn} onPress={() => handleOpenVideo('sleep')}>
          <Moon color="#4169E1" size={40} />
          <Text style={styles.btnText}>İyi Uyu</Text>
        </TouchableOpacity>

        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>Neden Önemli?</Text>
          <Text style={styles.infoText}>
            Samsun Üniversitesi öğrencileri için hazırlanan bu içerikler, sınav stresini azaltmanıza yardımcı olur.
          </Text>
        </View>
      </ScrollView>

      {/* YouTube Modal */}
      <Modal animationType="fade" transparent={true} visible={modalVisible}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Youtube color="#FF0000" size={60} />
            <Text style={styles.modalTitle}>YouTube'a Gidiliyor</Text>
            <Text style={styles.modalText}>{currentVideo} videosu açılıyor...</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity style={[styles.modalBtn, styles.cancelBtn]} onPress={() => setModalVisible(false)}>
                <Text>Vazgeç</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.modalBtn, styles.watchBtn]} onPress={handleWatch}>
                <Text style={{ color: 'white', fontWeight: 'bold' }}>İzle</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Değerlendirme Modal */}
      <Modal animationType="slide" visible={ratingVisible}>
        <GradientBackground>
          <View style={styles.ratingContainer}>
            <Text style={styles.ratingTitle}>Videoyu Beğendiniz mi?</Text>
            <View style={styles.starsContainer}>
              {[1, 2, 3, 4, 5].map((star) => (
                <TouchableOpacity key={star} onPress={() => setRating(star)}>
                  <Star
                    color={star <= rating ? "#FFD700" : "#FFF"}
                    fill={star <= rating ? "#FFD700" : "transparent"}
                    size={40}
                  />
                </TouchableOpacity>
              ))}
            </View>
            <TextInput
              style={styles.commentInput}
              placeholder="Yorum yap..."
              multiline
              value={comment}
              onChangeText={setComment}
            />
            <TouchableOpacity style={styles.submitBtn} onPress={handleRatingSubmit}>
              <Text style={{ fontWeight: 'bold' }}>GÖNDER</Text>
            </TouchableOpacity>
          </View>
        </GradientBackground>
      </Modal>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, alignItems: 'center' },
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, marginTop: 50 },
  title: { fontSize: 24, color: '#FFF', fontWeight: 'bold', marginLeft: 10 },
  actionBtn: { width: '100%', backgroundColor: 'rgba(255, 255, 255, 0.2)', borderRadius: 20, padding: 25, flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  btnText: { color: '#FFF', fontSize: 18, fontWeight: 'bold', marginLeft: 15 },
  infoBox: { width: '100%', backgroundColor: 'rgba(255, 255, 255, 0.1)', borderRadius: 15, padding: 20 },
  infoTitle: { color: '#FFF', fontSize: 16, fontWeight: 'bold', marginBottom: 5 },
  infoText: { color: '#ccc', fontSize: 14 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { backgroundColor: '#FFF', borderRadius: 20, padding: 25, width: '85%', alignItems: 'center' },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginTop: 15 },
  modalText: { textAlign: 'center', marginVertical: 10, color: '#666' },
  modalButtons: { flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginTop: 20 },
  modalBtn: { flex: 0.45, padding: 12, borderRadius: 10, alignItems: 'center' },
  cancelBtn: { backgroundColor: '#eee' },
  watchBtn: { backgroundColor: '#FF0000' },
  ratingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  ratingTitle: { color: 'white', fontSize: 22, fontWeight: 'bold', marginBottom: 30 },
  starsContainer: { flexDirection: 'row', marginBottom: 30 },
  commentInput: { backgroundColor: 'white', width: '100%', borderRadius: 15, height: 100, padding: 15, marginBottom: 20 },
  submitBtn: { backgroundColor: '#E0AAFF', paddingVertical: 15, paddingHorizontal: 50, borderRadius: 25 }
});