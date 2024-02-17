import { AntDesign, Ionicons, MaterialIcons } from '@expo/vector-icons'
import React, { useCallback, useEffect, useState } from 'react'
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
import axios from 'axios'

const ProfileDetail = ({ navigation }) => {
  const [data, setData] = useState(null);
  const [token, setToken] = useState(null);
  const [accountId, setAccountId] = useState(null);

  useFocusEffect(
    useCallback(() => {
      const getData = async () => {
        try {
          console.log('Attempting to retrieve data from AsyncStorage...');
          const storedData = await AsyncStorage.getItem('userData');
          const storedToken = await AsyncStorage.getItem('tokenUser');

          if (storedData && storedToken) {
            const parsedData = JSON.parse(storedData);
            setData(parsedData);
            setToken(storedToken);
            setAccountId(parsedData.Id);
          } else {
            console.log('Data not found in AsyncStorage.');
          }
        } catch (error) {
          console.error('Error retrieving data:', error);
        }
      };

      getData();
    }, [])
  );

  useEffect(() => {
    if (accountId && token) {
      fetchUserDataById(accountId);
    }
  }, [accountId, token]);

  const fetchUserDataById = async (accountId) => {
    try {
      const apiUrl = `https://elder-care-api.monoinfinity.net/api/Accounts/${accountId}`;
      const response = await axios.get(apiUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });


      if (response.status === 200) {
        const userData = response.data;
        setData(userData)
      } else {
        console.error('API Error:', response.status);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const user = {
    name: data?.username || 'Username not available',
    address: data?.address || 'Address not available',
    phone: data?.phoneNumber || 'Phone number not available',
    email: data?.email || 'Email not available',
  };
  
  // console.log("aaa", data);


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

export default ProfileDetail;
