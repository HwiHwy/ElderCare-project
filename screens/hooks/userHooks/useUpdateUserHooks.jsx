import { useNavigation } from '@react-navigation/native'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { Alert } from 'react-native'
import { PROFILE_DETAILS_SCREEN } from '../../../constants/nameRoute'

const updateUserData = async (data) => {
  const { id, ...info } = data
  try {
    const res = await axios.put(
      `https://silent257-001-site1.etempurl.com/api/Customers/Update/${id}`,
      info
    )
    return res.data
  } catch (error) {
    throw error
  }
}
const useUpdateUserHooks = () => {
  const nav = useNavigation()
  const postData = useMutation({
    mutationFn: updateUserData,
    onSuccess: () => {
      nav.navigate(PROFILE_DETAILS_SCREEN)
    },
    onError: () => {
      Alert.alert('Xảy ra lỗi')
    },
  })
  return { postData: postData.mutate, postDataLoading: postData.isLoading }
}

export default useUpdateUserHooks
