import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Linking,
  ActivityIndicator,
} from "react-native";

const API_KEY = "AIzaSyAwuRrLeMEG_JfwIe_oWgAHpy8zIBURQvM";

const PlaceDetailsScreen = ({ route }) => {
  const { placeId } = route.params;
  const [place, setPlace] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,formatted_address,formatted_phone_number,website,opening_hours,rating,user_ratings_total,price_level,reviews,photos&key=${API_KEY}`;
      const res = await fetch(url);
      const data = await res.json();
      if (data.status === "OK") setPlace(data.result);
      setLoading(false);
    };
    fetchDetails();
  }, [placeId]);

  if (loading) return <ActivityIndicator style={{ flex: 1 }} size="large" />;

  if (!place) return <Text>No details found</Text>;

  const getPriceSymbol = (level) => "₹".repeat(level || 0);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Cover image */}
      {place.photos?.[0]?.photo_reference && (
        <Image
          source={{
            uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=1200&photoreference=${place.photos[0].photo_reference}&key=${API_KEY}`,
          }}
          style={styles.coverImage}
        />
      )}

      {/* Title + Rating */}
      <View style={styles.headerCard}>
        <Text style={styles.title}>{place.name}</Text>
        <Text style={styles.address}>{place.formatted_address}</Text>
        <View style={styles.ratingRow}>
          <Text style={styles.rating}>
            ⭐ {place.rating} ({place.user_ratings_total} reviews)
          </Text>
          <Text style={styles.price}>{getPriceSymbol(place.price_level)}</Text>
        </View>
      </View>

      {place.opening_hours && (
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>
            {place.opening_hours.open_now ? "🟢 Open Now" : "🔴 Closed"}
          </Text>
          {place.opening_hours.weekday_text?.map((d, i) => (
            <Text key={i} style={styles.detailText}>
              {d}
            </Text>
          ))}
        </View>
      )}

      {place.reviews && (
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Top Reviews</Text>
          {place.reviews.slice(0, 3).map((r, i) => (
            <View key={i} style={styles.reviewBox}>
              <Text style={styles.reviewAuthor}>
                {r.author_name} ⭐{r.rating}
              </Text>
              <Text style={styles.reviewText}>{r.text}</Text>
            </View>
          ))}
        </View>
      )}

      <View style={styles.actionRow}>
        {place.website && (
          <TouchableOpacity
            onPress={() => Linking.openURL(place.website)}
            style={styles.actionBtn}
          >
            <Text style={styles.actionText}>🌐 Website</Text>
          </TouchableOpacity>
        )}
        {place.formatted_phone_number && (
          <TouchableOpacity
            onPress={() =>
              Linking.openURL(`tel:${place.formatted_phone_number}`)
            }
            style={styles.actionBtn}
          >
            <Text style={styles.actionText}>📞 Call</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          onPress={() =>
            Linking.openURL(
              `https://www.google.com/maps/search/?api=1&query_place_id=${placeId}`
            )
          }
          style={styles.actionBtn}
        >
          <Text style={styles.actionText}>📍 Directions</Text>
        </TouchableOpacity>
      </View>
      
      <TouchableOpacity style={styles.paymentBtn}>
        <Text style={styles.paymentText}>💳 Book / Pay</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default PlaceDetailsScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8f9fa" },
  coverImage: {
    width: "100%",
    height: 240,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerCard: {
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 16,
    marginHorizontal: 16,
    marginTop: -30,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  title: { fontSize: 22, fontWeight: "700", marginBottom: 4 },
  address: { fontSize: 14, color: "#666", marginBottom: 6 },
  ratingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  rating: { fontSize: 14, color: "#444" },
  price: { fontSize: 14, fontWeight: "600", color: "#28a745" },
  card: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginTop: 16,
    padding: 14,
    borderRadius: 16,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 5,
  },
  sectionTitle: { fontSize: 16, fontWeight: "600", marginBottom: 6 },
  detailText: { fontSize: 13, color: "#555", marginBottom: 2 },
  reviewBox: {
    backgroundColor: "#f1f3f6",
    padding: 10,
    borderRadius: 12,
    marginBottom: 10,
  },
  reviewAuthor: { fontWeight: "600", marginBottom: 4 },
  reviewText: { fontSize: 13, color: "#444" },
  actionRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 20,
    marginHorizontal: 16,
    justifyContent: "space-between",
  },
  actionBtn: {
    flex: 1,
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    borderRadius: 12,
    marginHorizontal: 4,
    marginBottom: 10,
    alignItems: "center",
  },
  actionText: { color: "#fff", fontSize: 14, fontWeight: "500" },
  paymentBtn: {
    backgroundColor: "#28a745",
    marginHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 14,
    marginTop: 20,
    marginBottom: 30,
    alignItems: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  paymentText: { color: "#fff", fontSize: 16, fontWeight: "700" },
});
