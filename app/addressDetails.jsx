import { Text, View, TouchableOpacity, ScrollView, StatusBar, StyleSheet } from 'react-native';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { router } from 'expo-router';
import PageHeader from '../components/PageHeader';

  import { useLocalSearchParams } from "expo-router";
const DetailsPage = () => {
  const buyNow = () => {
    // Toast.show(`Added to cart`, {
    //   duration: Toast.durations.SHORT,
    // });
    router.back();
  };
//   const { address } = useLocalSearchParams() 
  return (
    <GestureHandlerRootView style={styles.container}>
      <StatusBar backgroundColor="white" />

      <PageHeader title="Detail" showHeaderRight={true} bgColor='#F9F9F9' />

      <View style={styles.mainContent}>
        <ScrollView>
          <View style={styles.centeredView}>
           </View>
        </ScrollView>

        <Text>
         {/* {{address}} */}
         ok
        </Text>

        <View style={styles.footer}>
          <View>
            <Text style={styles.priceLabel}>Price</Text>
            <Text style={styles.price}>$54</Text>
          </View>

          <TouchableOpacity style={styles.buyButton} onPress={buyNow}>
            <Text style={styles.buyButtonText}>Buy Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F9F9F9',
    flex: 1,
  },
  mainContent: {
    flex: 1,
    justifyContent: 'space-between',
  },
  centeredView: {
    marginHorizontal: 20,
    alignItems: 'center',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  priceLabel: {
    color: '#A2A2A2',
    fontSize: 16,
    marginBottom: 8,
  },
  price: {
    color: '#FF8C00', // or your app's orange color
    fontSize: 24,
    fontWeight: '600',
  },
  buyButton: {
    backgroundColor: '#FF8C00', // or your app's orange color
    width: '70%',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buyButtonText: {
    fontSize: 18,
    color: 'white',
    paddingVertical: 10,
    fontWeight: '500',
  },
});

export default DetailsPage;
