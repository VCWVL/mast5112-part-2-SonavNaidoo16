// Import React and necessary React Native components
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ImageBackground,
  ScrollView,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

// Define the Dish type (structure for each dish item)
type Dish = {
  id: string;
  name: string;
  description: string;
  course: "Starter" | "Main" | "Dessert" | string;
  price: number;
};

// --- Component: RemovableMenuItem ---
// This reusable component displays a single dish with a REMOVE button
const RemovableMenuItem: React.FC<{
  dish: Dish;
  onRemove: (id: string) => void;
}> = ({ dish, onRemove }) => (
  <View style={removeStyles.menuItemContainer}>
    <View style={removeStyles.dishInfo}>
      {/* Dish name */}
      <Text style={removeStyles.dishName}>{dish.name}</Text>

      {/* Price and course type displayed on one row */}
      <View style={removeStyles.detailsRow}>
        <Text style={removeStyles.dishPrice}>R {dish.price.toFixed(2)}</Text>
        <View style={removeStyles.courseTag}>
          <Text style={removeStyles.courseText}>{dish.course}</Text>
        </View>
      </View>
    </View>

    {/* Remove button to delete a dish */}
    <TouchableOpacity
      style={removeStyles.removeButton}
      onPress={() => onRemove(dish.id)}
    >
      <Text style={removeStyles.removeButtonText}>REMOVE</Text>
    </TouchableOpacity>
  </View>
);

// --- Main Screen Component ---
// This screen allows the Chef to remove dishes from the menu
export default function RemoveDishScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  // Retrieve dishes passed from previous screen
  // If no dishes are passed, start with an empty list
  const initialDishes: Dish[] = params.currentDishes
    ? JSON.parse(params.currentDishes as string)
    : [];

  // State variable to track current dishes
  const [currentDishes, setCurrentDishes] = useState<Dish[]>(initialDishes);

  // Function to handle dish removal by filtering out the deleted dish
  const handleRemoveDish = (idToRemove: string) => {
    const newDishes = currentDishes.filter((dish) => dish.id !== idToRemove);
    setCurrentDishes(newDishes);
  };

  // Navigate back to the HomeScreen, passing updated dish list and role
  const handleGoBack = () => {
    router.replace({
      pathname: "HomeScreen",
      params: {
        role: params.role || "user",
        dishes: JSON.stringify(currentDishes),
      },
    });
  };

  // --- UI Rendering ---
  return (
    <ImageBackground
      source={{
        uri: "https://png.pngtree.com/thumb_back/fw800/background/20231230/pngtree-illustrated-vector-background-restaurant-menu-design-with-paper-texture-food-and-image_13914730.png",
      }}
      style={removeStyles.background}
    >
      {/* Semi-transparent overlay for readability */}
      <View style={removeStyles.overlay} />

      <ScrollView contentContainerStyle={removeStyles.container}>
        {/* Page title */}
        <Text style={removeStyles.title}>Remove Dish</Text>

        <Text style={removeStyles.subtitle}>
          Click the **REMOVE** button to delete a dish from the menu.
        </Text>

        {/* Show message if no dishes exist, otherwise list them */}
        {currentDishes.length === 0 ? (
          <Text style={removeStyles.emptyText}>
            The menu is empty. Nothing to remove.
          </Text>
        ) : (
          <FlatList
            data={currentDishes}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <RemovableMenuItem dish={item} onRemove={handleRemoveDish} />
            )}
            contentContainerStyle={removeStyles.listContainer}
          />
        )}

        {/* Button to navigate back to the Home screen */}
        <TouchableOpacity style={removeStyles.backButton} onPress={handleGoBack}>
          <Text style={removeStyles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
      </ScrollView>
    </ImageBackground>
  );
}

// --- STYLES ---
// Styles for the Remove Dish screen and its components
const removeStyles = StyleSheet.create({
  background: { flex: 1, resizeMode: "cover" },

  // Overlay darkens background image for better text visibility
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.7)",
  },

  container: {
    paddingHorizontal: 25,
    alignItems: "center",
    paddingTop: 100,
    paddingBottom: 40,
  },

  title: {
    fontSize: 36,
    fontWeight: "900",
    textAlign: "center",
    marginBottom: 10,
    color: "#ff0707df",
    letterSpacing: 1,
  },

  subtitle: {
    fontSize: 17,
    textAlign: "center",
    marginBottom: 30,
    color: "#ccc",
  },

  emptyText: { color: "#888", textAlign: "center", marginTop: 40, fontSize: 18 },

  listContainer: { width: "100%", paddingBottom: 20 },

  // --- Menu item card styling ---
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

  dishInfo: {
    flex: 1,
    marginRight: 20,
  },

  dishName: {
    color: "#fff",
    fontWeight: "800",
    fontSize: 18,
    marginBottom: 6,
  },

  detailsRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },

  dishPrice: {
    color: "#aaffaa",
    fontSize: 16,
    fontWeight: "600",
    marginRight: 15,
  },

  courseTag: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 5,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },

  courseText: {
    color: "#eee",
    fontSize: 13,
    fontWeight: "600",
  },

  // Remove button on each dish
  removeButton: {
    backgroundColor: "crimson",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    alignItems: "center",
    justifyContent: "center",
  },

  removeButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },

  // Go back button styling
  backButton: {
    backgroundColor: "#ff0000f6",
    borderRadius: 15,
    padding: 18,
    width: "100%",
    marginTop: 40,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ff0000e4",
  },
  //back button text styling
  backButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
});
