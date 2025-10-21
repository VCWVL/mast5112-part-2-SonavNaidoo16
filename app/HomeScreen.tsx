import React, { useEffect, useState, useMemo } from "react"; 
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

const capitalize = (s: string) =>
  s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();

type Course = "Starter" | "Main" | "Dessert" | string;

type Dish = {
  id: string;
  name: string;
  description: string;
  course: Course;
  price: number;
};

const MenuItem: React.FC<{ item: Dish }> = ({ item }) => {
  return (
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
};

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

export default function HomeScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const role = params.role || "user";
  const initialDishes = params.dishes ? JSON.parse(params.dishes as string) : [];
  const [dishes, setDishes] = useState<Dish[]>(initialDishes);

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

  const menuSections = useMemo(() => {
    const grouped = dishes.reduce((acc, dish) => {
      const courseKey = capitalize(dish.course);
      if (!acc[courseKey]) {
        acc[courseKey] = [];
      }
      acc[courseKey].push(dish);
      return acc;
    }, {} as Record<Course, Dish[]>);

    return Object.entries(grouped).map(([title, items]) => ({
      title: title as Course,
      data: items,
    }));
  }, [dishes]);

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
  
  const handleLogout = () => {
    router.replace({
        pathname: "/", 
        params: {
            dishes: JSON.stringify(dishes), 
        },
    });
  };

  return (
    <ImageBackground
      source={{
        uri: "https://png.pngtree.com/thumb_back/fw800/background/20231230/pngtree-illustrated-vector-background-restaurant-menu-design-with-paper-texture-food-and-image_13914730.png",
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
          <View style={styles.menuListContainer}>
            {menuSections.map((section) => (
              <CourseSection
                key={section.title}
                title={section.title}
                dishes={section.data}
              />
            ))}
          </View>
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
                    currentDishes: JSON.stringify(dishes),
                  },
                })
              }
            >
              <Text style={styles.cardTitle}>Add Dish</Text>
              <Text style={styles.cardText}>Add new dishes to your menu.</Text>
            </TouchableOpacity>

            <TouchableOpacity
            style={styles.card}
            onPress={() =>
            router.push({
            pathname: "/RemoveDishScreen",
            params: {
            role,
            currentDishes: JSON.stringify(dishes),
            },
            })
            }
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
        
        <TouchableOpacity
          style={[styles.card, styles.logoutButton]}
          onPress={handleLogout}
        >
          <Text style={styles.logoutText}>LOGOUT</Text>
        </TouchableOpacity>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
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
  courseSection: {
    marginBottom: 25,
  },
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
  menuItemContainer: {
    marginBottom: 15, 
    paddingBottom: 5,
  },
  nameAndPriceRow: {
    flexDirection: "row",
    alignItems: "flex-end", 
  },
  dishName: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
    marginRight: 8, 
  },
  dottedLine: {
    flex: 1, 
    color: "#ccc",
    fontSize: 16,
    overflow: "hidden", 
    lineHeight: 10, 
    marginBottom: 4,
  },
  dishPrice: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8, 
  },
  dishDesc: {
    color: "#ccc",
    fontSize: 14,
    fontStyle: "italic",
    marginTop: 2, 
  },
  logoutButton: {
    backgroundColor: "rgba(52, 152, 219, 0.6)", 
    marginTop: 30,
    marginBottom: 40,
    alignItems: 'center', 
    padding: 15, 
  },
  logoutText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  statsText: { fontSize: 16, color: "#fff", fontWeight: "600" }, 
});