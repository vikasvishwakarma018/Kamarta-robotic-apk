import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface BottomBarProps {
  activeTab?: string;
  onNavigate?: (screen: string) => void;
}

const tabs = [
  { key: "home", icon: "home-outline" as const },
  { key: "projects", icon: "grid-outline" as const },
  { key: "internship-details", icon: "ribbon-outline" as const },
];

const BottomBar: React.FC<BottomBarProps> = ({ activeTab = "home", onNavigate }) => {
  return (
    <View style={styles.container}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.key;
        return (
          <TouchableOpacity
            key={tab.key}
            style={styles.navButton}
            activeOpacity={0.85}
            onPress={() => onNavigate?.(tab.key)}
          >
            <Ionicons
              name={tab.icon}
              size={26}
              color={isActive ? "#fde68a" : "#94a3b8"}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
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
  navButton: {
    padding: 8,
    borderRadius: 16,
  },
});

export default BottomBar;

