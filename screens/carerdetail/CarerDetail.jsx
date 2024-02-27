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
import { HOME_SCREEN } from "../../constants/nameRoute";
import Booking from "../search/Booking";

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
  return (
    <ScrollView style={styles.container}>
      <GestureHandlerRootView>
        <GestureDetector gesture={gesture}>
          <Animated.View style={[styles.imageContainer, animatedStyle]}>
            <Image source={{ uri: img }} style={styles.image} />
            <Animated.View>
              <TouchableOpacity onPress={handleBookNow}>
                <View style={styles.btn}>
                  <Text style={styles.btnText}>Book now</Text>
                </View>
              </TouchableOpacity>
            </Animated.View>

            <View style={styles.detailsContainer}>
              <Text style={styles.detailText}>Name: {CarerName}</Text>
              <Text style={styles.detailText}>Location: {Location}</Text>
              <Text style={styles.detailText}>Gender: {Gender}</Text>
              <Text style={styles.detailText}>Time Shift: {TimeShift}</Text>
              <Text style={styles.detailText}>Age: {Age}</Text>
              <Text style={styles.detailText}>Price: {Price} VND</Text>
              <Text style={styles.detailText}>Name: {CarerName}</Text>
              <Text style={styles.detailText}>Location: {Location}</Text>
              <Text style={styles.detailText}>Gender: {Gender}</Text>
              <Text style={styles.detailText}>Time Shift: {TimeShift}</Text>
              <Text style={styles.detailText}>Age: {Age}</Text>
              <Text style={styles.detailText}>Price: {Price} VND</Text>
              <Text style={styles.detailText}>Name: {CarerName}</Text>
              <Text style={styles.detailText}>Location: {Location}</Text>
              <Text style={styles.detailText}>Gender: {Gender}</Text>
              <Text style={styles.detailText}>Time Shift: {TimeShift}</Text>
              <Text style={styles.detailText}>Age: {Age}</Text>
              <Text style={styles.detailText}>Price: {Price} VND</Text>
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
        }}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    flex: 1,
    backgroundColor: "#fff",
    position: "relative",
  },
  image: {
    width: "100%",
    height: 500,
    borderRadius: 15  ,
    shadowOffset: {
      width: 1,
      height: 50,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1.41,
  },
  btn: {
    backgroundColor: COLORS.primary,
    padding: 10,
    borderRadius: 15  ,
    marginTop: 10,
    marginHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 50,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1.41,
  },
  btnText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
  },
  detailsContainer: {
    padding: 16,
  },
  detailText: {
    fontSize: 16,
    marginBottom: 8,
  },
});

export default CarerDetail;
