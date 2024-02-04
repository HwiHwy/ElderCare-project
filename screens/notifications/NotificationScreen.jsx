import React from 'react'
import { View, Text, SafeAreaView, Image, FlatList } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { AppBar, ReusedText, reuse } from '../../components'
import { COLORS, SIZES, icons } from '../../constants'
import styles from './NotificationStyles'

const notifications = [
  {
    id: 1,
    icon: icons.confirm,
    status: 'Order Confirmed',
    date: '22/06/2023 09:00 AM',
    detail: 'Your order #10234 has been confirmed',
  },
  {
    id: 2,
    icon: icons.pickup,
    status: 'Order Pick Up',
    date: '22/06/2023 09:00 AM',
    detail: 'Your order #10234 has been picked up',
  },
  {
    id: 3,
    icon: icons.delivery,
    status: 'Order Delivered',
    date: '22/06/2023 09:00 AM',
    detail: 'Your order #10234, all clothes have been delivered',
  },
  {
    id: 4,
    icon: icons.cancel,
    status: 'Order Canceled',
    date: '22/06/2023 09:00 AM',
    detail: 'Your order #10234 has been rejected',
  },
]

export default function NotificationScreen({ navigation }) {
  const renderItem = ({ item }) => (
    <View style={styles.notificationForm}>
      <View style={styles.notificationRow}>
        <View style={styles.notificationIconContainer}>
          <Image source={item.icon} style={styles.notificationIcon} />
        </View>
        <View style={styles.notificationRow}>
          <Text style={styles.notificationStatus}>{item.status}</Text>
          <Text style={styles.notificationDate}> | {item.date}</Text>
        </View>
      </View>
      <View style={styles.notificationRow}>
        <Text style={styles.notificationDetail}>{item.detail}</Text>
      </View>
    </View>
  )

  return (
    <SafeAreaView style={reuse.containerAndroidSafeArea}>
      <StatusBar style="auto" />
      <View
        style={{ alignItems: 'center', justifyContent: 'center', height: 30 }}
      >
        <AppBar
          title={'NOTIFICATION'}
          backIcon={true}
          onPress={() => navigation.goBack()}
        />
        {/* <ReusedText
          text={'NOTIFICATION'}
          color={COLORS.primary}
          size={SIZES.xxLarge}
          family={'bold'}
        ></ReusedText> */}
      </View>
      <FlatList
        data={notifications}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </SafeAreaView>
  )
}
