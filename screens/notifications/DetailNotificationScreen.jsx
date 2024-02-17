import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import {
  Image,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { reuse } from "../../components";
import { images } from "../../constants";
import { SEARCH_SCREEN } from "../../constants/nameRoute";

import homeStyle from "./NotificationStyles";

export default function DetailNotificationScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={reuse.containerAndroidSafeArea}>
      <StatusBar style="auto"></StatusBar>
      <View style={homeStyle.appBarWrapper}>
        <Image source={images.logo2} style={homeStyle.logo} />
        <View style={homeStyle.searchContainer}>
          <TouchableOpacity>
            <Feather name="search" size={24} style={homeStyle.searchIcon} />
          </TouchableOpacity>
          <View style={homeStyle.searchWrapper}>
            <TouchableOpacity
              style={homeStyle.searchInput}
              value=""
              onPressIn={() => {
                navigation.navigate(SEARCH_SCREEN);
              }}
              placeholder="Tìm Kiếm"
            />
          </View>
        </View>
      </View>
      <View>
        <Text>aas</Text>
      </View>
    </SafeAreaView>
  );
}
