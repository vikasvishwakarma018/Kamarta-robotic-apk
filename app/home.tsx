import * as React from "react";
import { useEffect, useRef, useState } from "react";

import {
  Animated,
  Dimensions,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import BottomBar from "../components/BottomBar";
import ProjectsSection from "../components/ProjectsSection";
import InternshipDetails from "./InternshipDetails";
import DashboardScreen from "./dashboard";

// ---------- NAVIGATION PROPS TYPE ----------
interface HomeScreenProps {
  onNavigate?: (screen: string) => void;
}

// ---------- SCREEN WIDTH ----------
const { width } = Dimensions.get("window");
const PHONE_WIDTH = Math.min(width * 0.8, 380);
const isMobile = width < 768; // Assuming tablet breakpoint

// ---------- STATIC DATA ----------


const robots = [
  {
    id: 1,
    name: "Assistant",
    image: require("../assets/images/gallery1.jpg"),
    description: "A versatile assistant robot designed for household tasks, providing help with daily chores and companionship.",
    features: ["Voice recognition", "Task automation", "Smart navigation"]
  },
  {
    id: 2,
    name: "Hotel robot",
    image: require("../assets/images/gallery2.jpg"),
    description: "Specialized hotel service robot for guest assistance, room service delivery, and concierge functions.",
    features: ["Room delivery", "Guest guidance", "24/7 availability"]
  },
  {
    id: 3,
    name: "Gym robot",
    image: require("../assets/images/gallery3.jpg"),
    description: "AI-powered gym coach robot that provides personalized workout guidance and form correction.",
    features: ["Pose tracking", "Workout planning", "Real-time feedback"]
  },
];



// -------- HOME SCREEN COMPONENT ---------
function HomeScreen({ onNavigate }: HomeScreenProps) {
  const [selectedRobot, setSelectedRobot] = useState<typeof robots[0] | null>(null);
  const [showRobotModal, setShowRobotModal] = useState(false);
  const glowAnim = useRef(new Animated.Value(0)).current;

  const handleRobotPress = (robot: typeof robots[0]) => {
    setSelectedRobot(robot);
    setShowRobotModal(true);
  };

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, { toValue: 1, duration: 1200, useNativeDriver: true }),
        Animated.timing(glowAnim, { toValue: 0, duration: 1200, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  const glowOpacity = glowAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.6, 1],
  });

  return (
    <View style={styles.root}>

      {/* --------- LOGO ---------- */}


      {/* --------- SCROLL AREA ---------- */}
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 16 }}
        showsVerticalScrollIndicator={false}
      >

        {/* --------- ROBOTS SECTION --------- */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Our Robots</Text>

          <View style={styles.robotRow}>
            {robots.map((robot) => {
              return (
                <TouchableOpacity
                  key={robot.id}
                  style={styles.robotCard}
                  activeOpacity={0.8}
                  onPress={() => handleRobotPress(robot)}
                >
                  {/* CONSTANT BORDER */}
                  <View
                    style={[
                      styles.neonBorder,
                      { borderColor: "#00eaff" },
                    ]}
                  />

                  <Image source={robot.image} style={styles.robotImage} resizeMode="cover" />
                  <Text style={styles.robotName}>{robot.name}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Pass onNavigate to ProjectsSection */}
        <ProjectsSection onNavigate={onNavigate} />

      </ScrollView>

      {/* Custom Footer */}
      <View style={styles.customFooter}>
        <TouchableOpacity
          style={styles.footerSide}
          onPress={() => onNavigate?.("dashboard")}
        >
          <Ionicons name="arrow-back" size={24} color="#00eaff" />
        </TouchableOpacity>
        <View style={styles.footerCenter}>
          <Ionicons name="home" size={28} color="#fde68a" />
        </View>
        <TouchableOpacity
          style={styles.footerSide}
          onPress={() => onNavigate?.("dashboard")}
        >
          <Ionicons name="arrow-forward" size={24} color="#00eaff" />
        </TouchableOpacity>
      </View>

      {/* Robot Details Modal */}
      <Modal
        visible={showRobotModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowRobotModal(false)}
      >
        <TouchableOpacity
          style={styles.modalBackdrop}
          activeOpacity={1}
          onPress={() => setShowRobotModal(false)}
        >
          <TouchableOpacity
            style={styles.robotModalContent}
            activeOpacity={1}
            onPress={() => {}}
          >
            {selectedRobot && (
              <>
                <Text style={styles.modalTitle}>{selectedRobot.name}</Text>
                <Image source={selectedRobot.image} style={styles.modalImage} resizeMode="cover" />
                <Text style={styles.modalDescription}>{selectedRobot.description}</Text>
                <Text style={styles.modalFeaturesTitle}>Key Features:</Text>
                {selectedRobot.features.map((feature, index) => (
                  <Text key={index} style={styles.modalFeature}>• {feature}</Text>
                ))}
                <TouchableOpacity
                  style={styles.modalCloseBtn}
                  onPress={() => setShowRobotModal(false)}
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
}

// -------- MAIN NAVIGATION COMPONENT --------
export default function Tabs() {
  const [activeTab, setActiveTab] = useState<string>("home");

  const handleNavigate = (screen: string) => {
    setActiveTab(screen);
  };

  return (
    <>
      {activeTab === "home" && <HomeScreen onNavigate={handleNavigate} />}
      {activeTab === "internship-details" && <InternshipDetails onNavigate={handleNavigate} />}
      {activeTab === "dashboard" && <DashboardScreen onNavigate={handleNavigate} />}
      {/* Add other tabs and screens here */}
    </>
  );
}

// -------------------------------------------------------
// ------------------------- STYLES -----------------------
// -------------------------------------------------------

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#020617",
    alignItems: "center",
    paddingTop: 30,
  },

  logoRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  logoImg: {
    width: 400,
    height: 200,
  },

  section: {
    marginTop: 8,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#e5e7eb",
    marginBottom: 10,
  },

  // ROBOTS
  robotRow: {
    flexDirection: isMobile ? "column" : "row",
    justifyContent: isMobile ? "center" : "space-between",
    alignItems: isMobile ? "center" : "flex-start",
  },
  robotCard: {
    width: isMobile ? (PHONE_WIDTH - 40) / 2 - 4 : (PHONE_WIDTH - 40) / 3 - 4,
    height: 100,
    borderRadius: 18,
    backgroundColor: "#020617",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    position: "relative",
    marginBottom: isMobile ? 10 : 0,
  },

  // --- NEON BORDER ---
  neonBorder: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    borderRadius: 18,
    borderWidth: 2,
    zIndex: 1,
  },
  robotGlow: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "120%",
    height: "120%",
    borderRadius: 18,
    zIndex: 0,
  },

  projectBorder: {
    position: "absolute",
    top: -2,
    left: -2,
    right: -2,
    bottom: -2,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#00eaff",
    shadowColor: "#00eaff",
    shadowOpacity: 1,
    shadowRadius: 8,
  },


  robotImage: {
    width: 42,
    height: 42,
    marginBottom: 6,
    borderRadius: 12,
  },
  robotName: {
    fontSize: 12,
    color: "#e5e7eb",
    fontWeight: "600",
  },

  // PROJECTS
  projectCard: {
    marginTop: 12,
    borderRadius: 16,
    backgroundColor: "#020617",
    borderWidth: 1,
    borderColor: "#1d4ed8",
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  projectIconBox: {
    width: 46,
    height: 46,
    borderRadius: 14,
    overflow: "hidden",
    backgroundColor: "#0f172a",
    justifyContent: "center",
    alignItems: "center",
  },
  projectIcon: {
    width: "90%",
    height: "90%",
  },
  projectTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#e5e7eb",
  },
  projectSubtitle: {
    fontSize: 11,
    color: "#9ca3af",
    marginTop: 2,
  },
  viewBtn: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#38bdf8",
  },
  viewBtnText: {
    fontSize: 10,
    color: "#e0f2fe",
    fontWeight: "700",
  },

  bottomBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    paddingVertical: 14,
    backgroundColor: "#020b2f",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  activeIcon: {
    fontSize: 28,
    color: "#fde68a",
    fontWeight: "700",
  },
  inactiveIcon: {
    fontSize: 28,
    color: "#64748b",
    fontWeight: "700",
  },

  // CUSTOM FOOTER
  customFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingVertical: 14,
    paddingHorizontal: 24,
    backgroundColor: "#020b2f",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(56, 189, 248, 0.35)",
  },
  footerSide: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  footerCenter: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  // MODAL STYLES
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  robotModalContent: {
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
