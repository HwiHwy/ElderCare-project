import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  CARERDETAIL_SCREEN,
  // CARERDETAIL_SCREEN,
  HOME_SCREEN,
  MOMO_PAYMENT_SCREEN,
  PICKUP_SCREEN,
  PICKUP_SCREEN_DETAIL,
  PICKUP_SCREEN_DETAIL_QUANTITY,
  SEARCH_RESULT_SCREEN,
  SEARCH_SCREEN,
} from "../../constants/nameRoute";
import {
  Home,
  PickUpScreen,
  PickUpScreenDetail,
  Search,
  TestScreen,
  PickUpScreenDetailQuantity,
} from "../../screens";
import MomoPayment from "../../screens/pickup/momo/MomoPayment";
import SearchResult from "../../screens/search/SearchResult";
import CarerDetail from "../../screens/carerdetail/CarerDetail";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const HomeStack = createNativeStackNavigator();

export default function HomeStackScreen() {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <HomeStack.Navigator>
        <HomeStack.Screen
          name={HOME_SCREEN}
          component={Home}
          options={{ headerShown: false }}
        />
        <HomeStack.Screen
          name={SEARCH_SCREEN}
          component={Search}
          options={{ headerShown: false }}
        />
        <HomeStack.Screen
          name={SEARCH_RESULT_SCREEN}
          component={SearchResult}
          options={{ headerShown: false }}
        />

        <HomeStack.Screen
          name={CARERDETAIL_SCREEN}
          component={CarerDetail}
          options={{ headerShown: false, presentation: "transparentModal" }}
        />
        <HomeStack.Screen
          name={PICKUP_SCREEN}
          component={PickUpScreen}
          options={{ headerShown: false }}
        />
        <HomeStack.Screen
          name={PICKUP_SCREEN_DETAIL}
          component={PickUpScreenDetail}
          options={{ headerShown: false }}
        />
        <HomeStack.Screen
          name={PICKUP_SCREEN_DETAIL_QUANTITY}
          component={PickUpScreenDetailQuantity}
          options={{ headerShown: false }}
        />
        <HomeStack.Screen
          name={MOMO_PAYMENT_SCREEN}
          component={MomoPayment}
          options={{ headerShown: false }}
        />
      </HomeStack.Navigator>
    </GestureHandlerRootView>
  );
}
