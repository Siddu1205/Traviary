// src/screens/ExploreScreen.js
import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  StyleSheet,
} from 'react-native';
import { TripContext } from '../components/TripContext';

const API_KEY = 'AIzaSyAwuRrLeMEG_JfwIe_oWgAHpy8zIBURQvM';

const ExploreScreen = ({ navigation }) => {
  const { trip } = useContext(TripContext);
  const endLocation = trip?.endLocation ?? '';

  const [places, setPlaces] = useState({
    hotels: [],
    restaurants: [],
    attractions: [],
  });
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('hotels'); // 🔹 NEW

  useEffect(() => {
    if (endLocation.trim()) {
      loadPlaces(endLocation.trim());
    }
  }, [endLocation]);

  const getCoordinates = async location => {
    try {
      const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        location,
      )}&key=${API_KEY}`;
      const res = await fetch(url);
      const data = await res.json();

      if (data.status === 'OK' && data.results.length > 0) {
        return data.results[0].geometry.location;
      } else {
        return null;
      }
    } catch (e) {
      return null;
    }
  };

  const fetchPlacesNearby = async (lat, lng, type) => {
    try {
      const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=8000&type=${type}&key=${API_KEY}`;
      const res = await fetch(url);
      const data = await res.json();

      if (data.status === 'OK') return data.results;
      else return [];
    } catch (e) {
      return [];
    }
  };

  const loadPlaces = async location => {
    setLoading(true);
    setPlaces({ hotels: [], restaurants: [], attractions: [] });

    const coords = await getCoordinates(location);
    if (!coords) {
      setLoading(false);
      Alert.alert('Error', 'Could not resolve location: ' + location);
      return;
    }

    const [hotels, restaurants, attractions] = await Promise.all([
      fetchPlacesNearby(coords.lat, coords.lng, 'lodging'),
      fetchPlacesNearby(coords.lat, coords.lng, 'restaurant'),
      fetchPlacesNearby(coords.lat, coords.lng, 'tourist_attraction'),
    ]);

    setPlaces({ hotels, restaurants, attractions });
    setLoading(false);
  };

  const renderCard = ({ item }) => {
    const photoRef = item.photos?.[0]?.photo_reference;
    const photo = photoRef
      ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=600&photoreference=${photoRef}&key=${API_KEY}`
      : null;

    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() =>
          navigation.navigate('PlaceDetails', { placeId: item.place_id })
        }
      >
        {photo ? (
          <Image source={{ uri: photo }} style={styles.cardImage} />
        ) : (
          <View style={styles.cardPlaceholder} />
        )}
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle} numberOfLines={2}>
            {item.name}
          </Text>
          <Text style={styles.cardAddress} numberOfLines={1}>
            {item.vicinity || item.formatted_address || ''}
          </Text>
          <Text style={styles.cardRating}>⭐ {item.rating ?? 'N/A'}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const currentData = places[activeTab] || [];

  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        Explore near {endLocation || 'your destination'}
      </Text>

      {/* 🔹 Top Tabs */}
      <View style={styles.tabContainer}>
        {['hotels', 'restaurants', 'attractions'].map(tab => (
          <TouchableOpacity
            key={tab}
            style={[styles.tabButton, activeTab === tab && styles.tabActive]}
            onPress={() => setActiveTab(tab)}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab && styles.tabTextActive,
              ]}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {loading ? (
        <ActivityIndicator size="large" style={{ marginTop: 20 }} />
      ) : currentData.length > 0 ? (
        <FlatList
          data={currentData}
          renderItem={renderCard}
          keyExtractor={i => i.place_id}
          contentContainerStyle={{ paddingVertical: 10 }}
        />
      ) : (
        <Text style={{ marginTop: 20, textAlign: 'center' }}>
          No places found for {activeTab} near "{endLocation}".
        </Text>
      )}
    </View>
  );
};

export default ExploreScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f9f9f9',
    paddingVertical: '50',
  },
  header: { fontSize: 20, fontWeight: '700', marginBottom: 12 },

  // 🔹 Tabs
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 12,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 6,
    elevation: 3,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
  },
  tabActive: {
    backgroundColor: '#007AFF',
  },
  tabText: { fontSize: 14, fontWeight: '600', color: '#555' },
  tabTextActive: { color: '#fff' },

  // 🔹 Card
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 4,
  },
  cardImage: { width: '100%', height: 180 },
  cardPlaceholder: {
    width: '100%',
    height: 180,
    backgroundColor: '#ddd',
  },
  cardContent: { padding: 12 },
  cardTitle: { fontWeight: '700', fontSize: 16, marginBottom: 4 },
  cardAddress: { fontSize: 13, color: '#555' },
  cardRating: { fontSize: 13, marginTop: 6, color: '#333' },
});
