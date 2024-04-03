import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  CARERDETAIL_SCREEN,
  ELDER_DETAIL_SCREEN,
  HOME_SCREEN,
  MOMO_PAYMENT_SCREEN,
  PICKUP_SCREEN,
  PICKUP_SCREEN_DETAIL,
  PICKUP_SCREEN_DETAIL_QUANTITY,
  SEARCH_RESULT_SCREEN,
  SEARCH_SCREEN,
  BASIC_SEARCH_SCREEN,
  CREATE_CONTRACT_FORM_SCREEN,
  CREATE_ELDER_FORM_SCREEN,
  DETAIL_SEARCH_SCREEN
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
import ElderDetail from "../../screens/home/ElderDetail";
import CreateContract from "../../screens/search/CreateContract";
import CreateElderForm from "../../screens/home/CreateElderForm";
import BasicService from "../../screens/search/SearchOption/BasicService";
import DetailServiceOption from "../../screens/search/SearchOption/DetailServiceOption";

const HomeStack = createNativeStackNavigator();

export default function HomeStackScreen() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
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
          name={DETAIL_SEARCH_SCREEN}
          component={DetailServiceOption}
          options={{ headerShown: false }}
        />
        <HomeStack.Screen
          name={BASIC_SEARCH_SCREEN}
          component={BasicService}
          options={{ headerShown: false }}
        />
        <HomeStack.Screen
          name={CREATE_CONTRACT_FORM_SCREEN}
          component={CreateContract}
          options={{ headerShown: false }}
        />
        <HomeStack.Screen
          name={CREATE_ELDER_FORM_SCREEN}
          component={CreateElderForm}
          options={{ headerShown: false }}
        />
        <HomeStack.Screen
          name={CARERDETAIL_SCREEN}
          component={CarerDetail}
          options={{ headerShown: false, presentation: "transparentModal" }}
        />
        <HomeStack.Screen
          name={ELDER_DETAIL_SCREEN}
          component={ElderDetail}
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
