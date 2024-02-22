// PopupContent.js
import React from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
} from "react-native";
import { COLORS } from "../../constants";
import { ReusedButton } from "../../components";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import { CARERDETAIL_SCREEN } from "../../constants/nameRoute";
import { SafeAreaView } from "react-native-web";

const ElderDetail = () => {

  return (
    <SafeAreaView>
      <Text>fa-area-chart</Text>
    </SafeAreaView>
  );
};

export default ElderDetail;

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
