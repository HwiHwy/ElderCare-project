import React from "react";
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
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import PushNotification from "react-native-push-notification";
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
// const sendNotification = () => {
//   PushNotification.localNotification({
//     channelId: "channel-id", // You need to create a channel for Android
//     title: "New Notification",
//     message: "This is a test notification",
//     largeIcon: "ic_launcher", // Replace with your app's large icon
//     smallIcon: "ic_notification", // Replace with your app's small icon
//   });
// };

// PushNotification.configure({
//   onRegister: function (token) {
//     console.log("TOKEN:", token);
//   },

//   onNotification: function (notification) {
//     console.log("NOTIFICATION:", notification);


//     notification.finish(PushNotificationIOS.FetchResult.NoData);
//   },

//   onAction: function (notification) {
//     console.log("ACTION:", notification.action);
//     console.log("NOTIFICATION:", notification);

//   },

//   onRegistrationError: function (err) {
//     console.error(err.message, err);
//   },

//   permissions: {
//     alert: true,
//     badge: true,
//     sound: true,
//   },

//   popInitialNotification: true,

//   requestPermissions: true,
// });
export default function NotificationScreen({ navigation }) {
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
        {/* <ReusedText
          text={'NOTIFICATION'}
          color={COLORS.primary}
          size={SIZES.xxLarge}
          family={'bold'}
        ></ReusedText> */}
      </View>
      <FlatList
        data={notifications}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
      <View style={{ alignItems: "center", marginTop: 20 }}>
        {/* <TouchableOpacity
          onPress={sendNotification}
          style={{
            backgroundColor: COLORS.primary,
            padding: 10,
            borderRadius: 5,
          }}
        >
          <Text style={{ color: COLORS.white }}>Send Notification</Text>
        </TouchableOpacity> */}
      </View>
    </SafeAreaView>
  );
}
