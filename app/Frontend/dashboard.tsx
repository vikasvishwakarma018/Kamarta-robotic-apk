// MYAPP/Frontend/dashboard.tsx

import React, { useRef, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  useWindowDimensions,
  SafeAreaView,
  Platform,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, Href } from "expo-router";

interface MenuButtonProps {
  title: string;
  iconName: keyof typeof Ionicons.glyphMap;
  onPress?: () => void;
  isHighlighted?: boolean;
}

export default function Dashboard() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const glowAnim = useRef(new Animated.Value(0.7)).current;
  const router = useRouter();
  const { width, height } = useWindowDimensions();
  const [selectedButton, setSelectedButton] = useState<string | null>(null);

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

  // Responsive card size based on screen width - previous design restored
  const getCardSize = () => {
    if (width < 360) return width * 0.42; // Small phones
    if (width < 414) return width * 0.40; // Medium phones
    if (Platform.OS === 'web' && width > 900) {
      // Web: larger screens get bigger cards
      return Math.min(220, width * 0.18);
    }
    return Math.min(width * 0.28, height * 0.18); // Large phones/tablets
  };

  const CARD_SIZE = getCardSize();
  const GAP = width * 0.04;
  const GRID_PADDING = width * 0.05;

  const MenuButton = ({ title, iconName, onPress, isHighlighted }: MenuButtonProps) => {
    const buttonGlow = useRef(new Animated.Value(isHighlighted ? 1 : 0.7)).current;

    useEffect(() => {
      if (isHighlighted) {
        Animated.loop(
          Animated.sequence([
            Animated.timing(buttonGlow, { toValue: 1, duration: 1500, useNativeDriver: false }),
            Animated.timing(buttonGlow, { toValue: 0.8, duration: 1500, useNativeDriver: false }),
          ])
        ).start();
      }
    }, [isHighlighted]);

    return (
      <Animated.View style={{ opacity: fadeAnim, width: CARD_SIZE, marginBottom: GAP }}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            setSelectedButton(title);
            onPress?.();
          }}
          style={styles.buttonWrapper}
        >
          <Animated.View
              style={[
                styles.card,
                {
                  width: CARD_SIZE,
                  height: CARD_SIZE,
                  borderColor: "rgba(0, 200, 255, 0.8)",
                  shadowOpacity: buttonGlow,
                },
              ]}
          >
            <Animated.View
              style={[
                styles.neonGlow,
                {
                  shadowOpacity: buttonGlow,
                  borderColor: "rgba(0, 200, 255, 0.6)",
                },
              ]}
            />
            <Ionicons
              name={iconName}
              size={CARD_SIZE * 0.3}
              color="#FFFFFF"
              style={styles.icon}
            />
            <Text style={[styles.text, { fontSize: Math.max(12, CARD_SIZE * 0.12) }]}>
              {title}
            </Text>
          </Animated.View>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  const menuItems = [
    { title: "Home", iconName: "home-outline" as const, route: "/home" },
    { title: "Internship", iconName: "briefcase-outline" as const, route: "/internship" },
    { title: "About Us", iconName: "globe-outline" as const, route: "/about" },
    { title: "Help", iconName: "help-circle-outline" as const, route: "/help" },
    { title: "Contact Us", iconName: "call-outline" as const, route: "/contact" },
    { title: "Production", iconName: "construct-outline" as const, route: "/production" },
  ];

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
            }
          ]} 
        />

        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Grid of Menu Buttons */}
          <View
            style={[
              styles.grid,
              {
                paddingHorizontal: GRID_PADDING,
                width: "100%",
                marginTop: 10,
              },
            ]}
          >
            {menuItems.map((item, index) => (
              <View
                key={index}
                style={{
                  width: CARD_SIZE,
                  marginRight: (index + 1) % 2 === 0 ? 0 : GAP,
                }}
              >
                <MenuButton
                  title={item.title}
                  iconName={item.iconName}
                  isHighlighted={false}
                  onPress={() => {
                    if (item.route) {
                      router.push(item.route as Href);
                    }
                  }}
                />
              </View>
            ))}
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
    paddingTop: 0,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "flex-start",
    paddingTop: 0,
  },
  buttonWrapper: {
    width: "100%",
  },
  card: {
    borderRadius: 16,
    backgroundColor: "rgba(255, 255, 255, 0.03)",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    borderWidth: 2,
    shadowColor: "#00C8FF",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 20,
    elevation: 10,
  },
  neonGlow: {
    position: "absolute",
    width: "100%",
    height: "100%",
    borderRadius: 16,
    borderWidth: 1,
    shadowColor: "#00C8FF",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 25,
  },
  icon: {
    marginBottom: 10,
  },
  text: {
    color: "#FFFFFF",
    fontWeight: "500",
    textAlign: "center",
    fontSize: 13,
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
  },
  activeNavIndicator: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
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
});
