import React, { useEffect, useState, useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { TripContext } from "../components/TripContext";

const ProfileScreen = ({ navigation }) => {
  const { tripHistory } = useContext(TripContext);
  const [user, setUser] = useState(null);

  const latestTrip = tripHistory[tripHistory.length - 1];

  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("user");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (e) {
        console.log("Error loading user", e);
      }
    };
    loadUser();
  }, []);

  const handleLogout = () => {
    Alert.alert(
      "Oh no! You’re leaving...",
      "Are you sure?",
      [
        { text: "No" },
        { text: "Yes, Log Me Out", onPress: () => navigation.replace("Login") },
      ]
    );
  };

  return (
    <View style={styles.container}>
      
      <View style={styles.profileBox}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {user?.username ? user.username[0].toUpperCase() : "G"}
          </Text>
        </View>
        <Text style={styles.name}>{user?.username || "Guest User"}</Text>
        <Text style={styles.email}>{user?.email || "No email saved"}</Text>
      </View>

      
      {latestTrip ? (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Latest Trip</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Destination:</Text>
            <Text style={styles.value}>{latestTrip.endLocation || "Not planned yet"}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Travel Assistance:</Text>
            <Text style={styles.value}>{latestTrip.assistance || "Not Required"}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Date:</Text>
            <Text style={styles.value}>
              {latestTrip.startDate} → {latestTrip.endDate}
            </Text>
          </View>
        </View>
      ) : (
        <Text style={styles.noTrip}>No trips booked yet.</Text>
      )}

      
      <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    padding: wp("5%"),
  },
  profileBox: {
    alignItems: "center",
    marginTop: hp("4%"),
    marginBottom: hp("3%"),
  },
  avatar: {
    width: wp("20%"),
    height: wp("20%"),
    borderRadius: wp("10%"),
    backgroundColor: "#3B82F6",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: hp("1.5%"),
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  avatarText: {
    fontSize: wp("8%"),
    color: "#fff",
    fontWeight: "700",
  },
  name: {
    fontSize: wp("6%"),
    fontWeight: "700",
    color: "#111827",
  },
  email: {
    fontSize: wp("4%"),
    color: "#6B7280",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: wp("3%"),
    padding: wp("5%"),
    marginVertical: hp("2%"),
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 3,
  },
  cardTitle: {
    fontSize: wp("5%"),
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: hp("1%"),
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: hp("0.5%"),
  },
  label: {
    fontSize: wp("4%"),
    fontWeight: "600",
    color: "#374151",
  },
  value: {
    fontSize: wp("4%"),
    color: "#111827",
  },
  noTrip: {
    marginTop: hp("2%"),
    fontSize: wp("4%"),
    color: "gray",
    textAlign: "center",
  },
  logoutBtn: {
    marginTop: "auto",
    backgroundColor: "#EF4444",
    paddingVertical: hp("2%"),
    borderRadius: wp("3%"),
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  logoutText: {
    color: "#fff",
    fontSize: wp("5%"),
    fontWeight: "700",
  },
});
