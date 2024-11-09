import React, { useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView, FlatList, View, Text, Image, TouchableOpacity, StatusBar, StyleSheet } from "react-native";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useNavigation } from 'expo-router';
import { useGlobalContext } from '../../context/GlobalProvider';
import { UserContext } from '../../context/UserContext';
import { productsList } from '../../assets/PRODUCTS';
import SearchArea from '../../components/SearchArea';
import Banner from '../../components/Banner';
import { router } from "expo-router";
import MapView from 'react-native-maps';

const Home = () => { 
    const { isLogged, user } = useGlobalContext();
    const [token, setToken] = useState('');
    const navigation = useNavigation();
    const products = productsList;

    // Your image URL or local image path
    const imageUrl = require('../../assets/images/1.png'); // Local image example
    
    useEffect(() => {
        const fetchToken = async () => {
            const accessToken = await AsyncStorage.getItem('access_token');
            setToken(accessToken);
        };
        fetchToken();
    }, []);

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaView style={styles.safeArea}>
                <StatusBar barStyle="light-content" backgroundColor="#222222" />
                <FlatList
                    ListHeaderComponent={() => (
                        <View>
                            <SearchArea />
                            <Banner />
                            {/* Map displayed below SearchArea and Banner */}
                            
                        </View>
                         
                    )}
                    data={products}
                    keyExtractor={(item, index) => index.toString()}
                    numColumns={2}
                    renderItem={({ item }) => (
                        <View style={styles.productContainer}>
                            <TouchableOpacity
                                onPress={() => {
                                    router.push({
                                        pathname: 'addressDetails',
                                        params: { address: "address" },
                                    });
                                }}
                            >
                                {/* Image style adjustment */}
                                <Image
                                    source={imageUrl}
                                    style={styles.productImage}
                                    resizeMode="cover" // Ensures the image covers the area proportionally
                                />
                            </TouchableOpacity>

                            <Text style={styles.productTitle}>{item.name}</Text>
                            <Text style={styles.productTeam}>{item.team}</Text>
                        </View>
                    )}
                    ListFooterComponent={() => (
                        <MapView
                        style={styles.map}
                        initialRegion={{
                            latitude: 50.8503, // Latitude of Belgium's center
                            longitude: 4.3517, // Longitude of Belgium's center
                            latitudeDelta: 4.0, // Adjust this to zoom in or out
                            longitudeDelta: 4.0, // Adjust this to zoom in or out
                        }}
                    />
                      )}
                    
                />
            </SafeAreaView>
        </GestureHandlerRootView>
    );
};

export default Home;

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        padding: 10,
    },
    productContainer: {
        flex: 1,
        margin: 5,
        borderRadius: 10,
        backgroundColor: '#fff',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    productImage: {
        width: '80%', // Makes the image take the full width of the card
        height: 150, // Fixed height for consistency across cards
        borderRadius: 10, 
        overflow: 'hidden', // Ensures the image stays within the card's rounded corners
    },
    productTitle: {
        marginTop: 10,
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
    },
    productTeam: {
        fontSize: 14,
        color: '#555',
        textAlign: 'center',
    },
    titleText: {
        fontSize: 24,
        fontWeight: '700',
        textAlign: 'center',
        marginVertical: 20,
    },
    map: {
        width: '100%',
        height: 500, // Adjust the height of the map as needed
        marginTop: 20, // Optional, adds space before the map
    }
});
