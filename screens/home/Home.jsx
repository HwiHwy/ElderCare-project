import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  FlatList,
  Image,
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

import homeStyle from "./home.style";

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
        <Text style={homeStyle.deleteButtonText}>Delete</Text>
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

  const handleSave = () => {
    if (data.length < 3) {
      const newItem = {
        id: data.length + 1,
        CarerName: carerName,
        Location: location,
        Gender: gender,
        TimeShift: timeShift,
        Age: age,
        img: "https://scontent.fsgn8-2.fna.fbcdn.net/v/t39.30808-6/422852717_707786704761774_9014426828482786458_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=9c7eae&_nc_eui2=AeFRX-hYUgDuozeERup_a5PJYYdfkQoJS9thh1-RCglL2_DmYN7j7ixrGYhaeLx7Ssa_9xIUGiTlMYnJh-ATzH85&_nc_ohc=mL4zWGh-yFYAX9vlM46&_nc_ht=scontent.fsgn8-2.fna&oh=00_AfA1lo4t3fSi1bYLlwfYzVWMm1GUwWf0E4EaxUyZfIlpWA&oe=65D717F4",
        Price: parseFloat(price),
      };

      setData((prevData) => [...prevData, newItem]);

      setCarerName("");
      setLocation("");
      setGender("");
      setTimeShift("");
      setAge("");
      setPrice("");
      <TouchableOpacity
        style={homeStyle.deleteButton}
        onPress={() => handleDelete(item.id)}
      >
        <Text style={homeStyle.deleteButtonText}>Delete</Text>
      </TouchableOpacity>;
    } else {
      alert("Tối Đa Người Bạn có thể chăm sóc");
    }

    setPopupVisible(false);
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
              <View style={homeStyle.searchWrapper}>
                <TextInput
                  style={homeStyle.searchInput}
                  placeholder="Tìm Kiếm"
                  placeholderTextColor="#A9A9A9"
                  onPressIn={() => {
                    navigation.navigate(SEARCH_SCREEN);
                  }}
                />
              </View>
            </View>
            <ReusedButton
              text={"Thêm người già"}
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
        <TouchableWithoutFeedback onPress={closePopup}>
          <View style={homeStyle.popupContainer}>
            <View style={homeStyle.popupContent}>
              <Input
               iconName="account-child-circle"
               label="Họ và tên"
                placeholder="Họ và tên"
                value={carerName}
                onChangeText={(text) => setCarerName(text)}
              />
              <Input
                placeholder="Địa chỉ"
                value={location}
                onChangeText={(text) => setLocation(text)}
              />
              <Input
                placeholder="Giới Tính"
                value={gender}
                onChangeText={(text) => setGender(text)}
              />
              <Input
                placeholder="Quan hệ với khách hàng"
                value={timeShift}
                onChangeText={(text) => setTimeShift(text)}
              />
              <Input
                placeholder="Tuổi"
                value={age}
                onChangeText={(text) => setAge(text)}
                keyboardType="numeric"
              />
              <Input
                placeholder="Ghi Chú"
                value={price}
                onChangeText={(text) => setPrice(text)}
              />

              <TouchableOpacity onPress={handleSave}>
                <Text>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={closePopup}>
                <Text>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </SafeAreaView>
  );
}
