import { View, Text, StyleSheet, Image, Pressable } from 'react-native'
import React from 'react'
import ScreenWrapper from '../components/ScreenWrapper'
import { hp, wp } from '../helpers/common'
import { StatusBar } from 'expo-status-bar'
import { theme } from '../constants/theme'
import Button from '../components/Button'
import { useRouter } from 'expo-router'
  
const Welcome = () => {
    const router = useRouter()
    return (
        <ScreenWrapper bg="white">
            <StatusBar style="dark" />
            <View style={styles.container} >
                <Image style={styles.welcomeImage} resizeMode='contain' source={require('../assets/images/welcome.png')} />
                <View style={{ gap: 20, alignItems: 'center' }}>
                    <Text style={styles.title} > MON URBAN  </Text>
                     <Text style={styles.punchline} >
                        Commencez votre aventure avec notre application
                    </Text>
                </View>

                <View style={styles.footer}>
                     <Button 
                     title="Commencer"  // "Getting Started" changed to "Commencer"
                     buttonStyle={{marginHorizontal:wp(3)}}
                     onPress={()=>router.push('signUp')}
                     />
                     <View style={styles.bottomTextContainer} >
                         <Text style={styles.loginText}>
                             Vous avez déjà un compte ? 
                         </Text>
                         <Pressable onPress={()=>router.push('login')}>
                             <Text style={[styles.loginText ,{color:theme.colors.green , fontWeight:theme.fonts.semibold}]}>
                                Connexion
                             </Text>
                         </Pressable>
                     </View>
                </View>
            </View>
        </ScreenWrapper>
    )
}

export default Welcome

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: 'white',
        paddingHorizontal: wp(4)
    },
    welcomeImage: {
        height: hp(30),
        width: wp(100),
        alignSelf: 'center'
    },
    title: {
        color: theme.colors.text,
        fontSize: hp(4),
        textAlign: 'center',
        fontWeight: theme.fonts.extraBold
    },
    slogan: {
        fontSize: hp(2), 
        color: theme.colors.text,
        textAlign: 'center', 
        marginTop: hp(1) 
    },
    punchline: {
        textAlign: 'center',
        paddingHorizontal: wp(10),
        fontSize: hp(1.7),
        color: theme.colors.text
    },
    footer:{
        gap:30,
        width:'100%'
    },
    bottomTextContainer:{ 
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        gap: 5
    },
    loginText:{
        textAlign:'center',
        color:theme.colors.text,
        fontSize:hp(1.6)
    }
})
