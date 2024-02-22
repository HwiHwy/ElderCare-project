import React, { useRef, useState } from "react";
import {
  StyleSheet,
  View,
  Animated,
  TextInput,
  TouchableOpacity,
  Image,
  Text,
  SafeAreaView,
} from "react-native";
import FeatherIcon from "react-native-vector-icons/Feather";
import FontAwesome from "react-native-vector-icons/FontAwesome5";
import { COLORS, SIZES, images } from "../../constants";
import { AppBar, ReusedText, reuse } from "../../components";
import { useNavigation } from "@react-navigation/native";
import { CARERDETAIL_SCREEN, SEARCH_SCREEN } from "../../constants/nameRoute";
import ElderManagementStyle from "./ElderManagement.style";
import PopupContent from "../search/PopupContent ";
import ElderDetail from "./ElderDetail";

//id, CarerName,Location,Gender,TimeShift,Age,img,Price
//tuoi, gioi tinh, uy tin, kha nang cong viec,
//noti,
//lich su giao dich: ngay gio giao dich, id, noi dung, so tien, tai khoan nhan,

const idpayed = [1, 2, 3, 4];
const items = [
  {
    id: 1,
    CarerName: "Elder 1",
    Location: "Thu Duc",
    Gender: "Name",
    TimeShift: "Part time",
    Age: 25,
    img: "https://i.pinimg.com/564x/ea/b3/08/eab3082194aa10b478334f7e1ea785d8.jpg",
    Price: 200,
  },
  {
    id: 2,
    CarerName: "Elder 1",
    Location: "Thu Duc",
    Gender: "Name",
    TimeShift: "Part time",
    Age: 25,
    img: "https://i.pinimg.com/564x/ea/b3/08/eab3082194aa10b478334f7e1ea785d8.jpg",
    Price: 200,
  },
];

export default function ElderManagement() {
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [selectedCarerDetails, setSelectedCarerDetails] = useState(null);

  const handleMorePress = (carerDetails) => {
    console.log("Clicked Xem thêm for carer:", carerDetails);
    setSelectedCarerDetails(carerDetails);

    if (!idpayed.includes(carerDetails.id)) {
      setPopupVisible(true);
    } else {
      setPopupVisible(false);
      navigation.navigate(CARERDETAIL_SCREEN, { carerDetails });
    }
  };
  const handlePopupClose = () => {
    setPopupVisible(false);
  };

  const scrollY = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();

  const translateHeader = scrollY.interpolate({
    inputRange: [0, 80],
    outputRange: [0, -80],
    extrapolate: "clamp",
  });
  const opacityTitle = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });
  const translateTitle = scrollY.interpolate({
    inputRange: [0, 80],
    outputRange: [0, 40],
    extrapolate: "clamp",
  });

  return (
    <SafeAreaView>
      <Animated.View
        style={[
          ElderManagementStyle.header,
          { transform: [{ translateY: translateHeader }] },
        ]}
      >
        <Animated.View
          style={[
            ElderManagementStyle.headerTitle,
            { opacity: opacityTitle },
            { transform: [{ translateY: translateTitle }] },
          ]}
        ></Animated.View>
      </Animated.View>
      <Animated.ScrollView
        contentContainerStyle={ElderManagementStyle.content}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          {
            useNativeDriver: true,
          }
        )}
        scrollEventThrottle={1}
      >
        {items.map(
          (
            { id, CarerName, Location, Gender, TimeShift, Age, img, Price },
            index
          ) => (
            <View key={index} style={{ opacity: 1 }}>
              <TouchableOpacity onPress={() => {}}>
                <View style={ElderManagementStyle.card}>
                  <TouchableOpacity
                    onPress={() =>
                      handleMorePress({
                        id,
                        CarerName,
                        Location,
                        Gender,
                        TimeShift,
                        Age,
                        img,
                        Price,
                      })
                    }
                  >
                    <Image
                      alt=""
                      resizeMode="cover"
                      source={{ uri: img }}
                      style={ElderManagementStyle.cardImg}
                    />
                  </TouchableOpacity>

                  <View style={ElderManagementStyle.cardBody}>
                    <Text>
                      <Text style={ElderManagementStyle.cardTitle}>
                        {CarerName} {id}
                      </Text>{" "}
                      <Text style={ElderManagementStyle.cardAirport}>
                        Vị trí:
                        {Location}
                      </Text>
                    </Text>

                    <View style={ElderManagementStyle.cardRow}>
                      <View style={ElderManagementStyle.cardRowItem}>
                        <FontAwesome color={COLORS.primary} name="" size={10} />

                        <Text style={ElderManagementStyle.cardRowItemText}>
                          {Gender}
                        </Text>
                      </View>

                      <View style={ElderManagementStyle.cardRowItem}>
                        <FontAwesome
                          color="#6f61c4"
                          name="plane-arrival"
                          size={10}
                        />

                        <Text style={ElderManagementStyle.cardRowItemText}>
                          {TimeShift}
                        </Text>
                      </View>
                    </View>

                    <Text style={ElderManagementStyle.cardPrice}>
                      <Text>Giá thuê</Text>

                      <Text style={ElderManagementStyle.cardPriceValue}>
                        {Price.toLocaleString("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        })}{" "}
                      </Text>

                      <Text style={ElderManagementStyle.cardPriceCurrency}>
                        VND
                      </Text>
                    </Text>
                    <View style={ElderManagementStyle.btnWrapper}>
                      <TouchableOpacity
                        onPress={() =>
                          handleMorePress({
                            id,
                            CarerName,
                            Location,
                            Gender,
                            TimeShift,
                            Age,
                            img,
                            Price,
                          })
                        }
                      >
                        <View style={ElderManagementStyle.btnMore}>
                          <Text style={ElderManagementStyle.btnTextMore}>
                            Xem thêmaaaa
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          )
        )}
      </Animated.ScrollView>
      <ElderDetail
        visible={isPopupVisible}
        onClose={handlePopupClose}
      />
    </SafeAreaView>
  );
}
