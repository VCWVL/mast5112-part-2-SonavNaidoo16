import React, { useEffect, useState } from "react";
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  FlatList,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

type Dish = {
  id: string;
  name: string;
  description: string;
  course: "Starter" | "Main" | "Dessert" | string;
  price: number;
};

export default function HomeScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const role = params.role || "user";

  // Initialize dishes from navigation params if present
  const initialDishes = params.dishes ? JSON.parse(params.dishes as string) : [];
  const [dishes, setDishes] = useState<Dish[]>(initialDishes);

  // ✅ Add new dish sent from AddDishScreen
  useEffect(() => {
    if (params.newDish) {
      try {
        const newDish: Dish = JSON.parse(params.newDish as string);
        setDishes((prev) => [...prev, newDish]);
      } catch (error) {
        console.warn("Invalid dish data received:", error);
      }
    }
  }, [params.newDish]);

  const total = dishes.length;
  const average = total
    ? dishes.reduce((sum, d) => sum + d.price, 0) / total
    : 0;

  const handleReset = () => {
    Alert.alert("Reset Menu", "Are you sure you want to clear all dishes?", [
      { text: "Cancel", style: "cancel" },
      { text: "Yes", onPress: () => setDishes([]) },
    ]);
  };

  return (
    <ImageBackground
      source={{
        uri: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1000&q=80",
      }}
      style={styles.background}
    >
      <View style={styles.overlay} />

      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Christoffel’s Menu</Text>
        <Text style={styles.subtitle}>
          Logged in as: {role === "christoffel" ? "Christoffel (Chef)" : "User"}
        </Text>

        <Text style={[styles.sectionTitle, { marginTop: 20 }]}>
          Current Menu
        </Text>
        {dishes.length === 0 ? (
          <Text style={styles.emptyText}>
            No dishes yet. Add a dish to get started.
          </Text>
        ) : (
          <FlatList
            data={dishes}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            renderItem={({ item }) => (
              <View style={styles.menuCard}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.menuName}>{item.name}</Text>
                  <Text style={styles.menuDesc}>{item.description}</Text>
                </View>
                <View style={{ alignItems: "flex-end" }}>
                  <Text style={styles.menuCourse}>{item.course}</Text>
                  <Text style={styles.menuPrice}>
                    R {item.price.toFixed(2)}
                  </Text>
                </View>
              </View>
            )}
          />
        )}

        <View style={styles.statsBox}>
          <Text style={styles.statsText}>Total Items: {total}</Text>
          <Text style={styles.statsText}>
            Average Price: R {average.toFixed(2)}
          </Text>
        </View>

        {role === "christoffel" ? (
          <>
            <TouchableOpacity
              style={styles.card}
              onPress={() =>
                router.push({
                  pathname: "/AddDishScreen",
                  params: {
                    role,
                    currentDishes: JSON.stringify(dishes), // pass current dishes
                  },
                })
              }
            >
              <Text style={styles.cardTitle}>Add Dish</Text>
              <Text style={styles.cardText}>Add new dishes to your menu.</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.card}
              onPress={() => router.push("/FilterScreen")}
            >
              <Text style={styles.cardTitle}>Filter Menu</Text>
              <Text style={styles.cardText}>
                View dishes by course (Starter, Main, Dessert).
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.card}
              onPress={() => router.push("/RemoveDishScreen")}
            >
              <Text style={styles.cardTitle}>Remove Dish</Text>
              <Text style={styles.cardText}>
                Delete dishes from the menu list.
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.card}
              onPress={() => router.push("/HelpScreen")}
            >
              <Text style={styles.cardTitle}>Help</Text>
              <Text style={styles.cardText}>
                Learn how to use the app and get assistance.
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.card, { backgroundColor: "rgba(220,20,60,0.3)" }]}
              onPress={handleReset}
            >
              <Text style={styles.cardTitle}>Reset Menu</Text>
              <Text style={styles.cardText}>
                Clear all dishes and start fresh.
              </Text>
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity
            style={styles.card}
            onPress={() => router.push("/HelpScreen")}
          >
            <Text style={styles.cardTitle}>Help</Text>
            <Text style={styles.cardText}>
              Learn how to use the app and get assistance.
            </Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1, resizeMode: "cover" },
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(0,0,0,0.6)" },
  container: { padding: 20, alignItems: "center", paddingTop: 80 },
  title: { fontSize: 32, fontWeight: "bold", textAlign: "center", marginBottom: 8, color: "#fff" },
  subtitle: { fontSize: 16, textAlign: "center", marginBottom: 20, color: "#ddd" },
  statsBox: { backgroundColor: "rgba(255,255,255,0.15)", borderRadius: 15, padding: 15, marginBottom: 20, width: "100%", alignItems: "center" },
  statsText: { fontSize: 16, color: "#fff", fontWeight: "600" },
  card: { backgroundColor: "rgba(123, 44, 191, 0.3)", borderRadius: 15, padding: 20, marginBottom: 15, width: "100%", shadowColor: "#7B2CBF", shadowOpacity: 0.5, shadowOffset: { width: 0, height: 0 }, shadowRadius: 10, elevation: 4 },
  cardTitle: { fontSize: 20, fontWeight: "700", marginBottom: 6, color: "#fff" },
  cardText: { fontSize: 14, color: "#ccc" },
  sectionTitle: { fontSize: 22, fontWeight: "700", color: "#fff", alignSelf: "flex-start", marginBottom: 10 },
  menuCard: { flexDirection: "row", backgroundColor: "rgba(255,255,255,0.1)", borderRadius: 10, padding: 15, marginBottom: 10, borderWidth: 1, borderColor: "rgba(255,255,255,0.2)" },
  menuName: { color: "#fff", fontWeight: "700", fontSize: 18, marginBottom: 4 },
  menuDesc: { color: "#ccc", fontSize: 13 },
  menuCourse: { color: "#fff", fontWeight: "600" },
  menuPrice: { color: "#ddd", fontSize: 14 },
  emptyText: { color: "#bbb", textAlign: "center", marginTop: 10 },
});
