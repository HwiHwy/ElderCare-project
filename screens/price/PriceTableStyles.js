import { StyleSheet } from 'react-native'
import { COLORS, SIZES } from '../../constants'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.background,
  },
  title: {
    fontSize: SIZES.large,
    color: COLORS.primary,
    fontWeight: 'bold',
    marginHorizontal: 10,
    marginBottom: 20,
    textAlign: 'left',
  },
  item: {
    fontSize: SIZES.medium,
    marginVertical: 10,
    fontWeight: 'bold',
  },
  infoItem: {
    fontSize: SIZES.small,
    color: COLORS.gray,
    textAlign: 'left',
  },
  formContainer: {
    borderWidth: 1,
    borderColor: COLORS.gray,
    padding: 20,
    borderRadius: 10,
    marginTop: 20,
    width: '90%',
    alignSelf: 'center',
  },
  formItem: {
    borderColor: COLORS.gray,
    paddingLeft: 30,
    paddingVertical: 10,
    backgroundColor: COLORS.white,
    borderRadius: 25,
    marginBottom: 10,
    marginTop: 10,
    fontSize: SIZES.medium,
    elevation: 7,
    // shadowColor: COLORS.gray,
    // shadowOpacity: 5,
  },

  quantityContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 10,
    gap: 10,
  },
  plusMinusButton: {
    textAlign: 'center',
    width: 20,
    height: 20,
    color: COLORS.white,
  },
  quantityMul: {
    borderRadius: 5,
    backgroundColor: COLORS.primary,
  },
  quantityPlus: {
    borderRadius: 5,
    backgroundColor: COLORS.primary,
  },
  input: {
    fontSize: SIZES.medium,
  },
})

export default styles
