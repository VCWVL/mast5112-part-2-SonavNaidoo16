import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Alert,
  ImageBackground,
} from "react-native";

type Dish = {
  id: string;
  name: string;
  description: string;
  course: string;
  price: number;
};

export default function RemoveDishScreen({ dishes = [], setDishes = () => {} }: any) {
  const [selected, setSelected] = useState<string | null>(null);

  const handleRemove = (id: string) => {
    Alert.alert("Confirm Delete", "Are you sure you want to remove this dish?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Yes",
        onPress: () => {
          const updated = dishes.filter((dish: Dish) => dish.id !== id);
          setDishes(updated);
          setSelected(null);
          Alert.alert("Success", "Dish removed successfully!");
        },
      },
    ]);
  };

  return (
    <ImageBackground
      source={{
        uri: "https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=1000&q=80",
      }}
      style={styles.background}
    >
      <View style={styles.overlay} />
      <View style={styles.container}>
        <Text style={styles.title}>Remove Dish</Text>

        {dishes.length === 0 ? (
          <Text style={styles.emptyText}>No dishes available.</Text>
        ) : (
          <FlatList
            data={dishes}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.card,
                  selected === item.id && { backgroundColor: "rgba(220,20,60,0.4)" },
                ]}
                onPress={() => handleRemove(item.id)}
              >
                <Text style={styles.cardTitle}>{item.name}</Text>
                <Text style={styles.cardText}>{item.description}</Text>
                <Text style={styles.cardPrice}>R {item.price.toFixed(2)}</Text>
              </TouchableOpacity>
            )}
          />
        )}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 70,
  },
  title: {
    fontSize: 28,
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "rgba(123,44,191,0.3)",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  cardText: {
    color: "#ddd",
  },
  cardPrice: {
    color: "#bbb",
    fontSize: 14,
  },
  emptyText: {
    color: "#ccc",
    textAlign: "center",
  },
});