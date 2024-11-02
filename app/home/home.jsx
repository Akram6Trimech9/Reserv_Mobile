import React, { useEffect, useState } from 'react';
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

const close = require("../../assets/icons/close.png");
const leftArrow = require("../../assets/icons/left-arrow.png");
const plus = require("../../assets/icons/plus.png");
 
const pro_1 = require("../../assets/products/pro_1.png");
const pro_2 = require("../../assets/products/pro_2.png");

const Home = () => {
    const { isLogged, user } = useGlobalContext(); 
    const [token, setToken] = useState('');
    const navigation = useNavigation();

    useEffect(() => {
        const fetchToken = async () => {
            const accessToken = await AsyncStorage.getItem('access_token');
            setToken(accessToken); 
        };

        fetchToken(); 
    }, []);

    return (
        <ScreenWrapper bg="white" style={styles.safeArea} >

             <StatusBar style="dark" />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.container}>
                    {/* Top Section */}
                    <View style={styles.topSection}>
                        <Text style={styles.topText}>Home</Text>
                        <TouchableOpacity activeOpacity={0.8} style={styles.cartIconArea} 
                        
                        onPress={() => navigation.openDrawer()}
                         >
                        <Icon resizeMode="contain"
                                style={styles.cartIcon}  type={Icons.Ionicons} name='menu' color={theme.colors.dark} size={35} />
 
                            
                         </TouchableOpacity>
                    </View>
        
                    {/* Category Section */}
                    <View style={styles.categorySection}>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            {['Living Room', 'Kitchen & Dining', 'Home Office', 'Bed Room'].map((category, index) => (
                                <TouchableOpacity
                                    key={index}
                                    activeOpacity={0.8}
                                    style={index === 0 ? styles.categoryBtnActive : styles.categoryBtn}
                                >
                                    <Text style={index === 0 ? styles.categoryBtnTextActive : styles.categoryBtnText}>
                                        {category}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>
        
                    {/* Promotion Section */}
                    <View style={styles.promotionSection}>
                        <CarouselI />
                    </View>
        
                    {/* Product List Area */}
                    <View style={styles.productListArea}>
                        {Array(2).fill(0).map((_, index) => (
                            <View key={index} style={styles.productStyle}>
                                <View style={styles.imageArea}>
                                    <Image
                                        source={index === 0 ? pro_1 : pro_2}
                                        resizeMode="contain"
                                        style={styles.productImage}
                                    />
                                </View>
                                <View style={styles.infoArea}>
                                    <TouchableOpacity activeOpacity={0.8} style={styles.addButton}>
                                        <Image
                                            source={plus}
                                            resizeMode="contain"
                                            style={styles.addButtonIcon}
                                        />
                                    </TouchableOpacity>
                                    <Text style={styles.infoTitle}>Mod Hippo Chair</Text>
                                    <Text style={styles.infoColor}>Walnut and Cream</Text>
                                    <Text style={styles.infoPrice}>$126.34</Text>
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
    topSection: {
        height: 50,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    topText: {
        fontSize: 32,
        fontWeight: "bold",
        letterSpacing: 1,
        color:theme.colors.dark
    },
    cartIconArea: {
        width: 50,
        height: 50,
        padding: 10,
    },
    cartIcon: {
        width: "100%",
        height: "100%",
    },
    cartIconLabelArea: {
        width: 17,
        height: 17,
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        backgroundColor: "#f9c148",
        padding: 1,
        right: 7,
        top: 7,
        zIndex: 10,
    },
    cartIconLabel: {
        color: "white",
        fontSize: 8,
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
    promotionText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#d17c24",
    },
    productListArea: {
        marginTop: 20,
    },
    productStyle: {
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
        borderTopLeft: 10,
        borderTopRight: 10,
    },
    productImage: {
        width: "100%",
        height: 230,
    },
    infoArea: {
        padding: 10,
    },
    addButton: {
        width: 26,
        height: 26,
        position: "absolute",
        backgroundColor: "#feba4d",
        top: -13,
        right: 10,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 13,
        elevation: 3,
    },
    addButtonIcon: {
        width: 10,
        height: 10,
    },
    infoTitle: {
        fontSize: 14,
        fontWeight: "500",
        marginTop: 5,
    },
    infoColor: {
        fontSize: 12,
        fontWeight: "400",
        color: "#777",
    },
    infoPrice: {
        fontSize: 16,
        fontWeight: "600",
        color: "#333",
    },
});
