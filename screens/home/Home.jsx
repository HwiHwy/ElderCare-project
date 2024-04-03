import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  Button,
  FlatList,
  Image,
  Keyboard,
  Modal,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { ReusedButton, reuse } from "../../components";
import { COLORS, images } from "../../constants";
import { SEARCH_SCREEN } from "../../constants/nameRoute";
import Input from "../../components/Input";
import { Picker } from "@react-native-picker/picker";
import messaging from "@react-native-firebase/messaging";
import { PermissionsAndroid } from "react-native";
import homeStyle from "./home.style";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useFirebase from "../../hook/useFirebase";
import * as ImagePicker from "expo-image-picker";

export default function Home() {
  const navigation = useNavigation();
  const [carerName, setCarerName] = useState("");
  const [location, setLocation] = useState("");
  const [gender, setGender] = useState("");
  const [timeShift, setTimeShift] = useState("");
  const [age, setAge] = useState("");
  const [price, setPrice] = useState("");
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [data, setData] = useState([]);
  const [image, setImage] = useState(null);
  const renderItem = ({ item }) => (
    <View style={homeStyle.card}>
      <Image source={{ uri: item.img }} style={homeStyle.cardImg} />
      <View style={homeStyle.cardBody}>
        <Text style={homeStyle.cardTitle}>{item.CarerName}</Text>
        <Text style={homeStyle.cardAirport}>Địa chỉ: {item.Location}</Text>
        <View style={homeStyle.cardRow}>
          <View style={homeStyle.cardRowItem}>
            <Text style={homeStyle.cardRowItemText}>
              Giới tính: {item.Gender}
            </Text>
          </View>
          <View style={homeStyle.cardRowItem}>
            <Text style={homeStyle.cardRowItemText}>
              Quan hệ với khách hàng {item.TimeShift}
            </Text>
          </View>
          <View style={homeStyle.cardRowItem}>
            <Text style={homeStyle.cardRowItemText}>Tuổi: {item.Age}</Text>
          </View>
        </View>
        <Text style={homeStyle.cardPrice}>
          Ghi chú: <Text style={homeStyle.cardPriceValue}>{item.Price}</Text>{" "}
        </Text>
      </View>
      <TouchableOpacity
        style={homeStyle.deleteButton}
        onPress={() => handleDelete(item.id)}
      >
        <Feather name="trash-2" size={20} color={COLORS.white} />
      </TouchableOpacity>
    </View>
  );

  const handleAdd = () => {
    setPopupVisible(true);
  };
  const closePopup = () => {
    setPopupVisible(false);
  };
  const handleDelete = (id) => {
    setData((prevData) => prevData.filter((item) => item.id !== id));
  };

  const handleSave = async () => {
    // Validate input fields
    if (
      carerName.trim() === "" ||
      location.trim() === "" ||
      gender.trim() === "" ||
      timeShift.trim() === "" ||
      age.trim() === "" ||
      price.trim() === ""
    ) {
      alert("Please fill in all the fields");
      return;
    }

    // Additional validation for specific fields
    if (!/^[a-zA-Z\s]*$/.test(carerName)) {
      alert("Invalid name format. Please use only letters and spaces");
      return;
    }

    if (!/^[a-zA-Z\s]*$/.test(location)) {
      alert("Invalid location format. Please use only letters and spaces");
      return;
    }

    if (!/^(Male|Female)$/i.test(gender)) {
      alert("Invalid gender. Please use 'Male' or 'Female'");
      return;
    }

    if (!/^[a-zA-Z\s]*$/.test(timeShift)) {
      alert("Invalid relationship format. Please use only letters and spaces");
      return;
    }

    const ageValue = parseInt(age, 10);
    if (isNaN(ageValue) || ageValue < 0 || ageValue > 150) {
      alert("Invalid age. Please enter a valid age between 0 and 150");
      return;
    }

    if (!/^[a-zA-Z\s]*$/.test(price)) {
      alert("Invalid note format. Please use only letters and spaces");
      return;
    }

    try {
      const storedToken = await AsyncStorage.getItem("tokenUser");

      const response = await fetch(
        "https://elder-care-api.monoinfinity.net/api/Elder",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${storedToken}`,
          },
          body: JSON.stringify({
            name: carerName,
            age: ageValue,
            relationshiptocustomer: timeShift,
            address: location,
            image: image,
            note: price,
          }),
        }
      );

      if (response.ok) {
        alert("Data saved successfully!");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An unexpected error occurred. Please try again.");
    }

    const newItem = {
      id: data.length + 1,
      CarerName: carerName,
      Location: location,
      Gender: gender,
      TimeShift: timeShift,
      Age: age,
      img: "https://i.pinimg.com/564x/ca/15/d5/ca15d5c0321d55036907e18af2d85bdc.jpg",
      Price: price,
    };

    setData((prevData) => [...prevData, newItem]);

    setCarerName("");
    setLocation("");
    setGender("");
    setTimeShift("");
    setAge("");
    setPrice("");

    setPopupVisible(false);
  };

  const handleInputFocus = () => {
    Keyboard.dismiss();

    navigation.navigate(SEARCH_SCREEN);
  };
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      // setImage(result.assets[0].uri);
      const imageUrl = await useFirebase().uploadImageFirebase(
        result.assets[0].uri
      );
      setImage(imageUrl);
      // console.log(image_data);
    }
  };
  return (
    <SafeAreaView style={reuse.containerAndroidSafeArea}>
      <StatusBar style="auto" />
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => (item && item.id ? item.id.toString() : "")}
        ListHeaderComponent={() => (
          <View style={homeStyle.appBarWrapper}>
            <Image source={images.logo2} style={homeStyle.logo} />
            <View style={homeStyle.searchContainer}>
              <TouchableOpacity>
                <Feather name="search" size={24} style={homeStyle.searchIcon} />
              </TouchableOpacity>
              <TouchableOpacity
                style={homeStyle.searchInputContainer}
                onPress={handleInputFocus}
              >
                <Text style={homeStyle.searchInputText}>Tìm Kiếm</Text>
              </TouchableOpacity>
            </View>
            <ReusedButton
              text={"Thêm người thân"}
              color={COLORS.white}
              backgroundColor={COLORS.primary}
              onPress={handleAdd}
            />
          </View>
        )}
      />
      <Modal
        animationType="fade"
        transparent={true}
        visible={isPopupVisible}
        onRequestClose={closePopup}
      >
        <TouchableWithoutFeedback>
          <View style={homeStyle.popupContainer}>
            <View style={homeStyle.popupContent}>
              <Input
                iconName="account-child-circle"
                placeholder="Họ và tên"
                value={carerName}
                onChangeText={(text) => setCarerName(text)}
              />
              <Input
                iconName="home-account"
                placeholder="Địa chỉ"
                value={location}
                onChangeText={(text) => setLocation(text)}
              />
              <Picker
                style={[
                  homeStyle.picker,
                  { borderWidth: 1, borderColor: "#ccc" },
                ]}
                selectedValue={gender}
                onValueChange={(itemValue) => setGender(itemValue)}
                itemStyle={homeStyle.pickerItem}
                mode="dropdown"
              >
                <Picker.Item label="Select gender" value="" />
                <Picker.Item label="Male" value="Male" />
                <Picker.Item label="Female" value="Female" />
              </Picker>

              <Input
                iconName="human-male-female-child"
                placeholder="Quan hệ với khách hàng"
                value={timeShift}
                onChangeText={(text) => setTimeShift(text)}
              />
              <Input
                iconName="gender-male-female"
                placeholder="Tuổi"
                value={age}
                onChangeText={(text) => setAge(text)}
                keyboardType="numeric"
              />
              <Input
                iconName="notebook-edit"
                placeholder="Ghi Chú"
                value={price}
                onChangeText={(text) => setPrice(text)}
              />
              <Button
                title="Pick an image"
                onPress={pickImage}
                styl={{ backgroundColor: COLORS.gray }}
              />
              <TouchableOpacity onPress={handleSave} style={homeStyle.button}>
                <Text style={homeStyle.buttonText}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={closePopup} style={homeStyle.button}>
                <Text style={homeStyle.buttonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </SafeAreaView>
  );
}
