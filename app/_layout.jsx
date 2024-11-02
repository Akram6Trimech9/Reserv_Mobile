import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import GlobalProvider from '../context/GlobalProvider'

const _layout = () => {
  return (
    <GlobalProvider>

    <Stack>
      
    {/* <Stack.Screen name="(tabs)" options={{ headerShown: false }} /> */}
    {/* <Stack.Screen name="(auth)" options={{ headerShown: false }} /> */}
    <Stack.Screen name="index"   options={{ headerShown: false }} />
    <Stack.Screen name="login"   options={{ headerShown: false }} />
    <Stack.Screen name="signUp"   options={{ headerShown: false }} />
    <Stack.Screen name="home" options={{ headerShown: false }} />
  </Stack>
  </GlobalProvider>
  )
}

export default _layout