import React from 'react'
import { Image, Pressable, SafeAreaView, StatusBar, View } from 'react-native'
import { AppBar, ReusedButton, ReusedText, reuse } from '../../components'
import { COLORS, SIZES } from '../../constants'
import {
  ABOUT_US_SCREEN,
  CARER_BOOKING_HISTORY_SCREEN,
  CARER_CONFIRM_CONTRACT_SCREEN,
  LOGIN_MAIN,
  LOGIN_SCREEN,
  NOTIFICATION_SCREEN,
  PROFILE_DETAILS_SCREEN,
  SUPPORT_SCREEN,
} from '../../constants/nameRoute'
import styleProfile from './profile.style'

import {
  FontAwesome5,
  Ionicons,
  AntDesign,
  MaterialIcons,
} from '@expo/vector-icons'

// import Avatar from '../../constants/images'
import Avatar from '../../assets/images/Ava.png'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function UserProfile({ navigation }) {
  const handleLogout = async () => {
    try {
      await AsyncStorage.clear()
      navigation.navigate(LOGIN_MAIN)
    } catch (error) {
      console.log('got error')
    }
  }
  return (
    <SafeAreaView style={reuse.containerAndroidSafeArea}>
      <StatusBar style="auto" />
      <View style={reuse.textMid('center')}>
        {/* <AppBar
          title={'PROFILE'}
          backIcon={true}
          onPress={() => navigation.goBack()}
        /> */}
        <ReusedText
          text={'HỒ SƠ'}
          color={COLORS.primary}
          size={SIZES.xLarge}
          family={'bold'}
        ></ReusedText>
      </View>

      <View style={styleProfile.container}>
        <View style={styleProfile.imgContainer}>
          <Image style={styleProfile.avatar} source={Avatar} />
        </View>
        <View style={styleProfile.profileNav}>
          <Pressable
            style={styleProfile.nav1}
            onPress={() => navigation.navigate(PROFILE_DETAILS_SCREEN)}
          >
            <ReusedText
              text={'Thông tin'}
              size={SIZES.xLarge}
              family={'bold'}
              color={COLORS.primary}
            />
            <AntDesign name="right" size={19} color={COLORS.primary} />
          </Pressable>
          {/* ------------------------------------------------------------------------------------------------ */}
          <Pressable
            style={styleProfile.nav2}
            onPress={() => navigation.navigate(NOTIFICATION_SCREEN)}
          >
            <View style={styleProfile.nav3}>
              <Ionicons
                name="notifications-outline"
                size={24}
                color={COLORS.primary}
              />
              <ReusedText
                text={'Thông báo'}
                size={SIZES.large}
                family={'bold'}
                color={COLORS.primary}
              />
            </View>

            <AntDesign name="right" size={19} color={COLORS.gray2} />
          </Pressable>
          {/* ------------------------------------------------------------------------------------------------ */}
          <Pressable
            style={styleProfile.nav2}
            onPress={() => navigation.navigate(ABOUT_US_SCREEN)}
          >
            <View style={styleProfile.nav3}>
              <FontAwesome5 name="users" size={24} color={COLORS.primary} />
              <ReusedText
                text={'Về chúng tôi'}
                size={SIZES.large}
                family={'bold'}
                color={COLORS.primary}
              />
            </View>

            <AntDesign name="right" size={19} color={COLORS.gray2} />
          </Pressable>
          <Pressable
            style={styleProfile.nav2}
            onPress={() => navigation.navigate(SUPPORT_SCREEN)}
          >
            <View style={styleProfile.nav3}>
              <Ionicons
                name="information-circle-outline"
                size={24}
                color={COLORS.primary}
              />
              <ReusedText
                text={'Hỗ trợ'}
                size={SIZES.large}
                family={'bold'}
                color={COLORS.primary}
              />
            </View>

            <AntDesign name="right" size={19} color={COLORS.gray2} />
          </Pressable>
          <Pressable
            style={styleProfile.nav2}
            onPress={() => navigation.navigate(CARER_BOOKING_HISTORY_SCREEN)}
          >
            <View style={styleProfile.nav3}>
              <Ionicons
                name="information-circle-outline"
                size={24}
                color={COLORS.primary}
              />
              <ReusedText
                text={'Lịch sử'}
                size={SIZES.large}
                family={'bold'}
                color={COLORS.primary}
              />
            </View>

            <AntDesign name="right" size={19} color={COLORS.gray2} />
          </Pressable>
          {/* ------------------------------------------------------------------------------------------------ */}
          <Pressable
            style={styleProfile.nav2}
            onPress={() => navigation.navigate(CARER_CONFIRM_CONTRACT_SCREEN)}
          >
            <View style={styleProfile.nav3}>
              <Ionicons
                name="notifications-outline"
                size={24}
                color={COLORS.primary}
              />
              <ReusedText
                text={'Carer xác nhận thông tin'}
                size={SIZES.large}
                family={'bold'}
                color={COLORS.primary}
              />
            </View>

            <AntDesign name="right" size={19} color={COLORS.gray2} />
          </Pressable>
          {/* ------------------------------------------------------------------------------------------------ */}
          {/* ------------------------------------------------------------------------------------------------ */}
          <View style={styleProfile.bottomBtn}>
            <ReusedButton
              text={'Đăng xuất'}
              color={COLORS.white}
              backgroundColor={COLORS.primary}
              onPress={handleLogout}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}
