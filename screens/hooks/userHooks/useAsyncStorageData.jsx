import { useState, useEffect, useCallback } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const useAsyncStorageData = (storageKey) => {
  const [data, setData] = useState()

  const fetchData = useCallback(async () => {
    try {
      const storedData = await AsyncStorage.getItem(storageKey)
      if (storedData !== null) {
        const parsedData = JSON.parse(storedData)
        setData(parsedData)
      } else {
        console.log('Data not found.')
      }
    } catch (error) {
      console.error('Error retrieving data:', error)
    }
  }, [storageKey])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return data
}
