import React, { useCallback, useState } from 'react'
import Order from './Order'
import { useFocusEffect } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Text } from 'react-native'

const OrderPage = ({ navigation }) => {
  const [data1, setData1] = useState()
  useFocusEffect(
    useCallback(() => {
      const getData = async () => {
        try {
          const data = await AsyncStorage.getItem('userData')
          if (data !== null) {
            const parsedData = JSON.parse(data)
            setData1(() => parsedData)
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
  if (!data1) {
    return <Text>Loading...</Text>
  }
  return <Order navigation={navigation} data={data1} />
}

export default OrderPage
