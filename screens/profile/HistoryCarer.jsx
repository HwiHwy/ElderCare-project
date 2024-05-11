import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
  FlatList,
  StyleSheet,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { AppBar, ReusedButton, ReusedText, reuse } from "../../components";
import { COLORS, SIZES, images } from "../../constants";
import {
  CREATE_ELDER_FORM_SCREEN,
  BASIC_SEARCH_SCREEN,
} from "../../constants/nameRoute"; // Import the route name
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function HistoryCarer() {
  const navigation = useNavigation();
  const [carerData, setCarerData] = useState(null);

  const handleAdd = () => {
    navigation.navigate(CREATE_ELDER_FORM_SCREEN);
  };

  const handleInputFocus = () => {
    navigation.navigate(BASIC_SEARCH_SCREEN);
  };
  useEffect(() => {
    const fetchCarerData = async () => {
      try {
        const userData = await AsyncStorage.getItem("userData");
        const userId = JSON.parse(userData).Id;

        // Fetch data from API using userId
        const response = await fetch(
          `https://elder-care-api.monoinfinity.net/api/Transaction/getApproveCarerCusByCustomerId?customerId=${userId}`
        );

        if (response.ok) {
          const data = await response.json();
          setCarerData(data);
        } else {
          console.error("Failed to fetch carer data");
        }
      } catch (error) {
        console.error("Error fetching carer data:", error);
      }
    };

    fetchCarerData();
  }, []);
  const handleCarerDetail = (carerId) => {
    navigation.navigate("CARER_PAID_SCREEN_DETAIL", { carerId });
  };
  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleCarerDetail(item.carerId)} >
      <View style={styles.itemContainer}>
        <Image
          source={{
            uri: "https://www.hsf.co.uk/wp-content/uploads/2020/06/Telephone-Counselling.jpg",
          }}
          style={styles.image}
        />
        <View style={styles.textContainer}>
          <Text style={styles.name}>{item.name.toUpperCase()}</Text>

          <Text style={styles.email}>{item.email}</Text>
          <Text style={styles.phone}>{item.phone}</Text>
          <Text style={styles.address} numberOfLines={1} ellipsizeMode="tail">
            {item.address.length > 30
              ? `${item.address.substring(0, 30)}...`
              : item.address}
          </Text>
          <Text style={styles.info}>
            {item.age} - {item.gender}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={reuse.containerAndroidSafeArea}>
      <StatusBar style="auto" />
      <View style={reuse.textMid("center")}>
        <AppBar backIcon={true} onPress={() => navigation.goBack()} />
        <ReusedText
          text={"Lịch sử xem carer"}
          color={COLORS.primary}
          size={SIZES.xLarge}
          family={"bold"}
        ></ReusedText>
        {carerData ? (
          <FlatList
            data={carerData}
            renderItem={renderItem}
            keyExtractor={(item) => item.carerId.toString()}
          />
        ) : (
          <Text>Loading...</Text>
        )}
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 20, // Add more padding to create space after the last item
  },
  itemContainer: {
    flexDirection: "row", // Arrange children horizontally
    alignItems: "center", // Center items vertically
    backgroundColor: COLORS.white,
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 20,
    borderColor: COLORS.primary,
    borderWidth: 1,
    width: 400,
    shadowColor: "#000",
    shadowOffset: {
      width: 10,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, 
    
  },
  info: {
    fontSize: 16,
    marginBottom: 5,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    color: COLORS.primary,
  },
  address: {
    fontSize: 15,
    marginBottom: 5,
    width: 300,
  },
  email: {
    fontSize: 16,
    marginBottom: 5,
  },
  phone: {
    fontSize: 16,
    marginBottom: 5,
  },
  gender: {
    fontSize: 16,
    marginBottom: 5,
  },
  age: {
    fontSize: 16,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 70,
    marginRight: 10,
    borderColor: COLORS.mint,
    borderWidth: 4,
  },
});
