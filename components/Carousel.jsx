import { Dimensions, StyleSheet, Text, View, Image } from 'react-native'
import React, { useState } from 'react'
import Carousel from 'react-native-reanimated-carousel'


const CarouselI = () => {
    const [pagingEnabled, setPagingEnabled] = useState(true)
    const width = Dimensions.get('window').width
    
    const list = [
        {
            id: 1,
            title: 'First Item',
            image: require('../assets/images/ad1.jpg')
        },
        {
            id: 2,
            title: 'Second Item',
            image: require('../assets/images/ad.jpg')
        },
        {
            id: 3,
            title: 'Third Item',
            image: require('../assets/images/ad2.png')
        },
      
    ]
  return (
    <View style={{ flex: 1}}>
        <Carousel
            width = {width}
            height = {width / 2}
            data = { list }
            autoPlay={true}
            styles={styles.img} 
            pagingEnabled={pagingEnabled}
            scrollAnimationDuration={1000}
            renderItem={({ item }) => (
                <View style={styles.CarouselItem}>
                    <Image styles={styles.img} source={item.image} />
                </View>
            )}
        />
    </View>
  )
}

export default CarouselI ; 

const styles = StyleSheet.create({
    CarouselItem: {
        flex: 1,
        justifyContent: 'center',
        overflow: 'hidden'
    },
    img: {
 
        borderRadius: 24,
     }
})