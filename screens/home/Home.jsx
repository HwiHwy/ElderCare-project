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
  View,
} from "react-native";
import { ReusedButton, reuse } from "../../components";
import { COLORS, images } from "../../constants";
import { SEARCH_SCREEN } from "../../constants/nameRoute";

import homeStyle from "./home.style";
import ElderManagement from "./ElderManagement";

export default function Home() {
  const navigation = useNavigation();

  const [isPopupVisible, setPopupVisible] = useState(false);

  const renderItem = ({ item }) => (
    <View style={homeStyle.listItem}>
      <Text>{item.title}</Text>
    </View>
  );const handleAdd = () => {
    setPopupVisible(true);
  };

  const closePopup = () => {
    setPopupVisible(false);
  };

  return (
    <SafeAreaView style={reuse.containerAndroidSafeArea}>
      <StatusBar style="auto" />
      <ScrollView>
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
          <ElderManagement />
        </View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={isPopupVisible}
          onRequestClose={closePopup}
        >
          <View style={homeStyle.popupContainer}>
            <View style={homeStyle.popupContent}>
              <Text>This is your popup content!</Text>
              <TouchableOpacity onPress={closePopup}>
                <Text>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
}
