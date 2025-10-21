import React from "react"; 
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert,
  ImageBackground,
  ScrollView,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

type Dish = {
  id: string;
  name: string;
  description: string;
  course: "Starter" | "Main" | "Dessert" | string;
  price: number;
};

const RemovableMenuItem: React.FC<{
  dish: Dish;
  onRemove: (id: string) => void;
}> = ({ dish, onRemove }) => (
  <View style={removeStyles.menuItemContainer}>
    <View style={removeStyles.dishInfo}>
      <Text style={removeStyles.dishName}>{dish.name}</Text>
      <Text style={removeStyles.dishPrice}>R {dish.price.toFixed(2)}</Text>
    </View>
    <TouchableOpacity
      style={removeStyles.removeButton}
      onPress={() => onRemove(dish.id)}
    >
      <Text style={removeStyles.removeButtonText}>Remove</Text>
    </TouchableOpacity>
  </View>
);

export default function RemoveDishScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const initialDishes: Dish[] = params.currentDishes
    ? JSON.parse(params.currentDishes as string)
    : [];
    
  const handleRemoveDish = (idToRemove: string) => {
    const dishName = initialDishes.find((d) => d.id === idToRemove)?.name || "this dish";

    Alert.alert(
      "Confirm Removal",
      `Are you sure you want to remove ${dishName}? This action cannot be undone.`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Remove",
          style: "destructive",
          onPress: () => {
            const newDishes = initialDishes.filter((dish) => dish.id !== idToRemove);
            Alert.alert("Removed", `${dishName} has been removed from the menu.`);
            router.replace({
              pathname: "/",
              params: {
                role: params.role || "user", 
                dishes: JSON.stringify(newDishes), 
              },
            });
          },
        },
      ]
    );
  };

  return (
    <ImageBackground
      source={{
        uri: "https://png.pngtree.com/thumb_back/fw800/background/20231230/pngtree-illustrated-vector-background-restaurant-menu-design-with-paper-texture-food-and-image_13914730.png",
      }}
      style={removeStyles.background}
    >
      <View style={removeStyles.overlay} />

      <ScrollView contentContainerStyle={removeStyles.container}>
        <Text style={removeStyles.title}>Remove Dish</Text>
        <Text style={removeStyles.subtitle}>
          Select a dish to permanently remove it from the menu.
        </Text>

        {initialDishes.length === 0 ? (
          <Text style={removeStyles.emptyText}>
            The menu is empty. Nothing to remove.
          </Text>
        ) : (
          <FlatList
            data={initialDishes} 
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <RemovableMenuItem dish={item} onRemove={handleRemoveDish} />
            )}
            contentContainerStyle={removeStyles.listContainer}
          />
        )}
        
        <TouchableOpacity
          style={removeStyles.backButton}
          onPress={() => router.back()}
        >
          <Text style={removeStyles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
      </ScrollView>
    </ImageBackground>
  );
}

const removeStyles = StyleSheet.create({
  background: { flex: 1, resizeMode: "cover" },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  container: { padding: 20, alignItems: "center", paddingTop: 80 },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
    color: "#fff",
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
    color: "#ddd",
  },
  emptyText: { color: "#bbb", textAlign: "center", marginTop: 10 },
  listContainer: { width: "100%", paddingBottom: 20 },

  menuItemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    width: "100%",
    borderLeftWidth: 4,
    borderLeftColor: "crimson",
  },
  dishInfo: {
    flex: 1,
    marginRight: 10,
  },
  dishName: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  dishPrice: {
    color: "#ccc",
    fontSize: 14,
    marginTop: 2,
  },
  removeButton: {
    backgroundColor: "crimson",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  removeButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
  backButton: {
    backgroundColor: "rgba(201, 68, 27, 0.5)",
    borderRadius: 15,
    padding: 15,
    width: "100%",
    marginTop: 20,
    alignItems: "center",
  },
  backButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
});