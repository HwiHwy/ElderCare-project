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
import searchResultStyle from "./searchResult.style";
import PopupContent from "./PopupContent ";

//id, CarerName,Location,Gender,TimeShift,Age,img,Price
//tuoi, gioi tinh, uy tin, kha nang cong viec,
//noti, 
//lich su giao dich: ngay gio giao dich, id, noi dung, so tien, tai khoan nhan,

const idpayed = [
  1,2,3,4
]
const items = [
  {
    id: 1,
    CarerName: "Carer A",
    Location: "Thu Duc",
    Gender: "Name",
    TimeShift: "Part time",
    Age: 25,
    img: "https://i.pinimg.com/564x/ea/b3/08/eab3082194aa10b478334f7e1ea785d8.jpg",
    Price: 200,
  },
  {
    id: 2,
    CarerName: "Carer A",
    Location: "Thu Duc",
    Gender: "Name",
    TimeShift: "Part time",
    Age: 25,
    img: "https://i.pinimg.com/564x/40/c1/7d/40c17d1eb652edca0b94d853e8434956.jpg",
    Price: 200,
  },
  {
    id: 3,
    CarerName: "Carer A",
    Location: "Thu Duc",
    Gender: "Name",
    TimeShift: "Part time",
    Age: 25,
    img: "https://i.pinimg.com/564x/31/52/0a/31520a246bbb02315fc294904269a9a9.jpg",
    Price: 200,
  },
  {
    id: 4,
    CarerName: "Carer A",
    Location: "Thu Duc",
    Gender: "Name",
    TimeShift: "Part time",
    Age: 25,
    img: "https://i.pinimg.com/736x/65/02/f4/6502f4c90923f850c81b16e586e03ebf.jpg",
    Price: 200,
  },
  {
    id: 5,
    CarerName: "Carer A",
    Location: "Thu Duc",
    Gender: "Name",
    TimeShift: "Part time",
    Age: 25,
    img: "https://i.pinimg.com/564x/3d/ee/45/3dee452688dceb54dbfb6150538f792f.jpg",
    Price: 200,
  },
  {
    id: 6,
    CarerName: "Carer A",
    Location: "Thu Duc",
    Gender: "Name",
    TimeShift: "Part time",
    Age: 25,
    img: "https://i.pinimg.com/564x/f8/64/4e/f8644edcf5326e83d24397cb642177ec.jpg",
    Price: 200,
  },
];

export default function SearchResult() {
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
          searchResultStyle.header,
          { transform: [{ translateY: translateHeader }] },
        ]}
      >
        <Animated.View
          style={[
            searchResultStyle.headerTitle,
            { opacity: opacityTitle },
            { transform: [{ translateY: translateTitle }] },
          ]}
        >
          <View style={reuse.textMid("center")}>
            <AppBar backIcon={true} onPress={() => navigation.goBack()} />
            <ReusedText
              text={"OUR CARER"}
              color={COLORS.primary}
              size={SIZES.xLarge}
              family={"bold"}
            ></ReusedText>
          </View>
        </Animated.View>

        <View style={searchResultStyle.inputWrapper}>
          <TouchableOpacity
            style={searchResultStyle.input}
            onPressIn={() => {
              navigation.navigate(SEARCH_SCREEN);
            }}
          >
            <Text style={searchResultStyle.searchText}>
              bạn muốn tìm điều gì khác{" "}
            </Text>
          </TouchableOpacity>

          <View style={searchResultStyle.inputIcon}>
            <FeatherIcon color="#05141c" name="search" size={16} />
          </View>
        </View>
      </Animated.View>
      <Animated.ScrollView
        contentContainerStyle={searchResultStyle.content}
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
                <View style={searchResultStyle.card}>
                <TouchableOpacity  onPress={() => handleMorePress({ id, CarerName, Location, Gender, TimeShift, Age, img, Price })}>
                <Image
                    alt=""
                    resizeMode="cover"
                    source={{ uri: img }}
                    style={searchResultStyle.cardImg}
                  />
                </TouchableOpacity>

                  

                  <View style={searchResultStyle.cardBody}>
                    <Text>
                      <Text style={searchResultStyle.cardTitle}>
                        {CarerName} {id}
                      </Text>{" "}
                      <Text style={searchResultStyle.cardAirport}>
                        Vị trí:
                        {Location}
                      </Text>
                    </Text>

                    <View style={searchResultStyle.cardRow}>
                      <View style={searchResultStyle.cardRowItem}>
                        <FontAwesome
                          color={COLORS.primary}
                          name=""
                          size={10}
                        />

                        <Text style={searchResultStyle.cardRowItemText}>
                          {Gender}
                        </Text>
                      </View>

                      <View style={searchResultStyle.cardRowItem}>
                        <FontAwesome
                          color="#6f61c4"
                          name="plane-arrival"
                          size={10}
                        />

                        <Text style={searchResultStyle.cardRowItemText}>
                          {TimeShift}
                        </Text>
                      </View>
                    </View>

                    <Text style={searchResultStyle.cardPrice}>
                      <Text>Giá thuê</Text>

                      <Text style={searchResultStyle.cardPriceValue}>
                        {Price.toLocaleString("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        })}{" "}
                      </Text>

                      <Text style={searchResultStyle.cardPriceCurrency}>
                        VND
                      </Text>
                    </Text>
                    <View style={searchResultStyle.btnWrapper}>
                      <TouchableOpacity onPress={() => {}}>
                        <View style={searchResultStyle.btn}>
                          <Text style={searchResultStyle.btnText}>
                            Book now
                          </Text>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => handleMorePress({ id, CarerName, Location, Gender, TimeShift, Age, img, Price })}>
                        <View style={searchResultStyle.btnMore}>
                          <Text style={searchResultStyle.btnTextMore}>
                            Xem thêm
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
      <PopupContent
        visible={isPopupVisible}
        onClose={handlePopupClose}
        carerDetails={selectedCarerDetails}
      />
    </SafeAreaView>
  );
}
