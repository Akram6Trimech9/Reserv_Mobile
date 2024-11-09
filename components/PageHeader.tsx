import React from 'react';
import { Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { FontAwesome5, Feather } from '@expo/vector-icons';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useRouter, Stack } from 'expo-router';

interface HeaderProps {
    title: string;
    showHeaderRight: boolean;
    bgColor: string;
}

const PageHeader: React.FC<HeaderProps> = ({ title, showHeaderRight, bgColor }) => {
    const router = useRouter();
    const { width } = Dimensions.get('window');

    return (
        <Stack.Screen
            options={{
                headerShadowVisible: false,
                headerStyle: {
                    backgroundColor: bgColor,
                },
                headerTitleAlign: 'center',
                headerTitle: () => (
                    <Text style={[styles.title, { fontSize: width * 0.05 }]}>
                        {title}
                    </Text>
                ),
                headerRight: showHeaderRight
                    ? () => (
                        <FontAwesome5
                            style={styles.headerRightIcon}
                            name="heart"
                            size={24}
                            color="black"
                        />
                    )
                    : undefined,
                headerBackVisible: false,
                headerLeft: () => (
                    <GestureHandlerRootView style={styles.headerLeftContainer}>
                        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                            <Feather name="arrow-left" size={24} color="black" />
                        </TouchableOpacity>
                    </GestureHandlerRootView>
                ),
            }}
        />
    );
};

const styles = StyleSheet.create({
    title: {
        color: '#242424',
     },
    headerRightIcon: {
        marginRight: 10,
    },
    headerLeftContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10, // Adjust gap for spacing between elements
    },
    backButton: {
        paddingLeft: 10,
    },
});

export default PageHeader;
