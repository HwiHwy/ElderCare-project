import React, { useState, useEffect, useCallback } from "react";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppBar, ReusedButton, ReusedText, reuse } from "../../components";
import {
  ActivityIndicator,
  Button,
  FlatList,
  Image,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { COLORS, SIZES } from "../../constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useFirebase from "../../hook/useFirebase";
import * as ImagePicker from "expo-image-picker";
import { HOME_SCREEN } from "./../../constants/nameRoute";

const ContractTrackingPackage = ({ route }) => {
  const [packageData, setPackageData] = useState([]);
  const { carerId } = route.params;
  const navigation = useNavigation();
  const [userData, setUserData] = useState(null);
  const [bearerToken, setBearerToken] = useState("");
  const [elderData, setElderData] = useState([]);
  const [serviceData, setServiceData] = useState([]);
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [selectedElder, setSelectedElder] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [isElderModalVisible, setIsElderModalVisible] = useState(false);
  const [isServiceModalVisible, setIsServiceModalVisible] = useState(false);
  const [images, setImages] = useState([]);
  const [description, setDescription] = useState("");
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [image, setImage] = useState(null);
  const [carerServiceData, setCarerServiceData] = useState([]);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [selectedPackageServices, setSelectedPackageServices] = useState([]);
  console.log(selectedPackage);
  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.cancelled) {
        console.log("Image URI:", result.uri); // Debugging URI
        const imageUrl = await useFirebase().uploadImageFirebase(
          result.assets[0].uri
        );
        if (imageUrl) {
          setImages((prevImages) => [...prevImages, imageUrl]);
          console.log("Image URL:", imageUrl);
        } else {
          console.error("Failed to upload image to Firebase.");
        }
      }
    } catch (error) {
      console.error("Error picking image:", error);
    }
  };

  const fetchUserData = useCallback(async () => {
    try {
      const data = await AsyncStorage.getItem("userData");
      if (data) {
        setUserData(JSON.parse(data));
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }, []);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  useEffect(() => {
    if (userData) {
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
    }
  }, [userData]);

  useEffect(() => {
    if (bearerToken) {
      fetchData();
    }
  }, [bearerToken]);

  const fetchData = useCallback(async () => {
    setIsDataLoading(true);
    try {
      // Fetch elder data
      const elderResponse = await fetch(
        `https://elder-care-api.monoinfinity.net/api/Elder/Customer/${userData.Id}`,
        {
          headers: {
            Authorization: `Bearer ${bearerToken}`,
          },
        }
      );

      if (!elderResponse.ok) {
        throw new Error(`HTTP error! Status: ${elderResponse.status}`);
      }

      const elderData = await elderResponse.json();

      if (!elderData || elderData.length === 0) {
        throw new Error("Empty response received for elders");
      }

      setElderData(elderData);

      // Fetch service data
      const serviceResponse = await fetch(
        "https://elder-care-api.monoinfinity.net/api/Services",
        {
          headers: {
            Authorization: `Bearer ${bearerToken}`,
          },
        }
      );

      if (!serviceResponse.ok) {
        throw new Error(`HTTP error! Status: ${serviceResponse.status}`);
      }

      const serviceData = await serviceResponse.json();

      if (!serviceData || serviceData.length === 0) {
        throw new Error("Empty response received for services");
      }

      setServiceData(serviceData);

      const carerServiceResponse = await fetch(
        `https://elder-care-api.monoinfinity.net/api/Carer/${carerId}/Services`,
        {
          headers: {
            Authorization: `Bearer ${bearerToken}`,
          },
        }
      );

      if (!carerServiceResponse.ok) {
        throw new Error(`HTTP error! Status: ${carerServiceResponse.status}`);
      }

      const carerServiceData = await carerServiceResponse.json();

      if (!carerServiceData || carerServiceData.length === 0) {
        throw new Error("Empty response received for carer services");
      }

      setCarerServiceData(carerServiceData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsDataLoading(false);
    }
  }, [bearerToken, userData]);

  const handleSelectElder = (elderId) => {
    setSelectedElder(elderId);
    setIsElderModalVisible(false);
  };

  const handleSelectService = (service) => {
    setSelectedService(service);
    setIsServiceModalVisible(false);
  };

  // Function to handle saving data to AsyncStorage
  const saveFormData = async () => {
    try {
      const formData = {
        elderlyId: selectedElder.elderlyId,
        serviceId: selectedService.name,
        images,
        description,
      };
      console.log("Form Data:", formData); // Log the form data
      await AsyncStorage.setItem("formData", JSON.stringify(formData));
      console.log("Form data saved successfully!");
    } catch (error) {
      console.error("Error saving form data:", error);
    }
  };

  const handleSubmit = () => {
    saveFormData();
  };
  const HandleCreateContract = async () => {
    try {
      const postData = {
        carerId: carerId,
        customerId: userData.Id,
        elderlyId: selectedElder.elderlyId,
        service: [selectedService.name],
        startDate: new Date().toISOString(),
        endDate: new Date().toISOString(),
        packageName: "",
      };
      console.log(postData);
      const response = await fetch(
        "https://elder-care-api.monoinfinity.net/api/Contract",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${bearerToken}`,
          },
          body: JSON.stringify(postData),
        }
      );

      if (response.ok) {
        console.log("Data posted successfully!");
        setShowSuccessPopup(true);
        navigation.goBack();
      } else {
        console.error("Failed to post data to API. Status:", response.status);
      }
    } catch (error) {
      console.error("Error posting data to API:", error);
    }
  };

  const fetchPackageData = useCallback(async () => {
    try {
      const token = await AsyncStorage.getItem("tokenUser");
      if (!token) {
        throw new Error("Token not found in AsyncStorage");
      }
      setBearerToken(token); // Set bearer token state

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
      const packageData = await response.json();
      console.log("Package data:", packageData);
      setPackageData(packageData); // Set package data state
    } catch (error) {
      console.error("Error fetching package data:", error);
    }
  }, []);

  useEffect(() => {
    fetchPackageData();
  }, [fetchPackageData]);

  const fetchPackageServices = async (packageId) => {
    try {
      const response = await fetch(
        `https://elder-care-api.monoinfinity.net/api/Packages/${packageId}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const packageData = await response.json();
      const packageServices = packageData.packageServices;
      return packageServices;
    } catch (error) {
      console.error("Error fetching package services:", error);
      return [];
    }
  };
  const handleSelectPackage = async (selectedPackage) => {
    try {
      // Set the selected package
      setSelectedPackage(selectedPackage);
  
      // Extract package id
      const packageId = selectedPackage.packageId;
  
      // Fetch package services based on the package id
      const services = await fetchPackageServices(packageId);
      console.log("Package Services:", services);
  
      // Do something with the services, for example, set them in state
      setSelectedPackageServices(services);
      setIsServiceModalVisible(false); // Close the modal for selecting services
    } catch (error) {
      console.error("Error selecting package:", error);
    }
  };
  
  return (
    <SafeAreaView style={reuse.containerAndroidSafeArea}>
      <StatusBar style="auto" />
      <View style={reuse.textMid("center")}>
        <AppBar backIcon={true} onPress={() => navigation.goBack()} />
        <ReusedText
          text={"Hợp đồng chăm sóc riêng lẻ"}
          color={COLORS.primary}
          size={SIZES.xLarge}
          family={"bold"}
        />
        <Text>ContractNonTracking Screen</Text>
        <Text>Carer ID: {carerId}</Text>
      </View>
      <View style={styles.container}>
        <Text>Chọn người thân cần chăm sóc</Text>

        {isDataLoading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <TouchableOpacity onPress={() => setIsElderModalVisible(true)}>
            <View style={styles.selectedElderContainer}>
              <Text>{selectedElder ? selectedElder.name : "Select Elder"}</Text>
            </View>
          </TouchableOpacity>
        )}

        <View>
          <Text>Chọn gói dịch vụ</Text>
          <TouchableOpacity onPress={() => setIsServiceModalVisible(true)}>
            <View style={styles.selectedServiceContainer}>
              <Text>
                {selectedService ? selectedService.name : "Select Service"}
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <View>
          <ReusedButton
            text={"Lựa chọn hình ảnh mô tả"}
            color={COLORS.white}
            backgroundColor={COLORS.primary}
            width={400}
            onPress={pickImage}
            style={styles.button}
          />
          <View style={styles.imageContainer}>
            {images.map((imageUrl, index) => (
              <Image
                key={index}
                source={{ uri: imageUrl }}
                style={styles.image}
                onError={(error) => console.error("Image load error:", error)}
              />
            ))}
          </View>
        </View>
        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionLabel}>Ghi chú thêm(tùy chọn)</Text>
          <TextInput
            style={styles.descriptionInput}
            multiline={true}
            placeholder="Nhập mô tả cho hình ảnh..."
            onChangeText={(text) => setDescription(text)}
            value={description}
          />
        </View>
        <ReusedButton
          text={"Lưu thông tin hợp đồng"}
          color={COLORS.white}
          backgroundColor={COLORS.primary}
          width={400}
          onPress={handleSubmit}
          style={styles.button}
        />
        <ReusedButton
          text={"Đăng kí hợp đồng"}
          color={COLORS.white}
          backgroundColor={COLORS.primary}
          width={400}
          onPress={HandleCreateContract}
          style={styles.button}
        />
      </View>

      <Modal
        visible={isElderModalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setIsElderModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <FlatList
              data={elderData}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => handleSelectElder(item)}>
                  <View style={styles.itemContainer}>
                    <Text>{item.name}</Text>
                  </View>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item.elderlyId.toString()} // Convert to string
            />
          </View>
        </View>
      </Modal>


      <Modal
        visible={isServiceModalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setIsServiceModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <FlatList
              data={packageData}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => handleSelectPackage(item)}>
                  <View style={styles.itemContainer}>
                    <Text>{item.name}</Text>
                  </View>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item.id}
            />
          </View>
        </View>
      </Modal>
      <Modal
        visible={showSuccessPopup}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowSuccessPopup(false)}
      >
        <View style={styles.popupContainer}>
          <View style={styles.popupContent}>
            <Text style={styles.popupText}>Contract created successfully!</Text>
            <Button title="Close" onPress={() => setShowSuccessPopup(false)} />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
  },
  selectedElderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  selectedServiceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    width: "80%",
    borderRadius: 10,
    padding: 20,
    maxHeight: "80%",
  },
  itemContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: "cover",
    marginTop: 10,
  },
  button: {
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  imageContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    marginTop: 16,
    padding: 8,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
  },
  image: {
    width: 120,
    height: 150,
    resizeMode: "cover",
    margin: 8,
    borderRadius: 8,
  },
  descriptionContainer: {
    marginTop: 16,
  },
  descriptionLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  descriptionInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 8,
    minHeight: 100,
  },
  popupContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  popupContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
  },
  popupText: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: "center",
  },
});
export default ContractTrackingPackage;
