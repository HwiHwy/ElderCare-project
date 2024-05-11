import { createNativeStackNavigator } from '@react-navigation/native-stack'
import {
  CONTRACT_DETAIL_SCREEN,
  ORDER_DETAIL_SCREEN,
  ORDER_SCREEN,
  SELECT_LOCATION_SCREEN,
} from '../../constants/nameRoute'
import OrderPage from '../../screens/order/OrderPage'
import Schedule from '../../screens/schedule/Schedule'
import ContractDetailScreen from '../../screens/schedule/ContractDetailScreen'

const OrderStack = createNativeStackNavigator()

export default function OrderStackScreen() {
  return (
    <OrderStack.Navigator>
      <OrderStack.Screen
        name={ORDER_SCREEN}
        component={Schedule}
        options={{ headerShown: false }}
      />
      <OrderStack.Screen
        name={CONTRACT_DETAIL_SCREEN}
        component={ContractDetailScreen}
        options={{ headerShown: false }}
      />


    </OrderStack.Navigator>
  )
}
