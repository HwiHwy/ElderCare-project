// import DateTimePicker from '@react-native-community/datetimepicker'
import React, { useState } from 'react'
import {
  Alert,
  Button,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  TextInput,
  View,
} from 'react-native'
import { Calendar } from 'react-native-calendars'
import { AppBar, ReusedButton, ReusedText, reuse } from '../../components'
import { COLORS, SIZES, icons } from '../../constants'
import { PICKUP_SCREEN_DETAIL_QUANTITY } from '../../constants/nameRoute'
import styles from './PickUpScreenStyles'

const PickUpScreen = ({ navigation, route }) => {
  // const { id } = route.params
  // const [address, setAddress] = useState('')
  // const [pickUpDate, setPickUpDate] = useState('')
  // const [deliveryTime, setDeliveryTime] = useState(new Date())
  // const [showTimePicker, setShowTimePicker] = useState(false)
  // const [selectedDate, setSelectedDate] = useState('')
  // const [note, setNote] = useState('')

  // const [formData, setFormData] = useState({
  //   customerId: 0,
  //   storeId: id,
  //   pickUpTime: '',
  //   deliveryTime: '',
  //   orderTime: new Date().toISOString(),
  //   totalPrice: 0,
  //   address: '',
  //   orderDetails: [],
  // })
  // // console.log('Form Data:', formData);

  // const convertDateTime = (datetime) => {
  //   const parts = datetime.split(' ')
  //   const datePart = parts[0]
  //   const timePart = parts[1]

  //   // Convert time to 24-hour format
  //   let hours = parseInt(timePart.split(':')[0])
  //   const minutes = parseInt(timePart.split(':')[1])

  //   if (parts[2] === 'CH' && hours !== 12) {
  //     hours += 12
  //   } else if (parts[2] === 'SA' && hours === 12) {
  //     hours = 0
  //   }

  //   // Combine date and time parts
  //   const combinedDateTime = new Date(`${datePart}T${hours}:${minutes}:00.000Z`)

  //   // Format as ISO string
  //   const isoString = combinedDateTime.toISOString()
  //   return isoString
  // }

  // const handleAddressChange = (text) => {
  //   setFormData({ ...formData, address: text })
  // }

  // const handlePickupDate = (date) => {
  //   setPickUpDate(date)
  //   setSelectedDate(date)
  //   const combinedDateTime = `${date} ${deliveryTime.toLocaleTimeString()}`
  //   const newtime = convertDateTime(combinedDateTime)

  //   setFormData({ ...formData, pickUpTime: newtime })
  // }

  // const onChange = (event, selectedTime) => {
  //   const currentTime = selectedTime || deliveryTime
  //   setShowTimePicker(false)
  //   setDeliveryTime(currentTime)

  //   const combinedDateTime = `${pickUpDate} ${currentTime.toLocaleTimeString()}`
  //   const newtime = convertDateTime(combinedDateTime)
  //   setFormData({ ...formData, pickUpTime: newtime })
  // }

  // const handleNavToDetail = () => {
  //   const { address, pickUpTime } = formData
  //   if (!address || !pickUpTime) {
  //     Alert.alert(
  //       'Thiếu thông tin',
  //       'Bạn cần phải nhập đầy đủ thông tin để có thể qua bước tiếp theo'
  //     )
  //   } else {
  //     navigation.navigate(PICKUP_SCREEN_DETAIL_QUANTITY, {
  //       formData: formData,
  //     })
  //   }
  // }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <SafeAreaView style={reuse.containerAndroidSafeArea}>
        <StatusBar style="auto" />
        {/* <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <AppBar backIcon={true} onPress={() => navigation.goBack()} />
          <ReusedText
            text={'Thông tin lấy hàng'}
            color={COLORS.primary}
            size={SIZES.large}
            family={'bold'}
          />
        </View>

        <View style={styles.formAddress}>
          <ReusedText
            text={'Địa chỉ'}
            color={COLORS.primary}
            size={SIZES.large}
            family={'bold'}
          />
          <View style={styles.underlineContainer}>
            <View style={styles.textWithIconContainer}>
              <View>
                <TextInput
                  style={styles.underlineText}
                  value={formData.address}
                  onChangeText={handleAddressChange}
                  placeholder="Điền địa chỉ của bạn"
                />
              </View>
              <Image source={icons.edit} style={styles.editIcon} />
              <View style={styles.underline} />
            </View>
          </View>
        </View>

        <View style={styles.formCalendar}>
          <ReusedText
            text={'Ngày lấy đồ'}
            color={COLORS.primary}
            size={SIZES.large}
            family={'bold'}
          />
          <Calendar
            onDayPress={(day) => handlePickupDate(day.dateString)}
            minDate={new Date()}
            markedDates={
              selectedDate
                ? {
                    [selectedDate]: {
                      selected: true,
                      selectedColor: COLORS.primary,
                    },
                  }
                : {}
            }
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <ReusedText
              text={'Giờ nhận hàng'}
              color={COLORS.primary}
              size={SIZES.large}
              family={'bold'}
            />
            <View style={styles.dateTimePickerContainer}>
              <ReusedText
                color={COLORS.primary}
                size={SIZES.large}
                family={'bold'}
              />
              <Button
                title={deliveryTime.toLocaleTimeString()}
                onPress={() => setShowTimePicker(true)}
              />
              {showTimePicker && (
                <DateTimePicker
                  value={deliveryTime}
                  mode="time"
                  is24Hour={true}
                  display="default"
                  onChange={onChange}
                />
              )}
            </View>
          </View>
        </View>

        <View style={styles.formNote}>
          <ReusedText
            text={'Ghi chú'}
            color={COLORS.primary}
            size={SIZES.large}
            family={'bold'}
          />
          <View style={styles.textWithIconContainer}>
            <TextInput
              style={styles.underlineText}
              value={note}
              onChangeText={setNote}
              placeholder="Bạn có cần ghi chú ?"
            />
            <Image source={icons.edit} style={styles.editIcon} />
            <View style={styles.underline} />
          </View>
        </View>

        <View style={itemDetatilStyle.bottomBtn}>
          <ReusedButton
            text={'TIẾP TỤC'}
            color={COLORS.white}
            backgroundColor={COLORS.primary}
            onPress={handleNavToDetail}
          />
        </View> */}
      </SafeAreaView>
    </ScrollView>
  )
}

export default PickUpScreen
