import React, { useState } from 'react'
import { Image, SafeAreaView, StatusBar, TextInput, View } from 'react-native'
import useAutoFocusInputs from 'use-auto-focus-inputs'
import { AppBar, ReusedButton, reuse } from '../../components'
import styleProfile from './profile.style'
import Avatar from '../../assets/images/Ava.png'
import { COLORS } from '../../constants'

const ChangePassword = ({ navigation }) => {
  const [oldPassword, setOldPassword] = useState('')
  const [matchPassword, setMatchPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const getAutoFocusableInputProps = useAutoFocusInputs()

  const handleSubmit = () => {}

  return (
    <SafeAreaView style={reuse.containerAndroidSafeArea}>
      <StatusBar style="auto" />
      <View style={reuse.textMid('center')}>
        <AppBar
          title={'CHANGE PASSWORD'}
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
              placeholder: 'oldPassword',
              value: oldPassword,
              onChangeText: setOldPassword,
              style: styleProfile.input,
            })}
          />
          <TextInput
            {...getAutoFocusableInputProps({
              placeholder: 'newPassword',
              value: newPassword,
              onChangeText: setNewPassword,
              style: styleProfile.input,
            })}
          />
          <TextInput
            {...getAutoFocusableInputProps({
              placeholder: 'confirmNewPassword',
              value: matchPassword,
              onChangeText: setMatchPassword,
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

export default ChangePassword
