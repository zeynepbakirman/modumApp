import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  Modal,
  Linking,
  Platform
} from 'react-native';
import { GradientBackground } from '@/components/GradientBackground';
import {
  ShieldCheck,
  User,
  Users,
  AlertTriangle,
  ChevronRight,
  Phone,
  MapPin,
  X
} from 'lucide-react-native';
import { COLORS } from '@/constants/theme';

export default function SecurityScreen() {
  const [showEmergencyPanel, setShowEmergencyPanel] = useState(false);
  const [emergencyType, setEmergencyType] = useState('');

  const handleKadesPress = async () => {
    const kadesUrl = Platform.OS === 'ios'
      ? 'https://apps.apple.com/tr/app/kades/id1360155182'
      : 'https://play.google.com/store/apps/details?id=tr.gov.egm.kades';

    Alert.alert(
      'KADES Uygulaması',
      'KADES uygulamasına yönlendiriliyorsunuz. Eğer uygulama yüklü değilse mağazaya yönlendirileceksiniz.',
      [
        { text: 'Vazgeç', style: 'cancel' },
        {
          text: 'Devam Et',
          onPress: () => {
            Linking.openURL(kadesUrl);
          }
        }
      ]
    );
  };

  const openEmergencyPanel = (type: string) => {
    setEmergencyType(type);
    setShowEmergencyPanel(true);
  };

  const handleCallSecurity = () => {
    // Samsun Üniversitesi Güvenlik Hattı Örneği
    Linking.openURL('tel:03623130000');
  };

  return (
    <GradientBackground>
      {/* DİKKAT: TypeScript hatasını önlemek için stili buradaki View'a veriyoruz. 
          GradientBackground içine doğrudan style={styles.container} yazmıyoruz.
      */}
      <View style={{ flex: 1 }}>
        <View style={styles.header}>
          <Text style={styles.title}>Güvenlik</Text>
        </View>

        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.infoBox}>
            <ShieldCheck color="#FFF" size={48} style={{ marginBottom: 10 }} />
            <Text style={styles.infoText}>Hangi konuda güvenlik desteği almak istersin?</Text>
          </View>

          <TouchableOpacity
            style={styles.actionBtn}
            onPress={() => openEmergencyPanel('Kendimle İlgili')}
          >
            <User color="#FFF" size={28} />
            <Text style={styles.btnText}>Kendimle İlgili</Text>
            <ChevronRight color="rgba(255, 255, 255, 0.5)" size={24} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionBtn}
            onPress={() => openEmergencyPanel('Başkası ile İlgili')}
          >
            <Users color="#FFF" size={28} />
            <Text style={styles.btnText}>Başkası ile İlgili</Text>
            <ChevronRight color="rgba(255, 255, 255, 0.5)" size={24} />
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity
            style={styles.kadesBtn}
            onPress={handleKadesPress}
          >
            <View style={styles.kadesLogoPlaceholder}>
              <ShieldCheck color="#E31E24" size={32} />
              <Text style={styles.kadesLogoText}>KADES</Text>
            </View>
            <Text style={styles.kadesBtnText}>KADES Uygulamasına Git</Text>
          </TouchableOpacity>

          <View style={styles.warningBox}>
            <AlertTriangle color="#FFD700" size={24} />
            <Text style={styles.warningText}>
              Hayati tehlike arz eden durumlarda lütfen vakit kaybetmeden kolluk kuvvetleriyle iletişime geçin.
            </Text>
          </View>
        </ScrollView>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={showEmergencyPanel}
        onRequestClose={() => setShowEmergencyPanel(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {/* Modal içinde de GradientBackground'ı sade kullanıyoruz */}
            <GradientBackground>
              <View style={{ padding: 25, flex: 1 }}>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>Acil Durum Paneli</Text>
                  <TouchableOpacity onPress={() => setShowEmergencyPanel(false)}>
                    <X color="#FFF" size={28} />
                  </TouchableOpacity>
                </View>

                <View style={styles.emergencyTypeBox}>
                  <Text style={styles.emergencyTypeText}>{emergencyType}</Text>
                </View>

                <View style={styles.locationCard}>
                  <View style={styles.locationHeader}>
                    <MapPin color="#FFF" size={20} />
                    <Text style={styles.locationTitle}>Mevcut Konumun (GPS)</Text>
                  </View>
                  <Text style={styles.coordinates}>Enlem: 41.3282° K</Text>
                  <Text style={styles.coordinates}>Boylam: 36.3361° D</Text>
                  <Text style={styles.locationNote}>Samsun Üniversitesi, Ballıca Kampüsü</Text>
                </View>

                <TouchableOpacity
                  style={styles.callBtn}
                  onPress={handleCallSecurity}
                >
                  <Phone color="#FFF" size={24} />
                  <Text style={styles.callBtnText}>Kampüs Güvenliğini Ara</Text>
                </TouchableOpacity>

                <Text style={styles.helpText}>
                  Butona bastığınızda kampüs güvenlik birimi doğrudan aranacaktır. Konumunuz otomatik olarak paylaşılmayabilir.
                </Text>
              </View>
            </GradientBackground>
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
    paddingHorizontal: 20,
    marginTop: 50, // Tepeden boşluk eklendi
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    color: '#FFF',
    fontWeight: 'bold',
  },
  infoBox: {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 20,
    padding: 30,
    marginTop: 30,
    marginBottom: 30,
    alignItems: 'center',
  },
  infoText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
    lineHeight: 24,
  },
  actionBtn: {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 15,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  btnText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 15,
    flex: 1,
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    marginVertical: 20,
  },
  kadesBtn: {
    width: '100%',
    backgroundColor: '#FFF',
    borderRadius: 15,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  kadesLogoPlaceholder: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  kadesLogoText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#E31E24',
    marginLeft: 5,
  },
  kadesBtnText: {
    color: '#333',
    fontSize: 16,
    fontWeight: '700',
    flex: 1,
  },
  warningBox: {
    width: '100%',
    backgroundColor: 'rgba(255, 215, 0, 0.1)',
    borderRadius: 15,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 215, 0, 0.3)',
  },
  warningText: {
    color: '#FFD700',
    fontSize: 13,
    marginLeft: 10,
    flex: 1,
    fontWeight: '500',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    width: '100%',
    height: '75%', // Biraz daha yüksek yaptık
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    overflow: 'hidden',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  emergencyTypeBox: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 10,
    alignSelf: 'flex-start',
    marginBottom: 25,
  },
  emergencyTypeText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  locationCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 20,
    padding: 20,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  locationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  locationTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  coordinates: {
    color: '#FFF',
    fontSize: 16,
    marginBottom: 5,
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
  },
  locationNote: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 14,
    marginTop: 10,
    fontStyle: 'italic',
  },
  callBtn: {
    backgroundColor: '#FF5252',
    borderRadius: 15,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  callBtnText: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 15,
  },
  helpText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 18,
  },
});