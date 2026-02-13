// app/_layout.tsx
import { Stack } from "expo-router";
import React from "react";
import { Image, View } from "react-native";

/**
 * HeaderLogo: shared header used across every screen, matching the
 * previous design with the Kamarta Robotics logo centered up top.
 */
function HeaderLogo() {
  return (
    <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
      <Image
        source={require("../assets/images/logo.png")}
        style={{ width: 140, height: 40, resizeMode: "contain", tintColor: "#FFFF99" }}
      />
    </View>
  );
}

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerTitle: () => <HeaderLogo />,
        headerTitleAlign: "center",
        headerStyle: { backgroundColor: "#0A0114" },
        headerTintColor: "#00C8FF",
      }}
    />
  );
}
