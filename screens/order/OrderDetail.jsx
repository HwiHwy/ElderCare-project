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

export default function OrderDetail({ navigation, route }) {
  const { item, user } = route.params
  const shippingCost = item.details[0]?.shippingCost || 0
  const setStatus = (statusInt) => {
    switch (statusInt) {
      case 1:
        return 'Đang chờ'
      case 2:
        return 'Chấp nhận'
      case 3:
        return 'Đã bị huỷ'
      default:
        return 'Unknown'
    }
  }
  const totalQuantity = item?.details?.reduce(
    (total, item) => total + item.quantity,
    0
  )
  const CartItem = (cart) => {
    return (
      <View style={styleOrder.cart}>
        <View style={styleOrder.cartInfo}>
          <Image source={shirt} style={styleOrder.cartIcon} />
          <View style={styleOrder.cartItem}>
            <ReusedText text={cart.title.item.name} size={SIZES.medium} />
            <ReusedText
              text={cart.title.item.description}
              color={COLORS.gray}
              size={SIZES.small}
            />
            <ReusedText
              text={cart.title.item.price + 'đ'}
              size={SIZES.medium}
            />
          </View>
        </View>
        <View style={styleOrder.cartQuantity}>
          <ReusedText text={'SL:' + cart.title.quantity} size={SIZES.medium} />
        </View>
      </View>
    )
  }
  return (
    <SafeAreaView style={reuse.containerAndroidSafeArea}>
      <StatusBar style="auto" />
      <View style={[reuse.textMid('center'), { height: 50 }]}>
        <AppBar
          title={'Thông tin đơn hàng'}
          backIcon={true}
          onPress={() => navigation.navigate(ORDER_SCREEN)}
        />
      </View>

      {/* block */}
      <View style={styleOrder.container}>
        {/* status */}
        <View style={styleOrder.detailStatus}>
          <ReusedText
            text={setStatus(item.status)}
            size={SIZES.xLarge}
            family={'bold'}
            color={COLORS.tertiary}
          />
        </View>
        {/* info */}
        <View style={styleOrder.detailContent}>
          <View style={styleOrder.detailInfo}>
            <ReusedText text={'Đơn hàng:'} size={SIZES.large} />
            <ReusedText text={item.id} size={SIZES.large} family={'bold'} />
          </View>

          <View style={styleOrder.contentItem}>
            <ReusedText
              text={'Ngày nhận đồ'}
              size={SIZES.medium}
              color={COLORS.gray}
            />
            <ReusedText
              text={parseDateStringToDate(item.pickUpTime)}
              size={SIZES.medium}
              family={'bold'}
            />
          </View>
          <View style={styleOrder.contentItem}>
            <ReusedText
              text={'Ngày trả đồ (dự kiến):'}
              size={SIZES.medium}
              color={COLORS.gray}
            />
            <ReusedText
              text={parseDateStringToDate(item.deliveryTime)}
              size={SIZES.medium}
              family={'bold'}
            />
          </View>
          <View style={styleOrder.contentItem}>
            <ReusedText
              text={'Địa chỉ chi tiết:'}
              size={SIZES.medium}
              color={COLORS.gray}
            />
            <ReusedText
              text={item.address}
              size={SIZES.medium}
              family={'bold'}
            />
          </View>
        </View>
        {/* user */}
        <View style={styleOrder.userGroup}>
          <Image source={Avatar} style={styleOrder.avatarImg} />
          <View style={styleOrder.userInfo}>
            <ReusedText
              text={user.lastName}
              size={SIZES.large}
              family={'bold'}
            />
            <ReusedText text={user.phone} size={SIZES.medium} />
          </View>
        </View>
        {/* cart */}
        <HeightDivider height={20} />
        <View style={styleOrder.cartContainer}>
          <View style={styleOrder.total}>
            <ReusedText text={'Tổng số đồ cần giặt'} size={SIZES.medium} />
            <ReusedText
              text={totalQuantity}
              size={SIZES.medium}
              color={COLORS.primary}
            />
          </View>
          <FlatList
            data={item.details}
            renderItem={({ item: orderItem }) => <CartItem title={orderItem} />}
            keyExtractor={(item) => item.id}
          />
          <View style={styleOrder.total}>
            <ReusedText text={'Phí ship'} size={SIZES.medium} />
            <ReusedText
              text={shippingCost + 'đ'}
              size={SIZES.medium}
              color={COLORS.primary}
            />
          </View>
          <View style={styleOrder.total}>
            <ReusedText text={'Tổng cộng'} size={SIZES.medium} />
            <ReusedText
              text={item.totalPrice + shippingCost + 'đ'}
              size={SIZES.medium}
              color={COLORS.primary}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}
