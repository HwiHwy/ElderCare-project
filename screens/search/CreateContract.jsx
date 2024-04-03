import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StatusBar,
  TextInput,
  TouchableOpacity,
  View,
  Linking,
  Text, // Import Linking from react-native
} from "react-native";
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useRoute } from "@react-navigation/native";

const CreateContract = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { carerId } = route.params || {};

  useEffect(() => {
    if (carerId) {
      console.log("Carer ID:", carerId);
    }
  }, [carerId]);

  const [formData, setFormData] = useState({
    customerId: 3,
    elderlyId: 11,
    service: "",
    startDate: "",
    endDate: "",
    package: "",
  });
  const [bearerToken, setBearerToken] = useState('');

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

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "https://elder-care-api.monoinfinity.net/api/Transaction?carerid=3&customerid=3",
        {
          figureMoney: 50000,
          redirectUrl: "https://sandbox.vnpayment.vn/paymentv2/Payment/Error.html?code=01",
          type: "string",
          dateTime: "2024-03-20T15:58:52.413Z",
        },
        {
          headers: {
            Authorization: `Bearer ${bearerToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      const { data } = response.data;

      Linking.openURL(data);
      sendEmailNotification();

    } catch (error) {
      console.error("API Error:", error);
    }
  };
  const sendEmailNotification = async () => {
    try {
      const response = await axios.post(
        "https://elder-care-api.monoinfinity.net/api/Email",
        {
          to: "huydhse161274@fpt.edu.vn",
          subject: "Contract Notification",
          body: "The contract has been successfully created.",
        }
      );
      console.log("Email Notification Response:", response.data);
    } catch (error) {
      console.error("Email Notification Error:", error);
    }
  };
  const handleInputChange = (key, value) => {
    setFormData({
      ...formData,
      [key]: value,
    });
  };

  return (
    <SafeAreaView>
      <StatusBar style="auto" />
      <View>
        <View>
          <TextInput
            placeholder="Customer ID"
            value={formData.customerId}
            onChangeText={(text) => handleInputChange("customerId", text)}
          />
          <TextInput
            placeholder="Elderly ID"
            value={formData.elderlyId}
            onChangeText={(text) => handleInputChange("elderlyId", text)}
          />
          <TextInput
            placeholder="Service"
            value={formData.service}
            onChangeText={(text) => handleInputChange("service", text)}
          />
          <TextInput
            placeholder="Start Date"
            value={formData.startDate}
            onChangeText={(text) => handleInputChange("startDate", text)}
          />
          <TextInput
            placeholder="End Date"
            value={formData.endDate}
            onChangeText={(text) => handleInputChange("endDate", text)}
          />
          <TextInput
            placeholder="Package"
            value={formData.package}
            onChangeText={(text) => handleInputChange("package", text)}
          />
        </View>
        <TouchableOpacity onPress={handleSubmit}>
          <Text>Submit</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default CreateContract;
