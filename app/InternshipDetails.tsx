import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";

interface InternshipDetailsProps {
  onNavigate?: (screen: string) => void;
}

const perks = [
  "1:1 mentor feedback on weekly builds",
  "Live cohorts with weekend support",
  "Capstone evaluated by industry panel",
  "Guaranteed interview practice pods",
];

export default function InternshipDetails({ onNavigate }: InternshipDetailsProps) {
  return (
    <View style={styles.container}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.heading}>Internship Track</Text>
        <Text style={styles.subheading}>Immersive robotics experience</Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Live Internship</Text>
          {perks.map((perk) => (
            <View key={perk} style={styles.perkRow}>
              <View style={styles.dot} />
              <Text style={styles.perkText}>{perk}</Text>
            </View>
          ))}
        </View>

        <TouchableOpacity
          style={styles.primaryBtn}
          activeOpacity={0.85}
          onPress={() => onNavigate?.("home")}
        >
          <Text style={styles.primaryText}>Back to Home</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#020617",
    paddingTop: 40,
  },
  content: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  heading: {
    fontSize: 24,
    fontWeight: "700",
    color: "#f8fafc",
  },
  subheading: {
    fontSize: 14,
    color: "#94a3b8",
    marginTop: 6,
    marginBottom: 24,
  },
  card: {
    backgroundColor: "#030a1f",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "rgba(56,189,248,0.35)",
    padding: 18,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#e5e7eb",
    marginBottom: 12,
  },
  perkRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#38bdf8",
    marginRight: 10,
  },
  perkText: {
    fontSize: 13,
    color: "#cbd5f5",
    flex: 1,
  },
  primaryBtn: {
    marginTop: 24,
    alignSelf: "center",
    paddingHorizontal: 36,
    paddingVertical: 12,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#38bdf8",
  },
  primaryText: {
    color: "#e0f2fe",
    fontWeight: "700",
    fontSize: 14,
  },
});

