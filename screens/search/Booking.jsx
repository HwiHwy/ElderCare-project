// BookNowPopup.js
import React from "react";
import { View, Text, Modal, TouchableOpacity } from "react-native";
import { COLORS, SIZES } from "../../constants";

const Booking = ({ visible, onClose, onBookNow }) => {
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
            padding: 20,
            borderRadius: 10,
            elevation: 5,
          }}
        >
          <Text>Thanh toán</Text>
          <TouchableOpacity onPress={onBookNow}>
            <Text style={{ color: COLORS.primary, marginTop: 10 }}>
              Kí hợp đồng với carrer này
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
