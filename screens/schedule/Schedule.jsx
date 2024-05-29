import React, { useState, useEffect } from "react";
import {
  ScrollView,
  Text,
  SafeAreaView,
  StatusBar,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { reuse, AppBar } from "../../components";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";
import { CONTRACT_DETAIL_SCREEN } from "../../constants/nameRoute";
import { COLORS } from "../../constants";

const Schedule = () => {
  const [data, setData] = useState(null);
  const [token, setToken] = useState(null);
  const [accountId, setAccountId] = useState(null);
  const navigation = useNavigation();

  const navigateToContractDetail = (contract) => {
    navigation.navigate(CONTRACT_DETAIL_SCREEN, { contract });
  };

  useEffect(() => {
    const retrieveData = async () => {
      try {
        const storedData = await AsyncStorage.getItem("userData");
        const storedToken = await AsyncStorage.getItem("tokenUser");

        if (storedData && storedToken) {
          const parsedData = JSON.parse(storedData);
          setToken(storedToken);
          setAccountId(parsedData.Id);

          fetchData(parsedData.Id, storedToken);

          const intervalId = setInterval(() => {
            fetchData(parsedData.Id, storedToken);
          }, 60000);

          return () => clearInterval(intervalId);
        } else {
          console.log("Data not found in AsyncStorage.");
        }
      } catch (error) {
        console.error("Error retrieving data:", error);
      }
    };

    retrieveData();
  }, []);

  const fetchData = async (userId, userToken) => {
    try {
      const response = await fetch(
        `https://elder-care-api.monoinfinity.net/api/Contract/getContractByCusId?cusid=${userId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      if (response.ok) {
        const jsonData = await response.json();
        setData(jsonData);
      } else {
        console.error("Failed to fetch contract data. Status:", response.status);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 0:
        return "Pending";
      case 1:
        return "Signed";
      case 2:
        return "Rejected";
      case 3:
        return "Active";
      case 4:
        return "Expired";
      case 5:
        return "Terminated";
      default:
        return "Unknown";
    }
  };

  const getStatusColor = (status) => {
    let color, icon;

    switch (status) {
      case 0:
        color = "#FFA500"; // Orange for Pending
        icon = "hourglass-half"; // Icon for Pending status
        break;
      case 1:
        color = "#32CD32"; // Green for Signed
        icon = "check-circle"; // Icon for Signed status
        break;
      case 2:
        color = "#FF4500"; // Red for Rejected
        icon = "times-circle"; // Icon for Rejected status
        break;
      case 3:
        color = "#32CD32"; // Green for Active
        icon = "check-circle"; // Icon for Active status
        break;
      case 4:
        color = "#FFA500"; // Orange for Expired
        icon = "hourglass-end"; // Icon for Expired status
        break;
      case 5:
        color = "#FF0000"; // Red for Terminated
        icon = "exclamation-circle"; // Icon for Terminated status
        break;
      default:
        color = "#000000"; // Black for Unknown status
        icon = "question-circle"; // Icon for Unknown status
    }

    return { color, icon };
  };

  return (
    <SafeAreaView style={reuse.containerAndroidSafeArea}>
      <StatusBar style="auto" />
      <View style={reuse.textMid("center")}>
        <AppBar title={"HỢP ĐỒNG"} />
      </View>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {data &&
          data.map((contract) => (
            <TouchableOpacity
              key={contract.contractId}
              style={styles.contractContainer}
              onPress={() => navigateToContractDetail(contract)}
            >
              <View
                style={[
                  styles.titleContainer,
                  { backgroundColor: getStatusColor(contract.status).color },
                ]}
              >
                <Icon
                  name={getStatusColor(contract.status).icon}
                  size={20}
                  color={"#FFFFFF"}
                  style={styles.titleIcon}
                />
                <Text style={styles.contractTitle}>
                  Contract ID: {contract.contractId}
                </Text>
              </View>
              <View style={styles.bodyContainer}>
                <Text style={styles.contractText}>
                  Customer ID: {contract.customerId}
                </Text>
                <Text style={styles.contractText}>
                  Elderly ID: {contract.elderlyId}
                </Text>
                <Text style={styles.contractText}>
                  Carer ID: {contract.carerId}
                </Text>
                <Text style={styles.contractText}>
                  Status: {getStatusText(contract.status)}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    marginTop: 50,
    paddingBottom: Dimensions.get("window").height,
  },
  contractContainer: {
    marginHorizontal: 10,
    marginBottom: 15,
    borderRadius: 8,
    borderColor: COLORS.secondary,
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    elevation: 5,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  bodyContainer: {
    backgroundColor: "#FFFFFF",
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    padding: 10,
  },
  titleIcon: {
    marginRight: 5,
  },
  contractTitle: {
    color: COLORS.primary,
  },
  contractText: {
    marginBottom: 5,
  },
});

export default Schedule;
