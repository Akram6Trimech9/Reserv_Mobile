import { StatusBar } from "expo-status-bar";
import { Tabs } from "expo-router";
import { Text, View, StyleSheet } from "react-native";
import Icon, { Icons } from "../../components/Icons";
import * as Animatable from "react-native-animatable";
import { useNavigation } from "@react-navigation/native";
import ScreenWrapper from "../../components/ScreenWrapper";
import { theme } from "../../constants/theme";
import { hp, wp } from "../../helpers/common";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Home from "./home";
import CustomDrawer from "../../components/CustomDrawer";

const Drawer = createDrawerNavigator();

const TabIcon = ({ iconType, iconName, color, name, focused }) => {
  return (
    <Animatable.View
      animation={focused ? { 0: { scale: 0.8 }, 1: { scale: 1.2 } } : { 0: { scale: 1.2 }, 1: { scale: 0.8 } }}
      duration={500}
      style={styles.iconContainer}
    >
      <Icon type={iconType} name={iconName} color={color} size={24} />
      <Text style={[styles.label, { color, fontWeight: focused ? "bold" : "normal" }]}>{name}</Text>
    </Animatable.View>
  );
};

const TabLayout = () => {
  return (
    <ScreenWrapper bg="white">
      <Drawer.Navigator drawerContent={(props) => <CustomDrawer {...props} />}>
        <Drawer.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
      
      </Drawer.Navigator>

      <StatusBar backgroundColor="#161622" style="light" />
    </ScreenWrapper>
  );
};

// Separate Tabs component
const TabsLayout = () => {
  const navigation = useNavigation(); // Use the useNavigation hook here

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.colors.green,
        tabBarInactiveTintColor: "black",
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBarStyle,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              iconType={Icons.MaterialCommunityIcons}
              iconName="home-outline"
              color={color}
              name="Home"
              focused={focused}
            />
          ),
        }}
        listeners={{
          tabPress: () => navigation.navigate("home"),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              iconType={Icons.FontAwesome}
              iconName="user"
              color={color}
              name="Profile"
              focused={focused}
            />
          ),
        }}
        listeners={{
          tabPress: () => navigation.navigate("profile"),
        }}
      />
      <Tabs.Screen
        name="stades"
        options={{
          title: "Stades",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              iconType={Icons.Ionicons}
              iconName="football"
              color={color}
              name="Stades"
              focused={focused}
            />
          ),
        }}
        listeners={{
          tabPress: () => navigation.navigate("stades"),
        }}
      />
      <Tabs.Screen
        name="publication"
        options={{
          title: "Publication",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              iconType={Icons.Ionicons}
              iconName="document-text-outline"
              color={color}
              name="Publication"
              focused={focused}
            />
          ),
        }}
        listeners={{
          tabPress: () => navigation.navigate("publication"),
        }}
      />
    </Tabs>
  );
};

const styles = StyleSheet.create({
  tabBarStyle: {
    backgroundColor: "white",
    borderTopWidth: 1,
    height: hp(8),
    paddingHorizontal: wp(5),
    borderRadius: 15,
    position: "absolute",
    marginBottom: hp(2),
    marginHorizontal: wp(4),
    shadowColor: theme.colors.green,
    shadowOpacity: 0.8,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 10,
    elevation: 5,
  },
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    fontSize: wp(3),
    marginTop: hp(0.5),
  },
});

export default TabLayout;
