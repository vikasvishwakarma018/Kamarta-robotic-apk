// app/internship.tsx

import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Href, useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";

interface InternshipCardProps {
  title: string;
  iconName: keyof typeof Ionicons.glyphMap;
  route: string;
}

export default function InternshipScreen() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const glowAnim = useRef(new Animated.Value(0.7)).current;
  const router = useRouter();
  const { width } = useWindowDimensions();
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1200,
      useNativeDriver: true,
    }).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, { toValue: 1, duration: 1500, useNativeDriver: false }),
        Animated.timing(glowAnim, { toValue: 0.7, duration: 1500, useNativeDriver: false }),
      ])
    ).start();
  }, []);

  const InternshipCard = ({ title, iconName, route }: InternshipCardProps) => {
    const isHovered = hoveredCard === title;
    const cardMinHeight = Math.min(width * 0.25, 160); // Responsive height, capped at 160
    const cardMaxWidth = Math.min(width * 0.9, 550); // Slightly larger max width
    const iconSize = Math.min(width * 0.08, 50); // Responsive icon size
    const titleFontSize = Math.min(width * 0.045, 22); // Responsive title font

    return (
      <Animated.View style={{ opacity: fadeAnim, marginBottom: 20 }}>
        <TouchableOpacity
          style={[
            styles.card,
            isHovered && styles.cardHovered,
            { minHeight: cardMinHeight, maxWidth: cardMaxWidth },
          ]}
          activeOpacity={0.8}
          onPress={() => router.push(route as Href)}
          onPressIn={() => Platform.OS === 'web' && setHoveredCard(title)}
          onPressOut={() => Platform.OS === 'web' && setHoveredCard(null)}
          {...(Platform.OS === 'web' && {
            onMouseEnter: () => setHoveredCard(title),
            onMouseLeave: () => setHoveredCard(null),
          })}
        >
          <View style={styles.cardContent}>
            <Ionicons name={iconName} size={iconSize} color="#FFFFFF" style={styles.cardIcon} />
            <Text style={[styles.cardTitle, { fontSize: titleFontSize }]}>{title}</Text>
          </View>
          <View style={styles.viewDetailsButton}>
            <Text style={styles.viewDetailsText}>View Details</Text>
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <LinearGradient
        colors={["#0a1628", "#0a0f1a", "#000510", "#000000"]}
        style={styles.container}
      >
        {/* Background glow effects */}
        <Animated.View
          style={[
            styles.backgroundGlow,
            {
              opacity: glowAnim,
            },
          ]}
        />

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header Section */}
          <View style={styles.headerSection}>
            <Text style={styles.mainTitle}>Internship Programs</Text>
            <Text style={styles.subTitle}>Latest Projects</Text>
          </View>

          {/* Internship Cards */}
          <View style={styles.cardsContainer}>
            <InternshipCard
              title="Free Intenship"
              iconName="school-outline"
              route="/Frontend/freeInternship"
            />
            <InternshipCard
              title="Paid Intenship"
              iconName="cash-outline"
              route="/Frontend/paidInternship"
            />
          </View>
        </ScrollView>

        {/* Bottom Navigation Bar */}
        <View style={styles.bottomNav}>
          <TouchableOpacity style={styles.navButton} onPress={() => router.push("/home" as Href)}>
            <Ionicons name="home-outline" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.navButton, styles.navButtonActive]}
            onPress={() => router.push("/internship" as Href)}
          >
            <View style={styles.activeNavIndicator}>
              <View style={styles.activeNavCircle}>
                <View style={styles.activeNavInnerCircle} />
              </View>
            </View>
            <Text style={styles.applyNowText}>Apply Now</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.navButton}
            onPress={() => router.push("/contact" as Href)}
          >
            <Ionicons name="person-outline" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#000000",
  },
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 0,
    paddingBottom: 0,
  },
  backgroundGlow: {
    position: "absolute",
    top: -100,
    left: -50,
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: "rgba(0, 150, 255, 0.15)",
    shadowColor: "#00C8FF",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 100,
    shadowOpacity: 0.5,
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: "center",
    paddingBottom: 20,
    paddingTop: 10,
    paddingHorizontal: 20,
  },
  headerSection: {
    width: "100%",
    alignItems: "center",
    marginBottom: 30,
    marginTop: 10,
  },
  mainTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: 8,
  },
  subTitle: {
    fontSize: 18,
    fontWeight: "500",
    color: "#FFFFFF",
    opacity: 0.9,
  },
  cardsContainer: {
    width: "100%",
    alignItems: "center",
  },
  card: {
    borderRadius: 16,
    backgroundColor: "rgba(255, 255, 255, 0.03)",
    borderWidth: 2,
    borderColor: "rgba(0, 200, 255, 0.5)",
    shadowColor: "#00C8FF",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 10,
    elevation: 5,
    padding: 35,
    minHeight: 120,
    width: "100%",
    maxWidth: 500,
    justifyContent: "space-between",
    ...(Platform.OS === 'web' ? {
      cursor: 'pointer',
      transition: 'all 0.3s ease',
    } as any : {}),
  },
  cardHovered: {
    borderColor: "rgba(0, 200, 255, 1)",
    shadowColor: "#00C8FF",
    shadowRadius: 25,
    shadowOpacity: 0.8,
    elevation: 15,
    ...(Platform.OS === 'web' ? {
      transform: [{ scale: 1.02 }],
    } as any : {}),
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  cardIcon: {
    marginRight: 15,
  },
  cardTitle: {
    fontSize: 40,
    fontWeight: "600",
    color: "#FFFFFF",
    flex: 1,
  },
  viewDetailsButton: {
    alignSelf: "flex-end",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: "rgba(0, 200, 255, 0.8)",
    backgroundColor: "rgba(0, 200, 255, 0.1)",
    marginTop: 10,
  },
  viewDetailsText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "500",
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 50,
    paddingVertical: 18,
    backgroundColor: "rgba(10, 1, 20, 0.8)",
    borderTopWidth: 0,
  },
  navButton: {
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  navButtonActive: {
    position: "relative",
    alignItems: "center",
  },
  activeNavIndicator: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 4,
  },
  activeNavCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(0, 200, 255, 0.2)",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#00C8FF",
    shadowColor: "#00C8FF",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 15,
    shadowOpacity: 0.8,
  },
  activeNavInnerCircle: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#00C8FF",
  },
  applyNowText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "500",
    marginTop: 2,
  },
});

