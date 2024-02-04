import { createNativeStackNavigator } from '@react-navigation/native-stack'
import {
  ABOUT_US_SCREEN,
  CHANGE_PASSWORD_SCREEN,
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
      <ProfileStack.Screen name="TestScreen" component={TestScreen} />
    </ProfileStack.Navigator>
  )
}
