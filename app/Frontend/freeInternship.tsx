// app/Frontend/freeInternship.tsx

import React, { useRef, useEffect } from "react";
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Animated, Image, Linking } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, Href } from "expo-router";
import * as WebBrowser from "expo-web-browser";

interface VideoCardProps {
  title: string;
  subtitle: string;
  youtubeUrl: string;
  thumbnailUrl?: string;
}

export default function FreeInternshipScreen() {
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const glowAnim = useRef(new Animated.Value(0.7)).current;

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

  const openYouTubeVideo = async (url: string) => {
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        await WebBrowser.openBrowserAsync(url);
      }
    } catch (error) {
      console.error("Error opening YouTube:", error);
    }
  };

  const openGoogleForm = async () => {
    const formUrl = "https://forms.gle/YOUR_FORM_ID"; // Replace with your Google Form URL
    try {
      await Linking.openURL(formUrl);
    } catch (error) {
      console.error("Error opening form:", error);
    }
  };

  const VideoCard = ({ title, subtitle, youtubeUrl, thumbnailUrl }: VideoCardProps) => {
    return (
      <Animated.View style={{ opacity: fadeAnim, marginBottom: 20 }}>
        <TouchableOpacity
          style={styles.videoCard}
          activeOpacity={0.9}
          onPress={() => openYouTubeVideo(youtubeUrl)}
        >
          <View style={styles.videoThumbnailContainer}>
            <View style={styles.videoThumbnail}>
              {thumbnailUrl ? (
                <Image source={{ uri: thumbnailUrl }} style={styles.thumbnailImage} />
              ) : (
                <View style={styles.placeholderThumbnail} />
              )}
              <Ionicons name="play-circle" size={60} color="#FFFFFF" style={styles.playIcon} />
            </View>
            <View style={styles.youtubeIconContainer}>
              <Ionicons name="logo-youtube" size={20} color="#FF0000" />
            </View>
          </View>
          <View style={styles.videoInfo}>
            <Text style={styles.videoTitle}>{title}</Text>
            <Text style={styles.videoSubtitle}>{subtitle}</Text>
            <TouchableOpacity
              style={styles.viewDetailsButton}
              onPress={() => openYouTubeVideo(youtubeUrl)}
            >
              <Text style={styles.viewDetailsText}>View Details</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  // YouTube video links
  const videoLessons = [
    {
      title: "How to make Arduino Project",
      subtitle: "13th Step",
      youtubeUrl: "https://youtu.be/eOjl1ZYDdGc?si=HT47YL6Iuo-eNs8s",
      thumbnailUrl: "https://img.youtube.com/vi/eOjl1ZYDdGc/maxresdefault.jpg",
    },
    {
      title: "Making Advance Robot",
      subtitle: "1.0 Sensor Basics",
      youtubeUrl: "https://youtu.be/Z6ChtzgqYhQ?si=knCYeEPbzFMUqnyS", // Replace with your YouTube video URL
      thumbnailUrl: "https://i.ytimg.com/vi/Z6ChtzgqYhQ/hqdefault.jpg?sqp=-oaymwFBCNACELwBSFryq4qpAzMIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB8AEB-AH-CYAC0AWKAgwIABABGFogYihlMA8=&rs=AOn4CLCiRa1nAyy8RO3QLiTDPx69FIug9Q", // Optional: Add thumbnail image URL
    },
    {
      title: "Kamarta School Client",
      subtitle: "Sep 20, 2025",
      youtubeUrl: "https://youtu.be/5hxHMG8S8xM?si=0SxP41irxl3QVQJK", // Replace with your YouTube video URL
      thumbnailUrl: "https://i.ytimg.com/vi/5hxHMG8S8xM/hqdefault.jpg?sqp=-oaymwFBCPYBEIoBSFryq4qpAzMIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB8AEB-AH-BIAC6AKKAgwIABABGGUgZShlMA8=&rs=AOn4CLD-JPc3iDax-ZujYuy_WnoIuSHxXQ", // Optional: Add thumbnail image URL
    },
    {
      title: "Basic school pre project",
      subtitle: "Aug 4, 2025",
      youtubeUrl: "https://youtu.be/doVW3Lova58?si=1cCfDwexEMUbOSen", // Replace with your YouTube video URL
      thumbnailUrl: "https://i.ytimg.com/vi/doVW3Lova58/hqdefault.jpg?sqp=-oaymwE2CNACELwBSFXyq4qpAygIARUAAIhCGAFwAcABBvABAfgB_gmAAtAFigIMCAAQARhyIE4oQTAP&rs=AOn4CLD5bP4mVnZTAAPxc4lU85fG2bBObw", // Optional: Add thumbnail image URL
    },
    {
      title: "Signed MOU with Excellence College,Hoshangabad",
      subtitle: "Internship Program",
      youtubeUrl: "http://youtube.com/post/UgkxKmbqwRvH3o0wXQajqnrtcGcjX2e8tK3e?si=Q4Rf_HzhjNuhS2uo", // Replace with your YouTube video URL
      thumbnailUrl: "https://yt3.ggpht.com/0ZMDgBpv4wvwGcxUKcs6NFn7YP-VGyzQ8RwhWGkPUlCl78rz0y2z0M0RVwApJ1h-8bwYO9RjmSiTkwQ=s640-c-fcrop64=1,38000000c7ffffff-rw-nd-v1", // Optional: Add thumbnail image URL
    },
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
            },
          ]}
        />

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          {/* Main Title */}
          <View style={styles.titleSection}>
            <Text style={styles.mainTitle}>Free Intenship</Text>
            <Text style={styles.learnWatchTitle}>Learn & Watch</Text>
          </View>

          {/* Video Lessons */}
          <View style={styles.videosContainer}>
            {videoLessons.map((video, index) => (
              <VideoCard
                key={index}
                title={video.title}
                subtitle={video.subtitle}
                youtubeUrl={video.youtubeUrl}
                thumbnailUrl={video.thumbnailUrl}
              />
            ))}
          </View>
          
          {/* Google Form Link */}
          <TouchableOpacity onPress={ () => Linking.openURL( "https://drive.google.com/file/d/1fYT1uhZj9tlRyl3jlsylJvXgGCkR9cAP/view" )}>
            <Text style={styles.formLinkText}>Click here for Internship details </Text>
          </TouchableOpacity> 

     {/* this is the telegram link are join  */}
          {/* Sign Up Button */}
          <TouchableOpacity style={styles.signUpButton} onPress={() => Linking.openURL("https://t.me/+17g09ayV1l8zMTk9")}>
            {/* this link are github copilot change in the future */}
            <Text style={styles.signUpText}>Sign Up for Free</Text>
            <Ionicons name="paper-plane" size={24} color="#FF8C00" style={styles.planeIcon} />
          </TouchableOpacity>

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
    padding: 20,
    paddingBottom: 100,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    marginTop: 10,
  },
  titleSection: {
    width: "100%",
    alignItems: "center",
    marginBottom: 30,
  },
  mainTitle: {
    fontSize: 32,
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: 10,
  },
  learnWatchTitle: {
    fontSize: 20,
    fontWeight: "500",
    color: "#FFFFFF",
    opacity: 0.9,
  },
  videosContainer: {
    width: "100%",
    marginBottom: 30,
  },
  videoCard: {
    borderRadius: 16,
    backgroundColor: "rgba(255, 255, 255, 0.03)",
    borderWidth: 2,
    borderColor: "rgba(0, 200, 255, 0.5)",
    padding: 15,
    marginBottom: 15,
  },
  videoThumbnailContainer: {
    position: "relative",
    marginBottom: 15,
  },
  videoThumbnail: {
    width: "100%",
    height: 180,
    borderRadius: 12,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  thumbnailImage: {
    width: "100%",
    height: "100%",
    position: "absolute",
    resizeMode: "cover",
  },
  placeholderThumbnail: {
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  playIcon: {
    zIndex: 2,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    borderRadius: 30,
  },
  youtubeIconContainer: {
    position: "absolute",
    top: 10,
    left: 10,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 4,
    padding: 4,
  },
  videoInfo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  videoTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FFFFFF",
    flex: 1,
    marginRight: 10,
  },
  videoSubtitle: {
    fontSize: 14,
    color: "#FFFFFF",
    opacity: 0.8,
    marginRight: 10,
  },
  viewDetailsButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: "rgba(0, 200, 255, 0.8)",
    backgroundColor: "rgba(0, 200, 255, 0.1)",
  },
  viewDetailsText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "500",
  },
  signUpButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 200, 255, 0.2)",
    borderWidth: 2,
    borderColor: "#00C8FF",
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 30,
    marginTop: 20,
    marginBottom: 15,
    shadowColor: "#00C8FF",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 20,
    shadowOpacity: 0.8,
    elevation: 10,
  },
  signUpText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
    marginRight: 10,
  },
  planeIcon: {
    marginLeft: 5,
  },
  formLinkText: {
    color: "#FFFFFF",
    fontSize: 14,
    opacity: 0.8,
    textAlign: "center",
    textDecorationLine: "underline",
  },
  bottomNav: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
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

