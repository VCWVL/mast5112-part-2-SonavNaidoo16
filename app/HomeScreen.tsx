import React, { useEffect, useRef, useState, useMemo } from "react";
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  Alert,
  Animated,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

// Helper function: capitalizes the first letter of a word
const capitalize = (s: string) =>
  s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();

// Define allowed course types
type Course = "Starter" | "Main" | "Dessert" | string;

// Dish object type definition
type Dish = {
  id: string;
  name: string;
  description: string;
  course: Course;
  price: number;
};

// --- COMPONENT: MenuItem ---
// Displays a single dish item with name, dotted line, price, and description
const MenuItem: React.FC<{ item: Dish }> = ({ item }) => (
  <View style={styles.menuItemContainer}>
    <View style={styles.nameAndPriceRow}>
      <Text style={styles.dishName}>{item.name}</Text>
      <Text style={styles.dottedLine} numberOfLines={1}>
        ........................................................
      </Text>
      <Text style={styles.dishPrice}>R {item.price.toFixed(2)}</Text>
    </View>
    <Text style={styles.dishDesc}>{item.description}</Text>
  </View>
);

// --- COMPONENT: CourseSection ---
// Displays a section (e.g., Starters, Mains, Desserts) and all dishes under it
const CourseSection: React.FC<{ title: Course; dishes: Dish[] }> = ({
  title,
  dishes,
}) => (
  <View style={styles.courseSection}>
    <Text style={styles.courseTitle}>{title.toUpperCase()}</Text>
    {dishes.map((dish) => (
      <MenuItem key={dish.id} item={dish} />
    ))}
  </View>
);

