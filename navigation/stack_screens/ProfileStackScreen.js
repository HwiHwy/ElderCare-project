import { createNativeStackNavigator } from '@react-navigation/native-stack'
import {
  ABOUT_US_SCREEN,
  CARER_BOOKING_HISTORY_SCREEN,
  CARER_PAID_SCREEN,
  CARER_PAID_SCREEN_DETAIL,
  CHANGE_PASSWORD_SCREEN,
  CONTRACT_NON_TRACKING,
  CONTRACT_TRACKING,
  EDIT_PROFILE_SCREEN,
  NOTIFICATION_SCREEN,
  PROFILE_DETAILS_SCREEN,
  SUPPORT_SCREEN,
  TERM_SCREEN,
  USER_PROFILE_SCREEN,
} from '../../constants/nameRoute'
import { NotificationScreen, TestScreen, UserProfile } from '../../screens'
import AboutUs from '../../screens/profile/AboutUs'
import ChangePassword from '../../screens/profile/ChangePassword'
import EditProfile from '../../screens/profile/EditProfile'
import ProfileDetail from '../../screens/profile/ProfileDetail'
import SupportPage from '../../screens/profile/SupportPage'
import TermAndServices from '../../screens/profile/TermAndServices'
import HistoryCarer from '../../screens/profile/HistoryCarer'
import DetailCarerPaid from '../../screens/profile/DetailCarerPaid/DetailCarerPaid'
import ContractNonTracking from '../../screens/contract/ContractNonTracking'
import ContractTracking from '../../screens/contract/ContractTracking'

const ProfileStack = createNativeStackNavigator()

export default function ProfileStackScreen() {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name={USER_PROFILE_SCREEN}
        component={UserProfile}
        options={{ headerShown: false }}
      />
      <ProfileStack.Screen
        name={NOTIFICATION_SCREEN}
        component={NotificationScreen}
        options={{ headerShown: false }}
      />
      <ProfileStack.Screen
        name={PROFILE_DETAILS_SCREEN}
        component={ProfileDetail}
        options={{ headerShown: false }}
      />
      <ProfileStack.Screen
        name={EDIT_PROFILE_SCREEN}
        component={EditProfile}
        options={{ headerShown: false }}
      />
      <ProfileStack.Screen
        name={CHANGE_PASSWORD_SCREEN}
        component={ChangePassword}
        options={{ headerShown: false }}
      />
      <ProfileStack.Screen
        name={SUPPORT_SCREEN}
        component={SupportPage}
        options={{ headerShown: false }}
      />
      <ProfileStack.Screen
        name={ABOUT_US_SCREEN}
        component={AboutUs}
        options={{ headerShown: false }}
      />
      <ProfileStack.Screen
        name={TERM_SCREEN}
        component={TermAndServices}
        options={{ headerShown: false }}
      />
      <ProfileStack.Screen
        name={CARER_BOOKING_HISTORY_SCREEN}
        component={HistoryCarer}
        options={{ headerShown: false }}
      />
      <ProfileStack.Screen
        name={CARER_PAID_SCREEN_DETAIL}
        component={DetailCarerPaid}
        options={{ headerShown: false }}
      />
      <ProfileStack.Screen
        name={CONTRACT_NON_TRACKING}
        component={ContractNonTracking}
        options={{ headerShown: false }}
      />
       <ProfileStack.Screen
        name={CONTRACT_TRACKING}
        component={ContractTracking}
        options={{ headerShown: false }}
      />
      
      
      <ProfileStack.Screen name="TestScreen" component={TestScreen} />
    </ProfileStack.Navigator>
  )
}
