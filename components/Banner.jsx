import { Text, View, Image, StyleSheet } from 'react-native';
import React from 'react';

import CarouselI from './Carousel';
 const Banner = () => {
  return (
    <View style={styles.container}>
      <View style={styles.backgroundOverlay} >
        </View>
       
        <CarouselI />

       
        
    
    
      
      <View style={styles.textContainer}>
      
      </View>
    </View>
  );
};

export default Banner;

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    alignItems: 'center',
  },
  backgroundOverlay: {
    position: 'absolute',
    width: '100%',
    height: 90,
    top: -4,
    alignItems: 'center',
    backgroundColor: '#222222',
    paddingBottom: 40,
  },
  bannerImage: {
    width: '90%',
    height: 144, // 36 * 4
    borderRadius: 24,
  },
  textContainer: {
    width: '90%',
    paddingLeft: 28,
    position: 'absolute',
    marginTop: 8,
  },
  promoBadge: {
    backgroundColor: '#ED5151',
    borderRadius: 8,
    color: 'white',
    marginBottom: 4,
    paddingHorizontal: 12,
    paddingVertical: 6,
    fontSize: 14,
    fontFamily: 'Sora-SemiBold',
    alignSelf: 'flex-start',
  },
  titleBackgroundBox1: {
    backgroundColor: '#222222',
    width: '75%',
    height: 28,
    position: 'relative',
    top: 24,
  },
  titleBackgroundBox2: {
    backgroundColor: '#222222',
    width: '60%',
    height: 28,
    position: 'relative',
    top: 36,
  },
  promoText: {
    color: 'white',
    fontSize: 32,
    fontFamily: 'Sora-SemiBold',
    marginTop: 12,
    width: '75%',
    position: 'relative',
    top: -64,
    lineHeight: 45,
  },
});
