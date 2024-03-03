import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../constants";


const CarerDetail = StyleSheet.create({
    container: {
        flex: 1,
      },
      imageContainer: {
        flex: 1,
        backgroundColor: "#fff",
        position: "relative",
      },
      image: {
        width: "100%",
        height: 500,
        borderRadius: 15  ,
        shadowOffset: {
          width: 1,
          height: 50,
        },
        shadowOpacity: 0.1,
        shadowRadius: 1.41,
      },
      btn: {
        backgroundColor: COLORS.primary,
        padding: 10,
        borderRadius: 15  ,
        marginTop: 10,
        marginHorizontal: 20,
        shadowColor: "#000",
        shadowOffset: {
          width: 1,
          height: 50,
        },
        shadowOpacity: 0.1,
        shadowRadius: 1.41,
      },
      btnText: {
        color: "#fff",
        textAlign: "center",
        fontSize: 16,
      },
      detailsContainer: {
        padding: 16,
      },
      detailText: {
        fontSize: 16,
        marginBottom: 8,
      },

});

export default CarerDetail;
