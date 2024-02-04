import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useEffect, useRef } from "react";
import { COLORS } from "../constants";
import { ChatBox, NotificationScreen, Order } from "../screens";
import {
  HomeStackScreen,
  OrderStackScreen,
  PriceStackScreen,
  ProfileStackScreen,
} from "./stack_screens";
import { Dimensions, StyleSheet, TouchableOpacity, View } from "react-native";
const Tab = createBottomTabNavigator();
import * as Animatable from "react-native-animatable";

const { height } = Dimensions.get("window");

const tabBarStyle = {
  borderRadius:40,
  height: 60,
  bottom: 0,
  left: 0,
  right: 0,
  position: "absolute",
  backgroundColor: 'rgba(255, 255, 255, 1)',
  margin: 10,
  borderWidth: 0,  
  borderColor: 'rgba(0, 0, 0, 0.1)',
  
  ...Platform.select({
    ios: {
      shadowColor: 'black',
      shadowOffset: { width: 10, height: 20 },
      shadowOpacity: 0.2,
      shadowRadius: 400,
    },
    android: {
      elevation: 400,
    },
  }),
};
const blurredOverlay = {
  ...StyleSheet.absoluteFill,
  backgroundColor: 'rgba(255, 255, 255, 0.3)', 
};
if (Platform.OS === "android") {
  tabBarStyle.height = height * 0.1;
}

const TabButton = (props) => {
  const { item, onPress, accessibilityState } = props;
  const focused = accessibilityState.selected;
  const viewRef = useRef(null);

  useEffect(() => {
    if (viewRef.current) {
      if (focused) {
        viewRef.current.animate({
          0: { scale: 1, rotate: "0deg" },
          1: { scale: 2, rotate: "360deg" },
        });
      } else {
        viewRef.current.animate({
          0: { scale: 1.5, rotate: "0deg" },
          1: { scale: 1, rotate: "0deg" },
        });
      }
    }
  }, [focused]);

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={1}
      style={styles.container}
    >
      <Animatable.View
        ref={viewRef}
        duration={1000}
        style={styles.iconContainer}
      >
        <View
          style={
            focused
              ? styles.iconActiveBackground
              : styles.iconInactiveBackground
          }
        >
          <Ionicons
            name={focused ? item.activeIcon : item.inActiveIcon}
            color={focused ? COLORS.primary : COLORS.gray}
            size={26}
            style={focused ? styles.iconActive : styles.iconInactive}
          />
        </View>
      </Animatable.View>
    </TouchableOpacity>
  );
};

const BottomTabNavigation = () => {
  return (
    
    <Tab.Navigator
      initialRouteName="Trang chủ"
      activeTintColor="blue"
      inactiveTintColor="gray"
      showIcon={true}
      showLabel={false}
      upperCaseLabel={false}
      pressColor="rgba(255, 0, 0, 0.3)"
      pressOpacity={0.8}
      scrollEnabled={true}
      tabStyle={{ backgroundColor: "lightblue" }}
      indicatorStyle={{ backgroundColor: "red" }}

    >
      {/* <Tab.Screen
        name="Lịch"
        component={PriceStackScreen}
        options={{
          tabBarStyle: tabBarStyle,
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "pricetag" : "pricetag-outline"}
              color={focused ? "black" : "red"}
              size={26}
            />
          ),
          tabBarButton: (props) => (
            <TabButton
              {...props}
              item={{
                activeIcon: "pricetag",
                inActiveIcon: "pricetag-outline",
              }}
            />
          ),
        }}
      /> */}
      <Tab.Screen
        name="Đơn đặt hàng"
        component={OrderStackScreen}
        options={{
          tabBarStyle: tabBarStyle,
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "clipboard" : "clipboard-outline"}
              color={focused ? "black" : "red"}
              size={26}
            />
          ),
          tabBarButton: (props) => (
            <TabButton
              {...props}
              item={{
                activeIcon: "clipboard",
                inActiveIcon: "clipboard-outline",
              }}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Chat"
        component={ChatBox}
        options={{
          tabBarStyle: tabBarStyle,
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "chatbox" : "chatbox-outline"}
              color={focused ? "black" : "red"}
              size={26}
            />
          ),
          tabBarButton: (props) => (
            <TabButton
              {...props}
              item={{ activeIcon: "chatbox", inActiveIcon: "chatbox-outline" }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Trang chủ"
        component={HomeStackScreen}
        options={{
          tabBarStyle: tabBarStyle,
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              color={focused ? "black" : "red"}
              size={26}
            />
          ),
          tabBarButton: (props) => (
            <TabButton
              {...props}
              item={{ activeIcon: "home", inActiveIcon: "home-outline" }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={NotificationScreen}
        options={{
          tabBarStyle: tabBarStyle,
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "notifications" : "notifications-outline"}
              color={focused ? "black" : "red"}
              size={26}
            />
          ),
          tabBarButton: (props) => (
            <TabButton
              {...props}
              item={{
                activeIcon: "notifications",
                inActiveIcon: "notifications-outline",
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Tài khoản"
        component={ProfileStackScreen}
        options={{
          tabBarStyle: tabBarStyle,
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "person-circle" : "person-circle-outline"}
              color={focused ? "black" : "red"}
              size={26}
            />
          ),
          tabBarButton: (props) => (
            <TabButton
              {...props}
              item={{
                activeIcon: "person-circle",
                inActiveIcon: "person-circle-outline",
              }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigation;

const styles = StyleSheet.create({
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    
  },
  iconActiveBackground: {
    backgroundColor: "white",
    // borderWidth: 1,
    // borderColor: COLORS.primary,
    borderRadius: 30,
    padding: 10,
  },
  iconInactiveBackground: {
    backgroundColor: "transparent",
    borderRadius: 28,
    padding: 10,
  },
  iconActive: {
    textShadowColor: "rgba(0, 0, 0, 0.5)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  iconInactive: {
    textShadowColor: "rgba(0, 0, 0, 0)",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
