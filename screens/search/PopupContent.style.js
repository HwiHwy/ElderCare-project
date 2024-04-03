import { StyleSheet } from "react-native-web";
import { COLORS } from "../../constants";

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
  