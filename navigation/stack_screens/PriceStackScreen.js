import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { PRICE_SCREEN } from '../../constants/nameRoute'
import { PriceTable } from '../../screens'

const PriceStack = createNativeStackNavigator()

export default function PriceStackScreen() {
  return (
    <PriceStack.Navigator>
      <PriceStack.Screen
        name={PRICE_SCREEN}
        component={PriceTable}
        options={{ headerShown: false }}
      />
    </PriceStack.Navigator>
  )
}
