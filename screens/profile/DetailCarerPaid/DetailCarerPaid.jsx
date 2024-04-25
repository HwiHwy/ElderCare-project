import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal } from "react-native";
import { AppBar, ReusedText, reuse } from "../../../components";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { COLORS, SIZES } from "../../../constants";
import { useNavigation } from "@react-navigation/native";
import { CONTRACT_NON_TRACKING, CONTRACT_TRACKING } from "../../../constants/nameRoute";

const DetailCarerPaid = ({ route }) => {
  const { carerId } = route.params;
  const navigation = useNavigation();
  const [carerData, setCarerData] = useState(null);
  const [showOptionsModal, setShowOptionsModal] = useState(false);

  useEffect(() => {
    const fetchCarerData = async () => {
      try {
        const response = await fetch(
          `https://elder-care-api.monoinfinity.net/api/Carer/${carerId}`
        );

        if (response.ok) {
          const data = await response.json();
          setCarerData(data);
        } else {
          console.error("Failed to fetch carer data");
        }
      } catch (error) {
        console.error("Error fetching carer data:", error);
      }
    };

    fetchCarerData();
  }, [carerId]);
  const handleEditPress = () => {
    setShowOptionsModal(true);
  };

  const handleOption1Press = () => {
    setShowOptionsModal(false);
    navigation.navigate(CONTRACT_NON_TRACKING, { carerId: carerId });
  };

  const handleOption2Press = () => {
    setShowOptionsModal(false);
    navigation.navigate(CONTRACT_TRACKING, { carerId: carerId });
  };
  return (
    <SafeAreaView style={reuse.containerAndroidSafeArea}>
      <StatusBar style="auto" />
      <View style={reuse.textMid("center")}>
        <AppBar backIcon={true} onPress={() => navigation.goBack()} />
        <ReusedText
          text={"Lịch sử xem carer"}
          color={COLORS.primary}
          size={SIZES.xLarge}
          family={"bold"}
        />
        
        {carerData ? (
          <View style={styles.content}>
            <Image
              source={{
                uri: "https://files.scmagazine.com/wp-content/uploads/2022/09/091222_google_logo.jpg",
              }}
              style={styles.image}
            />
            <TouchableOpacity style={styles.button} onPress={handleEditPress}>
              <Text style={styles.buttonText}>Lập hợp đồng</Text>
            </TouchableOpacity>
            <View style={styles.infoContainer}>
              <Text style={styles.name}>{carerData.name.toUpperCase()}</Text>
              <Text style={styles.label}>Email:</Text>
              <Text style={styles.text}>{carerData.email}</Text>
              <Text style={styles.label}>Phone:</Text>
              <Text style={styles.text}>{carerData.phone}</Text>
              <Text style={styles.label}>Age:</Text>
              <Text style={styles.text}>{carerData.age}</Text>
              <Text style={styles.label}>Gender:</Text>
              <Text style={styles.text}>{carerData.gender}</Text>
              <Text style={styles.label}>Address:</Text>
              <Text style={styles.text}>{carerData.address}</Text>
            </View>
          </View>
        ) : (
          <Text>Loading...</Text>
        )}
      </View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={showOptionsModal}
        onRequestClose={() => setShowOptionsModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.optionButton} onPress={handleOption1Press}>
              <Text style={styles.optionText}>Hợp đồng chăm sóc thông thường</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionButton} onPress={handleOption2Press}>
              <Text style={styles.optionText}>Hợp đồng chăm sóc có theo dõi</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  image: {
    width: 500,
    height: 400,
    borderRadius: 20,
    marginBottom: 20,
  },
  infoContainer: {
    width: "100%",
    position: "absolute",
    top: 350,
    height:500,
    backgroundColor: "rgba(255, 255, 255, 1)",
    borderRadius: 60, // Add some border radius for rounded corners
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
  },
  name: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 5,
    left:30,
    color: COLORS.primary,
  },
  button: {
    width:200,
    position: "absolute",
    top: 300, // Adjust the position as needed
    right: 20, // Adjust the position as needed
    backgroundColor: COLORS.tertiary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 16,
  },
  modalContainer: {
    
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {

    backgroundColor: COLORS.white,
    padding: 20,
    borderRadius: 10,
    width:300,
    alignItems: "center", 
    justifyContent: "center", 
  },
  optionButton: {
    width:200,
    padding: 10,
    borderRadius: 5,
    backgroundColor: COLORS.primary,
    marginBottom: 10,
  },
  optionText: {
    color: COLORS.white,
    textAlign: "center",
    fontSize: 16,
  },
});

export default DetailCarerPaid;
