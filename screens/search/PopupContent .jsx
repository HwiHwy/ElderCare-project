// PopupContent.js
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
  Linking 
} from "react-native";
import { COLORS } from "../../constants";
import { ReusedButton } from "../../components";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import { CARERDETAIL_SCREEN } from "../../constants/nameRoute";
import AsyncStorage from "@react-native-async-storage/async-storage";

const PopupContent = ({ visible, onClose, carerDetails }) => {
  useEffect(() => {
    if (carerDetails && carerDetails.id) {
      console.log("id", carerDetails.id);
    }
  }, [carerDetails]);

  if (!visible || !carerDetails) {
    return null;
  }
  const { id, CarerName, Location, Gender, TimeShift, Age, img, Price } =
    carerDetails;

  console.log(carerDetails);
  const navigation = useNavigation();
  const handleConfirmation = async () => {
    try {
      const storedToken = await AsyncStorage.getItem("tokenUser");
  
      if (!storedToken) {
        console.error("Token not found");
        return;
      }
  
      const postData = {
        figureMoney: 10000,
        type: "Thanh toán phí xem thêm cho Carer: " + carerDetails.CarerName,
        dateTime: "2024-02-21T17:17:56.482Z",
      };
  
      const response = await fetch(
        "https://elder-care-api.monoinfinity.net/api/Transaction",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${storedToken}`,
          },
          body: JSON.stringify(postData),
        }
      );
  
      if (response.ok) {
        const responseData = await response.json();
        console.log("API Response:", responseData);
  
        if (responseData.success) {
          // If the first API call is successful, make the second API call
          const linkPaymentResponse = await fetch(
            "https://elder-care-api.monoinfinity.net/link-payment",
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${storedToken}`,
              },
            }
          );
  
          if (linkPaymentResponse.ok) {
            const linkPaymentText = await linkPaymentResponse.text();
            console.log("Link Payment API Response (Raw Text):", linkPaymentText);
          
            // Open the link in the device's browser
            try {
              await Linking.openURL(linkPaymentText);
            } catch (error) {
              console.error("Error opening URL:", error);
            }
          } else {
            console.error(
              "Link Payment API Error:",
              linkPaymentResponse.status,
              linkPaymentResponse.statusText
            );
            const errorResponse = await linkPaymentResponse.text(); 
            console.error("Link Payment API Error Response:", errorResponse);
          }
        }
      } else {
        console.error("API Error:", response.status, response.statusText);
        const errorResponse = await response.json();
        console.error("API Error Response:", errorResponse);
      }
  
      // navigation.navigate(CARERDETAIL_SCREEN, { carerDetails });
      onClose();
    } catch (error) {
      console.error("Error:", error);
    }
  };
  

  return (
    <Modal transparent visible={visible} animationType="fade">
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={PopupContentStyle.popupContainer}>
          <TouchableWithoutFeedback>
            <View style={PopupContentStyle.popupContent}>
              <TouchableOpacity
                style={PopupContentStyle.closeButton}
                onPress={onClose}
              >
                <Icon name="times" size={20} color={COLORS.primary} />
              </TouchableOpacity>
              <Text style={PopupContentStyle.popupText}>
                Bạn phải trả thêm phí để xem toàn bộ thông tin người chăm sóc
                này (ID: {carerDetails.id})
              </Text>
              <View style={PopupContentStyle.btnWrapper}>
                <TouchableOpacity onPress={onClose}>
                  <View style={PopupContentStyle.btn}>
                    <Text style={PopupContentStyle.btnText}>Hủy</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleConfirmation}>
                  <View style={PopupContentStyle.btnMore}>
                    <Text style={PopupContentStyle.btnTextMore}>Đồng ý</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default PopupContent;

const PopupContentStyle = StyleSheet.create({
  popupContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  popupContent: {
    backgroundColor: COLORS.white,
    padding: 20,
    borderRadius: 10,
    elevation: 50,
  },
  closeButton: {
    position: "relative",
    marginLeft: 300,
  },
  closeButtonText: {
    fontSize: 20,
    color: COLORS.primary,
  },
  popupText: {
    fontSize: 16,
    marginBottom: 100,
    marginTop: 50,
    textAlign: "center",
  },
  btn: {
    width: 150,
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderWidth: 1,
    backgroundColor: COLORS.tertiary,
    borderColor: "#173153",
  },
  btnText: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "600",
    color: "#fff",
  },
  btnWrapper: {
    flexDirection: "row",
    justifyContent: "center",
  },
  btnMore: {
    width: 150,
    height: 50,

    marginLeft: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderWidth: 1,
    backgroundColor: COLORS.primary,
    borderColor: "#173153",
  },
  btnTextMore: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "600",
    color: COLORS.white,
  },
});
