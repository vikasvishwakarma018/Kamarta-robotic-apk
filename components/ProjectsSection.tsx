import React, { useState } from "react";
import { Image, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface ProjectsSectionProps {
  onNavigate?: (screen: string) => void;
}

const projects = [
  {
    id: "agv",
    title: "Autonomous Ground Vehicle",
    summary: "Vision guided navigation for smart factories.",
    image: require("../assets/images/gallery1.jpg"),
    description: "The Autonomous Ground Vehicle (AGV) revolutionizes material handling in smart factories. Equipped with advanced vision-guided navigation systems, it autonomously transports goods with pinpoint accuracy. This cutting-edge technology minimizes human error, optimizes workflow efficiency, and integrates seamlessly with existing factory management systems. Built for 24/7 operation, it features real-time obstacle avoidance, adaptive routing, and comprehensive safety protocols. The AGV can handle payloads up to 500kg and operates in various industrial environments, from clean rooms to harsh manufacturing floors.",
    features: ["Advanced vision-guided navigation", "Autonomous operation with 99.9% accuracy", "Real-time obstacle avoidance and collision prevention", "Seamless integration with ERP and WMS systems", "24/7 operation with minimal maintenance", "Payload capacity up to 500kg"]
  },
  {
    id: "hospital-bot",
    title: "Hospital Service Bot",
    summary: "Safe medicine deliveries with live telemetry.",
    image: require("../assets/images/gallery2.jpg"),
    description: "Our Hospital Service Bot is a game-changer in healthcare logistics. Designed specifically for medical environments, it ensures sterile and timely delivery of medicines, supplies, and equipment throughout healthcare facilities. The bot features live telemetry for real-time tracking, allowing medical staff to monitor deliveries and respond to urgent needs instantly. With voice-guided navigation and advanced safety features, it navigates crowded hospital corridors safely while maintaining strict hygiene standards. The system includes automated inventory management and integration with hospital information systems for seamless workflow.",
    features: ["Sterile medicine and supply delivery", "Live GPS and telemetry tracking", "Voice-guided navigation in complex environments", "Automated inventory management", "Integration with hospital information systems", "Emergency priority routing capabilities"]
  },
  {
    id: "gym-coach",
    title: "AI Gym Coach",
    summary: "Realtime posture tracking for pro training.",
    image: require("../assets/images/gallery3.jpg"),
    description: "The AI Gym Coach represents the future of personal fitness training. Powered by advanced computer vision and machine learning algorithms, it provides real-time posture analysis and form correction during workouts. The system uses multiple cameras and sensors to track body movements with sub-millimeter accuracy, offering instant feedback on exercise technique. Personalized workout plans adapt to user progress, fitness levels, and goals. The AI coach includes injury prevention algorithms that detect risky movements and suggest safer alternatives. With a comprehensive exercise database and progress tracking, it delivers professional-level training guidance accessible to everyone.",
    features: ["Real-time 3D posture tracking with sub-mm accuracy", "AI-powered form correction and feedback", "Adaptive personalized workout plans", "Injury prevention and risk assessment algorithms", "Comprehensive exercise database with 500+ movements", "Progress tracking and performance analytics"]
  },
];

const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onNavigate }) => {
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const [showProjectModal, setShowProjectModal] = useState(false);

  const handleProjectPress = (project: typeof projects[0]) => {
    setSelectedProject(project);
    setShowProjectModal(true);
  };

  return (
    <View style={styles.section}>
      <Text style={styles.heading}>Featured Builds</Text>
      {projects.map((project) => (
        <TouchableOpacity
          key={project.id}
          style={styles.card}
          activeOpacity={0.85}
          onPress={() => handleProjectPress(project)}
        >
          <Image source={project.image} style={styles.thumbnail} />
          <View style={styles.cardBody}>
            <Text style={styles.title}>{project.title}</Text>
            <Text style={styles.summary}>{project.summary}</Text>
            <View style={styles.cta}>
              <Text style={styles.ctaText}>View details</Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}

      {/* Project Details Modal */}
      <Modal
        visible={showProjectModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowProjectModal(false)}
      >
        <TouchableOpacity
          style={styles.modalBackdrop}
          activeOpacity={1}
          onPress={() => setShowProjectModal(false)}
        >
          <TouchableOpacity
            style={styles.projectModalContent}
            activeOpacity={1}
            onPress={() => {}}
          >
            {selectedProject && (
              <>
                <Text style={styles.modalTitle}>{selectedProject.title}</Text>
                <Image source={selectedProject.image} style={styles.modalImage} resizeMode="cover" />
                <Text style={styles.modalDescription}>{selectedProject.description}</Text>
                <Text style={styles.modalFeaturesTitle}>Key Features:</Text>
                {selectedProject.features.map((feature, index) => (
                  <Text key={index} style={styles.modalFeature}>• {feature}</Text>
                ))}
                <TouchableOpacity
                  style={styles.modalCloseBtn}
                  onPress={() => setShowProjectModal(false)}
                >
                  <Text style={styles.modalCloseText}>Cancel</Text>
                </TouchableOpacity>
              </>
            )}
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    paddingHorizontal: 20,
    paddingTop: 18,
  },
  heading: {
    fontSize: 16,
    fontWeight: "700",
    color: "#e5e7eb",
    marginBottom: 12,
  },
  card: {
    backgroundColor: "#020617",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(56, 189, 248, 0.35)",
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  thumbnail: {
    width: 58,
    height: 58,
    borderRadius: 12,
    marginRight: 14,
  },
  cardBody: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: "700",
    color: "#f8fafc",
  },
  summary: {
    fontSize: 12,
    color: "#94a3b8",
    marginTop: 4,
    marginBottom: 10,
  },
  cta: {
    alignSelf: "flex-start",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#38bdf8",
  },
  ctaText: {
    fontSize: 11,
    color: "#e0f2fe",
    fontWeight: "700",
    textTransform: "uppercase",
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  projectModalContent: {
    width: '90%',
    maxWidth: 400,
    backgroundColor: '#121637',
    borderRadius: 20,
    padding: 24,
    borderWidth: 1.5,
    borderColor: '#00eaff',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 16,
    textAlign: 'center',
  },
  modalImage: {
    width: 120,
    height: 120,
    borderRadius: 16,
    marginBottom: 16,
  },
  modalDescription: {
    fontSize: 14,
    color: '#d0d4f7',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 20,
  },
  modalFeaturesTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#7dd3fc',
    marginBottom: 8,
    alignSelf: 'flex-start',
  },
  modalFeature: {
    fontSize: 14,
    color: '#e5e7eb',
    marginBottom: 4,
    alignSelf: 'flex-start',
  },
  modalCloseBtn: {
    marginTop: 20,
    backgroundColor: '#00eaff',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  modalCloseText: {
    color: '#0a0e27',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ProjectsSection;

