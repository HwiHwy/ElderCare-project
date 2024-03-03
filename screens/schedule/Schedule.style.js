import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../constants";


const Schedule = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f4f4f4',
        marginTop: 50,
      },

      heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        color: COLORS.primary,
      },
      formCalendar: {
        marginTop: 20,
        paddingHorizontal: 20,
      },
      selectedDateInfo: {
        marginTop: 20,
        paddingHorizontal: 20,
      },
      dateInfoText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
      },
});

export default Schedule;
