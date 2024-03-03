import { createNativeStackNavigator } from '@react-navigation/native-stack'
import {
  ORDER_DETAIL_SCREEN,
  ORDER_SCREEN,
  SELECT_LOCATION_SCREEN,
} from '../../constants/nameRoute'
import OrderPage from '../../screens/order/OrderPage'
import Schedule from '../../screens/schedule/Schedule'

const OrderStack = createNativeStackNavigator()

export default function OrderStackScreen() {
  return (
    <OrderStack.Navigator>
      <OrderStack.Screen
        name={ORDER_SCREEN}
        component={Schedule}
        options={{ headerShown: false }}
      />


    </OrderStack.Navigator>
  )
}
