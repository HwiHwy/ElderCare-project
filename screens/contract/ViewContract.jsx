import React from "react";
import { AppBar, ReusedText, reuse } from "../../components";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar, View, Text, StyleSheet, Linking } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { COLORS, SIZES } from "../../constants";
import { TouchableOpacity } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ORDER_SCREEN } from "../../constants/nameRoute";

const ViewContract = () => {
  const navigation = useNavigation();

  const route = useRoute();
  // Updated sendData object
  const sendData = {
    carerId: 4,
    customerId: 3,
    elderlyId: 4,
    service: ["Basic services"],
    startDate: "2024-04-04T06:54:31.022Z",
    endDate: "2024-04-04T06:54:31.022Z",
    packageName: ""
  };
  const { formData } = route.params;
  
  const handleSignContract = async () => {
    
    try {
      const storedToken = await AsyncStorage.getItem('tokenUser');
      if (!storedToken) {
        console.error("No token found. Unable to make the API call.");
        return;
      }
  
      const formData = {
        figureMoney: 50000,
        redirectUrl: "https://sandbox.vnpayment.vn/paymentv2/Payment/Error.html?code=01",
        dateTime: new Date().toISOString(),
        type: "string",
        // vnp_ReturnUrl: 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html',
      };
  
      // Assuming setFormEmail is a state setter
      // setFormEmail(formData.figureMoney);
  
      const response = await fetch("https://elder-care-api.monoinfinity.net/api/Transaction?carerid=1&customerid=3", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${storedToken}`,
        },
        body: JSON.stringify(formData),
      });
  
      const responseData = await response.json();
      console.log("Response Data:", responseData);
  
      if (response.ok) {
        console.log("Transaction successful!");
  
        const paymentUrl = responseData.data;
        console.log("Payment URL:", paymentUrl);
  
        if (paymentUrl) {
          Linking.openURL(paymentUrl);
          // Assuming sendEmail is defined and handles email sending
        }
        onClose(); // Assuming onClose function exists
      } else {
        console.error("Transaction failed. Status code:", response.status);
      }
    } catch (error) {
      console.error("Error while processing the transaction:", error);
    }
  
    try {
      const token = await AsyncStorage.getItem("tokenUser");
      if (token) {
        console.log("Data to be sent:", sendData);
  
        const response = await fetch(
          "https://elder-care-api.monoinfinity.net/api/Contract",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(sendData), // Assuming sendData is defined
          }
        );
        if (response.ok) {
          console.log("Contract signed successfully!");
          navigation.navigate(ORDER_SCREEN);
          // Handle success
        } else {
          console.error(
            "Failed to sign contract:",
            response.status,
            response.statusText
          );
          // Handle failure
        }
      } else {
        console.error("Token not found in AsyncStorage");
      }
    } catch (error) {
      console.error("Error signing contract:", error);
      // Handle error
    }
    
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <AppBar backIcon={true} onPress={() => navigation.goBack()} />
        <ReusedText
          text={"LẬP HỢP ĐỒNG"}
          color={COLORS.primary}
          size={SIZES.xLarge}
          family={"bold"}
        />
      </View>
      <View style={styles.content}>
        {/* Display the data */}
        <View style={styles.dataContainer}>
          <Text style={styles.dataTitle}>Send Data:</Text>
          <Text style={styles.dataText}>{JSON.stringify(sendData)}</Text>
        </View>
        <View style={styles.dataContainer}>
          <Text style={styles.dataTitle}>Form Data:</Text>
          <Text style={styles.dataText}>{JSON.stringify(formData)}</Text>
        </View>
        <TouchableOpacity
          style={styles.signContractButton}
          onPress={handleSignContract}
        >
          <Text style={styles.signContractButtonText}>Sign Contract</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    alignItems: "center",
    paddingVertical: SIZES.large,
  },
  content: {
    flex: 1,
    paddingHorizontal: SIZES.large,
    paddingTop: SIZES.large,
  },
  dataContainer: {
    marginBottom: SIZES.large,
  },
  dataTitle: {
    fontSize: SIZES.large,
    fontWeight: "bold",
    marginBottom: SIZES.small,
  },
  dataText: {
    fontSize: SIZES.medium,
  },
  signContractButton: {
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.small,
    padding: SIZES.medium,
    alignItems: "center",
    marginTop: SIZES.large,
  },
  signContractButtonText: {
    color: COLORS.white,
    fontSize: SIZES.medium,
    fontWeight: "bold",
  },
});

export default ViewContract;
