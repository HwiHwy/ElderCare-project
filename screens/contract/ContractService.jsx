import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  StyleSheet,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AppBar, ReusedText, reuse } from "../../components";
import { COLORS, SIZES } from "../../constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { VIEW_CONTRACT_SCREEN } from "../../constants/nameRoute";

const ContractService = () => {
  const navigation = useNavigation();
  const [packages, setPackages] = useState([]);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [expandedPackageId, setExpandedPackageId] = useState(null);
  const [imageURL, setImageURL] = useState("");
  const [videoURL, setVideoURL] = useState("");
  const [description, setDescription] = useState("");
  const [heartbeat, setHeartbeat] = useState("");
  const route = useRoute();
  const { sendData } = route.params;
  console.log("sendData:", sendData);

  useEffect(() => {
    fetchDataWithToken();
  }, []);

  const fetchDataWithToken = async () => {
    try {
      const token = await AsyncStorage.getItem("tokenUser");
      if (token) {
        const response = await fetch(
          "https://elder-care-api.monoinfinity.net/api/Packages",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Data from API:", data);
        setPackages(data);
      } else {
        console.log("Token not found in AsyncStorage");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handlePackagePress = (packageData) => {
    // Toggle dropdown by checking if the clicked package is already expanded
    setExpandedPackageId((prevExpandedPackageId) => {
      if (prevExpandedPackageId === packageData.packageId) {
        return null; // Close the dropdown if it's already open
      } else {
        setSelectedPackage(packageData);
        return packageData.packageId; // Expand the dropdown for the clicked package
      }
    });
  };

  const handleSubmit = () => {
    console.log("Submitted:", { imageURL, videoURL, description, heartbeat });
    setImageURL("");
    setVideoURL("");
    setDescription("");
    setHeartbeat("");
  };
  const handleViewContract = () => {
    if (sendData) {
      const formData = {
        imageURL: imageURL,
        videoURL: videoURL,
        description: description,
        heartbeat: heartbeat,
      };
      navigation.navigate(VIEW_CONTRACT_SCREEN, { sendData: sendData, formData: formData });
    } else {
      console.log("Please provide sendData");
    }
  };
  
  

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <AppBar backIcon={true} onPress={() => navigation.goBack()} />
        <ReusedText
          text={"LỰA CHỌN DỊCH VỤ"}
          color={COLORS.primary}
          size={SIZES.xLarge}
          family={"bold"}
        />
        <ScrollView>
          {packages.map((item) => (
            <View key={item.packageId}>
              <TouchableOpacity
                style={styles.packageItem}
                onPress={() => handlePackagePress(item)}
              >
                <Text style={styles.packageName}>{item.name}</Text>
              </TouchableOpacity>
              {expandedPackageId === item.packageId && (
                <View style={styles.formContainer}>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter Image URL"
                    value={imageURL}
                    onChangeText={setImageURL}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Enter Video URL"
                    value={videoURL}
                    onChangeText={setVideoURL}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Enter Description"
                    value={description}
                    onChangeText={setDescription}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Enter Heartbeat"
                    value={heartbeat}
                    onChangeText={setHeartbeat}
                  />
                </View>
              )}
            </View>
          ))}
         
          <TouchableOpacity
            style={styles.submitButton}
            onPress={() => handleViewContract()}
          >
            <Text style={styles.submitButtonText}>Xem lại hợp đồng</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  content: {
    flex: 1,
    paddingHorizontal: SIZES.large,
    paddingTop: SIZES.large,
  },
  packageItem: {
    paddingVertical: SIZES.small,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray,
  },
  packageName: {
    fontSize: SIZES.large,
    color: COLORS.black,
  },
  formContainer: {
    padding: SIZES.medium,
    backgroundColor: COLORS.lightGray,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.gray,
    borderRadius: SIZES.small,
    padding: SIZES.small,
    marginBottom: SIZES.small,
  },
  submitButton: {
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.small,
    padding: SIZES.medium,
    alignItems: "center",
  },
  submitButtonText: {
    color: COLORS.white,
    fontWeight: "bold",
  },
});

export default ContractService;
