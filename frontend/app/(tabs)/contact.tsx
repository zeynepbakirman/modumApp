import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView, 
  TextInput,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { GradientBackground } from '@/components/GradientBackground';
import { router } from 'expo-router';
import { 
  MessageCircle, 
  Send, 
  ChevronLeft,
  Phone,
  Video,
  Info,
  Camera,
  Mic,
  Plus
} from 'lucide-react-native';
import { COLORS } from '@/constants/theme';

const { width } = Dimensions.get('window');

const INITIAL_MESSAGES = [
  { id: 1, text: "Selam, iyi günler.", sender: 'user', time: '10:00' },
  { id: 2, text: "Teşekkürler, nasıl yardımcı olabiliriz?", sender: 'bot', time: '10:01' },
  { id: 3, text: "Kampüse otobüs gelmiyor.", sender: 'user', time: '10:02' },
  { id: 4, text: "Ne kadarlık bir süreden bahsediyorsunuz?", sender: 'bot', time: '10:03' },
];

export default function ContactScreen() {
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [inputText, setInputText] = useState('');

  const handleSend = () => {
    if (inputText.trim()) {
      const newMessage = {
        id: messages.length + 1,
        text: inputText,
        sender: 'user',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, newMessage]);
      setInputText('');

      // Auto reply
      setTimeout(() => {
        const botReply = {
          id: Date.now(),
          text: "Mesajınız iletildi, en kısa sürede döneceğiz.",
          sender: 'bot',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages((prev) => [...prev, botReply]);
      }, 1000);
    }
  };

  return (
    <GradientBackground>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <ChevronLeft color="#FFF" size={28} />
          </TouchableOpacity>
          <View style={styles.userInfo}>
            <View style={styles.avatarPlaceholder}>
               <MessageCircle color="#FFF" size={24} />
            </View>
            <View>
              <Text style={styles.userName}>Bize Yazın</Text>
              <Text style={styles.userStatus}>Çevrimiçi</Text>
            </View>
          </View>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.headerIcon}>
            <Phone color="#FFF" size={24} />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.headerIcon, styles.whatsappIcon]}>
            <MessageCircle color="#FFF" size={24} fill="#25D366" />
          </TouchableOpacity>
        </View>
      </View>

      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.chatContainer}>
          {messages.map((msg) => (
            <View 
              key={msg.id} 
              style={[
                styles.messageRow, 
                msg.sender === 'user' ? styles.userRow : styles.botRow
              ]}
            >
              <View 
                style={[
                  styles.messageBubble, 
                  msg.sender === 'user' ? styles.userBubble : styles.botBubble
                ]}
              >
                <Text style={[
                  styles.messageText,
                  msg.sender === 'user' ? styles.userMessageText : styles.botMessageText
                ]}>
                  {msg.text}
                </Text>
                <Text style={styles.messageTime}>{msg.time}</Text>
              </View>
            </View>
          ))}
        </ScrollView>

        <View style={styles.inputContainer}>
          <TouchableOpacity style={styles.inputActionIcon}>
             <Plus color="#4169E1" size={24} />
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            placeholder="Mesaj yaz..."
            placeholderTextColor="#999"
            value={inputText}
            onChangeText={setInputText}
          />
          <TouchableOpacity style={styles.inputActionIcon}>
             <Camera color="#4169E1" size={24} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.sendBtn} onPress={handleSend}>
             <Send color="#FFF" size={24} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 10,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  userName: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  userStatus: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 12,
  },
  headerRight: {
    flexDirection: 'row',
  },
  headerIcon: {
    marginLeft: 15,
  },
  whatsappIcon: {
    // Styling for whatsapp specific look if needed
  },
  chatContainer: {
    padding: 15,
    paddingBottom: 20,
  },
  messageRow: {
    width: '100%',
    marginBottom: 15,
    flexDirection: 'row',
  },
  userRow: {
    justifyContent: 'flex-end',
  },
  botRow: {
    justifyContent: 'flex-start',
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 20,
    position: 'relative',
  },
  userBubble: {
    backgroundColor: '#6A5ACD',
    borderBottomRightRadius: 5,
  },
  botBubble: {
    backgroundColor: '#4169E1',
    borderBottomLeftRadius: 5,
  },
  messageText: {
    fontSize: 15,
    lineHeight: 20,
  },
  userMessageText: {
    color: '#FFF',
  },
  botMessageText: {
    color: '#FFF',
  },
  messageTime: {
    fontSize: 10,
    color: 'rgba(255, 255, 255, 0.5)',
    alignSelf: 'flex-end',
    marginTop: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#FFF',
    borderTopWidth: 1,
    borderTopColor: '#EEE',
  },
  inputActionIcon: {
    padding: 8,
  },
  input: {
    flex: 1,
    height: 40,
    backgroundColor: '#F0F0F0',
    borderRadius: 20,
    paddingHorizontal: 15,
    fontSize: 15,
    color: '#333',
    marginHorizontal: 5,
  },
  sendBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5,
  },
  bottomActions: {
    padding: 10,
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  complaintBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  complaintBtnText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  }
});
