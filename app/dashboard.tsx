import * as React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

interface DashboardScreenProps {
  onNavigate?: (screen: string) => void;
}

function DashboardScreen({ onNavigate }: DashboardScreenProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dashboard</Text>
      <Text style={styles.description}>Welcome to the Dashboard screen!</Text>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => onNavigate?.("home")}
      >
        <Text style={styles.backButtonText}>Back to Home</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#020617",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#e5e7eb",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: "#9ca3af",
    textAlign: "center",
    marginBottom: 30,
  },
  backButton: {
    backgroundColor: "#00eaff",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
  },
  backButtonText: {
    color: "#0a0e27",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default DashboardScreen;
