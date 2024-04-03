import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppBar, ReusedText, reuse } from "../../../components";
import { COLORS, SIZES } from "../../../constants";
import { SEARCH_RESULT_SCREEN } from "../../../constants/nameRoute";

const DetailServiceOption = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const formData = {
    serviceDes: "Basic services",
    timeShift: [""],
    gender: [""],
    age: [""],
    district: [""],
    cate: [""],
  };
  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);

        const storedToken = await AsyncStorage.getItem("tokenUser");

        if (!storedToken) {
          throw new Error("User token not found");
        }

        const response = await fetch(
          "https://elder-care-api.monoinfinity.net/api/Services",
          {
            headers: {
              Authorization: `Bearer ${storedToken}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Services data:", data);
        setServices(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching services:", error);
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const handleSearch = () => {
    navigation.navigate(SEARCH_RESULT_SCREEN);
  };
  const handleServiceSelection = (selectedService) => {
    const updatedFormData = { ...formData, serviceDes: selectedService.name };
    console.log("Updated form data:", updatedFormData);

  };
  return (
    <SafeAreaView style={reuse.containerAndroidSafeArea}>
      <ScrollView>
        <View style={styles.container}>
          <View style={reuse.textMid("center")}>
            <AppBar backIcon={true} onPress={() => navigation.goBack()} />
            <ReusedText
              text={"Tìm Kiếm"}
              color={COLORS.primary}
              size={SIZES.xLarge}
              family={"bold"}
            />
          </View>
          
        </View>
      </ScrollView>
      <TouchableOpacity  onPress={handleSearch}>
        <Text >Tiếp theo</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  wrapService: {
    marginHorizontal: 20,
    marginVertical: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  submitButton: {
    backgroundColor: COLORS.transparent,
    padding: 12,
    borderRadius: 8,
    marginTop: 16,
    alignItems: "center",
    borderColor: COLORS.primary,
    borderWidth: 1,
    width: "100%",
  },
  submitButtonText: {
    color: COLORS.gray,
    fontSize: 20,
  },
});

export default DetailServiceOption;
