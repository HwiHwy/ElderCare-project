import React, { useState } from 'react'
import { Image, SafeAreaView, StatusBar, TextInput, View } from 'react-native'
import { AppBar, ReusedButton, reuse } from '../../components'
import styleProfile from './profile.style'

import useAutoFocusInputs from 'use-auto-focus-inputs'

// import Avatar from '../../constants/images'
import Avatar from '../../assets/images/Ava.png'
import { COLORS } from '../../constants'
import useUpdateUserHooks from '../hooks/userHooks/useUpdateUserHooks'

const EditProfile = ({ navigation, route }) => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  const { user } = route.params
  const { postData, postDataLoading } = useUpdateUserHooks()

  const handleSubmit = async () => {
    const info = {
      id: user?.id,
      password: user?.password,
      role: user?.role,
      firstName,
      lastName,
      phone,
      email,
      address,
    }
    await postData(info)
  }

  const getAutoFocusableInputProps = useAutoFocusInputs()
  return (
    <SafeAreaView style={reuse.containerAndroidSafeArea}>
      <StatusBar style="auto" />
      <View style={reuse.textMid('center')}>
        <AppBar
          title={'EDIT PROFILE'}
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
          <TextInput
            {...getAutoFocusableInputProps({
              placeholder: 'first name',
              value: firstName,
              onChangeText: setFirstName,
              style: styleProfile.input,
            })}
          />
          <TextInput
            {...getAutoFocusableInputProps({
              placeholder: 'last name',
              value: lastName,
              onChangeText: setLastName,
              style: styleProfile.input,
            })}
          />
          <TextInput
            {...getAutoFocusableInputProps({
              placeholder: 'phone',
              value: phone,
              onChangeText: setPhone,
              style: styleProfile.input,
            })}
          />
          <TextInput
            {...getAutoFocusableInputProps({
              placeholder: 'email',
              value: email,
              onChangeText: setEmail,
              style: styleProfile.input,
            })}
          />
          <TextInput
            {...getAutoFocusableInputProps({
              placeholder: 'address',
              value: address,
              onChangeText: setAddress,
              style: styleProfile.input,
            })}
          />
          {/* ------------------------------------------------------------------------------------------------ */}
          <View style={styleProfile.bottomBtn}>
            <ReusedButton
              text={'Lưu'}
              color={COLORS.white}
              backgroundColor={COLORS.primary}
              onPress={handleSubmit}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default EditProfile
