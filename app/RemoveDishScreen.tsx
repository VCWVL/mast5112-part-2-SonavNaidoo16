import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ImageBackground,
  ScrollView,
  Animated,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

// --- Define the structure for each dish item ---
type Dish = {
  id: string;
  name: string;
  description: string;
  course: "Starter" | "Main" | "Dessert" | string;
  price: number;
};

// --- Animated Button Component ---
// Adds a scale and opacity animation effect when pressed
const AnimatedButton: React.FC<{
  onPress: () => void;
  title: string;
  style?: any;
  textStyle?: any;
}> = ({ onPress, title, style, textStyle }) => {
  // Create animation values for scaling and fading
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const opacityAnim = useRef(new Animated.Value(1)).current;

  // Shrink and fade button slightly when pressed
  const handlePressIn = () => {
    Animated.parallel([
      Animated.spring(scaleAnim, { toValue: 0.95, useNativeDriver: true }),
      Animated.timing(opacityAnim, { toValue: 0.7, duration: 100, useNativeDriver: true }),
    ]).start();
  };

  // Restore button to normal when released
  const handlePressOut = () => {
    Animated.parallel([
      Animated.spring(scaleAnim, { toValue: 1, friction: 3, useNativeDriver: true }),
      Animated.timing(opacityAnim, { toValue: 1, duration: 100, useNativeDriver: true }),
    ]).start(() => onPress());
  };

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }], opacity: opacityAnim }}>
      <TouchableOpacity
        style={style}
        activeOpacity={0.9}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        <Text style={textStyle}>{title}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

// --- Component to display each dish item with a remove button ---
const RemovableMenuItem: React.FC<{
  dish: Dish;
  onRemove: (id: string) => void;
}> = ({ dish, onRemove }) => {
  // Fade-in animation for each dish item
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View style={[removeStyles.menuItemContainer, { opacity: fadeAnim }]}>
      {/* Dish information */}
      <View style={removeStyles.dishInfo}>
        <Text style={removeStyles.dishName}>{dish.name}</Text>
        <View style={removeStyles.detailsRow}>
          <Text style={removeStyles.dishPrice}>R {dish.price.toFixed(2)}</Text>

          {/* Tag showing the course type */}
          <View style={removeStyles.courseTag}>
            <Text style={removeStyles.courseText}>{dish.course}</Text>
          </View>
        </View>
      </View>

      {/* Button to remove dish */}
      <AnimatedButton
        title="REMOVE"
        style={removeStyles.removeButton}
        textStyle={removeStyles.removeButtonText}
        onPress={() => onRemove(dish.id)}
      />
    </Animated.View>
  );
};

// --- Main Screen Component for Removing Dishes ---
export default function RemoveDishScreen() {
  const router = useRouter(); // Used for screen navigation
  const params = useLocalSearchParams(); // Retrieve data passed from previous screen

  // Load dishes from params or set an empty list if none exist
  const initialDishes: Dish[] = params.currentDishes
    ? JSON.parse(params.currentDishes as string)
    : [];

  const [currentDishes, setCurrentDishes] = useState<Dish[]>(initialDishes);

  // Screen fade-in animation on mount
  const screenFade = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(screenFade, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  // Function to remove a dish from the list
  const handleRemoveDish = (idToRemove: string) => {
    const newDishes = currentDishes.filter((dish) => dish.id !== idToRemove);
    setCurrentDishes(newDishes);
  };

  // Go back to HomeScreen and send updated dish list
  const handleGoBack = () => {
    router.replace({
      pathname: "/HomeScreen",
      params: {
        role: params.role || "user", // Preserve user/chef role
        dishes: JSON.stringify(currentDishes), // Pass updated dishes list
      },
    });
  };

  return (
    <ImageBackground
      source={{
        uri: "https://i.pinimg.com/originals/3a/00/a8/3a00a8bc91fffad7005fa5f8373b42b7.jpg",
      }}
      style={removeStyles.background}
    >
      {/* Dark overlay for readability */}
      <View style={removeStyles.overlay} />

      {/* Scrollable main content with fade animation */}
      <Animated.ScrollView
        contentContainerStyle={[removeStyles.container, { opacity: screenFade }]}
      >
        <Text style={removeStyles.title}>Remove Dish</Text>
        <Text style={removeStyles.subtitle}>
          Click the remove button to delete a dish from the menu.
        </Text>

        {/* Display message if no dishes exist */}
        {currentDishes.length === 0 ? (
          <Text style={removeStyles.emptyText}>
            The menu is empty and there is nothing to remove.
          </Text>
        ) : (
          // Display list of dishes
          <FlatList
            data={currentDishes}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <RemovableMenuItem dish={item} onRemove={handleRemoveDish} />
            )}
            contentContainerStyle={removeStyles.listContainer}
          />
        )}

        {/* Animated button to go back */}
        <AnimatedButton
          title="Go Back"
          style={removeStyles.backButton}
          textStyle={removeStyles.backButtonText}
          onPress={handleGoBack}
        />
      </Animated.ScrollView>
    </ImageBackground>
  );
}

// --- Styles for the RemoveDishScreen and Components ---
const removeStyles = StyleSheet.create({
  background: { flex: 1, resizeMode: "cover" },
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(0,0,0,0.7)" },

  container: {
    paddingHorizontal: 25,
    alignItems: "center",
    paddingTop: 100,
    paddingBottom: 40,
  },

  // Headings
  title: {
    fontSize: 36,
    fontWeight: "900",
    textAlign: "center",
    marginBottom: 10,
    color: "#1cdf4dce",
  },
  subtitle: { fontSize: 17, textAlign: "center", marginBottom: 30, color: "#ccc" },

  // When no dishes exist
  emptyText: { color: "#888", textAlign: "center", marginTop: 40, fontSize: 18 },

  // List styling
  listContainer: { width: "100%", paddingBottom: 20 },

  // Dish card container
  menuItemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    width: "100%",
    borderLeftWidth: 6,
    borderLeftColor: "crimson",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },

  // Dish info section
  dishInfo: { flex: 1, marginRight: 20 },
  dishName: { color: "#fff", fontWeight: "800", fontSize: 18, marginBottom: 6 },
  detailsRow: { flexDirection: "row", alignItems: "center", marginTop: 4 },
  dishPrice: { color: "#aaffaa", fontSize: 16, fontWeight: "600", marginRight: 15 },

  // Course tag styling
  courseTag: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 5,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  courseText: { color: "#eee", fontSize: 13, fontWeight: "600" },

  // Remove button styling
  removeButton: {
    backgroundColor: "crimson",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  removeButtonText: { color: "#fff", fontWeight: "bold", fontSize: 14 },

  // Back button styling
  backButton: {
    backgroundColor: "#1cdf4dce",
    borderRadius: 15,
    padding: 18,
    width: "100%",
    marginTop: 40,
    alignItems: "center",
  },
  backButtonText: { color: "#fff", fontSize: 18, fontWeight: "700" },
});
