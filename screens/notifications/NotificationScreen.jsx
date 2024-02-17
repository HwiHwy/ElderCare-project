import React, { useEffect } from "react";
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
import messaging from "@react-native-firebase/messaging";
import * as Notifications from "expo-notifications";

const notifications = [
  {
    id: 1,
    icon: icons.confirm,
    status: "Order Confirmed",
    date: "22/06/2023 09:00 AM",
    detail: "Your order #10234 has been confirmed",
  },
  {
    id: 2,
    icon: icons.pickup,
    status: "Order Pick Up",
    date: "22/06/2023 09:00 AM",
    detail: "Your order #10234 has been picked up",
  },
  {
    id: 3,
    icon: icons.delivery,
    status: "Order Delivered",
    date: "22/06/2023 09:00 AM",
    detail: "Your order #10234, all clothes have been delivered",
  },
  {
    id: 4,
    icon: icons.cancel,
    status: "Order Canceled",
    date: "22/06/2023 09:00 AM",
    detail: "Your order #10234 has been rejected",
  },
];

export default function NotificationScreen({ navigation }) {
  async function requestUserPermission() {
    try {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        console.log("Authorization status:", authStatus);
      } else {
        console.error("Authorization status not enabled");
      }
    } catch (error) {
      console.error("Error requesting permission:", error);
    }
  }

  const getToken = async () => {
    try {
      const token = await messaging().getToken();
      console.log("Token:", token);
    } catch (error) {
      console.error("Error getting token:", error);
    }
  };
  useEffect(() => {
    requestUserPermission();
    getToken();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.notificationForm}>
      <View style={styles.notificationRow}>
        <View style={styles.notificationIconContainer}>
          <Image source={item.icon} style={styles.notificationIcon} />
        </View>
        <View style={styles.notificationRow}>
          <Text style={styles.notificationStatus}>{item.status}</Text>
          <Text style={styles.notificationDate}> | {item.date}</Text>
        </View>
      </View>
      <View style={styles.notificationRow}>
        <Text style={styles.notificationDetail}>{item.detail}</Text>
      </View>
    </View>
  );

  const sendNotification = async () => {
    try {
      // Schedule a local notification
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Test Notification",
          body: "This is a test notification from your app.",
        },
        trigger: null,
      });

      console.log("Notification sent successfully");
    } catch (error) {
      console.error("Error sending notification:", error);
    }
  };

  return (
    <SafeAreaView style={reuse.containerAndroidSafeArea}>
      <StatusBar style="auto" />
      <View
        style={{ alignItems: "center", justifyContent: "center", height: 30 }}
      >
        <AppBar
          title={"NOTIFICATION"}
          backIcon={true}
          onPress={() => navigation.goBack()}
        />
      </View>
      <FlatList
        data={notifications}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={sendNotification}>
          <Text style={styles.sendNotificationButton}>Send Notification</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
