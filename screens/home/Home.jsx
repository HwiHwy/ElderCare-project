import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  Picker,
  Image,
  FlatList,
  Keyboard,
  SafeAreaView,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ReusedButton, reuse } from "../../components";
import { COLORS, images } from "../../constants";
import { SEARCH_SCREEN, CREATE_ELDER_FORM_SCREEN, BASIC_SEARCH_SCREEN } from "../../constants/nameRoute"; // Import the route name
import Input from "../../components/Input";
import homeStyle from "./home.style";
import ElderList from "./ElderList";

export default function Home() {
  const navigation = useNavigation();

  const handleAdd = () => {
    navigation.navigate(CREATE_ELDER_FORM_SCREEN);
  };

  const handleInputFocus = () => {
    Keyboard.dismiss();
    navigation.navigate(BASIC_SEARCH_SCREEN);
  };

  return (
    <SafeAreaView style={reuse.containerAndroidSafeArea}>
      <StatusBar style="auto" />
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
      <ElderList></ElderList>
    </SafeAreaView>
  );
}
