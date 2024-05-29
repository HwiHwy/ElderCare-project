import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { AppBar, ReusedText, reuse } from "../../components";
import { COLORS, SIZES, icons } from "../../constants";
import styles from "./NotificationStyles";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function NotificationScreen({ navigation }) {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const storedToken = await AsyncStorage.getItem("tokenUser");
        const response = await axios.get('https://elder-care-api.monoinfinity.net/api/Transaction/getTransactionHistoryByCustomerId?customerId=3', {
          headers: {
            Authorization: `Bearer ${storedToken}`
          }
        });
        setTransactions(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTransactions();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.notificationForm}>
      <View style={styles.notificationRow}>
        <View style={styles.notificationIconContainer}>
          <Image source={icons.confirm} style={styles.notificationIcon} />
        </View>
        <View style={styles.notificationRow}>
          <Text style={styles.notificationStatus}>{item.status}</Text>
          <Text style={styles.notificationDate}> | {item.datetime}</Text>
        </View>
      </View>
      <View style={styles.notificationRow}>
        <Text style={styles.notificationDetail}>{item.description}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={reuse.containerAndroidSafeArea}>
      <StatusBar style="auto" />
      <View
        style={{ alignItems: "center", justifyContent: "center", height: 30 }}
      >
        <AppBar
          title={"Lịch sử giao dịch"}
          backIcon={true}
          onPress={() => navigation.goBack()}
        />
        {/* <ReusedText
          text={'NOTIFICATION'}
          color={COLORS.primary}
          size={SIZES.xxLarge}
          family={'bold'}
        ></ReusedText> */}
      </View>
      <FlatList
        data={transactions}
        renderItem={renderItem}
        keyExtractor={(item) => item.transactionId.toString()}
      />
      <View style={{ alignItems: "center", marginTop: 20 }}>
      </View>
    </SafeAreaView>
  );
}