// --- MAIN COMPONENT: HomeScreen ---
export default function HomeScreen() {
  const router = useRouter(); // Used for navigation between pages
  const params = useLocalSearchParams(); // Get parameters passed from previous screens

  // Get user role and dishes passed via navigation params
  const role = params.role || "user";
  const initialDishes = params.dishes ? JSON.parse(params.dishes as string) : [];

  // State to store list of dishes
  const [dishes, setDishes] = useState<Dish[]>(initialDishes);

  // --- Fade animation for smooth screen transition ---
  const fadeAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    // Fade in when component mounts
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();

    // Fade out when component unmounts
    return () => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }).start();
    };
  }, []);

  // --- Individual button scale animations (for press effects) ---
  const addScale = useRef(new Animated.Value(1)).current;
  const removeScale = useRef(new Animated.Value(1)).current;
  const helpScale = useRef(new Animated.Value(1)).current;
  const resetScale = useRef(new Animated.Value(1)).current;
  const logoutScale = useRef(new Animated.Value(1)).current;

  // Map of all button animation references for convenience
  const buttonScales = {
    add: addScale,
    remove: removeScale,
    help: helpScale,
    reset: resetScale,
    logout: logoutScale,
  };

  // Shrinks button when pressed in
  const pressIn = (anim: Animated.Value) => {
    Animated.spring(anim, { toValue: 0.95, useNativeDriver: true }).start();
  };

  // Restores button size when released
  const pressOut = (anim: Animated.Value) => {
    Animated.spring(anim, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  // --- Handle Reset: Clears all dishes from menu ---
  const handleReset = () => {
    Alert.alert("Reset Menu", "Are you sure you want to clear all dishes?", [
      { text: "Cancel", style: "cancel" },
      { text: "Yes", onPress: () => setDishes([]) },
    ]);
  };

  // --- Handle Logout: Fades out then navigates back to login ---
  const handleLogout = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 400,
      useNativeDriver: true,
    }).start(() => {
      router.replace({
        pathname: "/",
        params: { dishes: JSON.stringify(dishes) },
      });
    });
  };

  // --- Group dishes by course (Starter, Main, Dessert) ---
  const menuSections = useMemo(() => {
    const grouped = dishes.reduce((acc, dish) => {
      const courseKey = capitalize(dish.course);
      if (!acc[courseKey]) acc[courseKey] = [];
      acc[courseKey].push(dish);
      return acc;
    }, {} as Record<Course, Dish[]>);

    // Return array of course sections
    return Object.entries(grouped).map(([title, items]) => ({
      title: title as Course,
      data: items,
    }));
  }, [dishes]);

  // --- Calculate total dishes and average price ---
  const total = dishes.length;
  const average = total
    ? dishes.reduce((sum, d) => sum + d.price, 0) / total
    : 0;

  // --- Render Screen UI ---
  return (
    // Animated fade wrapper for smooth transitions
    <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
      <ImageBackground
        source={{
          uri: "https://png.pngtree.com/thumb_back/fw800/background/20231230/pngtree-illustrated-vector-background-restaurant-menu-design-with-paper-texture-food-and-image_13914730.png",
        }}
        style={styles.background}
      >
        {/* Dark overlay for readability */}
        <View style={styles.overlay} />

        <ScrollView contentContainerStyle={styles.container}>
          {/* App Title and Logged-in Role */}
          <Text style={styles.title}>Christoffel’s Menu</Text>
          <Text style={styles.subtitle}>
            Logged in as: {role === "christoffel" ? "Christoffel (Chef)" : "User"}
          </Text>

          {/* Menu Header */}
          <Text style={[styles.sectionTitle, { marginTop: 20 }]}>Current Menu</Text>

          {/* Display message when no dishes are added */}
          {dishes.length === 0 ? (
            <Text style={styles.emptyText}>
              No dishes yet. Add a dish to get started.
            </Text>
          ) : (
            <View style={styles.menuListContainer}>
              {/* Render all grouped course sections */}
              {menuSections.map((section) => (
                <CourseSection
                  key={section.title}
                  title={section.title}
                  dishes={section.data}
                />
              ))}
            </View>
          )}

          {/* Menu Statistics */}
          <View style={styles.statsBox}>
            <Text style={styles.statsText}>Total Items: {total}</Text>
            <Text style={styles.statsText}>
              Average Price: R {average.toFixed(2)}
            </Text>
          </View>

          {/* --- Buttons for Chef (Christoffel) --- */}
          {role === "christoffel" ? (
            <>
              {/* Add Dish Button */}
              <TouchableWithoutFeedback
                onPressIn={() => pressIn(buttonScales.add)}
                onPressOut={() => pressOut(buttonScales.add)}
                onPress={() =>
                  router.push({
                    pathname: "/AddDishScreen",
                    params: { role, currentDishes: JSON.stringify(dishes) },
                  })
                }
              >
                <Animated.View
                  style={[styles.card, { transform: [{ scale: buttonScales.add }] }]}
                >
                  <Text style={styles.cardTitle}>Add Dish</Text>
                  <Text style={styles.cardText}>Add new dishes to your menu.</Text>
                </Animated.View>
              </TouchableWithoutFeedback>

              {/* Remove Dish Button */}
              <TouchableWithoutFeedback
                onPressIn={() => pressIn(buttonScales.remove)}
                onPressOut={() => pressOut(buttonScales.remove)}
                onPress={() =>
                  router.push({
                    pathname: "/RemoveDishScreen",
                    params: { role, currentDishes: JSON.stringify(dishes) },
                  })
                }
              >
                <Animated.View
                  style={[styles.card, { transform: [{ scale: buttonScales.remove }] }]}
                >
                  <Text style={styles.cardTitle}>Remove Dish</Text>
                  <Text style={styles.cardText}>
                    Delete dishes from the menu list.
                  </Text>
                </Animated.View>
              </TouchableWithoutFeedback>

              {/* Help Button */}
              <TouchableWithoutFeedback
                onPressIn={() => pressIn(buttonScales.help)}
                onPressOut={() => pressOut(buttonScales.help)}
                onPress={() => router.push("/HelpScreen")}
              >
                <Animated.View
                  style={[styles.card, { transform: [{ scale: buttonScales.help }] }]}
                >
                  <Text style={styles.cardTitle}>Help</Text>
                  <Text style={styles.cardText}>
                    Learn how to use the app and get assistance.
                  </Text>
                </Animated.View>
              </TouchableWithoutFeedback>

              {/* Reset Menu Button */}
              <TouchableWithoutFeedback
                onPressIn={() => pressIn(buttonScales.reset)}
                onPressOut={() => pressOut(buttonScales.reset)}
                onPress={handleReset}
              >
                <Animated.View
                  style={[
                    styles.card,
                    {
                      backgroundColor: "rgba(220,20,60,0.3)",
                      transform: [{ scale: buttonScales.reset }],
                    },
                  ]}
                >
                  <Text style={styles.cardTitle}>Reset Menu</Text>
                  <Text style={styles.cardText}>
                    Clear all dishes and start fresh.
                  </Text>
                </Animated.View>
              </TouchableWithoutFeedback>
            </>
          ) : (
            // --- For Regular Users: Only Show Help Button ---
            <TouchableWithoutFeedback
              onPressIn={() => pressIn(buttonScales.help)}
              onPressOut={() => pressOut(buttonScales.help)}
              onPress={() => router.push("/HelpScreen")}
            >
              <Animated.View
                style={[styles.card, { transform: [{ scale: buttonScales.help }] }]}
              >
                <Text style={styles.cardTitle}>Help</Text>
                <Text style={styles.cardText}>
                  Learn how to use the app and get assistance.
                </Text>
              </Animated.View>
            </TouchableWithoutFeedback>
          )}

          {/* --- Logout Button (Visible to all) --- */}
          <TouchableWithoutFeedback
            onPressIn={() => pressIn(buttonScales.logout)}
            onPressOut={() => pressOut(buttonScales.logout)}
            onPress={handleLogout}
          >
            <Animated.View
              style={[
                styles.card,
                styles.logoutButton,
                { transform: [{ scale: buttonScales.logout }] },
              ]}
            >
              <Text style={styles.logoutText}>LOGOUT</Text>
            </Animated.View>
          </TouchableWithoutFeedback>
        </ScrollView>
      </ImageBackground>
    </Animated.View>
  );
}

