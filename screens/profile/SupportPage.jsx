import React from 'react'
import { Linking, Pressable, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AppBar, ReusedButton, ReusedText, reuse } from '../../components'
import {
  AntDesign,
  FontAwesome5,
  Ionicons,
  MaterialIcons,
} from '@expo/vector-icons'
import styleProfile from './profile.style'
import { COLORS, SIZES } from '../../constants'
import { TERM_SCREEN, USER_PROFILE_SCREEN } from '../../constants/nameRoute'

const SupportPage = ({ navigation }) => {
  const handlePress = () => {
    const facebookLink = 'https://www.facebook.com/hamper.fptu' // Replace with your Facebook page link
    Linking.openURL(facebookLink)
  }
  return (
    <SafeAreaView style={reuse.containerAndroidSafeArea}>
      <View>
        <AppBar
          backIcon={true}
          onPress={() => navigation.navigate(USER_PROFILE_SCREEN)}
          title={'HỖ TRỢ'}
        />
      </View>
      <View style={styleProfile.container}>
        <View style={styleProfile.profileNav}>
          <Pressable style={styleProfile.nav2} onPress={handlePress}>
            <View style={styleProfile.nav3}>
              <Ionicons name="call" size={24} color={COLORS.primary} />
              <ReusedText
                text={'Liên hệ (Facebook)'}
                size={SIZES.large}
                family={'bold'}
                color={COLORS.primary}
              />
            </View>

            <AntDesign name="right" size={19} color={COLORS.gray2} />
          </Pressable>
          <Pressable
            style={styleProfile.nav2}
            onPress={() => navigation.navigate(TERM_SCREEN)}
          >
            <View style={styleProfile.nav3}>
              <Ionicons
                name="document-text-outline"
                size={24}
                color={COLORS.primary}
              />
              <ReusedText
                text={'Điều khoản và điều kiện'}
                size={SIZES.large}
                family={'bold'}
                color={COLORS.primary}
              />
            </View>

            <AntDesign name="right" size={19} color={COLORS.gray2} />
          </Pressable>
          <Pressable style={styleProfile.nav2}>
            <View style={styleProfile.nav3}>
              <MaterialIcons name="feedback" size={24} color={COLORS.primary} />
              <ReusedText
                text={'Đánh giá'}
                size={SIZES.large}
                family={'bold'}
                color={COLORS.primary}
              />
            </View>
            <AntDesign name="right" size={19} color={COLORS.gray2} />
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default SupportPage
