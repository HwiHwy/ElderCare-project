import { AntDesign, Ionicons, MaterialIcons } from '@expo/vector-icons'
import React, { useCallback, useState } from 'react'
import { Image, Pressable, SafeAreaView, StatusBar, View } from 'react-native'
import { AppBar, ReusedButton, ReusedText, reuse } from '../../components'
import styleProfile from './profile.style'

import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFocusEffect } from '@react-navigation/native'
import Avatar from '../../assets/images/Ava.png'
import { COLORS, SIZES } from '../../constants'
import {
  CHANGE_PASSWORD_SCREEN,
  EDIT_PROFILE_SCREEN,
} from '../../constants/nameRoute'

const ProfileDetail = ({ navigation }) => {
  const [data, setData] = useState()
  useFocusEffect(
    useCallback(() => {
      const getData = async () => {
        try {
          const data = await AsyncStorage.getItem('userData')
          if (data !== null) {
            const parsedData = JSON.parse(data)
            setData(parsedData)
          } else {
            console.log('Data not found.')
          }
        } catch (error) {
          console.error('Error retrieving data:', error)
        }
      }
      getData()
    }, [])
  )

  const user = {
    name: data?.firstName + ' ' + data?.lastName,
    address: data?.address || 'TBD',
    phone: data?.phone || 'TBD',
    email: data?.email,
  }
  return (
    <SafeAreaView style={reuse.containerAndroidSafeArea}>
      <StatusBar style="auto" />
      <View style={reuse.textMid('center')}>
        <AppBar
          title={'HỒ SƠ'}
          backIcon={true}
          onPress={() => navigation.goBack()}
        />
      </View>

      <View style={styleProfile.container}>
        <View style={styleProfile.imgContainer}>
          <Image style={styleProfile.avatar} source={Avatar} />
        </View>

        <View style={styleProfile.profileInfo}>
          {/* ------------------------------------------------------------------------------------------------ */}
          <Pressable
            style={styleProfile.nav1}
            onPress={() =>
              navigation.navigate(EDIT_PROFILE_SCREEN, { user: data })
            }
          >
            <MaterialIcons name="edit" size={24} color={COLORS.primary} />
            <ReusedText
              text={'Thay đổi'}
              size={SIZES.xLarge}
              family={'bold'}
              color={COLORS.primary}
            />
          </Pressable>
          {/* ------------------------------------------------------------------------------------------------ */}
          <View style={styleProfile.profileInfoItem}>
            <AntDesign name="user" size={24} color="black" />
            <ReusedText text={user.name} size={SIZES.medium} family={'bold'} />
          </View>
          {/* ------------------------------------------------------------------------------------------------ */}
          <View style={styleProfile.profileInfoItem}>
            <AntDesign name="idcard" size={24} color="black" />
            <ReusedText
              text={user.address}
              size={SIZES.medium}
              family={'bold'}
            />
          </View>
          {/* ------------------------------------------------------------------------------------------------ */}
          <View style={styleProfile.profileInfoItem}>
            <Ionicons name="call-outline" size={24} color="black" />
            <ReusedText text={user.phone} size={SIZES.medium} family={'bold'} />
          </View>
          {/* ------------------------------------------------------------------------------------------------ */}
          <View style={styleProfile.profileInfoItem}>
            <AntDesign name="mail" size={24} color="black" />
            <ReusedText text={user.email} size={SIZES.medium} family={'bold'} />
          </View>
          {/* ------------------------------------------------------------------------------------------------ */}
          <View style={styleProfile.bottomBtn}>
            <ReusedButton
              text={'Đổi mật khẩu'}
              color={COLORS.white}
              backgroundColor={COLORS.primary}
              onPress={() => navigation.navigate(CHANGE_PASSWORD_SCREEN)}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default ProfileDetail
