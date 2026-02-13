import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Colors = {
  primary: '#00B4FF',
  background: '#0A0E27',
  cardBackground: '#151932',
  text: '#FFFFFF',
  textSecondary: '#B0B0B0',
  border: '#1a1a2e',
  goldenYellow: '#FFD700',
};

const capabilities = [
  { icon: 'settings-outline', label: 'Robotic Assembly' },
  { icon: 'hardware-chip-outline', label: 'Advanced Manufacturing' },
  { icon: 'cube-outline', label: 'Precision BOM' },
];

const technologies = [
  {
    icon: 'construct-outline',
    title: 'Automated Production Lines',
  },
  {
    icon: 'school',
    title: 'making Robots with interactive features',
  },
  {
    icon: 'analytics-outline',
    title: 'Robots Analytics',
  },
];

const projects = [
  {
    image: require('../assets/images/production/automation.jpg'),
    title: 'Industrial Automation Systems',
  },
  {
    image: require('../assets/images/production/security.jpg'),
    title: 'Security Guard Robot',
  },
  {
    image: require('../assets/images/production/gym.jpg'),
    title: 'Teaching Robot',
  },

  {
    image: require('../assets/images/production/miniRobot.jpg'),
    title: 'Story Teller Robot',
  },
  {
    image: require('../assets/images/production/service.jpg'),
    title: 'Service Robot',
  },
];

export default function ProductionPageStandalone() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Section title="Production Capabilities">
          <View style={styles.capabilitiesCard}>
            {capabilities.map((item, index) => (
              <View key={index} style={styles.capabilityItem}>
                <View style={styles.capabilityIcon}>
                  <Ionicons
                    name={item.icon as any}
                    size={32}
                    color={Colors.primary}
                  />
                </View>
                <Text style={styles.capabilityText}>{item.label}</Text>
              </View>
            ))}
          </View>
        </Section>

        <Section title="Key Technologies">
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.horizontalScroll}
            contentContainerStyle={styles.horizontalContent}
          >
            {technologies.map((tech, index) => (
              <View key={index} style={styles.technologyCard}>
                <View style={styles.technologyIconContainer}>
                  <Ionicons
                    name={tech.icon as any}
                    size={40}
                    color={Colors.primary}
                  />
                </View>
                <Text style={styles.technologyTitle}>{tech.title}</Text>
                {tech.subtitle && (
                  <Text style={styles.technologySubtitle}>{tech.subtitle}</Text>
                )}
              </View>
            ))}
          </ScrollView>
        </Section>

        <Section title="Featured Projects">
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.horizontalScroll}
            contentContainerStyle={styles.horizontalContent}
          >
            {projects.map((project, index) => (
              <View key={index} style={styles.projectCard}>
                <View style={styles.projectImageContainer}>
                  <Image
                    source={project.image}
                    style={styles.projectImage}
                    resizeMode="contain"
                  />
                </View>
                <Text style={styles.projectTitle}>{project.title}</Text>
              </View>
            ))}
          </ScrollView>
        </Section>

        <View style={styles.bottomSpacing} />
      </ScrollView>

      <View style={styles.bottomBar}>
        <View style={styles.bottomBarLeft}>
          <TouchableOpacity style={styles.bottomIcon}>
            <Ionicons name="logo-linkedin" size={24} color={Colors.text} />
          </TouchableOpacity>
            <TouchableOpacity style={styles.bottomIcon}>
            <Ionicons name="arrow-back" size={24} color={Colors.text} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.bottomIcon}>
            <Ionicons name="person-circle" size={24} color={Colors.text} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.viewProjectButton}>
          <Text style={styles.viewProjectText}>View Project</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  headerIcon: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoImage: {
    width: 70,
    height: 70,
    tintColor: Colors.goldenYellow,
    resizeMode: 'contain',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 10,
  },
  section: {
    marginTop: 24,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 16,
  },
  capabilitiesCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Colors.cardBackground,
    borderRadius: 16,
    padding: 20,
    marginTop: 8,
  },
  capabilityItem: {
    alignItems: 'center',
    flex: 1,
  },
  capabilityIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 2,
    borderColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  capabilityText: {
    fontSize: 12,
    color: Colors.text,
    textAlign: 'center',
    fontWeight: '500',
  },
  horizontalScroll: {
    marginTop: 2,
  },
  horizontalContent: {
    paddingRight: 20,
    gap: 16,
  },
  technologyCard: {
    width: Dimensions.get('window').width * 0.7,
    backgroundColor: Colors.cardBackground,
    borderRadius: 16,
    padding: 20,
    marginRight: 16,
  },
  technologyIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  technologyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 8,
  },
  technologySubtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  projectCard: {
    width: 320,
    marginRight: 16,
    alignItems: 'center',
  },
  projectImageContainer: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: Colors.cardBackground,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    overflow: 'hidden',
    padding: 20,
  },
  projectImage: {
    width: '100%',
    height: '100%',
  },
  projectTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    textAlign: 'center',
  },
  bottomSpacing: {
    height: 100,
  },
  bottomBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: Colors.background,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  bottomBarLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  bottomIcon: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewProjectButton: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  viewProjectText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
  },
});

