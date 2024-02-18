import { StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../../constants';

const homeStyle = StyleSheet.create({
  textStyle: {
    fontFamily: 'your-preferred-font', 
    fontSize: 40,
    fontWeight: 'bold', 
    color: COLORS.primary, 
    textAlign: 'center',
    marginTop: SIZES.large,
  },
  appBarWrapper: {
    marginHorizontal: SIZES.large,
    marginTop: SIZES.small,
  },
  logo: {
    width: '100%', 
    height: 210,
    resizeMode: 'cover', 
    marginTop: SIZES.medium,
  },
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center', 
    backgroundColor: COLORS.white,
    borderRadius: SIZES.medium,
    marginVertical: SIZES.medium,
    shadowColor: COLORS.gray,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 30,
    borderRadius: SIZES.medium,
    height: 50,
  },
  searchIcon: {
    marginHorizontal: SIZES.medium,
    color: COLORS.gray,
  },
  searchWrapper: {
    flex: 1,
    backgroundColor: COLORS.white,
    marginLeft: SIZES.small,
    borderRadius: SIZES.medium,
  },
  searchInput: {
    width: '100%',
    height: '100%',
    paddingHorizontal: SIZES.small,
    fontSize: 16,
  },
  boxUnderSearch: {
    height: 500, 
    backgroundColor: COLORS.white, 
    marginTop: 10, 
    borderRadius: 5,
    shadowColor: COLORS.gray,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 30,
  },
  addButton: {
    backgroundColor: "#3498db",
    borderRadius: 5, 
    padding: 10, 
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  popupContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  popupContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: 300,
    alignItems: "center",
  },
});

export default homeStyle;
