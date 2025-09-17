import React, { useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { TripContext } from "../components/TripContext";

const TravelDetailsScreen = ({ navigation }) => {
  const { tripHistory, removeTrip, resetTrip } = useContext(TripContext);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>My Trips</Text>

      {tripHistory.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Image
            source={require("../images/suitcase.png")}
            style={styles.icon}
            resizeMode="contain"
          />
          <Text style={styles.emptyTitle}>No upcoming trips.</Text>
          <Text style={styles.emptySubtitle}>
            When you book a trip, you will see your trip details here.
          </Text>
          <TouchableOpacity
            style={styles.bookBtn}
            onPress={() => {
              resetTrip();
              navigation.navigate("UserDetails");
            }}
          >
            <Text style={styles.bookText}>Book a New Trip</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={tripHistory}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View style={styles.card}>
              <Text style={styles.title}>{item.endLocation || "Unknown"}</Text>
              <Text style={styles.label}>Date</Text>
              <Text style={styles.date}>
                {item.startDate || "?"} to {item.endDate || "?"}
              </Text>

              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => removeTrip(index)}
              >
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
};

export default TravelDetailsScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F9FAFB", padding: wp("4%") },
  header: {
    fontSize: wp("5%"),
    fontWeight: "600",
    color: "#334155",
    marginBottom: hp("3%"),
    marginTop: hp("4%"),
  },
  card: {
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: wp("3%"),
    padding: wp("4%"),
    marginBottom: hp("2%"),
    backgroundColor: "#fff",
  },
  title: { fontSize: wp("5%"), fontWeight: "600", color: "#1E293B" },
  label: { marginTop: hp("1%"), color: "gray", fontSize: wp("3.5%") },
  date: { fontSize: wp("4%"), color: "#111827", marginBottom: hp("1.5%") },
  cancelBtn: {
    borderWidth: 1,
    borderColor: "#2563EB",
    borderRadius: wp("2%"),
    paddingVertical: hp("1%"),
    paddingHorizontal: wp("4%"),
    alignSelf: "flex-start",
  },
  cancelText: { color: "#2563EB", fontSize: wp("3.5%") },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: wp("6%"),
  },
  icon: { width: wp("20%"), height: wp("20%"), marginBottom: hp("2%") },
  emptyTitle: {
    fontSize: wp("4.5%"),
    fontWeight: "600",
    color: "#1E293B",
    marginBottom: hp("1%"),
  },
  emptySubtitle: {
    fontSize: wp("3.5%"),
    color: "#6B7280",
    textAlign: "center",
    marginBottom: hp("3%"),
  },
  bookBtn: {
    backgroundColor: "#2563EB",
    borderRadius: wp("2%"),
    paddingVertical: hp("1.2%"),
    paddingHorizontal: wp("6%"),
  },
  bookText: { color: "#fff", fontSize: wp("3.8%"), fontWeight: "600" },
});
