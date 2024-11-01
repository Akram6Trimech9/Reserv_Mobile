import React from 'react';
import { View, Text, Image, Button } from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';

const OnboardingScreen = ({ navigation }) => {
  return (
    <Onboarding
      onSkip={() => navigation.replace('Home')}  
      onDone={() => navigation.replace('Home')}  
      pages={[
        {
          backgroundColor: '#fff',
          image: <Image source={require('./assets/onboarding1.png')} />,  // replace with your image
          title: 'Welcome',
          subtitle: 'An awesome onboarding screen',
        },
        {
          backgroundColor: '#fdeb93',
          image: <Image source={require('./assets/onboarding2.png')} />,  // replace with your image
          title: 'Discover Features',
          subtitle: 'Learn how to use the app effectively',
        },
        {
          backgroundColor: '#e9bcbe',
          image: <Image source={require('./assets/onboarding3.png')} />,  // replace with your image
          title: 'Get Started',
          subtitle: 'Let\'s get started now!',
        },
      ]}
    />
  );
};

export default OnboardingScreen;
