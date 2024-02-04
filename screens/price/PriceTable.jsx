import React from 'react';
import { SafeAreaView, Text, View, FlatList } from 'react-native';
import { ReusedText, reuse } from '../../components';
import { StatusBar } from 'expo-status-bar';


export default function PriceTable() {


  return (
    <SafeAreaView style={reuse.containerAndroidSafeArea}>
      <StatusBar style='auto' />
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>

      </View>
    </SafeAreaView>
  );
}
