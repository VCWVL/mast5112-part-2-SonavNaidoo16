import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useRouter } from "expo-router";

export default function LoginScreen() {
  const router = useRouter();
  const [selectedUser, setSelectedUser] = useState("user");

  const handleLogin = () => {
    router.push({
      pathname: "/HomeScreen",
      params: { role: selectedUser },
    });
  };

  return (
    <ImageBackground
      source={{ uri: "https://wallpaperaccess.com/full/460754.jpg" }}
      style={styles.background}
    >
      <View style={styles.overlay} />
      <View style={styles.container}>
        <Text style={styles.brand}>SSIK NOVA</Text>
        <Text style={styles.title}>Welcome</Text>

        <Text style={styles.label}>Select Login Type:</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedUser}
            style={styles.picker}
            onValueChange={(itemValue) => setSelectedUser(itemValue)}
          >
            <Picker.Item label="Christoffel (Chef)" value="christoffel" />
            <Picker.Item label="User" value="user" />
          </Picker>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.6)",
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
    borderColor: "#7B2CBF",
    marginBottom: 20,
    width: 250,
  },
  picker: {
    color: "#000000ff",
  },
  button: {
    backgroundColor: "#7B2CBF",
    paddingVertical: 14,
    paddingHorizontal: 80,
    borderRadius: 25,
    shadowColor: "#7B2CBF",
    shadowOpacity: 0.8,
    shadowRadius: 10,
  },
  buttonText: {
    color: "#ffffffff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
