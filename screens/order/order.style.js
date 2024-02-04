import React from 'react'
import { Dimensions, StyleSheet } from 'react-native'
import { COLORS } from '../../constants'
const { width, height } = Dimensions.get('window')
const styleOrder = {
  container: {
    flex: 1,
  },
  filterGroup: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  filterItem: {
    display: 'flex',
    flexDirection: 'row',
    gap: 4,
  },
  content: {
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    padding: 20,
    marginVertical: 5,
    marginHorizontal: 16,
    gap: 5,
  },

  shadowIOS: {

  },
  shadowAndroid: {
    // elevation: 5,
  },

  contentItem: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailContent: {
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 16,
    gap: 5,
  },
  detailStatus: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailInfo: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'start',
    gap: 5,
  },
  userGroup: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'start',
    gap: 20,
    paddingHorizontal: 30,
  },
  avatarImg: {
    // borderRadius: '50%',
  },
  cartContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  cart: {
    flex: 1,
    marginVertical: 5,
    gap: 5,
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
  cartQuantity: {
    flex: 1,
  },
  cartInfo: {
    flex: 5,
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  cartItem: { flexDirection: 'column' },
  cartIcon: {},
  userInfo: {},
  total: {
    marginVertical: 10,
    marginHorizontal: 30,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
}

export default styleOrder
