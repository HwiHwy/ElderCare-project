import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppBar, ReusedText, reuse } from "../../components";
import { useNavigation } from "@react-navigation/native";
import { COLORS, SIZES } from "../../constants";

const ContractDetailScreen = ({ route }) => {
  const { contract } = route.params;
  const navigation = useNavigation();
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
        {/* Add additional contract data here */}
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
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

export default ContractDetailScreen;
