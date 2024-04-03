// BookNowPopup.js
import React from "react";
import { View, Text, Modal, TouchableOpacity } from "react-native";
import { COLORS, SIZES } from "../../constants";
import { useNavigation } from "@react-navigation/native";
import { CREATE_CONTRACT_FORM_SCREEN } from "../../constants/nameRoute";

const Booking = ({ visible, onClose, onBookNow,carerDetails  }) => {
  const navigation = useNavigation();

  const handleBookNow = () => {
    onBookNow();
    navigation.navigate(CREATE_CONTRACT_FORM_SCREEN, { carerId: carerDetails.carerId });
  };
  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <View
          style={{
            backgroundColor: COLORS.white,
            height:300,
            padding: 20,
            borderRadius: 10,
            elevation: 50,
          }}
        >
          <TouchableOpacity onPress={handleBookNow}>
            <Text style={{ color: COLORS.primary, marginTop: 10 }}>
                Lập hợp đồng với người chăm sóc này
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onClose}>
            <Text style={{ color: COLORS.gray, marginTop: 10 }}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default Booking;