// --- STYLES ---
const styles = StyleSheet.create({
  background: { flex: 1, resizeMode: "cover" }, // Full-screen background image
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(0,0,0,0.6)" },
  container: { padding: 20, alignItems: "center", paddingTop: 80 },
  title: { fontSize: 32, fontWeight: "bold", textAlign: "center", marginBottom: 8, color: "#fff" },
  subtitle: { fontSize: 16, textAlign: "center", marginBottom: 20, color: "#ddd" },
  statsBox: {
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
    width: "100%",
    alignItems: "center",
  },
  card: {
    backgroundColor: "rgba(201, 68, 27, 0.3)",
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    width: "100%",
    shadowColor: "#bf672cff",
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 10,
    elevation: 4,
  },
  cardTitle: { fontSize: 20, fontWeight: "700", marginBottom: 6, color: "#fff" },
  cardText: { fontSize: 14, color: "#ccc" },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#fff",
    alignSelf: "flex-start",
    marginBottom: 10,
  },
  emptyText: { color: "#bbb", textAlign: "center", marginTop: 10 },
  menuListContainer: {
    width: "100%",
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  courseSection: { marginBottom: 25 },
  courseTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#bf672cff",
    marginBottom: 10,
    marginTop: 5,
    borderBottomWidth: 2,
    borderBottomColor: "#bf672cff",
    paddingBottom: 5,
  },
  menuItemContainer: { marginBottom: 15, paddingBottom: 5 },
  nameAndPriceRow: { flexDirection: "row", alignItems: "flex-end" },
  dishName: { color: "#fff", fontWeight: "600", fontSize: 16, marginRight: 8 },
  dottedLine: { flex: 1, color: "#ccc", fontSize: 16, overflow: "hidden", lineHeight: 10, marginBottom: 4 },
  dishPrice: { color: "#fff", fontSize: 16, fontWeight: "600", marginLeft: 8 },
  dishDesc: { color: "#ccc", fontSize: 14, fontStyle: "italic", marginTop: 2 },
  logoutButton: {
    backgroundColor: "rgba(52, 152, 219, 0.6)",
    marginTop: 30,
    marginBottom: 40,
    alignItems: "center",
    padding: 15,
  },
  logoutText: { fontSize: 18, fontWeight: "bold", color: "#fff" },
  statsText: { fontSize: 16, color: "#fff", fontWeight: "600" },
});
