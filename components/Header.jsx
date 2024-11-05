import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { useNavigation } from 'expo-router';
import Icon, { Icons } from './Icons';
import { theme } from '../constants/theme';

const Header = ({ title = '' }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.cardContainer}>
      <View style={styles.headerContainer}>
        {/* Title */}
        <Text style={styles.headerText}>{title}</Text>

        {/* Icons Area */}
        <View style={styles.iconsContainer}>
          {/* Menu Icon */}
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.iconArea}
            onPress={() => navigation.openDrawer()}
          >
            <Icon
              resizeMode="contain"
              style={styles.menuIcon}
              type={Icons.Ionicons}
              name="menu"
              color={'white'}
              size={30}
            />
          </TouchableOpacity>

          {/* Notification Icon */}
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.iconArea}
            onPress={() => alert('Notifications Clicked!')}
          >
            <Icon
              resizeMode="contain"
              style={styles.notificationIcon}
              type={Icons.Ionicons}
              name="notifications"
              color={'white'}

               size={30}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  cardContainer: {
    marginTop: 10,
    marginBottom:15,
      borderRadius: 12,
      padding:10,
     backgroundColor:theme.colors.green
    
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
   },
  headerText: {
    fontSize: 24,
    fontWeight: '600',
    color: 'white',
  },
  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconArea: {
    width: 45,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 15, // Spacing between the icons
  },
  menuIcon: {
    width: '100%',
    height: '100%',
  },
  notificationIcon: {
    width: '100%',
    height: '100%',
  },
});
