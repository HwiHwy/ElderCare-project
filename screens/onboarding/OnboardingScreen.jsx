import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { ReusedText, reuse } from '../../components'
import Onboarding from 'react-native-onboarding-swiper'
import { COLORS, SIZES, images } from '../../constants'
import styleOnboarding from './onboarding.style'
import { BOTTOM } from '../../constants/nameRoute'

export default function OnboardingScreen({ navigation }) {
  const handleDone = () => {
    navigation.navigate(BOTTOM)
  }

  const doneButton = ({ ...props }) => {
    return (
      <TouchableOpacity style={styleOnboarding.doneButton} {...props}>
        <ReusedText text={'Hoàn tất '} size={SIZES.medium} />
      </TouchableOpacity>
    )
  }

  return (
    <View style={styleOnboarding.container}>
      <Onboarding
        bottomBarHighlight={false}
        nextLabel={'Tiếp theo'}
        skipLabel={'Bỏ qua'}
        onDone={handleDone}
        onSkip={handleDone}
        DoneButtonComponent={doneButton}
        containerStyles={{ paddingHorizontal: 25 }}
        pages={[
          {
            backgroundColor: COLORS.primary,
            image: (
              <View style={styleOnboarding.picturee}>
                <Image
                  source={images.onboarding1}
                  style={styleOnboarding.insidePic}
                />
              </View>
            ),
            title: 'Lấy đồ',
            subtitle: 'Done with React Native Onboarding Swiper',
          },
          {
            backgroundColor: COLORS.mint,
            image: (
              <View style={styleOnboarding.picturee}>
                <Image
                  source={images.onboarding2}
                  style={styleOnboarding.insidePic}
                />
              </View>
            ),
            title: 'Giặt',
            subtitle: 'Done with React Native Onboarding Swiper',
          },
          {
            backgroundColor: COLORS.tertiary,
            image: (
              <View style={styleOnboarding.picturee}>
                <Image
                  source={images.onboarding3}
                  style={styleOnboarding.insidePic}
                />
              </View>
            ),
            title: 'Giao đồ',
            subtitle: 'Done with React Native Onboarding Swiper',
          },
        ]}
      />
    </View>
  )
}
