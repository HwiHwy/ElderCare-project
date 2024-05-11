import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppBar, ReusedText, reuse } from "../../components";
import { useNavigation } from "@react-navigation/native";
import { COLORS, SIZES } from "../../constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from "@react-native-picker/picker";

const DetailContractforCarer = ({ route }) => {
  const { contract } = route.params;
  const navigation = useNavigation();
  const [newStatus, setNewStatus] = useState(0);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const retrieveData = async () => {
      try {
        const storedToken = await AsyncStorage.getItem("tokenUser");

        if (storedToken) {
          setToken(storedToken);
        } else {
          console.log("Token not found in AsyncStorage.");
        }
      } catch (error) {
        console.error("Error retrieving token:", error);
      }
    };

    retrieveData();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 0:
        return "#FFA500"; // Orange for Pending
      case 1:
        return "#008000"; // Green for Signed
      case 2:
        return "#FF0000"; // Red for Rejected
      case 3:
        return "#0000FF"; // Blue for Active
      case 4:
        return "#808080"; // Grey for Expired
      default:
        return "#000000"; // Black for Unknown
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 0:
        return "ĐANG CHỜ";
      case 1:
        return "ĐÃ KÍ";
      case 2:
        return "ĐÃ HỦY";
      case 3:
        return "ĐANG TIẾN HÀNH";
      case 4:
        return "HẾT HẠN";
      default:
        return "Unknown";
    }
  };
  const handleChangeStatus = async () => {
    try {
      const response = await fetch(
        `https://elder-care-api.monoinfinity.net/api/Contract/${contract.contractId}/Contract?status=${newStatus}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        console.log("Contract status updated successfully.");

        // Check if the new status is not 3 (Active)
        if (newStatus !== 3) {
          // Post transaction data to Transaction API
          const transactionResponse = await fetch(
            `https://elder-care-api.monoinfinity.net/api/Transaction?carerid=${contract.carerId}&customerid=${contract.customerId}&customerid=${contract.contractId}`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({
                figureMoney: 50000,
                redirectUrl:
                  "https://sandbox.vnpayment.vn/paymentv2/Payment/Error.html?code=01",
                dateTime: new Date().toISOString(),
                type: "string",
              }),
            }
          );

          if (transactionResponse.ok) {
            console.log("Transaction data posted successfully.");

            const transactionData = await transactionResponse.json();
            console.log("Transaction data:", transactionData);

            const transactionUrl = transactionData.data;

            // Send email
            const emailResponse = await fetch(
              "https://elder-care-api.monoinfinity.net/api/Email",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                  to: "ace.sworld1412@gmail.com", // Replace with recipient email
                  subject: "Contract Status Update",
                  body: `The contract with ID ${contract.contractId} has been updated to status ${newStatus}. Transaction details: ${transactionUrl}`,
                }),
              }
            );

            if (emailResponse.ok) {
              console.log("Email sent successfully.");

              // If email sent successfully, update the status to 3 (Active)
              const updateStatusResponse = await fetch(
                `https://elder-care-api.monoinfinity.net/api/Contract/${contract.contractId}/Contract?status=3`,
                {
                  method: "PUT",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                  },
                }
              );

              if (updateStatusResponse.ok) {
                console.log("Contract status updated to Active.");
              } else {
                console.error(
                  "Failed to update contract status to Active. Status:",
                  updateStatusResponse.status
                );
              }
            } else {
              console.error(
                "Failed to send email. Status:",
                emailResponse.status
              );
            }
          } else {
            console.error(
              "Failed to post transaction data. Status:",
              transactionResponse.status
            );
            navigation.goBack();

          }
        } else {
          // Navigate back if the new status is already 3 (Active)
          navigation.goBack();
        }
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
      <View style={reuse.textMid("center")}>
        <AppBar backIcon={true} onPress={() => navigation.goBack()} />
        <ReusedText
          text={"CHI TIẾT HỢP ĐỒNG"}
          color={COLORS.primary}
          size={SIZES.xLarge}
          family={"bold"}
        />
      </View>
      <View style={styles.container}>
        <View
          style={[
            styles.statusContainer,
            { backgroundColor: getStatusColor(contract.status) },
          ]}
        >
          <Text style={styles.statusText}>
            TRẠNG THÁI: {getStatusText(contract.status)}
          </Text>
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.detailText}>Contract ID:</Text>
          <Text style={styles.detailValue}>{contract.contractId}</Text>
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.detailText}>Customer ID:</Text>
          <Text style={styles.detailValue}>{contract.customerId}</Text>
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.detailText}>Elderly ID:</Text>
          <Text style={styles.detailValue}>{contract.elderlyId}</Text>
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.detailText}>Carer ID:</Text>
          <Text style={styles.detailValue}>{contract.carerId}</Text>
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.detailText}>Contract Type:</Text>
          <Text style={styles.detailValue}>{contract.contractType}</Text>
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.detailText}>Package Price:</Text>
          <Text style={styles.detailValue}>{contract.packageprice}</Text>
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.detailText}>Created Date:</Text>
          <Text style={styles.detailValue}>{contract.createdDate}</Text>
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.detailText}>Package ID:</Text>
          <Text style={styles.detailValue}>{contract.packageId}</Text>
        </View>
        <Picker
          selectedValue={newStatus}
          style={styles.picker}
          onValueChange={(itemValue, itemIndex) => setNewStatus(itemValue)}
        >
          <Picker.Item label="Pending" value="0" />
          <Picker.Item label="Signed" value="1" />
          <Picker.Item label="Rejected" value="2" />
          <Picker.Item label="Active" value="3" />
          <Picker.Item label="Expired" value="4" />
        </Picker>
        <TouchableOpacity
          style={styles.changeStatusButton}
          onPress={handleChangeStatus}
        >
          <Text style={styles.changeStatusButtonText}>Change Status</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  statusContainer: {
    padding: 10,
    marginBottom: 20,
    borderRadius: 8,
    alignItems: "center",
  },
  statusText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  detailsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  detailText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  detailValue: {
    fontSize: 16,
  },
});

export default DetailContractforCarer;
