import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'
import { theme } from '../constants/theme'

const Loading = ({size="large", color=theme.colors.green}) => {
  return (
    <View style={{justifyContent:'center', alignItems:'center'}}>
      <ActivityIndicator bool={true} size={size} color={color} />
    </View>
  )
}

export default Loading