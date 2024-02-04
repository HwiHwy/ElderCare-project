import { useNavigation } from '@react-navigation/native'
import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { HOME_SCREEN } from '../../../constants/nameRoute'
import { Alert } from 'react-native'

const checkout = 'https://silent257-001-site1.etempurl.com/api/Orders'

const chekoutFunction = async (data) => {
  try {
    const response = await axios.post(checkout, data)
    return response.data
  } catch (error) {
    throw error
  }
}

const usePostOrderUser = () => {
  const nav = useNavigation()
  const queryClient = useQueryClient()
  const checkoutMute = useMutation({
    mutationFn: chekoutFunction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ordersUser'] })
      Alert.alert('Trạng thái', 'Thanh toán thành công')
      nav.navigate(HOME_SCREEN)
    },
    onError: () => {
      Alert.alert('Trạng thái', 'Thanh toán thất bại')
    },
  })
  return {
    checkout: checkoutMute.mutate,
    checkoutLoading: checkoutMute.isLoading,
  }
}

export default usePostOrderUser
