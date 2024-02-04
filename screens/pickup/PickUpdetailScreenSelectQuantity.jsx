import React, { useState } from 'react'
import {
  Alert,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import { ReusedButton } from '../../components'
import { COLORS } from '../../constants'
import { PICKUP_SCREEN_DETAIL } from '../../constants/nameRoute'
import styles from '../price/PriceTableStyles'
import pickupDetailScreenStyle from './pickupDetailScreen.style'

// Move the data array outside of the component
const data = [
  { id: 1, item: 'Quần áo', price: 17000 },
  { id: 2, item: 'Chăn, mền, mùng', price: 35000 },
  { id: 3, item: 'Topper', price: 50000 },
  { id: 4, item: 'Gối', price: 100000 },
]

const PickUpdetailScreenQuantity = ({ navigation, route }) => {
  const initialFormData =
    route.params && route.params.formData
      ? route.params.formData
      : { orderDetails: [] }

  const [formData, setFormData] = useState(initialFormData)

  const handleQuantity = (id, operation) => {
    setFormData((prevFormData) => {
      const newFormData = { ...prevFormData }
      const index = newFormData.orderDetails?.findIndex(
        (item) => item.itemId === id
      )

      if (index !== -1) {
        const selectedData = data.find((item) => item.id === id)
        const selectedPrice = selectedData.price
        const currentQuantity = newFormData.orderDetails[index].quantity

        if (operation === 'increment') {
          newFormData.orderDetails[index] = {
            ...newFormData.orderDetails[index],
            quantity: currentQuantity + 1,
            unitPrice: selectedPrice,
          }
        } else if (operation === 'decrement' && currentQuantity > 0) {
          newFormData.orderDetails[index] = {
            ...newFormData.orderDetails[index],
            quantity: currentQuantity - 1,
            unitPrice: selectedPrice,
          }

          // Remove the item if the quantity becomes 0
          if (currentQuantity - 1 === 0) {
            newFormData.orderDetails.splice(index, 1)
          }
        }
      } else {
        const selectedData = data.find((item) => item.id === id)
        const selectedPrice = selectedData.price

        if (operation === 'increment') {
          newFormData.orderDetails.push({
            itemId: id,
            weight: 0,
            quantity: 1,
            unitPrice: selectedPrice,
            shippingCost: 0,
          })
        }
      }

      return newFormData
    })
  }

  const handleSubmit = () => {
    if (formData.orderDetails.length < 1) {
      Alert.alert('Thông báo', 'Bạn phải chọn ít nhất 1 dịch vụ')
    } else {
      navigation.navigate(PICKUP_SCREEN_DETAIL, { formData: formData })
    }
  }

  return (
    <SafeAreaView style={pickupDetailScreenStyle.container}>
      <View style={pickupDetailScreenStyle.formContainer}>
        {data.map((item) => (
          <View style={styles.formItem} key={item.id}>
            <Text style={styles.item}>{item.item}</Text>
            <Text style={styles.infoItem}>{item.price} VND / kg</Text>
            <View style={styles.quantityContainer}>
              <TouchableOpacity
                style={styles.quantityMul}
                onPress={() => {
                  const currentQuantity =
                    formData.orderDetails.find((i) => i.itemId === item.id)
                      ?.quantity || 0
                  handleQuantity(item.id, 'decrement')
                }}
              >
                <Text style={styles.plusMinusButton}>-</Text>
              </TouchableOpacity>
              <TextInput
                style={styles.input}
                editable={false} // Disable direct editing
                value={
                  formData.orderDetails
                    .find((i) => i.itemId === item.id)
                    ?.quantity.toString() || '0'
                }
              />
              <TouchableOpacity
                style={styles.quantityPlus}
                onPress={() => {
                  const currentQuantity =
                    formData.orderDetails.find((i) => i.itemId === item.id)
                      ?.quantity || 0
                  handleQuantity(item.id, 'increment')
                }}
              >
                <Text style={styles.plusMinusButton}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
      <View style={pickupDetailScreenStyle.bottomBtn}>
        <ReusedButton
          text={'TIẾP TỤC'}
          color={COLORS.white}
          backgroundColor={COLORS.primary}
          onPress={handleSubmit}
        />
      </View>
    </SafeAreaView>
  )
}

export default PickUpdetailScreenQuantity
