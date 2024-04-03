import { Feather, FontAwesome } from '@expo/vector-icons'
import { useFocusEffect } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import React, { useRef, useState } from 'react'
import {
  Alert,
  Animated,
  Image,
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  TextInput,
  View,
} from 'react-native'
import {
  DividerWithText,
  HeightDivider,
  ReusedButton,
  ReusedText,
  reuse,
} from '../../../components'
import { COLORS, SIZES, images } from '../../../constants'
import { FORGOT_SCREEN, REGISTER_SCREEN } from '../../../constants/nameRoute'
import useAuth from '../../hooks/authHooks/useAuth'
import styleLoginMain from './loginmain.style'
import useFirebase from '../../../hook/useFirebase'

export default function LoginMain({ navigation }) {
  const { login, isLoginLoading } = useAuth()
  const [isSecureEntry, setIsSecureEntry] = useState(true)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fcmToken:'',
  })
  // console.log(formData);
  const animatedValue = useRef(new Animated.Value(50)).current
  const animatedValueOpacity = useRef(new Animated.Value(0)).current
  useFocusEffect(() => {
    Animated.timing(animatedValue, {
      toValue: 0,
      duration: 1500,
      useNativeDriver: false,
    }).start()
  })

  useFocusEffect(() => {
    Animated.timing(animatedValueOpacity, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: false,
    }).start()
  })

  const handleLogin = async () => {
    const { email, password } = formData;
    const fcmToken = await useFirebase().getToken();
    console.log("fcm: ", fcmToken);
    await login({ email, password, fcmToken });
  };
  

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  return (
    <View behavior="position" style={styleLoginMain.container}>
      <ScrollView>
        <StatusBar style="auto" />
        <Image
          source={images.backgroundv2}
          style={styleLoginMain.backgroundImage}
        />

        <View style={styleLoginMain.stack}>
          <Image source={images.logo} style={styleLoginMain.logo} />
          <Animated.View
            style={[styleLoginMain.mainpart, { opacity: animatedValueOpacity }]}
          >
            <Animated.View
              style={[
                reuse.textMid('flex-start'),
                { marginLeft: animatedValue, opacity: animatedValueOpacity },
              ]}
            >
              <ReusedText
                text={'Chào mừng!'}
                size={SIZES.xxLarge}
                family={'bold'}
                color={COLORS.primary}
              />
              <ReusedText text={'Đăng nhập để tiếp tục'} />
            </Animated.View>
            <HeightDivider height={30} />

            <View style={styleLoginMain.inputComponent}>
              <FontAwesome name="user-o" size={24} color={COLORS.gray} />
              <TextInput
                placeholder="Email"
                value={formData.email}
                onChangeText={(text) => handleInputChange('email', text)}
                style={{ color: COLORS.gray, flex: 1, paddingVertical: 0 }}
              />
            </View>
            <HeightDivider height={20} />
            <View style={styleLoginMain.inputComponent}>
              <Feather name="lock" size={24} color={COLORS.gray} />
              <TextInput
                placeholder="Mật khẩu"
                value={formData.password}
                onChangeText={(text) => handleInputChange('password', text)}
                style={{ color: COLORS.gray, flex: 1, paddingVertical: 0 }}
                secureTextEntry={isSecureEntry}
              />
              <Feather
                name={isSecureEntry ? 'eye-off' : 'eye'}
                size={24}
                color={COLORS.gray}
                style={{ backgroundColor: COLORS.transparent }}
                suppressHighlighting
                onPress={() => setIsSecureEntry(!isSecureEntry)}
              />
            </View>
            <HeightDivider height={30} />
            <ReusedButton
              text={isLoginLoading ? 'Đang tải...' : 'Đăng nhập'}
              color={COLORS.white}
              backgroundColor={isLoginLoading ? COLORS.gray : COLORS.primary}
              onPress={handleLogin}
            />
            <HeightDivider height={10} />
            <DividerWithText middletext={'hoặc'} />
            <HeightDivider height={10} />
            <ReusedButton
              text={'Đăng kí'}
              color={COLORS.gray}
              backgroundColor={COLORS.transparent}
              borderColor={COLORS.gray}
              borderWidth={1}
              onPress={() => navigation.push(REGISTER_SCREEN)}
            />
            <HeightDivider height={10} />
            <Pressable
              style={reuse.textMid('flex-end')}
              onPress={() => navigation.navigate(FORGOT_SCREEN)}
            >
              <ReusedText
                text={'Quên mật khẩu'}
                color={COLORS.gray}
                size={SIZES.small}
              />
            </Pressable>
          </Animated.View>
        </View>
      </ScrollView>
    </View>
  )
}
