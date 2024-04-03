import React, { useState, useEffect } from "react";
import { Text, TouchableOpacity, View, ScrollView } from "react-native";
import Input from "../../components/Input";
import homeStyle from "./home.style";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppBar, ReusedText, reuse } from "../../components";
import { StatusBar } from "expo-status-bar";
import { COLORS, SIZES } from "../../constants";
import { useNavigation } from "@react-navigation/native";
import CheckBox from "react-native-check-box";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { HOME_SCREEN } from "../../constants/nameRoute";

export default function CreateElderForm({ onClose }) {
  const navigation = useNavigation();
  const [bearerToken, setBearerToken] = useState("");

  useEffect(() => {
    const fetchBearerToken = async () => {
      try {
        const token = await AsyncStorage.getItem('tokenUser');
        if (token !== null) {
          setBearerToken(token);
        }
      } catch (error) {
        console.error("Error fetching bearer token:", error);
      }
    };

    fetchBearerToken();
  }, []);

  const [elderData, setElderData] = useState({
    name: "",
    age: "",
    relationshiptocustomer: "",
    address: "",
    image: "aa",
    note: "",
    customerId: 3,
    hobbies: [{ name: "aa", description: "aa", status: true }],
    livingCondition: {
      liveWithRelative: false,
      regions: "aa",
      haveSeperateRoom: false,
      others: "aa",
    },
  });

  const handleSave = () => {
    axios.post("https://elder-care-api.monoinfinity.net/api/Elder", elderData, {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    })
      .then(response => {
        console.log("Data posted successfully:", response.data);
        resetForm();
        navigation.navigate(HOME_SCREEN);
      })
      .catch(error => {
        console.error("Error posting data:", error);
      });
  };

  const resetForm = () => {
    setElderData({
      name: "",
      age: "",
      relationshiptocustomer: "",
      address: "",
      image: "",
      note: "",
      customerId: "",
      hobbies: [{ name: "", description: "", status: true }],
      livingCondition: {
        liveWithRelative: false,
        regions: "",
        haveSeperateRoom: false,
        others: "",
      },
    });
  };

  return (
    <SafeAreaView style={reuse.containerAndroidSafeArea}>
      <StatusBar style="auto" />
      <ScrollView>
        <View style={reuse.textMid("center")}>
          <AppBar backIcon={true} onPress={() => navigation.goBack()} />
          <ReusedText
            text={"TẠO THÔNG TIN CHO NGƯỜI GIÀ"}
            color={COLORS.primary}
            size={SIZES.xLarge}
            family={"bold"}
          />
        </View>
        <View style={{ height: 1000 }}>
          <Input
            iconName="account-child-circle"
            placeholder="Họ và tên"
            value={elderData.name}
            onChangeText={(text) => setElderData({ ...elderData, name: text })}
          />
          <Input
            iconName="human-male-female-child"
            placeholder="Tuổi"
            value={elderData.age}
            onChangeText={(text) => setElderData({ ...elderData, age: text })}
            keyboardType="numeric"
          />
          <Input
            iconName="home-account"
            placeholder="Địa chỉ"
            value={elderData.address}
            onChangeText={(text) =>
              setElderData({ ...elderData, address: text })
            }
          />
          <Input
            iconName="human-male-female-child"
            placeholder="Quan hệ với khách hàng"
            value={elderData.relationshiptocustomer}
            onChangeText={(text) =>
              setElderData({ ...elderData, relationshiptocustomer: text })
            }
          />
          <Input
            iconName="notebook-edit"
            placeholder="Ghi Chú"
            value={elderData.note}
            onChangeText={(text) => setElderData({ ...elderData, note: text })}
          />

          <Input
            iconName="notebook-edit"
            placeholder="Sở thích"
            value={elderData.livingCondition.others}
            onChangeText={(text) =>
              setElderData({
                ...elderData,
                livingCondition: { ...elderData.livingCondition, others: text },
              })
            }
          />
          <CheckBox
            onClick={() => setElderData({ ...elderData, livingCondition: { ...elderData.livingCondition, liveWithRelative: !elderData.livingCondition.liveWithRelative } })}
            isChecked={elderData.livingCondition.liveWithRelative}
            leftText={"Live with Relative"}
          />
          <CheckBox
            onClick={() => setElderData({ ...elderData, livingCondition: { ...elderData.livingCondition, haveSeperateRoom: !elderData.livingCondition.haveSeperateRoom } })}
            isChecked={elderData.livingCondition.haveSeperateRoom}
            leftText={"Have Seperate Room"}
          />
          <TouchableOpacity onPress={handleSave} style={homeStyle.button}>
            <Text style={homeStyle.buttonText}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onClose} style={homeStyle.button}>
            <Text style={homeStyle.buttonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
