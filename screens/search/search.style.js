import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../constants";

const commonStyle = {

  
  borderRadius: 14,
  marginTop: 8,
  marginBottom: 5,
  marginHorizontal: 10,
  paddingHorizontal: 10,
  paddingVertical: 8,
  shadowOffset: {
    width: 1,
    height: 50,
  },
  shadowOpacity: 0.1,
  shadowRadius: 1.41,
  elevation: 1,
};

const searchStyle = StyleSheet.create({
  minHeight: '10%',
  maxHeight: 400,
  justifyContent: "center",
  alignContent: "center",
  alignItems: "center",
  wrapper: {
    padding: 10,
  },
  ContainerStyle :{
      maxWidth: "80%",
      padding: 20,
      borderRadius: 12,
      
    },

  appBarWrapper: {
    marginHorizontal: 20,
    marginTop: 60,
    marginBottom: 40,
  },
  container: { padding: 16 },
  dropdown: {
    height: 50,
    marginTop: 40,
    backgroundColor: COLORS.backgroundInputGray,
    borderRadius: 12,
    padding: 12,
  },
  icon: {
    marginRight: 5,
    color: COLORS.primary,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 14,
    margin: 2,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },

  wrapSelectAll: {
    alignItems: "center",
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: COLORS.white,
    ...commonStyle,
  },
  icon: {
    color: COLORS.primary,
    marginLeft: 5,
  },
  textSelectedStyle: {
    fontSize: 16,
    padding: 2,
    
  },
  dropdownAbility: {
    height: 50,
    marginTop: 40,
    backgroundColor: COLORS.backgroundInputGray,
    borderRadius: 12,
    padding: 12,
  },
  txtSelectAll: {
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    borderRadius: 14,
    backgroundColor: COLORS.primary,
    shadowColor: "#000",
    marginTop: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    width: "90%",
    marginHorizontal: 30,
  },
  selectedStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: COLORS.white,
    ...commonStyle,
    borderColor: COLORS.primary, 
    fontSize: 16,
    padding: 1,
    borderRadius: 8,

  },
  submitButton: {
    backgroundColor: COLORS.primary,
    padding: 12,
    borderRadius: 8,
    marginTop: 16,
    marginBottom: 130,
    marginHorizontal: 20,
    alignItems: "center",
  },
  submitButtonText: {
    color: "white",
    fontSize: 16,
  },
  selectedStyleSelected: {
    ...commonStyle,
    backgroundColor: COLORS.gray2
  },

});

export default searchStyle;
