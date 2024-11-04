import { Pressable, StyleSheet } from 'react-native'
import React from 'react'
import Icon from '../assets/icons'
import { theme } from '../constants/theme'

const BackButton2 = ({ size = 30 ,setOpenUpdate}) => {
    return (
        <Pressable  onPress={() => setOpenUpdate('main')} style={styles.button}>
            <Icon name="arrowLeft" strokeWidth={2.5} size={size} color={theme.colors.text} />
        </Pressable>
    )
}

export default BackButton2

const styles = StyleSheet.create({
    button: {
        alignSelf: 'flex-start',
        padding: 5,
        borderRadius: theme.radius.sm,
        backgroundColor: 'rgba(0,0,0,0.07)'
    }
})
