import React, { useContext, useEffect, useState } from 'react';
import ScreenWrapper from '../../components/ScreenWrapper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useGlobalContext } from '../../context/GlobalProvider'; // Adjust the path as necessary
import {
    StyleSheet,
    StatusBar,
    Text,
    View,
    SafeAreaView,
    Image,
    ScrollView,
    TouchableOpacity,
} from "react-native";
import CarouselI from '../../components/Carousel';
import { useNavigation } from 'expo-router';
import Icon, { Icons } from '../../components/Icons';
import { theme } from '../../constants/theme';
import { UserContext } from '../../context/UserContext';
import Header from '../../components/Header';

const stadium1 = require("../../assets/images/s1.jpg");
const stadium2 = require("../../assets/images/s2.jpg");
const menuIcon = require("../../assets/images/splash.png");

const Home = () => {
    const { isLogged, user } = useGlobalContext(); 
    const [token, setToken] = useState('');
    const navigation = useNavigation();


    const title = "Home"
    const { currentUser } = useContext(UserContext);
    useEffect(() => {
        const fetchToken = async () => {
            const accessToken = await AsyncStorage.getItem('access_token');
            setToken(accessToken); 
            console.log('cu',currentUser);
        };

        fetchToken(); 
    }, []);

    return (
        <ScreenWrapper bg="white" style={styles.safeArea} >

             <StatusBar style="dark" />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.container}>
                    {/* Top Section */}
                    <Header  title={title} />
        
                    {/* Category Section */}
                    <View style={styles.categorySection}>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            {['Europe', 'South America', 'Asia', 'Africa'].map((region, index) => (
                                <TouchableOpacity
                                    key={index}
                                    activeOpacity={0.8}
                                    style={index === 0 ? styles.categoryBtnActive : styles.categoryBtn}
                                >
                                    <Text style={index === 0 ? styles.categoryBtnTextActive : styles.categoryBtnText}>
                                        {region}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>
        
                    {/* Promotion Section */}
                    <View style={styles.promotionSection}>
                        <CarouselI />
                    </View>
        
                    {/* Stadium List Area */}
                    <View style={styles.stadiumListArea}>
                        {[{ image: stadium1, name: 'Camp Nou', team: 'FC Barcelona', capacity: '99,354', location: 'Barcelona, Spain' },
                          { image: stadium2, name: 'Old Trafford', team: 'Manchester United', capacity: '74,879', location: 'Manchester, England' }]
                          .map((stadium, index) => (
                            <View key={index} style={styles.stadiumStyle}>
                                <View style={styles.imageArea}>
                                    <Image
                                        source={stadium.image}
                                        resizeMode="contain"
                                        style={styles.stadiumImage}
                                    />
                                </View>
                                <View style={styles.infoArea}>
                                    <Text style={styles.infoTitle}>{stadium.name}</Text>
                                    <Text style={styles.infoTeam}>Home of {stadium.team}</Text>
                                    <Text style={styles.infoLocation}>{stadium.location}</Text>
                                    <Text style={styles.infoCapacity}>Capacity: {stadium.capacity}</Text>
                                </View>
                            </View>
                        ))}
                    </View>
                </View>
            </ScrollView>
        </ScreenWrapper>
    );
};

export default Home;

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    container: {
        marginHorizontal: 10,
        backgroundColor: "white",
    },
  
    categorySection: {
        marginTop: 15,
    },
    categoryBtnActive: {
        padding: 7,
        paddingHorizontal: 10,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#5c5c5c",
        borderRadius: 20,
        marginRight: 7,
    },
    categoryBtn: {
        padding: 7,
        paddingHorizontal: 10,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#eeeeee",
        borderRadius: 20,
        marginRight: 7,
    },
    categoryBtnTextActive: {
        color: "white",
        fontSize: 12,
    },
    categoryBtnText: {
        color: "#bbbbbb",
        fontSize: 12,
    },
    promotionSection: {
        marginVertical: 15,
        backgroundColor: "#fce5cd",
        padding: 10,
        borderRadius: 10,
        alignItems: "center",
    },
    stadiumListArea: {
        marginTop: 20,
    },
    stadiumStyle: {
        marginBottom: 20,
        backgroundColor: "#fff",
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 2,
    },
    imageArea: {
        backgroundColor: "#f1f1f1",
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    stadiumImage: {
        width: "100%",
        height: 230,
    },
    infoArea: {
        padding: 10,
    },
    infoTitle: {
        fontSize: 16,
        fontWeight: "600",
    },
    infoTeam: {
        fontSize: 14,
        fontWeight: "500",
        color: "#555",
    },
    infoLocation: {
        fontSize: 12,
        color: "#777",
    },
    infoCapacity: {
        fontSize: 14,
        fontWeight: "500",
        color: "#333",
    },
});
