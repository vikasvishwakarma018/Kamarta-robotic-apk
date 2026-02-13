// app/Frontend/paidInternship.tsx

import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Href, useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import {
  Alert,
  Linking,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";

type CourseKey = "advanced" | "ai" | "vision" | "enroll";

interface CourseDetail {
  title: string;
  description: string;
  duration: string;
  price: string;
  level: string;
  modules: string[];
}

interface PurchaseOption {
  label: string;
  price: string;
  subtext: string;
  features: string[];
}

const courseDetails: Record<CourseKey, CourseDetail> = {
  advanced: {
    title: "Advanced Robotics",
    description:
      "Dive deep into autonomous navigation, robotic kinematics, and control systems used in modern industrial bots.",
    duration: "12 Weeks",
    price: "₹12,999",
    level: "Expert",
    modules: [
      "Robot OS (ROS2) pipelines",
      "Sensor fusion & SLAM",
      "PLC integration",
      "Capstone: Build a robotic arm controller",
    ],
  },
  ai: {
    title: "Live Internship",
    description:
      "live internship to learn Exel sheet, power Bi and Digital Marketing with Kamarta Robotics.",
    duration: "30 hours",
    price: "₹399",
    level: "intermediate",
    modules: [
      "Pro Exel classes",
      "Advance Exel classes",
      "power Bi basics",
      "Digital Marketing",
      "24x7 live hours clasess",
      "1 year experience certificate",
    ],
  },
  vision: {
    title: "Pro Internship ",
    description:
      "Better to experience and beacome Robotics Engineer with the help of Kamarta Robotics and get the real time experience.",
    duration: "60-90 hours",
    price: "₹4500",
    level: "Pro",
    modules: [
      "Provide Robot kit to work from home",
      "work for home projects",
      "job opportunity",
      "1 year experience certificate",
      "1 month job Offer",
    ],
    
  },
  enroll: {
    title: "Secure Payment Gateway",
    description:
      "Proceed with enrollment using verified payment partners. Choose a plan and reserve your seat instantly.",
    duration: "Flexible Schedule",
    price: "399 for live internship & 4500 for pro internship",
    level: "All Levels",
    modules: [
      "Instant confirmation",
      "Receipt on email / WhatsApp",
      "24x7 counselor support",
      "Priority onboarding assistance",
    ],
  },
};

const purchaseOptions: PurchaseOption[] = [
  {
    label: "pro Excel sheet ",
    price: "₹4̶,̶9̶9̶9̶  ₹399",
    subtext: "For learners who want weekend access  ",
    features: ["Weekend live classes", "Community access", "Project feedback"],
  },
  {
    
    label: "Digital Marketing free",
    price: "₹3̶5̶0̶0̶ Free ",
    subtext: "Hands-on mentorship & free Courses      ",
    features: ["Daily mentor sync", "Lab simulator creds", "Interview prep"],
  },
  {
    label: "Job Opportunity",
    price: "Free",
    subtext: "Fast placement-track with 1:1 mentor",
    features: ["Dedicated mentor", "Placement cell", "Lifetime recordings"],
  },
];
const proPurchaseOptions: PurchaseOption[] = [
  {
    label: "Pro Internship",
    price: "₹7̶,̶9̶9̶9̶  ₹3,500",
    subtext: "Intensive real industry-work internship",
    features: ["1:1 Mentor", "Real-world tasks", "Certificate + Resume boost"],
  },
  {
    label: "Startup own Bussiness + Build Robots",
    price: "₹1̶,̶9̶9̶9̶  1000",
    subtext: "Only for Pro Internship students",
    features: ["ATS resume", "LinkedIn optimization", "Portfolio setup"],
  },
];
const enrollOption: PurchaseOption[] = [
   {
    label: "Live Internship",
    price: "₹4̶,̶9̶9̶9̶   ₹399",
    subtext: "Advanced Excel sheet + power Bi + Digital Marketing",
    features: ["Weekend live classes", "Community access", "Project feedback"],
  },
  {
    label: "Pro Internship",
    price: "₹7̶,̶9̶9̶9̶  4500",
    subtext: "Pro Internship + Startup own Bussiness + Build Robots",
    features: ["Robot Kit", "1 year Experience", "Job Opportunity"],
  },
];

export default function PaidInternship() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const isCompact = width < 360;

  const [selectedCourse, setSelectedCourse] = useState<CourseDetail | null>(null);
  const [showCourseModal, setShowCourseModal] = useState(false);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [showEnrollModal, setShowEnrollModal] = useState(false);
  const [showPaymentButtonForLive, setShowPaymentButtonForLive] = useState(false);
  const [showPaymentButtonForPro, setShowPaymentButtonForPro] = useState(false);


  const cardIconSize = useMemo(() => (isCompact ? 34 : 40), [isCompact]);

  const handleOpenCourse = (key: CourseKey) => {
    setSelectedCourse(courseDetails[key]);
    setShowCourseModal(true);
  };



  const handleApplyNow = () => {
    setShowApplyModal(true);
  };

  const handleLiveInternshipClick = () => {
    setShowPaymentButtonForLive(true);
  };

  const handleProInternshipClick = () => {
    setShowPaymentButtonForPro(true);
  };

  const handlePaymentGatewayClick = (url: string) => {
    Linking.openURL(url);
  };

  const handlePlanSelection = (plan: PurchaseOption) => {
    Alert.alert("Plan Selected", `You chose the ${plan.label}. Our team will contact you shortly.`);
  };

  const handlePlayVideo = () => {
    Linking.openURL("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
  };

  const renderPlanCard = (option: PurchaseOption) => (
    <TouchableOpacity
      key={option.label}
      style={styles.planCardWrapper}
      activeOpacity={0.85}
      onPress={() => handlePlanSelection(option)}
    >
      <View style={styles.planCard}>
        <View style={styles.planCardInfo}>
          <Text style={styles.planLabel}>{option.label}</Text>
          <Text style={styles.planSubtext}>{option.subtext}</Text>
        </View>
        <Text style={styles.planPrice}>{option.price}</Text>
      </View>
      {option.features.map((feature) => (
        <View key={feature} style={styles.planFeatureRow}>
          <Ionicons name="checkmark-circle" size={16} color="#29F19C" />
          <Text style={styles.planFeatureText}>{feature}</Text>
        </View>
      ))}
    </TouchableOpacity>
  );

  const renderMiniPlans = (options: PurchaseOption[]) => (
    <View style={styles.miniPlanContainer}>
      {options.map((option, index) => (
        <View
          key={option.label}
          style={[
            styles.miniPlanRow,
            index === 0 && styles.miniPlanRowFirst,
          ]}
        >
          <View style={styles.miniPlanTextCol}>
            <Text style={styles.miniPlanLabel}>{option.label}</Text>
            <Text style={styles.miniPlanSubtext}>{option.subtext}</Text>
          </View>
          <Text style={styles.miniPlanPrice}>{option.price}</Text>
        </View>
      ))}
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <LinearGradient
        colors={["#071427", "#05101F", "#000A14"]}
        style={styles.container}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={28} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Paid Internship</Text>
          </View>

          {/* Video Showcase */}
          <LinearGradient colors={["#0F263D", "#071526"]} style={styles.videoCard}>
            <View style={styles.videoInfo}>
              <Text style={styles.videoTitle}>Program Walkthrough</Text>
              <Text style={styles.videoSubtitle}>
                Watch how Kamarta Robotics mentors help you build deployable products.
              </Text>
              <View style={styles.videoMeta}>
                <Ionicons name="time-outline" color="#8FD6FF" size={16} />
                <Text style={styles.videoMetaText}>4 min overview</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.playButton} onPress={ () => Linking.openURL( "https://youtube.com/shorts/oomNY9Mw1QI?si=fddKKFi7ccDBYMIl" )}>
              <Ionicons name="logo-youtube" size={24} color="#fff" />
              <Text style={styles.playText}>Watch on YouTube</Text>
            </TouchableOpacity>
          </LinearGradient>

          {/* Title */}
          <Text style={styles.sectionTitle}>Course Content</Text>

          {/* ----- Cards Section ----- */}
         

          {/* Card 1 */}
          <TouchableOpacity activeOpacity={0.85} onPress={handleLiveInternshipClick}>
            <LinearGradient colors={["#0A1E33", "#062033"]} style={styles.card}>
              <View style={styles.cardHeaderRow}>
                <View style={styles.cardLeft}>
                  <MaterialCommunityIcons
                    name="camera-outline"
                    size={cardIconSize}
                    color="#00C8FF"
                  />
                  <Text style={styles.cardText}>Live Internship</Text>
                </View>
                <TouchableOpacity style={styles.detailsBtn} onPress={() => handleOpenCourse("ai")}>
                  <Text style={styles.detailsText}>View Details</Text>
                </TouchableOpacity>
              </View>
              {renderMiniPlans(purchaseOptions)}
            </LinearGradient>
          </TouchableOpacity>

          {/* Payment Button for Live Internship */}
          {showPaymentButtonForLive && (
            <TouchableOpacity
              style={styles.paymentGatewayButton}
              onPress={() => handlePaymentGatewayClick("https://easebuzz.in/pay/KAMARTA")}
            >
              <LinearGradient colors={["#009DFF", "#00C6FF"]} style={styles.paymentGradient}>
                <Text style={styles.paymentText}>Payment Gateway for Live Internship</Text>
              </LinearGradient>
            </TouchableOpacity>
          )}

          {/* Card 2 */}
          <TouchableOpacity activeOpacity={0.85} onPress={handleProInternshipClick}>
            <LinearGradient colors={["#0A1E33", "#062033"]} style={styles.card}>
              <View style={styles.cardHeaderRow}>
                <View style={styles.cardLeft}>
                  <MaterialCommunityIcons
                    name="school-outline"
                    size={cardIconSize}
                    color="#00C8FF"
                  />
                  <Text style={styles.cardText}>Pro Internship</Text>
                </View>
                <TouchableOpacity
                  style={styles.detailsBtn}
                  onPress={() => handleOpenCourse("vision")}
                >
                  <Text style={styles.detailsText}>View Details</Text>
                </TouchableOpacity>
              </View>
              {renderMiniPlans(proPurchaseOptions)}
            </LinearGradient>
          </TouchableOpacity>

          {/* Payment Button for Pro Internship */}
          {showPaymentButtonForPro && (
            <TouchableOpacity
              style={styles.paymentGatewayButton}
              onPress={() => handlePaymentGatewayClick("https://easebuzz.in/pay/KAMARTA")}
            >
              <LinearGradient colors={["#009DFF", "#00C6FF"]} style={styles.paymentGradient}>
                <Text style={styles.paymentText}>Payment Gateway for Pro Internship</Text>
              </LinearGradient>
            </TouchableOpacity>
          )}
   
          {/* Payment Button */}
          <TouchableOpacity style={styles.paymentButton} onPress={() => setShowEnrollModal(true)}>
            <LinearGradient
              colors={["#009DFF", "#00C6FF"]}
              style={styles.paymentGradient}
            >
              <Text style={styles.paymentText}>Proceed to Payment</Text>
            </LinearGradient>
          </TouchableOpacity>

          <Text style={styles.secureText}>Secure Payment Gateway</Text>
        </ScrollView>

        {/* Bottom Navigation */}
        <View style={styles.footer}>
          <TouchableOpacity style={styles.navButton} onPress={() => router.push("/home" as Href)}>
            <Ionicons name="home-outline" size={28} color="#9BB5D0" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.applyButton} onPress={handleApplyNow}>
            <Text style={styles.applyText}>Apply Now</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/* Course Detail Modal */}
      <Modal transparent animationType="slide" visible={showCourseModal}>
        <View style={styles.modalBackdrop}>
          <View style={[styles.modalContent, { width: width - 30 }]}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{selectedCourse?.title}</Text>
              <TouchableOpacity onPress={() => setShowCourseModal(false)}>
                <Ionicons name="close-circle" size={26} color="#9BB5D0" />
              </TouchableOpacity>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={styles.modalDescription}>{selectedCourse?.description}</Text>
              <View style={styles.modalMetaWrapper}>
                <View style={styles.badge}>
                  <Ionicons name="time-outline" color="#00C8FF" size={16} />
                  <Text style={styles.badgeText}>{selectedCourse?.duration}</Text>
                </View>
                <View style={styles.badge}>
                  <Ionicons name="stats-chart-outline" color="#00C8FF" size={16} />
                  <Text style={styles.badgeText}>{selectedCourse?.level}</Text>
                </View>
                <View style={styles.badge}>
                  <Ionicons name="pricetag-outline" color="#00C8FF" size={16} />
                  <Text style={styles.badgeText}>{selectedCourse?.price}</Text>
                </View>
              </View>
              <Text style={styles.modalSubHeading}>Key Modules</Text>
              {selectedCourse?.modules.map((module) => (
                <View key={module} style={styles.moduleRow}>
                  <Ionicons name="checkmark-circle" size={18} color="#29F19C" />
                  <Text style={styles.moduleText}>{module}</Text>
                </View>
              ))}
              <Text style={styles.modalSubHeading}>Select a Plan</Text>
              {(selectedCourse?.title === courseDetails.vision.title
                ? proPurchaseOptions
                : purchaseOptions
              ).map(renderPlanCard)}
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Apply Modal */}
      <Modal transparent animationType="fade" visible={showApplyModal}>
        <View style={styles.modalBackdrop}>
          <View style={[styles.applyModalContent, { width: width - 60 }]}>
            <Text style={styles.applyTitle}>Fast-Track Application</Text>
            <Text style={styles.applyDescription}>
              Share your details and our program advisors will call back with scholarships and cohort
              availability.
            </Text>
            <View style={styles.applyActions}>
              <TouchableOpacity
                style={styles.applyActionBtn}
                onPress={() => {
                  setShowApplyModal(false);
                  router.push("/contact" as Href);
                }}
              >
                <Ionicons name="call-outline" size={18} color="#fff" />
                <Text style={styles.applyBtnText}>Talk to Us</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.applyActionBtn, styles.applyActionSecondary]}
                onPress={() => {
                  setShowApplyModal(false);
                  router.push("/internship" as Href);
                }}
              >
                <Ionicons name="document-text-outline" size={18} color="#00C8FF" />
                <Text style={[styles.applyBtnText, { color: "#00C8FF" }]}>View Full Programs</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => setShowApplyModal(false)} style={styles.closeFooterBtn}>
              <Text style={styles.closeFooterText}>Maybe later</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Enroll Modal */}
      <Modal transparent animationType="fade" visible={showEnrollModal}>
        <View style={styles.modalBackdrop}>
          <View style={[styles.applyModalContent, { width: width - 60 }]}>
            <Text style={styles.applyTitle}>Choose Your Internship Plan</Text>
            <Text style={styles.applyDescription}>
              Select the internship program that best fits your goals.
            </Text>
            <View style={styles.applyActions}>
              {enrollOption.map((option) => (
                <TouchableOpacity
                  key={option.label}
                  style={styles.applyActionBtn}
                  onPress={() => {
                    setShowEnrollModal(false);
                    handlePaymentGatewayClick("https://easebuzz.in/pay/KAMARTA");
                  }}
                >
                  <Text style={styles.applyBtnText}>{option.label}</Text>
                  <Text style={[styles.applyBtnText, { fontSize: 12, marginTop: 4 }]}>{option.price}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <TouchableOpacity onPress={() => setShowEnrollModal(false)} style={styles.closeFooterBtn}>
              <Text style={styles.closeFooterText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#000" },

  container: {
    flex: 1,
  },

  scrollContent: {
    padding: 20,
    paddingBottom: 140,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    marginTop: 5,
  },

  headerTitle: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "700",
    marginLeft: 15,
  },

  sectionTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: 20,
  },

  videoCard: {
    width: "100%",
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: "rgba(0, 200, 255, 0.4)",
    marginBottom: 26,
  },
  videoInfo: {
    marginBottom: 16,
  },
  videoTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 6,
  },
  videoSubtitle: {
    color: "#BFD9EE",
    fontSize: 13,
    lineHeight: 18,
  },
  videoMeta: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    gap: 6,
  },
  videoMetaText: {
    color: "#8FD6FF",
    fontSize: 12,
    fontWeight: "600",
  },
  playButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E10600",
    paddingVertical: 10,
    borderRadius: 30,
    gap: 8,
  },
  playText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
  },

  /* Cards */
  card: {
    width: "100%",
    padding: 18,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#00C8FF",
    marginBottom: 18,
    flexDirection: "column",
  },

  cardLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  cardHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 20,
    marginBottom: 12,
  },

  cardText: {
    color: "#E8F7FF",
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 12,
    flexShrink: 1,
  },

  detailsBtn: {
    backgroundColor: "#003D55",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#00C8FF",
  },

  detailsText: {
    color: "#00C8FF",
    fontSize: 12,
    fontWeight: "600",
  },

  /* Payment Button */
  paymentButton: {
    marginTop: 20,
    borderRadius: 30,
    overflow: "hidden",
  },

  paymentGatewayButton: {
    marginTop: 15,
    marginBottom: 10,
    borderRadius: 30,
    overflow: "hidden",
  },

  paymentGradient: {
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: "center",
  },

  paymentText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },

  secureText: {
    color: "#708BA3",
    textAlign: "center",
    marginTop: 10,
    fontSize: 13,
  },

  /* Footer Navigation */
  footer: {
    position: "absolute",
    bottom: 12,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 25,
    alignItems: "center",
  },

  navButton: {
    backgroundColor: "#3509d4ff",
    width: 55,
    height: 55,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },

  applyButton: {
    backgroundColor: "#3509d4ff",
    paddingHorizontal: 28,
    paddingVertical: 12,
    borderRadius: 25,
  },

  applyText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },

  /* Modal */
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.8)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 12,
  },
  modalContent: {
    backgroundColor: "#071424",
    borderRadius: 24,
    padding: 20,
    maxHeight: "85%",
    borderWidth: 1,
    borderColor: "rgba(0, 200, 255, 0.4)",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  modalTitle: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "700",
  },
  modalDescription: {
    color: "#9EB9D2",
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
  },
  modalMetaWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 16,
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: "rgba(0, 200, 255, 0.1)",
  },
  badgeText: {
    color: "#C5EFFF",
    fontSize: 12,
    fontWeight: "600",
  },
  modalSubHeading: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    marginTop: 12,
    marginBottom: 10,
  },
  moduleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 8,
  },
  moduleText: {
    color: "#E6F6FF",
    fontSize: 14,
    flex: 1,
  },
  planCardWrapper: {
    marginBottom: 14,
    backgroundColor: "rgba(255,255,255,0.02)",
    borderRadius: 18,
    padding: 12,
    borderWidth: 1,
    borderColor: "rgba(0, 200, 255, 0.1)",
  },
  planCard: {
    borderRadius: 16,
    padding: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  planCardInfo: {
    flex: 1,
    paddingRight: 12,
  },
  planLabel: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
  },
  planSubtext: {
    color: "#8FB4D1",
    fontSize: 12,
    marginTop: 4,
  },
  planPrice: {
    color: "#00C8FF",
    fontSize: 18,
    fontWeight: "800",
  },
  planFeatureRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 4,
  },
  planFeatureText: {
    color: "#C7D5E4",
    fontSize: 13,
    flex: 1,
  },
  miniPlanContainer: {
    marginTop: 16,
  },
  miniPlanRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "rgba(0,200,255,0.12)",
  },
  miniPlanRowFirst: {
    borderTopWidth: 0,
    paddingTop: 0,
  },
  miniPlanTextCol: {
    flex: 1,
    paddingRight: 12,
  },
  miniPlanLabel: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },
  miniPlanSubtext: {
    color: "#8FB4D1",
    fontSize: 12,
    marginTop: 2,
  },
  miniPlanPrice: {
    color: "#00C8FF",
    fontSize: 14,
    fontWeight: "700",
  },
  applyModalContent: {
    backgroundColor: "#050E18",
    borderRadius: 24,
    padding: 22,
    borderWidth: 1,
    borderColor: "rgba(0, 200, 255, 0.2)",
  },
  applyTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 10,
  },
  applyDescription: {
    color: "#A2C0D8",
    fontSize: 14,
    lineHeight: 20,
  },
  applyActions: {
    flexDirection: "row",
    gap: 10,
    marginTop: 18,
    flexWrap: "wrap",
  },
  applyActionBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#00C8FF",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  applyActionSecondary: {
    backgroundColor: "rgba(0, 200, 255, 0.1)",
    borderWidth: 1,
    borderColor: "#00C8FF",
  },
  applyBtnText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 13,
  },
  closeFooterBtn: {
    marginTop: 14,
    alignItems: "center",
  },
  closeFooterText: {
    color: "#7EA6C8",
    fontSize: 13,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
});

