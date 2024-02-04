import React from 'react'
import { Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AppBar, ReusedText, reuse } from '../../components'
import { COLORS, SIZES } from '../../constants'

const AboutUs = ({ navigation }) => {

  return (
    <SafeAreaView style={reuse.containerAndroidSafeArea}>
      <View
        style={{
          height: 50,
        }}
      >
        <AppBar
          onPress={() => navigation.goBack()}
          backIcon={true}
        />
      </View>
     
    </SafeAreaView>
  )
}

export default AboutUs
