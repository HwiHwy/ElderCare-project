import React, { useCallback, useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  StyleSheet,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AppBar, ReusedText, reuse } from "../../components";
import { COLORS, SIZES } from "../../constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ContractDetail = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { carerId = "" } = route.params;
  const [storedData, setStoredData] = useState(null);
  const [elderData, setElderData] = useState([]);
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [bearerToken, setBearerToken] = useState("");
  const [selectedElderId, setSelectedElderId] = useState(null);
  const [elderList, setElderList] = useState([]);
  const [sendData, setSendData] = useState({
    carerId: carerId,
    customerId: null, // Initialize to null
    elderlyId: null,
  });
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem("userData");
        if (userData) {
          const parsedData = JSON.parse(userData);
          setStoredData(parsedData);
        }
      } catch (error) {
        console.error("Error fetching userData:", error);
      }
    };

    fetchUserData();

    const fetchBearerToken = async () => {
      try {
        const token = await AsyncStorage.getItem("tokenUser");
        if (token) {
          setBearerToken(token);
        }
      } catch (error) {
        console.error("Error fetching bearer token:", error);
      }
    };

    fetchBearerToken();
  }, []);

  useEffect(() => {
    // Update customerId when storedData is available
    if (storedData) {
      setSendData((prevData) => ({
        ...prevData,
        customerId: storedData.Id, // Access Id property safely
      }));
    }
  }, [storedData]);

  useEffect(() => {
    // Fetch data when bearerToken and storedData are available
    if (bearerToken && storedData) {
      fetchData();
    }
  }, [bearerToken, storedData]);

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(
        `https://elder-care-api.monoinfinity.net/api/Elder/Customer/${storedData?.Id}`,
        {
          headers: {
            Authorization: `Bearer ${bearerToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log(
        "Elderly IDs:",
        data.map((elder) => elder.elderlyId).join(", ")
      );
      setElderData(data);
      setElderList(
        data.map((elder) => ({ id: elder.elderlyId, name: elder.name }))
      );
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsDataLoading(false);
    }
  }, [bearerToken, storedData]);

  const handleSelectElder = (elderId) => {
    setSelectedElderId(elderId);
    setSendData((prevData) => ({
      ...prevData,
      elderlyId: elderId,
    }));
    navigation.navigate("CONTRACT_DETAIL_SERVICE_SCREEN", { sendData }); 
  };

  return (
    <SafeAreaView style={reuse.containerAndroidSafeArea}>
      <ScrollView>
        <View style={reuse.textMid("center")}>
          <AppBar backIcon={true} onPress={() => navigation.goBack()} />
          <ReusedText
            text={"LẬP HỢP ĐỒNG"}
            color={COLORS.primary}
            size={SIZES.xLarge}
            family={"bold"}
          ></ReusedText>
        </View>
        <View style={styles.elderListContainer}>
          <Text style={styles.selectTitle}>Lựa chọn người thân:</Text>
          {elderList.map((elder) => (
            <TouchableOpacity
              key={elder.id}
              style={[
                styles.elderItem,
                {
                  backgroundColor:
                    selectedElderId === elder.id
                      ? COLORS.lightBlue
                      : "transparent",
                },
              ]}
              onPress={() => handleSelectElder(elder.id)}
            >
              <Text style={styles.elderText}>{elder.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  scrollView: {
    flexGrow: 1,
  },
  titleContainer: {
    alignItems: "center",
    marginVertical: SIZES.large,
  },
  elderListContainer: {
    paddingHorizontal: SIZES.large,
    paddingBottom: SIZES.large * 2,
  },
  selectTitle: {
    fontSize: SIZES.large,
    fontWeight: "bold",
    marginBottom: SIZES.large,
  },
  elderItem: {
    padding: SIZES.large,
    marginVertical: 5,
    borderRadius: SIZES.large,
    borderWidth: 1,
    borderColor: COLORS.gray,
    alignItems: "center",
  },
  elderText: {
    fontSize: SIZES.large,
    color: COLORS.black,
  },
});

export default ContractDetail;
