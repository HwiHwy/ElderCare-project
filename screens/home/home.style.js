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
});

export default homeStyle;
