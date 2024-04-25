import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import Animated, {
  interpolateColor,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import {
  GestureHandlerRootView,
  Gesture,
  GestureDetector,
} from "react-native-gesture-handler";
import { ReusedButton } from "../../components";
import { COLORS } from "../../constants";
import { CREATE_CONTRACT_FORM_SCREEN, HOME_SCREEN } from "../../constants/nameRoute";
import Booking from "../search/Booking";
import CarerStyle from "./CarerDetail.style";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'axios'

const CarerDetail = ({ route, navigation }) => {
  const { carerDetails } = route.params || {};
  if (!carerDetails) {
    return null;
  }

  const { img, id, CarerName, Location, Gender, TimeShift, Age, Price } =
    carerDetails;

  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const opacity = useSharedValue(1);
  const scale = useSharedValue(1);

  const gesture = Gesture.Pan()
    .onUpdate((value) => {
      translateX.value = value.translationX * 0.8;
      translateY.value = value.translationY * 0.8;
      const distance = Math.sqrt(
        value.translationX * value.translationX +
          value.translationY * value.translationY
      );
      const scaleValue = Math.min(Math.max(distance / 100, 1), 0.9);
      scale.value = withTiming(scaleValue, { duration: 100 });
    })
    .onEnd(() => {
      if (translateY.value > 10) {
        opacity.value = 0;
        runOnJS(navigation.goBack)();
      } else {
        translateX.value = withTiming(0, { duration: 100 });
        translateY.value = withTiming(0, { duration: 100 });
        scale.value = withTiming(1, { duration: 100 });
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: scale.value },
    ],
    backgroundColor: interpolateColor(
      opacity.value,
      [0, 1],
      ["transparent", "white"]
    ),
    borderRadius: 20,
    overflow: "hidden",
  }));

  const [isBookingVisible, setBookingVisible] = useState(false);

  const handleBookNow = () => {
    setBookingVisible(true);
  };

  const handleCloseBooking = () => {
    setBookingVisible(false);
  };
  const onSignContract =() => {
    navigation.navigate(BASIC_SEARCH_SCREEN);
  }
  const sendNoti = async (accountId, body) => {
    try {
      const storedData = await AsyncStorage.getItem('userData');
      const parsedData = JSON.parse(storedData);
      const response = await axios.post('https://elder-care-api.monoinfinity.net/api/Notification/sendToAccount', { 
          accountId: accountId == 0 ? parsedData.Id : accountId,
          data: {
            title: "Booking",
            subTitle: body,
            body: body,
            mutableContent: true
          }
       });
      return response.data;
    } catch (error) {
      console.error("loi", error);
      if (error.response) {
        console.error(error.response.data);
      }
      throw error;
    }
  };

  return (
    <ScrollView style={CarerStyle.container}>
      <GestureHandlerRootView>
        <GestureDetector gesture={gesture}>
          <Animated.View style={[CarerStyle.imageContainer, animatedStyle]}>
            <Image source={{ uri: img }} style={CarerStyle.image} />
            <Animated.View>
              <TouchableOpacity onPress={handleBookNow}>
                <View style={CarerStyle.btn}>
                  <Text style={CarerStyle.btnText}>Kí hợp đồng theo dõi công việc</Text>
                </View>
              </TouchableOpacity>
            </Animated.View>

            <View style={CarerStyle.detailsContainer}>
              <Text style={CarerStyle.detailText}>Name: {CarerName}</Text>
              <Text style={CarerStyle.detailText}>Location: {Location}</Text>
              <Text style={CarerStyle.detailText}>Gender: {Gender}</Text>
              <Text style={CarerStyle.detailText}>Time Shift: {TimeShift}</Text>
              <Text style={CarerStyle.detailText}>Age: {Age}</Text>
              <Text style={CarerStyle.detailText}>Price: {Price} VND</Text>
              <Text style={CarerStyle.detailText}>Name: {CarerName}</Text>
              <Text style={CarerStyle.detailText}>Location: {Location}</Text>
              <Text style={CarerStyle.detailText}>Gender: {Gender}</Text>
              <Text style={CarerStyle.detailText}>Time Shift: {TimeShift}</Text>
              <Text style={CarerStyle.detailText}>Age: {Age}</Text>
              <Text style={CarerStyle.detailText}>Price: {Price} VND</Text>
              <Text style={CarerStyle.detailText}>Name: {CarerName}</Text>
              <Text style={CarerStyle.detailText}>Location: {Location}</Text>
              <Text style={CarerStyle.detailText}>Gender: {Gender}</Text>
              <Text style={CarerStyle.detailText}>Time Shift: {TimeShift}</Text>
              <Text style={CarerStyle.detailText}>Age: {Age}</Text>
              <Text style={CarerStyle.detailText}>Price: {Price} VND</Text>
            </View>
          </Animated.View>
        </GestureDetector>
      </GestureHandlerRootView>
      <Booking
        visible={isBookingVisible}
        onClose={handleCloseBooking}
        onBookNow={() => {
          alert('Booking confirmed!');
          handleCloseBooking(); 
          const body = `Booking ${CarerName} confirmed!`;
          sendNoti(0, body)
          sendNoti(id, body)
          navigation.navigate(CREATE_CONTRACT_FORM_SCREEN, { carerId: id });
        }}  
      />
       
    </ScrollView>
  );
};


export default CarerDetail;
