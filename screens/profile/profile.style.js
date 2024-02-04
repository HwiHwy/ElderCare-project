import React from 'react'
import { Dimensions, StyleSheet } from 'react-native'
import { COLORS } from '../../constants'
const { width, height } = Dimensions.get('window')
const styleProfile = {
  container: {
    marginTop: 40,
    flex: 1,
  },
  imgContainer: {
    // backgroundColor: '#000000',
    alignItems: 'center',
  },
  avatar: { height: 76, width: 76 },
  nav1: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  nav2: {
    width: '90%',
    // backgroundColor: COLORS.tertiary,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // paddingHorizontal: 20,
    paddingBottom: 10,
    borderBottomColor: COLORS.gray2,
    borderBottomWidth: 1,
  },
  nav3: {
    display: 'flex',
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  profileNav: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderColor: '#000000',
    borderWidth: 1,
    margin: 10,
    borderRadius: 16,
    alignItems: 'center',
    paddingTop: 20,
    gap: 20,
  },
  profileInfo: {
    flex: 1,
    backgroundColor: COLORS.white,
    margin: 10,
    borderRadius: 16,
    alignItems: 'center',
    paddingTop: 40,
    gap: 20,
  },
  profileInfoItem: {
    width: '90%',
    display: 'flex',
    flexDirection: 'row',
    gap: 8,
    paddingBottom: 10,
    borderBottomColor: COLORS.gray2,
    borderBottomWidth: 1,
  },
  bottomBtn: {
    width: '90%',
  },
  input: {
    width: '90%',
    borderColor: COLORS.primary,
    borderWidth: 1,
    height: 56,
    borderRadius: 8,
    paddingHorizontal: 20,
  },
}
export default styleProfile
