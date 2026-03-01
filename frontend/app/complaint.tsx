import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView, 
  TextInput,
  Modal,
  Dimensions
} from 'react-native';
import { GradientBackground } from '@/components/GradientBackground';
import { router } from 'expo-router';
import { 
  ChevronLeft, 
  MapPin, 
  Building2, 
  PenTool,
  Send,
  CheckCircle2
} from 'lucide-react-native';
import { COLORS } from '@/constants/theme';

const { width } = Dimensions.get('window');

export default function ComplaintScreen() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSend = () => {
    if (!message.trim()) return;
    
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      router.back();
    }, 2000);
  };

  return (
    <GradientBackground>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ChevronLeft color="#FFF" size={32} />
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <PenTool color="#FFF" size={24} style={{ marginRight: 10 }} />
          <Text style={styles.title}>Şikayet / Öneri</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        {!selectedCategory ? (
          <>
            <View style={styles.infoBox}>
              <Text style={styles.infoText}>Hangi kısım ile ilgili şikayetin var?</Text>
            </View>

            <TouchableOpacity 
              style={styles.categoryBtn}
              onPress={() => setSelectedCategory('Kampüs İçi')}
            >
              <Building2 color="#FFF" size={40} />
              <Text style={styles.categoryBtnText}>Kampüs İçi</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.categoryBtn}
              onPress={() => setSelectedCategory('Kampüs Dışı')}
            >
              <MapPin color="#FFF" size={40} />
              <Text style={styles.categoryBtnText}>Kampüs Dışı</Text>
            </TouchableOpacity>
          </>
        ) : (
          <View style={styles.inputSection}>
            <View style={styles.selectedBadge}>
              <Text style={styles.selectedBadgeText}>{selectedCategory}</Text>
              <TouchableOpacity onPress={() => setSelectedCategory(null)}>
                <Text style={styles.changeText}>Değiştir</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.label}>Şikayet/Önerinizi Yazın:</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Detaylıca buraya yazabilirsiniz..."
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
              multiline
              numberOfLines={6}
              value={message}
              onChangeText={setMessage}
            />

            <TouchableOpacity 
              style={[styles.sendBtn, !message.trim() && styles.sendBtnDisabled]}
              onPress={handleSend}
              disabled={!message.trim()}
            >
              <Send color="#FFF" size={24} />
              <Text style={styles.sendBtnText}>Gönder</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      <Modal
        transparent={true}
        visible={showSuccess}
        animationType="fade"
      >
        <View style={styles.modalOverlay}>
            <View style={styles.successCard}>
              <CheckCircle2 color="#4CAF50" size={60} />
              <Text style={styles.successTitle}>Başarılı!</Text>
              <Text style={styles.successText}>Talebiniz başarıyla alınmıştır.</Text>
            </View>
        </View>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  backButton: {
    marginRight: 10,
  },
  headerTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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
    marginBottom: 40,
    alignItems: 'center',
  },
  infoText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '500',
  },
  categoryBtn: {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 20,
    padding: 30,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  categoryBtnText: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 20,
  },
  inputSection: {
    width: '100%',
    marginTop: 20,
  },
  selectedBadge: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    padding: 15,
    borderRadius: 10,
    marginBottom: 30,
  },
  selectedBadgeText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 18,
  },
  changeText: {
    color: 'rgba(255, 255, 255, 0.6)',
    textDecorationLine: 'underline',
  },
  label: {
    color: '#FFF',
    fontSize: 16,
    marginBottom: 10,
    fontWeight: '600',
  },
  textInput: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 15,
    padding: 20,
    color: '#FFF',
    fontSize: 16,
    textAlignVertical: 'top',
    minHeight: 150,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  sendBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.secondary || '#8A2BE2',
    paddingVertical: 15,
    borderRadius: 15,
    gap: 10,
  },
  sendBtnDisabled: {
    opacity: 0.5,
  },
  sendBtnText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  successCard: {
    width: width * 0.8,
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 15,
    marginBottom: 10,
  },
  successText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});
