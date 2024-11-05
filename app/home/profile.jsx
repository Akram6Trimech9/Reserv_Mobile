import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Animated,
} from "react-native";
 import { StatusBar } from "expo-status-bar";
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import Icon, { Icons } from "../../components/Icons";
import { hp, wp } from "../../helpers/common";
import ScreenWrapper from "../../components/ScreenWrapper";
import UpdateProfile from "../../components/Update";
import { ScrollView } from "react-native-web";

const profile_picture_default = require("../../assets/images/profile_picture.png");
const account = {iconType :Icons.MaterialCommunityIcons , name:'account' , color:'green' , size:25}
const help = {iconType :Icons.Ionicons , name:'help' , color:'green' , size:25}
const logout = {iconType :Icons.AntDesign , name:'logout' , color:'green' , size:25}
const setting = {iconType :Icons.Feather , name:'settings' , color:'green' , size:25}

 
const theme = {
  colors: {
    primary: '#800C26',
    primaryDark: '#00AC62',
    dark: '#3E3E3E',
    darkLight: '#E1E1',
    green: '#ac9e34',
    gray: '#3E3E3',
    text: '#494949',
    textLight: '#7C7C7C',
    textDark: '#101010',
    rose: '#ef4444',
    roseLight: '#f87171'
  },
  fonts: {
    medium: '500',
    semibold: '600',
    bold: '700',
    extraBold: '800'
  },
  radius: {
    xs: 10,
    sm: 12,
    md: 14,
    lg: 16,
    xl: 18,
    xxl: 22
  }
};

const ProfileScreen = () => {
  const [profilePicture, setProfilePicture] = useState('../../assets/images/profile_picture.png');
  const [buttonScale, setButtonScale] = useState({});
  const [openUpdate , setOpenUpdate] = useState('main')
  useEffect(()=>{
console.log('rr',openUpdate);
  },[openUpdate]);
  const handlePressIn = (index , item) => {
     setButtonScale(prev => ({ ...prev, [index]: 0.95 }));
     setOpenUpdate(item)
  };

  const handlePressOut = (index) => {
    setButtonScale(prev => ({ ...prev, [index]: 1 }));
  };

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (pickerResult.cancelled) {
      return;
    }


    const { uri } =   pickerResult.assets[0] ; ;
    console.log(uri)

    if (uri) {
      const manipulatedImage = await ImageManipulator.manipulateAsync(
        uri,
        [{ resize: { width: 400, height: 400 } }],
        { compress: 1, format: ImageManipulator.SaveFormat.JPEG }
      );

      setProfilePicture(manipulatedImage.uri); // Update the profile picture state
    } else {
      alert("Selected image does not have a valid URI.");
    }
  };

  if(openUpdate === 'Account'){
     return  (
      <ScreenWrapper bg="white" style={styles.scrollViewContent}>
      <StatusBar style="dark" />
  
      <View style={styles.container}>
        <UpdateProfile  setOpenUpdate={setOpenUpdate}  >
          </UpdateProfile>
        </View>
        </ScreenWrapper>
     )
  }

  return (
    <ScreenWrapper bg="white" style={styles.safeArea} >

    <StatusBar style="dark" />
    <View style={styles.container}>

  

      
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.topSection}>
            <TouchableOpacity onPress={pickImage} style={styles.propicArea}>

           { profilePicture && 
              <Image source={{ uri: profilePicture }} style={styles.propic} />

           }
            </TouchableOpacity>
            <Text style={styles.name}>Akram Prasad</Text>
            <Text style={styles.membership}>email@yahoo.com</Text>
          </View>

          <View style={styles.buttonList}>
            {[{ name: 'Account', icon: account } , { name: 'Settings', icon: setting }, { name: 'Help', icon: help }, { name: 'Logout', icon: logout }].map((item, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.buttonSection, { transform: [{ scale: buttonScale[index] || 1 }] }]}
                activeOpacity={0.9}
                onPressIn={() => handlePressIn(index , item.name)}
                onPressOut={() => handlePressOut(index)}
              >
                <View style={styles.buttonArea}>
                  <View style={styles.iconArea}>
                  <Icon type={item?.icon?.iconType} name={item.icon.name} color={theme.colors.green} size={24} />

                   </View>
                  <Text style={styles.buttonName}>{item.name}</Text>
                </View>
                <View style={styles.sp}></View>
              </TouchableOpacity>
            ))}
          </View>
        </SafeAreaView>
      </View>
    </ScreenWrapper>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
      backgroundColor: 'white',
    marginHorizontal: 10,
    flex:1

  },
  safeArea: {
    flex: 1,
  },
  topSection: {
    height: hp(30),
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
},
  propicArea: {
    width: wp(40),
    height: wp(40),
    borderRadius: 200,
    overflow: 'hidden',
    borderWidth: 4,
    borderColor: theme.colors.green,
    justifyContent: 'center',
    alignItems: 'center',
  },
  propic: {
    width: '100%',
    height: '100%',
  },
  name: {
    marginTop: 20,
    color: theme.colors.textDark,
    fontSize: 32,
  },
  membership: {
    color: theme.colors.green,
    fontSize: 18,
  },
  buttonList: {
    marginTop: hp(7),
    marginLeft:7
   },
  buttonSection: {
    paddingTop: 10,
    paddingBottom: 5,
    paddingLeft: 25,
    paddingRight: 25,
  },
  buttonArea: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:7,
   },
  iconArea: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  iconStyle: {
    width: 25,
    height: 25,
  },
  buttonName: {
    width: 300,
    fontSize: 15,
    color: theme.colors.textLight,
    fontWeight:theme.fonts.medium ,
    marginLeft: 20,
  },
  sp: {
    width: '100%',
    marginTop: 10,
    height: 1,
    backgroundColor: theme.colors.green,
  },
});
