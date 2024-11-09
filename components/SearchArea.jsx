import { Text, View, TouchableOpacity, StyleSheet, TextInput, FlatList, Animated, ActivityIndicator } from 'react-native';
import React, { useContext, useState, useEffect } from 'react';
import Icon, { Icons } from './Icons';
import Popup from './Popup';
import { UserContext } from '../context/UserContext';

const SearchArea = () => {
  const { currentUser } = useContext(UserContext);
  const [visible, setVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [fadeAnim] = useState(new Animated.Value(0)); // For fade-in animation
  const [filteredData, setFilteredData] = useState([]); // Store filtered search results
  const [loading, setLoading] = useState(false); // Show loading indicator while searching

  const sampleData = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6', 'Item 7']; // Example data for search results

  // Debounce timeout ID
  const [debounceTimeout, setDebounceTimeout] = useState(null);

  // Handle search text changes with debouncing
  const handleSearchChange = (text) => {
    setSearchText(text);

    // Clear the previous timeout if any
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    // Set a new timeout to filter data after the user stops typing for 300ms
    const timeout = setTimeout(() => {
      setLoading(true); // Show loading indicator
      const results = sampleData.filter(item =>
        item.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredData(results);
      setLoading(false); // Hide loading indicator
    }, 300);

    setDebounceTimeout(timeout); // Store timeout ID to clear it on next change
  };

  const openPopup = () => {
    setVisible(true);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closePopup = () => {
    setVisible(false);
    setSearchText('');
    setFilteredData([]); // Clear filtered data on close
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const handleItemPress = (item) => {
    // Handle what happens when an item is pressed. For example, navigate to another screen.
    console.log('Take me to:', item);
  };

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.locationLabel}>Location</Text>
        <Text style={styles.locationText}>{currentUser?.address}</Text>

        <View style={styles.searchRow}>
          <View style={styles.searchBox}>
            <Icon type={Icons.AntDesign} name="search1" size={24} color="white" />
          </View>

          <TouchableOpacity style={styles.filterButton} onPress={openPopup}>
            <Icon type={Icons.Entypo} name="sound-mix" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Popup Component */}
      <Popup visible={visible} dismiss={closePopup}>
        <View style={styles.popupContent}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search..."
            placeholderTextColor="#A2A2A2"
            value={searchText}
            onChangeText={handleSearchChange} // Use debounced search function
            autoFocus
          />

          {/* Display search results dynamically */}
          <Animated.View style={[styles.resultsContainer, { opacity: fadeAnim }]}>
            {loading ? (
              <ActivityIndicator size="large" color="#FF6F00" />
            ) : (
              <FlatList
                data={filteredData}
                renderItem={({ item }) => (
                  <View style={styles.resultItemContainer}>
                    <Text style={styles.resultItem}>{item}</Text>
                    <TouchableOpacity onPress={() => handleItemPress(item)} style={styles.takeMeToButton}>
                      <Icon type={Icons.MaterialCommunityIcons} name="arrow-right-circle" size={24} color="#FF6F00" />
                    </TouchableOpacity>
                  </View>
                )}
                keyExtractor={(item, index) => index.toString()}
                showsVerticalScrollIndicator={false}
              />
            )}
          </Animated.View>
        </View>
      </Popup>
    </View>
  );
};

export default SearchArea;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#222222',
    paddingBottom: 24,
  },
  innerContainer: {
    width: '90%',
    paddingTop: 32,
  },
  locationLabel: {
    color: '#A2A2A2',
    fontSize: 14,
    fontFamily: 'Sora-Regular',
  },
  locationText: {
    color: 'white',
    fontFamily: 'Sora-Regular',
    marginTop: 4,
  },
  searchRow: {
    width: '100%',
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  searchBox: {
    flex: 1,
    height: 56,
    paddingHorizontal: 16,
    backgroundColor: '#2A2A2A',
    borderRadius: 20,
    justifyContent: 'center',
  },
  filterButton: {
    width: 56,
    height: 56,
    backgroundColor: '#FF6F00',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 16,
  },
  popupContent: {
    width: '100%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    maxHeight: 400,
  },
  searchInput: {
    width: '100%',
    height: 50,
    backgroundColor: '#f1f1f1',
    borderRadius: 25,
    paddingHorizontal: 20,
    fontSize: 16,
    color: '#333',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  resultsContainer: {
    width: '100%',
    maxHeight: 250,
    paddingTop: 3,
  },
  resultItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  resultItem: {
    fontSize: 16,
    color: '#333',
  },
  takeMeToButton: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
