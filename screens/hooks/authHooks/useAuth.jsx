import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import { BOTTOM, LOGIN_MAIN, ONBOARDING_SCREEN } from '../../../constants/nameRoute'
import { Alert } from 'react-native'
import { ELDERCARE_AUTH } from '../../../FirebaseConfig'

const loginURL = 'https://63692ab028cd16bba716cff0.mockapi.io/news'
const registerURL =
  'https://silent257-001-site1.etempurl.com/api/Customers/Create'




const loginQuery = async ({ email, password }) => {

  try {
    const response = await axios.post(loginURL, { email, password, auth })
    return response.data
  } catch (error) {
    throw error
  }
}
const registerQuery = async (data) => {
  try {
    const response = await axios.post(registerURL, data)
    if (response.status === 200) {
      return 'Tạo tài khoản thành công'
    } else {
      throw new Error('Có lỗi khi đăng kí')
    }
  } catch (error) {
    throw error
  }
}
function useAuth() {
  const navigation = useNavigation()
  const loginMutation = useMutation({
    mutationFn: loginQuery,
    onSuccess: async (data) => {
      try {
        await AsyncStorage.setItem('userData', JSON.stringify(data))
        navigation.push(BOTTOM)
      } catch (error) {
        throw error
      }
    },
    onError: () => {
      Alert.alert('Lỗi đăng nhập', 'Sai email hoặc mật khẩu')
    },
  })

  const registerMutation = useMutation({
    mutationFn: registerQuery,
    onSuccess: (mesg) => {
      Alert.alert('Tạo tài khoản', mesg, [
        { text: 'OK', onPress: () => navigation.push(LOGIN_MAIN) },
      ])
    },
    onError: (error) => {
      Alert.alert('Lỗi đăng kí', 'Có lỗi khi đăng kí')
    },
  })

  return {
    login: loginMutation.mutate,
    isLoginLoading: loginMutation.isLoading,
    register: registerMutation.mutate,
    isRegisterLoading: registerMutation.isLoading,
  }
}

export default useAuth
