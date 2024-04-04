import React, { useState, useEffect } from "react";
import { ScrollView, Text, SafeAreaView, StatusBar, View, StyleSheet, TouchableOpacity } from "react-native";
import { reuse, AppBar } from "../../components";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const Schedule = ({}) => {
  const [data, setData] = useState(null);
  const [token, setToken] = useState(null);
  const [accountId, setAccountId] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const retrieveData = async () => {
      try {
        const storedData = await AsyncStorage.getItem('userData');
        const storedToken = await AsyncStorage.getItem('tokenUser');

        if (storedData && storedToken) {
          const parsedData = JSON.parse(storedData);
          setToken(storedToken);
          setAccountId(parsedData.Id);

          fetchData(parsedData.Id, storedToken); // Initial data fetch

          // Set up interval to fetch data periodically
          const intervalId = setInterval(() => {
            fetchData(parsedData.Id, storedToken);
          }, 60000); // Fetch data every 60 seconds (adjust as needed)

          return () => clearInterval(intervalId); // Clean up interval on unmount
        } else {
          console.log('Data not found in AsyncStorage.');
        }
      } catch (error) {
        console.error('Error retrieving data:', error);
      }
    };

    retrieveData();
  }, []);

  const fetchData = async (userId, userToken) => {
    try {
      const response = await fetch(`https://elder-care-api.monoinfinity.net/api/Contract/getContractByCusId?cusid=${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userToken}`
        }
      });

      if (response.ok) {
        const jsonData = await response.json();
        setData(jsonData);
      } else {
        console.error('Failed to fetch contract data. Status:', response.status);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleStatusAction = async (contractId, status) => {
    // Your status action handling logic here
  };

  const getStatusText = (status) => {
    switch (status) {
      case 0:
        return 'Pending';
      case 1:
        return 'Signed';
      case 2:
        return 'Rejected';
      case 3:
        return 'Active';
      case 4:
        return 'Expired';
      default:
        return 'Unknown';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 0:
        return '#FFA500'; // Orange for Pending
      case 1:
        return '#008000'; // Green for Signed
      case 2:
        return '#FF0000'; // Red for Rejected
      case 3:
        return '#0000FF'; // Blue for Active
      case 4:
        return '#808080'; // Gray for Expired
      default:
        return '#000000'; // Black for Unknown
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.appBarContainer}>
        <AppBar
          title={'HỢP ĐỒNG'}
          backIcon={true}
          onPress={() => navigation.goBack()}
        />
      </View>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.title}>Contract Data:</Text>
        {data && data.map(contract => (
          <TouchableOpacity
            key={contract.contractId}
            style={[styles.contractContainer, { backgroundColor: getStatusColor(contract.status) }]}
            onPress={() => handleStatusAction(contract.contractId, contract.status)}
          >
            <Text style={[styles.contractText, { color: '#FFFFFF' }]}>Contract ID: {contract.contractId}</Text>
            <Text style={[styles.contractText, { color: '#FFFFFF' }]}>Customer ID: {contract.customerId}</Text>
            <Text style={[styles.contractText, { color: '#FFFFFF' }]}>Elderly ID: {contract.elderlyId}</Text>
            <Text style={[styles.contractText, { color: '#FFFFFF' }]}>Carer ID: {contract.carerId}</Text>
            <Text style={[styles.contractText, { color: '#FFFFFF' }]}>
              Status: {getStatusText(contract.status)}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  appBarContainer: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  contentContainer: {
    flexGrow: 1,
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  contractContainer: {
    padding: 15,
    marginBottom: 15,
    borderRadius: 8,
  },
  contractText: {
    fontSize: 16,
    marginBottom: 8,
  },
});

export default Schedule;
