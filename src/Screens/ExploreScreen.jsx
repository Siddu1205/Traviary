import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
  StyleSheet,
} from 'react-native';
import { TripContext } from '../components/TripContext';

const API_KEY = 'AIzaSyAwuRrLeMEG_JfwIe_oWgAHpy8zIBURQvM';

const ExploreScreen = ({ navigation }) => {
  const { trip } = useContext(TripContext);
  const [places, setPlaces] = useState({
    hotels: [],
    restaurants: [],
    attractions: [],
    cities: [],
  });
  const [activeTab, setActiveTab] = useState('hotels');
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  let typingTimeout; // debounce reference

  const fetchCoordinates = async location => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${API_KEY}`,
      );
      const data = await response.json();
      if (data.results && data.results[0]) {
        return data.results[0].geometry.location;
      }
      return null;
    } catch (e) {
      console.error('Geocoding error:', e);
      return null;
    }
  };

  const fetchPlaces = async (coords, type) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${coords.lat},${coords.lng}&radius=3000&type=${type}&key=${API_KEY}`,
      );
      const data = await response.json();
      return data.results || [];
    } catch (e) {
      console.error('Nearby fetch error:', e);
      return [];
    }
  };

  const fetchPlacesByQuery = async query => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query}&key=${API_KEY}`,
      );
      const data = await response.json();
      return data.results || [];
    } catch (e) {
      console.error('Text search error:', e);
      return [];
    }
  };

  const loadTrending = async () => {
    setLoading(true);
    const trendingCities = ['Delhi', 'Mumbai', 'Bangalore', 'Goa', 'Jaipur'];
    const trendingHotels = await fetchPlacesByQuery('best hotels in India');
    const trendingAttractions = await fetchPlacesByQuery(
      'famous attractions in India',
    );

    setPlaces({
      hotels: trendingHotels,
      restaurants: [],
      attractions: trendingAttractions,
      cities: trendingCities,
    });
    setActiveTab('hotels');
    setLoading(false);
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    setLoading(true);
    try {
      const coords = await fetchCoordinates(searchQuery.trim());
      if (coords) {
        const [hotels, restaurants, attractions] = await Promise.all([
          fetchPlaces(coords, 'lodging'),
          fetchPlaces(coords, 'restaurant'),
          fetchPlaces(coords, 'tourist_attraction'),
        ]);
        setPlaces({ hotels, restaurants, attractions, cities: [] });
        setActiveTab('hotels');
      } else {
        const results = await fetchPlacesByQuery(searchQuery.trim());
        setPlaces({
          hotels: [],
          restaurants: [],
          attractions: results,
          cities: [],
        });
        setActiveTab('attractions');
      }
    } catch (e) {
      console.error('Search error:', e);
    }
    setLoading(false);
  };

  // Initial load with trip endLocation
  useEffect(() => {
    if (trip?.endLocation?.trim()) {
      setSearchQuery(trip.endLocation.trim());
      handleSearch();
    } else {
      loadTrending();
    }
  }, [trip?.endLocation]);

  // Debounced search effect
  useEffect(() => {
    if (!searchQuery.trim()) return;
    clearTimeout(typingTimeout);
    typingTimeout = setTimeout(() => {
      handleSearch();
    }, 800); // 600ms debounce
    return () => clearTimeout(typingTimeout);
  }, [searchQuery]);

  const renderPlaceItem = ({ item }) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('PlaceDetails', { placeId: item.place_id })
      }
      style={styles.card}
    >
      {item.photos?.[0] ? (
        <Image
          source={{
            uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${item.photos[0].photo_reference}&key=${API_KEY}`,
          }}
          style={styles.image}
        />
      ) : (
        <View style={[styles.image, styles.placeholder]} />
      )}
      <View style={styles.cardContent}>
        <Text style={styles.placeName}>{item.name}</Text>
        <Text style={styles.placeAddress}>
          {item.formatted_address || item.vicinity}
        </Text>
        <Text style={styles.placeRating}>⭐ {item.rating || 'N/A'}</Text>
      </View>
    </TouchableOpacity>
  );

  if (loading)
    return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;

  return (
    <View style={{ flex: 1, padding: 10, marginTop: 40 }}>
      <View style={styles.searchContainer}>
        <TextInput
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search city, restaurant, or attraction..."
          style={styles.searchInput}
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={{ color: 'white' }}>Search</Text>
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        {['hotels', 'restaurants', 'attractions'].map(tab => (
          <TouchableOpacity
            key={tab}
            onPress={() => setActiveTab(tab)}
            style={[styles.tab, activeTab === tab && styles.activeTab]}
          >
            <Text
              style={activeTab === tab ? styles.activeTabText : styles.tabText}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Results */}
      {places[activeTab]?.length > 0 ? (
        <FlatList
          data={places[activeTab]}
          renderItem={renderPlaceItem}
          keyExtractor={(item, index) => item.place_id || index.toString()}
        />
      ) : (
        <Text style={{ textAlign: 'center', marginTop: 50, color: '#555' }}>
          No results found
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginRight: 5,
  },
  searchButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 15,
    justifyContent: 'center',
    borderRadius: 8,
  },
  tabs: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: '#007AFF',
  },
  tabText: { color: '#555' },
  activeTabText: { color: '#007AFF', fontWeight: 'bold' },
  card: {
    flexDirection: 'row',
    marginVertical: 5,
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 2,
  },
  image: { width: 100, height: 100 },
  placeholder: { backgroundColor: '#eee' },
  cardContent: { flex: 1, padding: 8 },
  placeName: { fontSize: 16, fontWeight: 'bold' },
  placeAddress: { fontSize: 12, color: '#555' },
  placeRating: { fontSize: 12, marginTop: 5 },
});

export default ExploreScreen;
