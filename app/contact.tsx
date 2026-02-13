import { FontAwesome, FontAwesome5, Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import {
  Alert,
  Dimensions,
  Linking,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

const ACCENT = '#ffe066';
const TEAL = '#4dd0e1';
const KAMARTA_APP_URL = 'https://www.kamartarobotics.com/mobile-app';

interface SubmittedData {
  name: string;
  message: string;
}

interface ContactUsProps {
  onNavigate?: (screen: string) => void;
}

const ContactUs: React.FC<ContactUsProps> = ({ onNavigate }) => {
  const { width } = Dimensions.get('window');
  const isMobile = width < 768; // Assuming tablet breakpoint
  const currentStyles = styles(isMobile);

  const [name, setName] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [submittedData, setSubmittedData] = useState<SubmittedData | null>(null);

  const openLink = async (url: string): Promise<void> => {
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert('Unable to open link', 'Please try again later.');
      }
    } catch (error) {
      Alert.alert('Unable to open link', 'Please try again later.');
    }
  };

  const handleSubmit = (): void => {
    if (!name.trim() || !message.trim()) {
      Alert.alert('Missing information', 'Please enter your name and message.');
      return;
    }
    const subject = `Message from ${name.trim()}`;
    const body = message.trim();
    const mailto = `mailto:Contact@kamarta.in?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
    setSubmittedData({ name: name.trim(), message: message.trim() });
    openLink(mailto);
    setName('');
    setMessage('');
  };

  // Create an attractive map pattern using View components
  const MapPattern: React.FC = () => (
    <View style={currentStyles.mapPatternContainer}>
      {/* Horizontal Roads */}
      <View style={[currentStyles.mapRoad, { top: 30, left: 20, width: 120 }]} />
      <View style={[currentStyles.mapRoad, { top: 70, left: 40, width: 100 }]} />
      <View style={[currentStyles.mapRoad, { top: 110, left: 10, width: 140 }]} />
      <View style={[currentStyles.mapRoad, { top: 150, left: 60, width: 80 }]} />

      {/* Vertical Roads */}
      <View style={[currentStyles.mapRoadVertical, { top: 20, left: 50, height: 100 }]} />
      <View style={[currentStyles.mapRoadVertical, { top: 50, left: 100, height: 80 }]} />
      <View style={[currentStyles.mapRoadVertical, { top: 80, left: 130, height: 60 }]} />
      <View style={[currentStyles.mapRoadVertical, { top: 40, left: 20, height: 90 }]} />

      {/* Intersection Points */}
      <View style={[currentStyles.mapIntersection, { top: 70, left: 50 }]} />
      <View style={[currentStyles.mapIntersection, { top: 110, left: 100 }]} />
      <View style={[currentStyles.mapIntersection, { top: 150, left: 60 }]} />
      <View style={[currentStyles.mapIntersection, { top: 50, left: 130 }]} />

      {/* Landmark Circles */}
      <View style={[currentStyles.mapLandmark, { top: 40, left: 80 }]} />
      <View style={[currentStyles.mapLandmark, { top: 90, left: 30 }]} />
      <View style={[currentStyles.mapLandmark, { top: 130, left: 110 }]} />

      {/* Grid Lines */}
      <View style={[currentStyles.mapGridLine, { top: 0, left: '25%', height: '100%' }]} />
      <View style={[currentStyles.mapGridLine, { top: 0, left: '50%', height: '100%' }]} />
      <View style={[currentStyles.mapGridLine, { top: 0, left: '75%', height: '100%' }]} />
      <View style={[currentStyles.mapGridLineVertical, { top: '25%', left: 0, width: '100%' }]} />
      <View style={[currentStyles.mapGridLineVertical, { top: '50%', left: 0, width: '100%' }]} />
      <View style={[currentStyles.mapGridLineVertical, { top: '75%', left: 0, width: '100%' }]} />
    </View>
  );

  return (
    <View style={currentStyles.container}>
      {/* Background Pattern */}
      <View style={currentStyles.backgroundPattern}>
        <View style={[currentStyles.patternDot, { top: 50, left: 30 }]} />
        <View style={[currentStyles.patternDot, { top: 150, left: 200 }]} />
        <View style={[currentStyles.patternDot, { top: 300, left: 100 }]} />
        <View style={[currentStyles.patternDot, { top: 450, left: 250 }]} />
        <View style={[currentStyles.patternLine, { top: 100, left: 50, transform: [{ rotate: '45deg' }] }]} />
        <View style={[currentStyles.patternLine, { top: 250, left: 180, transform: [{ rotate: '-30deg' }] }]} />
        <View style={[currentStyles.patternLine, { top: 400, left: 80, transform: [{ rotate: '60deg' }] }]} />
      </View>

      <ScrollView
        style={currentStyles.scrollView}
        contentContainerStyle={currentStyles.scrollContent}
        showsVerticalScrollIndicator={false}
      >

      
        {/* Page Title */}
        <Text style={currentStyles.pageTitle}>Contact Us</Text>

        {/* Location and Email Card */}
        <TouchableOpacity
          style={currentStyles.locationCard}
          activeOpacity={0.85}
          onPress={() =>
            openLink('https://www.google.com/maps/search/?api=1&query=Kamarta+Robotics,+gurugram,+India')
          }
        >
          <View style={currentStyles.mapBackground}>
            <MapPattern />
            <View style={currentStyles.mapContent}>
              <View style={currentStyles.locationRow}>
                <Text style={currentStyles.indiaText}>INDIA</Text>
                <Ionicons name="location" size={24} color={TEAL} style={currentStyles.locationPin} />
              </View>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => openLink('mailto:Contact@kamarta.in')}
              >
                <Text style={currentStyles.emailText}>Contact@kamarta.in</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>

        {/* Contact Information Cards */}
        <View style={currentStyles.contactCardsRow}>
          {/* Phone Card */}
        <TouchableOpacity
          style={currentStyles.contactCard}
          activeOpacity={0.85}
          onPress={() => openLink('mailto:Contact@kamarta.in')}
        >
          <View style={currentStyles.iconCircle}>
            <Ionicons name="mail" size={24} color={TEAL} />
          </View>
          <Text style={currentStyles.contactInfo}>Contact@kamarta.in</Text>
        </TouchableOpacity>

          {/* Registered Office Card */}
          <TouchableOpacity
            style={currentStyles.contactCard}
          activeOpacity={0.85}
          onPress={() => openLink('tel:8518055055')}
        >
          <View style={currentStyles.iconCircle}>
            <Ionicons name="call" size={26} color={TEAL} />
          </View>
          <Text style={currentStyles.contactInfo}>Registered Office: Gurugram, India</Text>
          </TouchableOpacity>

          {/* Website Card */}
          <TouchableOpacity
            style={currentStyles.contactCard}
            activeOpacity={0.85}
            onPress={() => openLink('https://kamarta-robot.com')}
          >
            <View style={currentStyles.iconCircle}>
              <Ionicons name="globe" size={26} color={TEAL} />
            </View>
            <Text style={currentStyles.contactInfo}>Visit Our Website</Text>
          </TouchableOpacity>
        </View>

        {/* Message Submission Card */}
        <View style={currentStyles.messageCard}>
          <Text style={currentStyles.messageCardTitle}>Send Us a Message</Text>

          <TextInput
            style={currentStyles.input}
            placeholder="Name"
            placeholderTextColor="#888"
            value={name}
            onChangeText={setName}
          />

          <TextInput
            style={[currentStyles.input, currentStyles.messageInput]}
            placeholder="Your Message"
            placeholderTextColor="#888"
            multiline
            numberOfLines={4}
            value={message}
            onChangeText={setMessage}
          />

          <LinearGradient
            colors={[TEAL, '#26c6da', '#00bcd4']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={currentStyles.submitButton}
          >
            <TouchableOpacity style={currentStyles.submitButtonTouch} onPress={handleSubmit} activeOpacity={0.85}>
              <Text style={currentStyles.submitButtonText}>Submit Message</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </ScrollView>

      {/* Bottom Navigation/Social Media Bar */}
      <View style={currentStyles.bottomNav}>
        <TouchableOpacity
          style={currentStyles.socialIcon}
          onPress={() => openLink('https://www.linkedin.com/company/kamarta-robotics-technology-pvt-ltd/posts/?feedView=all')}
          activeOpacity={0.7}
        >
          <FontAwesome name="linkedin" size={20} color={TEAL} />
        </TouchableOpacity>
        <TouchableOpacity
          style={currentStyles.socialIcon}
          onPress={() => openLink('https://t.me/kamartarobotics')}
          activeOpacity={0.7}
        >
          <FontAwesome name="telegram" size={20} color={TEAL} />
        </TouchableOpacity>
        <TouchableOpacity
          style={currentStyles.socialIcon}
          onPress={() => openLink('https://twitter.com/kamartarobotics')}
          activeOpacity={0.7}
        >
          <FontAwesome5 name="twitter" size={20} color={TEAL} />
        </TouchableOpacity>
        <TouchableOpacity
          style={currentStyles.socialIcon}
          onPress={() => openLink('https://www.kamartarobotics.com')}
          activeOpacity={0.7}
        >
          <Ionicons name="radio-button-on" size={20} color={TEAL} />
        </TouchableOpacity>
        <TouchableOpacity
          style={currentStyles.socialIcon}
          onPress={() => openLink('https://wa.me/918012345678')}
          activeOpacity={0.7}
        >
          <FontAwesome5 name="whatsapp" size={20} color={TEAL} />
        </TouchableOpacity>
        <TouchableOpacity
          style={currentStyles.socialIcon}
          onPress={() => openLink('https://www.youtube.com/@kamartarobotics')}
          activeOpacity={0.7}
        >
          <Ionicons name="play-circle" size={20} color={TEAL} />
        </TouchableOpacity>
        <TouchableOpacity
          style={currentStyles.socialIcon}
          onPress={() => openLink('mailto:Contact@kamarta.com')}
          activeOpacity={0.7}
        >
          <Ionicons name="chatbubble" size={20} color={TEAL} />
        </TouchableOpacity>
        <View style={currentStyles.homeIndicator} />
      </View>

      <Modal
        visible={!!submittedData}
        transparent
        animationType="slide"
        onRequestClose={() => setSubmittedData(null)}
      >
        <View style={currentStyles.modalBackdrop}>
          <View style={currentStyles.modalContent}>
            <Text style={currentStyles.modalTitle}>Your Message</Text>
            <Text style={currentStyles.modalLabel}>Name</Text>
            <Text style={currentStyles.modalValue}>{submittedData?.name}</Text>
            <Text style={currentStyles.modalLabel}>Message</Text>
            <Text style={currentStyles.modalValue}>{submittedData?.message}</Text>
            <TouchableOpacity style={currentStyles.modalButton} onPress={() => setSubmittedData(null)}>
              <Text style={currentStyles.modalButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = (isMobile: boolean) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0e27',
  },
  backgroundPattern: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 0,
  },
  patternDot: {
    position: 'absolute',
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#1a2340',
    opacity: 0.5,
  },
  patternLine: {
    position: 'absolute',
    width: 60,
    height: 1,
    backgroundColor: '#1a2340',
    opacity: 0.3,
  },
  scrollView: {
    flex: 1,
    zIndex: 1,
  },
  scrollContent: {
    paddingHorizontal: isMobile ? 12 : 16,
    paddingBottom: 20,
    paddingTop: 32,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginBottom: 16,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: 'rgba(77, 208, 225, 0.1)',
  },
  backButtonText: {
    color: TEAL,
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  heroCard: {
    backgroundColor: '#120d2a',
    borderRadius: 18,
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderWidth: 1.5,
    borderColor: 'rgba(77, 208, 225, 0.5)',
    marginBottom: 16,
    alignItems: 'center',
  },
  heroHeading: {
    fontSize: 20,
    fontWeight: '700',
    color: ACCENT,
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  heroSubheading: {
    fontSize: 12,
    color: '#d0d4f7',
  },
  pageTitle: {
    fontSize: isMobile ? 24 : 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginTop: 8,
    marginBottom: 24,
    textAlign: 'center',
  },
  locationCard: {
    backgroundColor: '#1a1f3a',
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: TEAL,
    marginBottom: 16,
    overflow: 'hidden',
    minHeight: isMobile ? 160 : 180,
  },
  mapBackground: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
    padding: isMobile ? 12 : 16,
    position: 'relative',
    minHeight: isMobile ? 160 : 180,
  },
  mapPatternContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.15,
  },
  mapRoad: {
    position: 'absolute',
    height: 3,
    backgroundColor: TEAL,
    borderRadius: 2,
    opacity: 0.6,
  },
  mapRoadVertical: {
    position: 'absolute',
    width: 3,
    backgroundColor: TEAL,
    borderRadius: 2,
    opacity: 0.6,
  },
  mapIntersection: {
    position: 'absolute',
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: TEAL,
    opacity: 0.8,
  },
  mapLandmark: {
    position: 'absolute',
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: TEAL,
    backgroundColor: 'transparent',
    opacity: 0.7,
  },
  mapGridLine: {
    position: 'absolute',
    width: 1,
    backgroundColor: TEAL,
    opacity: 0.1,
  },
  mapGridLineVertical: {
    position: 'absolute',
    height: 1,
    backgroundColor: TEAL,
    opacity: 0.1,
  },
  mapContent: {
    zIndex: 1,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  indiaText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
    marginRight: 12,
  },
  locationPin: {
    marginLeft: 8,
  },
  emailText: {
    color: '#ffffff',
    fontSize: 14,
    marginTop: 8,
    textAlign: 'right',
    alignSelf: 'flex-end',
  },
  contactCardsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    marginBottom: 16,
    gap: 12,
  },
  contactCard: {
    flex: 1,
    minWidth: isMobile ? '100%' : '48%',
    backgroundColor: '#1a1f3a',
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: TEAL,
    padding: isMobile ? 12 : 16,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 120,
  },
  iconCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: TEAL,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    backgroundColor: 'transparent',
  },
  contactInfo: {
    color: '#ffffff',
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 16,
  },
  messageCard: {
    backgroundColor: '#1a1f3a',
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: TEAL,
    padding: 20,
    marginBottom: 20,
  },
  messageCardTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  input: {
    backgroundColor: '#0f1429',
    borderRadius: 12,
    padding: 14,
    color: '#ffffff',
    fontSize: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#2a2f4a',
  },
  messageInput: {
    minHeight: 100,
    textAlignVertical: 'top',
    paddingTop: 14,
  },
  submitButton: {
    borderRadius: 12,
    marginTop: 8,
    overflow: 'hidden',
  },
  submitButtonTouch: {
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#0a0e27',
    borderTopWidth: 1,
    borderTopColor: '#1a1f3a',
    position: 'relative',
    zIndex: 10,
  },
  socialIcon: {
    padding: 8,
  },
  homeIndicator: {
    position: 'absolute',
    bottom: 4,
    left: '50%',
    marginLeft: -40,
    width: 80,
    height: 4,
    backgroundColor: TEAL,
    borderRadius: 2,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    width: '100%',
    backgroundColor: '#121637',
    borderRadius: 20,
    padding: 24,
    borderWidth: 1.5,
    borderColor: TEAL,
  },
  modalTitle: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 16,
    textAlign: 'center',
  },
  modalLabel: {
    color: '#7dd3fc',
    fontSize: 14,
    marginTop: 8,
  },
  modalValue: {
    color: '#ffffff',
    fontSize: 16,
    marginTop: 4,
    lineHeight: 22,
  },
  modalButton: {
    marginTop: 20,
    backgroundColor: TEAL,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#0a0e27',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ContactUs;
