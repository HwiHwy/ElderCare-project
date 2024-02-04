import { StyleSheet } from 'react-native'
import { COLORS, SIZES } from '../../constants'

const pickupDetailScreenStyle = StyleSheet.create({
  bottomBtn: { marginTop: 20, marginLeft: 15, marginRight: 15 },
  formContainer: {
    borderWidth: 1,
    borderColor: COLORS.gray,
    padding: 20,
    borderRadius: 10,
    marginTop: 60,
    width: '90%',
    alignSelf: 'center',
  },
  OrderID: {
    marginTop: 40,
    marginLeft: 15,
    marginRight: 15,
  },
  OrderIDTitle: {
    color: COLORS.black,
    fontWeight: 'bold',
    fontSize: SIZES.large,
    textAlign: 'left',
    marginTop: 16,
    marginBottom: 10,
  },
  bottomBtn: {
    width: '90%',
    alignSelf: 'center',
    marginTop: 20,
  },
  OrderDetail: {},
  SeparationLine: {
    backgroundColor: COLORS.gray,
    height: 1,
    marginBottom: 20,
    marginTop: 20,
  },
  OrderInfor: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: 10,
  },
  UserInfor: {
    flexDirection: 'row',
  },
  UserInforAvatar: {
    height: '100%',
  },
  UserInforName: {
    marginLeft: 20,
    color: COLORS.black,
    fontWeight: '400',
    fontSize: SIZES.large,
    textAlign: 'left',
  },
  totalDetailTitle: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  totalTitle: {
    fontWeight: '400',
    color: COLORS.gray,

    fontSize: SIZES.large,
  },
  totalDetailQuantity: {
    fontWeight: '400',

    fontSize: SIZES.large,
    color: COLORS.primary,
  },
  DetailItem: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: 20,
  },
  DetailItemLeft: {
    flexDirection: 'row',
  },
  ClotheImage: {
    height: '100%',
    marginRight: 20,
  },
  ClotheName: {
    fontWeight: '100',
    fontSize: SIZES.large,
    color: COLORS.black,
  },
  ClothePrice: {
    fontWeight: '500',
    fontSize: SIZES.large,
    color: COLORS.black,
  },
  DetailItemRight: {
    flexDirection: 'row',
    marginTop: 25,
  },
  DetailItemRightText: {
    fontWeight: '400',
    fontSize: SIZES.large,
    color: COLORS.black,
  },
  subTotal: {
    marginTop: 20,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  subTotalLeft: {
    fontWeight: '400',
    fontSize: SIZES.large,
    color: COLORS.black,
  },
  subTotalRight: {
    fontWeight: '600',
    fontSize: SIZES.large,
    color: COLORS.primary,
  },
  dropdownList: {
    height: 200,
  },
  dropdownLabel: {
    fontSize: SIZES.large,
    color: COLORS.black,
  },
  dropdownLabel: {
    fontSize: SIZES.large,
    color: COLORS.black,
  },
  textNewDes: {
    display: 'flex',
    flexDirection: 'column',
    paddingTop: 10,
    marginLeft: 20,
    marginRight: 20,
    gap: 10,
  },
  vnd: {
    fontSize: SIZES.small,
  },
})

export default pickupDetailScreenStyle
