import { View, StyleSheet, Image } from "react-native";
import React, { useEffect } from "react";
import { router } from "expo-router";
import ScreenWrapper from "../components/ScreenWrapper";
import Welcome from "./welcome";
import Home from "./home";
 
const Index = () => {
    // useEffect(() => {
    //     const timer = setTimeout(() => {
    //         router.push('welcome');  
    //     }, 5000); 

    //     return () => clearTimeout(timer); 
    // }, []);

    return (
        <ScreenWrapper>
            {/* <View style={styles.container}>
            <Image 
        source={require('../assets/images/image.gif')}  
        style={{width: '100%', height: '100%' }}
    />
            </View> */}
            {/* <Welcome /> */}
            <Home />
        </ScreenWrapper>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',  
    },
    lottie: {
        width: 200, 
        height: 200, 
    },
});

export default Index;
