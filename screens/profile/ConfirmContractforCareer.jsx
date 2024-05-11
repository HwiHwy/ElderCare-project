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
import {
  CARER_CONFIRM_CONTRACT_DETAIL_SCREEN,
  CONTRACT_DETAIL_SCREEN,
} from "../../constants/nameRoute";
import { COLORS } from "../../constants";

const ConfirmContractforCareer = () => {
  const [data, setData] = useState(null);
  const [token, setToken] = useState(null);
  const [accountId, setAccountId] = useState(null);
  const navigation = useNavigation();

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
        console.error(
          "Failed to fetch contract data. Status:",
          response.status
        );
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const navigateToContractDetail = (contract) => {
    navigation.navigate(CARER_CONFIRM_CONTRACT_DETAIL_SCREEN, { contract });
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
        color = "#008000"; // Green for Signed
        icon = "check-circle"; // Icon for Signed status
        break;
      case 2:
        color = "#FF0000"; // Red for Rejected
        icon = "times-circle"; // Icon for Rejected status
        break;
      case 3:
        color = "#0000FF";
        icon = "check-circle";
        break;
      case 4:
        color = "#808080";
        icon = "hourglass-end";
        break;
      default:
        color = "#000000";
        icon = "question-circle";
    }

    return { color, icon };
  };

  const handleChangeStatus = async (contractId, newStatus) => {
    try {
      const response = await fetch(
        `https://elder-care-api.monoinfinity.net/api/Contract/${contractId}/Contract?status=${newStatus}`,
        {
          method: "PUT", // Change the method to PUT
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        console.log("Contract status updated successfully.");
        // Optionally, you can fetch the updated contract data again
        // to reflect the changes in the UI
        fetchData(accountId, token);
      } else {
        console.error(
          "Failed to update contract status. Status:",
          response.status
        );
      }
    } catch (error) {
      console.error("Error updating contract status:", error);
    }
  };

  return (
    <SafeAreaView style={reuse.containerAndroidSafeArea}>
      <StatusBar style="auto" />
      <View style={reuse.textMid("center")}>
        <AppBar
          title={"Confirm Contract"}
          backIcon={true}
          onPress={() => navigation.goBack()}
        />
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
                  color="#FFFFFF"
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
              <TouchableOpacity
                style={styles.changeStatusButton}
                onPress={() => handleChangeStatus(contract.contractId, 1)}
              >
                <Text style={styles.changeStatusButtonText}>Change Status</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    marginTop: 50,
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
    color: "#FFFFFF",
  },
  contractText: {
    marginBottom: 5,
  },
});

export default ConfirmContractforCareer;
