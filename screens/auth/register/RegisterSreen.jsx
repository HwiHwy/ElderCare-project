import { Feather, FontAwesome, Fontisto } from '@expo/vector-icons'
import { useFocusEffect } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import React, { useRef, useState } from 'react'
import {
  Alert,
  Animated,
  Image,
  KeyboardAvoidingView,
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
import styleLoginMain from './register.style'
import { LOGIN_MAIN, LOGIN_SCREEN } from '../../../constants/nameRoute'
import useAuth from '../../hooks/authHooks/useAuth'

export default function RegisterScreen({ navigation }) {
  const [isSecureEntry, setIsSecureEntry] = useState(true)
  const [isSecureEntry2, setIsSecureEntry2] = useState(true)
  const animatedValue = useRef(new Animated.Value(50)).current
  const animatedValueOpacity = useRef(new Animated.Value(0)).current
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const { register, isRegisterLoading } = useAuth()

  const handleInputChange = (fieldName, text) => {
    setFormData({ ...formData, [fieldName]: text })
  }

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

  const handleRegister = async () => {
    const {
      firstName,
      lastName,
      password,
      confirmPassword,
      email,
      phoneNumber,
    } = formData;
  
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  
    if (
      firstName &&
      lastName &&
      password &&
      confirmPassword &&
      email &&
      phoneNumber
    ) {
      if (password !== confirmPassword) {
        Alert.alert(
          'Sai mật khẩu',
          'Bạn cần nhập đúng nhập lại mật khẩu vs mật khẩu đã điền'
        );
      } else if (!email.match(emailPattern)) {
        Alert.alert('Email không hợp lệ', 'Vui lòng nhập một địa chỉ email hợp lệ.');
      } else {
        // Extract relevant fields from formData
        const { confirmPassword, firstName, lastName, phoneNumber, email, password } = formData;
  
        // Prepare the data in the desired format
        const uploadData = {
          name: `${firstName} ${lastName}`,
          email,
          phoneNumber,
          password,
          bankInfo: {
            accountNumber: "", // Add your logic to get accountNumber
            bankName: "",     // Add your logic to get bankName
            branch: "",        // Add your logic to get branch
            accountName: "",    // Add your logic to get accountName
          },
        };
  
        // Call the register function with the updated data
        await register(uploadData);
      }
    } else {
      Alert.alert('Thiếu thông tin', 'Bạn cần nhập đầy đủ thông tin khi đăng kí');
    }
  };
  

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
                reuse.textMid('flex-end'),
                { marginRight: animatedValue, opacity: animatedValueOpacity },
              ]}
            >
              <ReusedText
                text={'Đăng ký'}
                size={SIZES.xxLarge}
                family={'bold'}
                color={COLORS.primary}
              />
              <ReusedText text={'Tạo tài khoản'} />
            </Animated.View>
            <HeightDivider height={30} />
            <View style={styleLoginMain.inputComponent}>
              <FontAwesome name="user-o" size={24} color={COLORS.gray} />
              <TextInput
                placeholder="Họ"
                style={{ color: COLORS.gray, flex: 1, paddingVertical: 0 }}
                value={formData.firstName}
                onChangeText={(text) => handleInputChange('firstName', text)}
              />
            </View>
            <HeightDivider height={20} />
            <View style={styleLoginMain.inputComponent}>
              <FontAwesome name="user-o" size={24} color={COLORS.gray} />
              <TextInput
                placeholder="Tên"
                style={{ color: COLORS.gray, flex: 1, paddingVertical: 0 }}
                value={formData.lastName}
                onChangeText={(text) => handleInputChange('lastName', text)}
              />
            </View>
            <HeightDivider height={20} />
            <View style={styleLoginMain.inputComponent}>
              <FontAwesome name="user-o" size={24} color={COLORS.gray} />
              <TextInput
                placeholder="Số điện thoại"
                style={{ color: COLORS.gray, flex: 1, paddingVertical: 0 }}
                value={formData.phoneNumber}
                onChangeText={(text) => handleInputChange('phoneNumber', text)}
              />
            </View>
            <HeightDivider height={20} />
            <View style={styleLoginMain.inputComponent}>
              <Fontisto name="email" size={24} color={COLORS.gray} />
              <TextInput
                placeholder="Email"
                style={{ color: COLORS.gray, flex: 1, paddingVertical: 0 }}
                value={formData.email}
                onChangeText={(text) => handleInputChange('email', text)}
              />
            </View>
            <HeightDivider height={20} />
            <View style={styleLoginMain.inputComponent}>
              <Feather name="lock" size={24} color={COLORS.gray} />
              <TextInput
                placeholder="Mật khẩu"
                style={{ color: COLORS.gray, flex: 1, paddingVertical: 0 }}
                value={formData.password}
                onChangeText={(text) => handleInputChange('password', text)}
                secureTextEntry={isSecureEntry}
                blurOnSubmit={false}
              />
              <Feather
                name={isSecureEntry ? 'eye-off' : 'eye'}
                size={24}
                color={COLORS.gray}
                style={{ backgroundColor: COLORS.transparent }}
                suppressHighlighting
                onPress={() => setIsSecureEntry(!isSecureEntry)}
                blurOnSubmit={false}
              />
            </View>
            <HeightDivider height={20} />

            <View style={styleLoginMain.inputComponent}>
              <Feather name="lock" size={24} color={COLORS.gray} />
              <TextInput
                placeholder="Nhập lại mật khẩu"
                style={{ color: COLORS.gray, flex: 1, paddingVertical: 0 }}
                secureTextEntry={isSecureEntry2}
                value={formData.confirmPassword}
                onChangeText={(text) =>
                  handleInputChange('confirmPassword', text)
                }
              />
              <Feather
                name={isSecureEntry2 ? 'eye-off' : 'eye'}
                size={24}
                color={COLORS.gray}
                style={{ backgroundColor: COLORS.transparent }}
                suppressHighlighting
                onPress={() => setIsSecureEntry2(!isSecureEntry2)}
              />
            </View>
            <HeightDivider height={30} />
            <ReusedButton
              text={isRegisterLoading ? 'Đang tải...' : 'Đăng kí'}
              color={COLORS.white}
              backgroundColor={isRegisterLoading ? COLORS.gray : COLORS.primary}
              onPress={handleRegister}
            />
            <HeightDivider height={10} />
            <DividerWithText middletext={'hoặc'} />
            <HeightDivider height={10} />
            <ReusedButton
              text={'Đăng nhập'}
              color={COLORS.gray}
              backgroundColor={COLORS.transparent}
              borderColor={COLORS.gray}
              borderWidth={1}
              onPress={() => navigation.push(LOGIN_MAIN)}
            />
          </Animated.View>
        </View>
      </ScrollView>
    </View>
  )
}
