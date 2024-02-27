import React, { useEffect } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
  Linking,
} from "react-native";
import { COLORS } from "../../constants";
import Icon from "react-native-vector-icons/FontAwesome";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from '@react-navigation/native';

const PopupContent = ({ visible, onClose, carerDetails }) => {
  const navigation = useNavigation();

  useEffect(() => {
    const handleDeepLink = async (event) => {
      const url = event.url;
      console.log("Deep Link URL:", url);

      if (url.includes("quangttse151013.monoinfinity.net/process-payment")) {
        const params = new URLSearchParams(url);
        const vnp_Amount = params.get("vnp_Amount");
        const vnp_BankCode = params.get("vnp_BankCode");

        console.log("Parsed Parameters:", { vnp_Amount, vnp_BankCode });

        const isPaymentSuccessful = await confirmPayment();

        onClose();

        if (isPaymentSuccessful) {
         
        }
      }
    };

    Linking.addEventListener("url", handleDeepLink);

    return () => {
      if (Linking.removeEventListener) {
        Linking.removeEventListener("url", handleDeepLink);
      }
    };
  }, [carerDetails, navigation]);

  const confirmPayment = async () => {
    try {
      const storedToken = await AsyncStorage.getItem("tokenUser");

      if (!storedToken) {
        console.error("Token not found");
        return false;
      }

      const response = await fetch(
        "https://elder-care-api.monoinfinity.net/process-payment-callback", 
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${storedToken}`,
          },
        }
      );

      const responseBody = await response.json();
      console.log("Callback Response:", responseBody);

      if (responseBody.RspCode === "00") {
        console.log("Payment confirmed successfully");
        return true;
      } else {
        console.error("Payment confirmation failed:", responseBody);
        return false;
      }
    } catch (error) {
      console.error("Error during payment confirmation:", error.message);
      return false;
    }
  };

  if (!visible || !carerDetails) {
    return null;
  }

  // ... (rest of your existing code)

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
