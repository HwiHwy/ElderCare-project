import { createNativeStackNavigator } from '@react-navigation/native-stack'
import {
  ORDER_DETAIL_SCREEN,
  ORDER_SCREEN,
  SELECT_LOCATION_SCREEN,
} from '../../constants/nameRoute'
import OrderPage from '../../screens/order/OrderPage'

const OrderStack = createNativeStackNavigator()

export default function OrderStackScreen() {
  return (
    <OrderStack.Navigator>
      <OrderStack.Screen
        name={ORDER_SCREEN}
        component={OrderPage}
        options={{ headerShown: false }}
      />


    </OrderStack.Navigator>
  )
}
