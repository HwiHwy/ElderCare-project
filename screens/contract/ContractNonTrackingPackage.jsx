import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppBar, ReusedButton, ReusedText, reuse } from "../../components";
import { Text, TouchableOpacity, View } from "react-native";
import { COLORS, SIZES } from "../../constants";

const ContractNonTrackingPackage  = ({ route }) => {
  const { carerId } = route.params;
  const navigation = useNavigation();

 

  return (
    <SafeAreaView style={reuse.containerAndroidSafeArea}>
    <StatusBar style="auto" />
    <View style={reuse.textMid("center")}>
      <AppBar backIcon={true} onPress={() => navigation.goBack()} />
      <ReusedText
        text={"Hợp đồng chăm sóc theo dõi"}
        color={COLORS.primary}
        size={SIZES.xLarge}
        family={"bold"}
      ></ReusedText>
         <Text>Contract Tracking Screen</Text>
      <Text>Carer ID: {carerId}</Text>
    </View>
  </SafeAreaView>
  );
};
export default ContractNonTrackingPackage;
