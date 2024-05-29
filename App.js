import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useFonts } from 'expo-font'
import * as Splashscreen from 'expo-splash-screen'
import { useCallback, useEffect, useRef } from 'react'
import {
  BOTTOM,
  FORGOT_SCREEN,
  HOME_SCREEN,
  LOGIN_MAIN,
  LOGIN_SCREEN,
  ONBOARDING_SCREEN,
  ORDER_DETAIL_SCREEN,
  REGISTER_SCREEN,
  VERIFY_SCREEN,
} from './constants/nameRoute'
import BottomTabNavigation from './navigation/BottomTabNavigation'
import {
  ForgotPasswordScreen,
  Home,
  LoginMain,
  LoginScreen,
  OnboardingScreen,
  OrderDetail,
  RegisterSreen,
  VerifyPasswordScreen,
} from './screens'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
// import * as Notifications from 'expo-notifications';
import useFirebase from './hook/useFirebase';

const Stack = createNativeStackNavigator()

export default function App() {
  const notificationListener = useRef();
  const responseListener = useRef();

  // const registerNoti = async () => {
  //   console.log("Registering for push notifications...");
  //   const token = await useFirebase().registerForPushNotificationsAsync()
  // }

  // useEffect(() => {r
  //   registerNoti();
  //   notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
  //     console.log(notification);
  //   });

  //   responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
  //     console.log(response);
  //   });

  //   return () => {
  //     Notifications.removeNotificationSubscription(notificationListener.current);
  //     Notifications.removeNotificationSubscription(responseListener.current);
  //   };
  // }, []);
  const [fontsLoaded] = useFonts({
    light: require('./assets/fonts/NunitoLight.ttf'),
    regular: require('./assets/fonts/NunitoRegular.ttf'),
    semibold: require('./assets/fonts/NunitoBold.ttf'),
    bold: require('./assets/fonts/NunitoBigBold.ttf'),
    xbold: require('./assets/fonts/NunitoExtraBold.ttf'),
  })
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await Splashscreen.hideAsync()
    }
  }, [fontsLoaded])

  if (!fontsLoaded) {
    return null
  }

  // Notifications.setNotificationHandler({
  //   handleNotification: async () => ({
  //     shouldShowAlert: true,
  //     shouldPlaySound: false,
  //     shouldSetBadge: false,
  //   }),
  // });

  console.log("aaa");

  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      
      <NavigationContainer>
        
        <Stack.Navigator initialRouteName={BOTTOM}>
          <Stack.Screen
            name={LOGIN_SCREEN}
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name={LOGIN_MAIN}
            component={LoginMain}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name={REGISTER_SCREEN}
            component={RegisterSreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name={FORGOT_SCREEN}
            component={ForgotPasswordScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name={VERIFY_SCREEN}
            component={VerifyPasswordScreen}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name={ONBOARDING_SCREEN}
            component={OnboardingScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name={HOME_SCREEN}
            component={Home}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name={ORDER_DETAIL_SCREEN}
            component={OrderDetail}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name={BOTTOM}
            component={BottomTabNavigation}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
        
      </NavigationContainer>
      
    </QueryClientProvider>
  )
}
