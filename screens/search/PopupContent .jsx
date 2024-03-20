import React, { useEffect, useState } from "react";
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
import { ReusedButton } from "../../components";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import { CARERDETAIL_SCREEN } from "../../constants/nameRoute";
import AsyncStorage from "@react-native-async-storage/async-storage";
import messaging from '@react-native-firebase/messaging';

const PopupContent = ({ visible, onClose, carerDetails }) => {

  const [formEmail, setFormEmail] = useState('')

  useEffect(() => {
    if (carerDetails && carerDetails.id) {
      console.log("id", carerDetails.id);
    }
  }, [carerDetails]);

  if (!visible || !carerDetails) {
    return null;
  }

  const handleConfirmation = async () => {
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
        vnp_ReturnUrl: 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html',
      };
      setFormEmail(formData.figureMoney);
      const response = await fetch("https://elder-care-api.monoinfinity.net/api/Transaction", 
      {
        
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
          setTimeout(() => {
            sendEmail();
          }, 15000);
        }
        onClose();
      } else {
        console.error("Transaction failed. Status code:", response.status);
      }
    } catch (error) {
      console.error("Error while processing the transaction:", error);
    }
  };
  const sendEmail = async () => {
    try {
      const storedToken = await AsyncStorage.getItem('tokenUser');
      if (!storedToken) {
        console.error("No token found. Unable to send the email.");
        return;
      }
  
      // Assuming carerDetails contains relevant information about the caregiver
      const { id, name, email, phoneNumber } = carerDetails;
  
      const formData = {
        to: 'ace.sworld1412@gmail.com',
        subject: 'Transaction Confirmation',
        body: `Thank you for your transaction! Below are the details:
  
  Transaction Details:
  - Amount: $${formEmail}
  - Carer ID: ${id}
  - Carer Name: ${name}
  - Carer Email: ${email}
  - Carer Phone Number: ${phoneNumber}
  
  If you have any questions or concerns, feel free to contact us.
  
  Best regards,`,
      };
  
      const emailResponse = await fetch("https://elder-care-api.monoinfinity.net/api/Email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${storedToken}`,
        },
        body: JSON.stringify(formData),
      });
  
      const emailResponseData = await emailResponse.text();
      console.log("Email Response Data:", emailResponseData);
  
      if (emailResponse.ok) {
        console.log("Email sent successfully!");
      } else {
        console.error("Email sending failed. Status code:", emailResponse.status);
      }
    } catch (error) {
      console.error("Error while sending the email:", error);
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