import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useRouter, useLocalSearchParams } from "expo-router";

type Dish = {
  id: string;
  name: string;
  description: string;
  course: "Starter" | "Main" | "Dessert" | string;
  price: number;
};

export default function AddDishScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const role = params.role || "user";

  const initialDishes = params.currentDishes
    ? JSON.parse(params.currentDishes as string)
    : [];

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [course, setCourse] = useState<"Starter" | "Main" | "Dessert" | "">("");
  const [price, setPrice] = useState("");

  const handleAddDish = () => {
    if (!name || !description || !course || !price) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    const newDish: Dish = {
      id: Date.now().toString(),
      name,
      description,
      course,
      price: parseFloat(price),
    };

    Alert.alert("Success", "Dish added successfully!");

    const updatedDishes = [...initialDishes, newDish];

    router.replace({
      pathname: "/HomeScreen",
      params: {
        role,
        dishes: JSON.stringify(updatedDishes),
      },
    });
  };

  return (
    <ImageBackground
      source={{
        uri: "https://img.freepik.com/premium-photo/food-banner-vegetables-spices-top-view-free-copy-space_187166-5816.jpg",
      }}
      style={styles.background}
    >
      <View style={styles.overlay} />
      <View style={styles.container}>
        <Text style={styles.title}>Add New Dish</Text>

        <TextInput
          style={styles.input}
          placeholder="Dish Name"
          placeholderTextColor="#aaa"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Description"
          placeholderTextColor="#aaa"
          value={description}
          onChangeText={setDescription}
        />

        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={course}
            dropdownIconColor="#000000ff"
            onValueChange={(value) => setCourse(value)}
            style={styles.picker}
          >
            <Picker.Item label="Select Course" value="" color="#000000ff" />
            <Picker.Item label="Starter" value="Starter" color="#000000ff" />
            <Picker.Item label="Main" value="Main" color="#000000ff" />
            <Picker.Item label="Dessert" value="Dessert" color="#000000ff" />
          </Picker>
        </View>

        <TextInput
          style={styles.input}
          placeholder="Price (R)"
          placeholderTextColor="#aaa"
          keyboardType="numeric"
          value={price}
          onChangeText={setPrice}
        />

        <TouchableOpacity style={styles.button} onPress={handleAddDish}>
          <Text style={styles.buttonText}>Add Dish</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1, resizeMode: "cover", justifyContent: "center" },
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(0,0,0,0.6)" },
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  title: { fontSize: 28, color: "#fff", fontWeight: "bold", marginBottom: 20 },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#2c84bfff",
    backgroundColor: "rgba(255,255,255,0.1)",
    color: "#fff",
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
  },
  pickerContainer: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#2c84bfff",
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 10,
    marginBottom: 15,
    overflow: "hidden",
  },
  picker: {
    color: "#000000ff",
  },
  button: {
    backgroundColor: "#2c84bfff",
    paddingVertical: 14,
    paddingHorizontal: 80,
    borderRadius: 25,
  },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
});
