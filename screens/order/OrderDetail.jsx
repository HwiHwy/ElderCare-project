import React from 'react'
import { FlatList, Image, SafeAreaView, StatusBar, View } from 'react-native'
import { AppBar, HeightDivider, ReusedText, reuse } from '../../components'
import { COLORS, SIZES } from '../../constants'
import styleOrder from './order.style'

// import Avatar from '../../constants/images'
// import shirt from '../../constants/icons'

import shirt from '../../assets/icons/011-shirt.png'
import Avatar from '../../assets/images/Ava.png'
import { parseDateStringToDate } from '../../utils/convertDate'
import { ORDER_SCREEN } from '../../constants/nameRoute'

export default function OrderDetail() {

  return (
    <SafeAreaView style={reuse.containerAndroidSafeArea}>
      <Text>aaaaaaaaaa</Text>
    </SafeAreaView>
  )
}
