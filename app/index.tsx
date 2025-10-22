import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TouchableWithoutFeedback,
  StyleSheet,
  ImageBackground,
  Animated,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useRouter, useLocalSearchParams } from "expo-router";

export default function LoginScreen() {
  const router = useRouter(); // Used to navigate between screens
  const params = useLocalSearchParams(); // Access route parameters (like dishes from logout)
  const [selectedUser, setSelectedUser] = useState("user"); // Track which user type is selected
  const dishesFromLogout = params.dishes; // Retrieve any dishes passed from the logout action

  // Animation references
  const fadeAnim = useRef(new Animated.Value(0)).current; // For screen fade-in/out animation
  const scaleAnim = useRef(new Animated.Value(1)).current; // For button press scaling animation

  // Run when the screen first loads
  useEffect(() => {
    // Fade in animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 250,
      useNativeDriver: true,
    }).start();

    // Fade out when leaving the screen (cleanup)
    return () => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }).start();
    };
  }, []);

  // Handle login button press
  const handleLogin = () => {
    // Fade out before navigating
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 400,
      useNativeDriver: true,
    }).start(() => {
      // After fade out, navigate to the HomeScreen
      router.replace({
        pathname: "/HomeScreen",
        params: {
          role: selectedUser, // Pass the selected role (user or Christoffel)
          dishes: dishesFromLogout, // Preserve dishes if coming from logout
        },
      });
    });
  };

  // When button is pressed down (scale slightly smaller)
  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  // When button is released (scale back to normal)
  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  return (
    // Animated fade container for smooth screen appearance
    <Animated.View style={[styles.fadeContainer, { opacity: fadeAnim }]}>
      {/* Background image */}
      <ImageBackground
        source={{
          uri: "https://img.freepik.com/premium-photo/herbs-condiments-black-stone-background_266870-11940.jpg",
        }}
        style={styles.background}
      >
        {/* Dark overlay for contrast */}
        <View style={styles.overlay} />

        {/* Main content container */}
        <View style={styles.container}>
          <Text style={styles.brand}>Christoffels Menu</Text>
          <Text style={styles.title}>Welcome</Text>

          {/* Role selection */}
          <Text style={styles.label}>Select Login Type:</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={selectedUser}
              style={styles.picker}
              onValueChange={(itemValue) => setSelectedUser(itemValue)}
            >
              {/* Two available roles */}
              <Picker.Item label="Christoffel (Chef)" value="christoffel" />
              <Picker.Item label="User" value="user" />
            </Picker>
          </View>

          {/* Login button with animation */}
          <TouchableWithoutFeedback
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            onPress={handleLogin}
          >
            <Animated.View style={[styles.button, { transform: [{ scale: scaleAnim }] }]}>
              <Text style={styles.buttonText}>Login</Text>
            </Animated.View>
          </TouchableWithoutFeedback>
        </View>
      </ImageBackground>
    </Animated.View>
  );
}

// --- Styling Section ---
const styles = StyleSheet.create({
  fadeContainer: {
    flex: 1,
  },
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.6)", // Semi-transparent overlay for readability
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  brand: {
    fontSize: 28,
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 10,
  },
  title: {
    fontSize: 26,
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 20,
  },
  label: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 10,
  },
  pickerContainer: {
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#d01c1cff",
    marginBottom: 20,
    width: 250,
  },
  picker: {
    color: "#000000ff", // Text color for picker items
  },
  button: {
    backgroundColor: "#99110cff",
    paddingVertical: 14,
    paddingHorizontal: 80,
    borderRadius: 25,
    shadowColor: "#d01c1cff",
    shadowOpacity: 0.8,
    shadowRadius: 10,
  },
  buttonText: {
    color: "#ffffffff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
