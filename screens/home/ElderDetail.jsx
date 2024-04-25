import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  SafeAreaView,
  StyleSheet,
  ScrollView,
} from "react-native";
import { COLORS, SIZES, images } from "../../constants";
import { AppBar, ReusedButton, ReusedText, reuse } from "../../components";
import homeStyle from "./home.style";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useRoute } from "@react-navigation/native";

const ElderDetail = () => {
  const [elderData, setElderData] = useState(null);
  const navigation = useNavigation();
  const route = useRoute();

  useEffect(() => {
    const fetchElderData = async () => {
      try {
        const token = await AsyncStorage.getItem("tokenUser");
        const elderId = route.params?.elderId;
        const response = await fetch(
          `https://elder-care-api.monoinfinity.net/api/Elder/${elderId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        setElderData(data);
      } catch (error) {
        console.error("Error fetching elder data:", error);
      }
    };

    fetchElderData();
  }, []);

  return (
    <SafeAreaView style={reuse.containerAndroidSafeArea}>
      <View style={homeStyle.appBarWrapper}>
        <View style={reuse.textMid("center")}>
          <AppBar backIcon={true} onPress={() => navigation.goBack()} />
          <ReusedText
            text={"THÔNG TIN NGƯỜI GIÀ"}
            color={COLORS.primary}
            size={SIZES.xLarge}
            family={"bold"}
          ></ReusedText>
        </View>
      </View>
      <ScrollView>
        {elderData && (
          <View style={styles.infoContainer}>
            <Image
              source={{
                uri: "https://files.scmagazine.com/wp-content/uploads/2022/09/091222_google_logo.jpg",
              }}
              style={styles.image}
            />

            <View style={styles.detailsContainer}>
              <View style={styles.labelTextRowName}>
                <Text style={styles.textName}>{elderData.name}</Text>
              </View>
              <View style={styles.labelTextRow}>
                <Text style={styles.label}>Tuổi:</Text>
                <Text style={styles.text}>
                  {elderData.age ? elderData.age : "N/A"}
                </Text>
              </View>
              <View style={styles.labelTextRow}>
                <Text style={styles.label}>Quan hệ:</Text>
                <Text style={styles.text}>
                  {elderData.relationshiptocustomer}
                </Text>
              </View>
              <View style={styles.labelTextRow}>
                <Text style={styles.label}>Địa chỉ:</Text>
                <Text style={styles.text}>{elderData.address}</Text>
              </View>
              <View style={styles.labelTextRow}>
                <Text style={styles.label}>Contracts:</Text>
                <Text style={styles.text}>
                  {elderData.contracts.length > 0
                    ? elderData.contracts.join(", ")
                    : "N/A"}
                </Text>
              </View>

              <View style={styles.labelTextRow}>
                <Text style={styles.label}>Tình trạng sức khoe:</Text>
                <Text style={styles.text}>{elderData.healthDetail}</Text>
              </View>
              <View style={styles.labelTextRow}>
                <Text style={styles.label}>Living Condition:</Text>
                <Text style={styles.text}>{elderData.livingcondition}</Text>
              </View>
              <View style={styles.labelTextRow}>
                <Text style={styles.label}>Sở thích:</Text>
                <Text style={styles.text}>{elderData.hobbies}</Text>
              </View>
              <View style={styles.labelTextRow}>
                <Text style={styles.label}>Ghi chú:</Text>
                <Text style={styles.text}>
                  {elderData.note ? elderData.note : "N/A"}
                </Text>
              </View>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: SIZES.padding,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: SIZES.padding,
  },
  infoContainer: {
    flexDirection: "column",
    alignItems: "center",
    paddingHorizontal: SIZES.medium,
    paddingVertical: SIZES.medium,
    borderRadius: SIZES.medium,
    backgroundColor: COLORS.white,
    marginBottom: SIZES.medium,
    height: 1001,
  },
  image: {
    width: "100%",
    height: 500,
    borderRadius: SIZES.medium,
    marginBottom: SIZES.medium,
  },
  detailsContainer: {
    width: "100%",
  },
  labelTextRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  label: {
    fontSize: SIZES.medium,
    fontWeight: "bold",
    marginRight: 5,
  },
  text: {
    fontSize: SIZES.medium,
  },
  labelTextRowName: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: SIZES.small,
  },

  textName: {
    fontSize: SIZES.xxLarge,
    color: COLORS.primary,
    fontWeight: "bold"
  },
});

export default ElderDetail;
