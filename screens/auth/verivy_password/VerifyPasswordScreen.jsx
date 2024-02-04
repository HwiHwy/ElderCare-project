import { StatusBar } from 'expo-status-bar'
import React, { useRef, useState } from 'react'
import {
  Image,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native'
import {
  AppBar,
  HeightDivider,
  ReusedButton,
  ReusedText,
} from '../../../components'
import { COLORS, SIZES, images } from '../../../constants'

export default function VerifyPasswordScreen({ navigation }) {
  const numberOfInputs = 4
  const [codes, setCodes] = useState(Array(numberOfInputs).fill(''))
  const inputRefs = useRef(
    [...Array(numberOfInputs)].map(() => React.createRef())
  )

  const handleCodeChange = (text, index) => {
    if (/^\d*$/.test(text) && text.length <= 1) {
      const newCodes = [...codes]
      newCodes[index] = text
      setCodes(newCodes)

      // Automatically focus on the next input field
      if (text.length === 1 && index < numberOfInputs - 1) {
        inputRefs.current[index + 1].current.focus()
      }
    } else if (text.length === 0 && index > 0) {
      // Handle backspace to go back to the previous input field
      inputRefs.current[index - 1].current.focus()
    }
  }

  const handleSubmitCode = () => {
    const stringCode = convertString(codes)
  }

  const convertString = (array) => {
    const result = parseInt(array.join(''), 10)
    return result
  }

  return (
    <KeyboardAvoidingView behavior="position" style={styles.container}>
      <ScrollView>
        <StatusBar style="auto" />
        <View style={styles.appBar}>
          <AppBar backIcon={true} onPress={() => navigation.goBack()} />
        </View>
        <View style={styles.containerLogo}>
          <Image source={images.logowcolor} style={styles.imageLogo} />
        </View>
        <View style={styles.textWrap}>
          <ReusedText
            text={'Kiểm tra điện thoại của bạn'}
            color={COLORS.passwordColor}
            size={SIZES.xLarge}
          />
          <HeightDivider height={15} />

          <ReusedText
            text={'Chúng tôi đã gửi code cho bạn'}
            color={COLORS.gray}
            size={SIZES.large}
          />
          <HeightDivider height={10} />

          <View style={styles.containerOTP}>
            {Array.from({ length: numberOfInputs }).map((_, index) => (
              <TextInput
                key={index}
                style={styles.codeOTP}
                keyboardType="numeric"
                maxLength={1}
                value={codes[index]}
                onChangeText={(text) => handleCodeChange(text, index)}
                ref={inputRefs.current[index]}
              />
            ))}
          </View>
          <HeightDivider height={50} />

          <View>
            <ReusedButton
              onPress={handleSubmitCode}
              text={'Xác nhận'}
              color={COLORS.white}
              backgroundColor={COLORS.primary}
              width={350}
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerLogo: {
    height: 250,
    marginHorizontal: 20,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageLogo: {
    objectFit: 'contain',
    width: 350,
  },
  appBar: {
    height: 35,
    marginTop: 80,
  },
  textWrap: {
    height: 400,
    alignItems: 'center',
  },
  containerOTP: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  codeOTP: {
    width: 64,
    height: 64,
    borderRadius: 10,
    backgroundColor: '#dde4ec',
    textAlign: 'center',
    fontSize: 40,
    fontWeight: '600',
    margin: 5,
  },
})
