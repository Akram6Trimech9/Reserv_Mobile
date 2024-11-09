import React, { useEffect } from "react";
import { View, StyleSheet, Image } from "react-native";
  import ScreenWrapper from "../components/ScreenWrapper";
import Welcome from "./welcome";
import { createDrawerNavigator } from "@react-navigation/drawer";
 const Drawer = createDrawerNavigator();

const Index = () => {
    return (
       
      <ScreenWrapper> 
          <Welcome />
        </ScreenWrapper>
    
    );
};

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
