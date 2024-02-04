import { StatusBar } from 'expo-status-bar'
import React, { useEffect, useRef, useState } from 'react'
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native'
import {
  AppBar,
  HeightDivider,
  ReusedButton,
  ReusedText,
} from '../../../components'
import { COLORS, SIZES, images } from '../../../constants'
import { VERIFY_SCREEN } from '../../../constants/nameRoute'

export default function ForgotPasswordScreen({ navigation }) {
  const [phoneNumber, setPhoneNumber] = useState()
  const [focusInput, setFocusInput] = useState(true)
  let textInput = useRef(null)
  const onChangePhone = (number) => {
    setPhoneNumber((prev) => number)
  }

  const onChangeFocus = () => {
    setFocusInput(true)
  }
  const onChangeBlur = () => {
    setFocusInput(false)
  }

  useEffect(() => {
    textInput.focus()
  }, [])

  const onPressContinue = () => {
    if (phoneNumber) {
      navigation.navigate(VERIFY_SCREEN)
    } else {
      Alert.alert('Số điện thoại không được để trống')
    }
  }

  return (
    <View style={style.container}>
      <View
        behavior="padding"
        keyboardVerticalOffset={50}
        style={style.containerAvoidingView}
      >
        <ScrollView>
          <StatusBar style="auto" />
          <View style={{ height: 35, marginTop: 80 }}>
            <AppBar backIcon={true} onPress={() => navigation.goBack()} />
          </View>
          <View
            style={{
              height: 250,
              marginHorizontal: 20,
              marginTop: 20,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Image
              source={images.logo}
              style={{ objectFit: 'contain', width: 350 }}
            />
          </View>
          <View
            style={{
              height: 400,
              alignItems: 'center',
            }}
          >
            <ReusedText
              text={'Nhập số điện thoại đăng kí'}
              color={COLORS.passwordColor}
              size={SIZES.xLarge}
            />
            <HeightDivider height={15} />

            <ReusedText
              text={'Chúng tôi sẽ gửi mã OTP cho bạn'}
              color={COLORS.gray}
              size={SIZES.large}
            />
            <HeightDivider height={50} />
            {/* <View
            style={{
              flexDirection: 'row',
              gap: 10,
              backgroundColor: COLORS.backgroundInputGray,
              padding: 20,
              width: 350,
              borderRadius: SIZES.small,
            }}
          >
            <TextInput
              placeholder="Số điện thoại"
              placeholderTextColor={COLORS.gray}
              style={{
                color: COLORS.passwordColor,
                flex: 1,
                paddingVertical: 0,
              }}
              keyboardType="decimal-pad"
            />
          </View> */}
            <View style={style.containerInput}>
              <View style={style.openDialogView}>
                <Text>{'+84 |'}</Text>
              </View>
              <TextInput
                ref={(input) => (textInput = input)}
                style={style.phoneInputStyle}
                placeholder="123 456 789"
                keyboardType="numeric"
                value={phoneNumber}
                onChangeText={onChangePhone}
                secureTextEntry={false}
                onFocus={onChangeFocus}
                onBlur={onChangeBlur}
              />
            </View>
            <HeightDivider height={100} />

            <View>
              <ReusedButton
                text={'Tiếp theo'}
                color={COLORS.white}
                backgroundColor={COLORS.primary}
                width={350}
                onPress={onPressContinue}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  )
}
const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerAvoidingView: {
    flex: 1,
  },
  containerInput: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    borderRadius: 10,
    backgroundColor: COLORS.backgroundInputGray,
    alignItems: 'center',
    marginHorizontal: 20,
  },
  openDialogView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  phoneInputStyle: {
    marginLeft: 5,
    flex: 1,
    height: 50,
  },
})
