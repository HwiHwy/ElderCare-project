import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { CHATBOX_SCREEN } from '../../constants/nameRoute'
import { ChatBox } from '../../screens'

const ChatboxStack = createNativeStackNavigator()

export default function ChatboxStackScreen() {
  return (
    <ChatboxStack.Navigator>
      <ChatboxStack.Screen
        name={CHATBOX_SCREEN}
        component={ChatBox}
        options={{ headerShown: false }}
      />
    </ChatboxStack.Navigator>
  )
}
