import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ReusedButton, ReusedText, reuse } from '../../../components'
import { COLORS, SIZES } from '../../../constants'
import usePostOrderUser from '../../hooks/orderHooks/usePostOrderUser'

const MomoPayment = ({ navigation, route }) => {
  const initialFormData =
    route.params && route.params.dataPay ? route.params.dataPay : 'hi'
  const { checkout, checkoutLoading } = usePostOrderUser()
  const handleCheckout = async () => {
    await checkout(initialFormData)
  }

  return (
    <SafeAreaView style={reuse.containerAndroidSafeArea}>
      <View style={{ backgroundColor: '#A50164', height: 1000 }}>
        <View style={styles.container}>
          <ReusedText
            text={'Tổng số tiền phải thanh toán'}
            size={SIZES.medium}
            color={COLORS.white}
            family={'bold'}
          ></ReusedText>
          <View style={styles.wrapper}>
            <ReusedText
              color={COLORS.white}
              text={initialFormData?.totalPrice}
              size={SIZES.xxLarge}
              family={'bold'}
            ></ReusedText>
            <Text style={styles.vnd}>đ</Text>
          </View>
        </View>
        <View style={styles.container}>
          <Image
            style={styles.tinyLogo}
            source={require('../../../assets/images/momopayment.jpeg')}
          />
        </View>
        <View style={styles.wrapButton}>
          <ReusedButton
            text={'Quay lại'}
            backgroundColor={COLORS.gray}
            width={100}
            color={COLORS.white}
            onPress={() => navigation.goBack()}
          ></ReusedButton>

          {checkoutLoading ? (
            <ReusedButton
              text={'Đang xác thực...'}
              backgroundColor={COLORS.gray}
              width={250}
              color={COLORS.white}
              onPress={handleCheckout}
            ></ReusedButton>
          ) : (
            <ReusedButton
              text={'Đã chuyển tiền'}
              backgroundColor={COLORS.primary}
              width={250}
              color={COLORS.white}
              onPress={handleCheckout}
            ></ReusedButton>
          )}
        </View>
      </View>
    </SafeAreaView>
  )
}

export default MomoPayment

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
  },
  tinyLogo: {
    width: 400,
    height: 400,
  },
  vnd: {
    fontSize: SIZES.small,
    color: COLORS.white,
  },
  wrapButton: {
    paddingTop: 20,
    display: 'flex',
    flexDirection: 'row',
    gap: 20,
    justifyContent: 'center',
  },
})
