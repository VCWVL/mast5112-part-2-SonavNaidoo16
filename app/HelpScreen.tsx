import React, { useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  Animated,
  Easing,
} from "react-native";
import { useRouter } from "expo-router";

// Main HelpScreen component
export default function HelpScreen() {
  const router = useRouter(); // Used for navigation between screens

  // --- Animation Values ---
  const fadeAnim = useRef(new Animated.Value(0)).current; // Controls fade-in effect
  const slideAnim = useRef(new Animated.Value(50)).current; // Controls slide-up motion
  const pulseAnim = useRef(new Animated.Value(1)).current; // Controls pulsing title effect
  const buttonScale = useRef(new Animated.Value(1)).current; // Controls button press scaling

  // --- Run animations when component mounts ---
  useEffect(() => {
    // Fade-in and slide-up animation runs in parallel
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000, // Animation duration (1 second)
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 1000,
        easing: Easing.out(Easing.exp), // Smooth easing for slide-up
        useNativeDriver: true,
      }),
    ]).start();

    // Looping pulsing animation for the title
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.05, // Slightly enlarges the title
          duration: 1200,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1, // Returns to normal size
          duration: 1200,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  // --- Button Animation Handlers ---
  const handlePressIn = () => {
    // Shrinks button slightly when pressed
    Animated.spring(buttonScale, {
      toValue: 0.9,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    // Restores button size and navigates back when released
    Animated.spring(buttonScale, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start(() => router.back());
  };

  // --- Screen Layout ---
  return (
    <ImageBackground
      source={{
        uri: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1000&q=80",
      }}
      style={styles.background}
    >
      {/* Overlay to darken background for readability */}
      <View style={styles.overlay} />

      <ScrollView contentContainerStyle={styles.container}>
        {/* Animated title with fade and pulse effects */}
        <Animated.Text
          style={[
            styles.title,
            {
              opacity: fadeAnim,
              transform: [{ scale: pulseAnim }],
            },
          ]}
        >
          Help & Instructions
        </Animated.Text>

        {/* Subtitle with fade and slide-in animation */}
        <Animated.Text
          style={[
            styles.subtitle,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          How to use the Christoffel Menu App
        </Animated.Text>

        {/* --- Section for Chef (Christoffel) --- */}
        <Animated.View
          style={[
            styles.section,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <Text style={styles.heading}>For Christoffel (Chef)</Text>
          <Text style={styles.text}>
            As Christoffel, you can manage the restaurant’s full menu:
          </Text>

          {/* Bullet list explaining chef actions */}
          <Text style={styles.bullet}>
            • <Text style={styles.bold}>Add Dish:</Text> Enter the dish name,
            description, course, and price of your choice. This will then display on
            the menu.
          </Text>
          <Text style={styles.bullet}>
            • <Text style={styles.bold}>View Menu:</Text> See all dishes
            currently on the list. This is automatically filtered based on the course.
            Prices are shown in South African Rands (R).
          </Text>
          <Text style={styles.bullet}>
            • <Text style={styles.bold}>Remove Dish:</Text> Delete any dish from
            the menu by clicking the remove button next to the dish name.
          </Text>
          <Text style={styles.bullet}>
            • <Text style={styles.bold}>Reset Menu:</Text> Clear all dishes to
            start over and reset the menu.
          </Text>
        </Animated.View>

        {/* --- Section for App Users --- */}
        <Animated.View
          style={[
            styles.section,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <Text style={styles.heading}>For Users</Text>
          <Text style={styles.text}>
            The menu allows users to easily explore available dishes, sorted by course
            for convenience.
          </Text>

          {/* User tips */}
          <Text style={styles.bullet}>
            • Browse the menu organized by course: Starters, Mains, and Desserts.
          </Text>
          <Text style={styles.bullet}>
            • View all available dishes and prices.
          </Text>
          <Text style={styles.bullet}>
            • Learn more about each dish’s course and description for more insight.
          </Text>
        </Animated.View>

        {/* --- General Tips Section --- */}
        <Animated.View
          style={[
            styles.section,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <Text style={styles.heading}>Tips</Text>
          <Text style={styles.bullet}>
            • Prices are shown in South African Rands (R).
          </Text>
          <Text style={styles.bullet}>
            • Make sure to double-check dish details before adding.
          </Text>
          <Text style={styles.bullet}>
            • The app does not permanently store data — it resets when closed.
          </Text>
        </Animated.View>

        {/* --- Back Button with animation --- */}
        <Animated.View
          style={[
            styles.buttonWrapper,
            { transform: [{ scale: buttonScale }] },
          ]}
        >
          <TouchableOpacity
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>Back to Menu</Text>
          </TouchableOpacity>
        </Animated.View>
      </ScrollView>
    </ImageBackground>
  );
}

// --- Styles ---
const styles = StyleSheet.create({
  background: { flex: 1, resizeMode: "cover" }, // Full-screen background
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.6)", // Semi-transparent overlay
  },
  container: { padding: 20, paddingTop: 80 }, // Scroll content spacing
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 10,
    textShadowColor: "#000",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 18,
    color: "#ccc",
    textAlign: "center",
    marginBottom: 25,
  },
  section: {
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
  },
  heading: { color: "#fff", fontSize: 20, fontWeight: "700", marginBottom: 8 },
  text: { color: "#ddd", marginBottom: 8, fontSize: 14 },
  bullet: { color: "#ccc", marginBottom: 5, fontSize: 14 },
  bold: { fontWeight: "700", color: "#fff" },
  buttonWrapper: {
    backgroundColor: "#2c5fbfff",
    borderRadius: 25,
    paddingVertical: 12,
    alignItems: "center",
    alignSelf: "center",
    marginTop: 20,
    width: "60%",
    shadowColor: "#2c5fbfff",
    shadowOpacity: 0.6,
    shadowRadius: 10,
  },
  buttonText: { color: "#fff", fontWeight: "700", fontSize: 16 },
});
