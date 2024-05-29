import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  SafeAreaView,
  Image,
  StyleSheet,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import { COLORS, SIZES, images } from "../../constants";
import useFirebase from "../../hook/useFirebase";
import Input from "../../components/Input";
import homeStyle from "./home.style";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { AppBar, ReusedButton, ReusedText, reuse } from "../../components";
const CreateElderForm = ({ navigation }) => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [gender, setGender] = useState("");
  const [timeShift, setTimeShift] = useState("");
  const [age, setAge] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      // setImage(result.assets[0].uri);
      const imageUrl = await useFirebase().uploadImageFirebase(
        result.assets[0].uri
      );
      setImage(imageUrl);
    }
  };

  const handleSave = async () => {
    // Validate input fields
    if (
      name.trim() === "" ||
      location.trim() === "" ||
      gender.trim() === "" ||
      timeShift.trim() === "" ||
      age.trim() === "" ||
      price.trim() === ""
    ) {
      alert("Please fill in all the fields");
      return;
    }

    // Additional validation for specific fields
    if (!/^[a-zA-Z\s]*$/.test(name)) {
      alert("Invalid name format. Please use only letters and spaces");
      return;
    }

    if (!/^[a-zA-Z\s]*$/.test(location)) {
      alert("Invalid location format. Please use only letters and spaces");
      return;
    }

    if (!/^(Male|Female)$/i.test(gender)) {
      alert("Invalid gender. Please use 'Male' or 'Female'");
      return;
    }

    if (!/^[a-zA-Z\s]*$/.test(timeShift)) {
      alert("Invalid relationship format. Please use only letters and spaces");
      return;
    }

    const ageValue = parseInt(age, 10);
    if (isNaN(ageValue) || ageValue < 0 || ageValue > 150) {
      alert("Invalid age. Please enter a valid age between 0 and 150");
      return;
    }

    if (!/^[a-zA-Z\s]*$/.test(price)) {
      alert("Invalid note format. Please use only letters and spaces");
      return;
    }

    const newData = {
      carerName,
      location,
      gender,
      timeShift,
      age: parseInt(age, 10),
      price,
      image,
    };

    alert(JSON.stringify(newData));

    navigation.goBack();
  };

  return (
    <SafeAreaView style={reuse.containerAndroidSafeArea}>
      <StatusBar style="auto" />
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
      <View style={styles.container}>
        <Input
          iconName="account-child-circle"
          placeholder="Họ và tên"
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <Input
          iconName="home-account"
          placeholder="Địa chỉ"
          value={location}
          onChangeText={(text) => setLocation(text)}
        />
        <Input
          iconName="human-male-female-child"
          placeholder="Quan hệ với khách hàng"
          value={timeShift}
          onChangeText={(text) => setTimeShift(text)}
        />
        <View style={styles.genderContainer}>
          <TouchableOpacity
            style={[
              styles.genderCircle,
              gender === "Nam" && styles.selectedGenderCircle,
            ]}
            onPress={() => setGender("Nam")}
          >
            <Text
              style={[
                styles.genderText,
                gender === "Nam" && styles.selectedGenderText,
              ]}
            >
              Nam
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.genderCircle,
              gender === "Nữ" && styles.selectedGenderCircle,
            ]}
            onPress={() => setGender("Nữ")}
          >
            <Text
              style={[
                styles.genderText,
                gender === "Nữ" && styles.selectedGenderText,
              ]}
            >
              Nữ
            </Text>
          </TouchableOpacity>
        </View>
        <Input
          iconName="gender-male-female"
          placeholder="Tuổi"
          value={age}
          onChangeText={(text) => setAge(text)}
          keyboardType="numeric"
        />
        <Input
          iconName="notebook-edit"
          placeholder="Ghi Chú"
          value={price}
          onChangeText={(text) => setPrice(text)}
        />
        {/* <Button
          title="Pick an image"
          onPress={pickImage}
          style={{ backgroundColor: COLORS.gray }}
        /> */}
        <TouchableOpacity onPress={pickImage} style={homeStyle.button}>
          <Text style={homeStyle.buttonText}>Pick image</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSave} style={homeStyle.button}>
          <Text style={homeStyle.buttonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: SIZES.padding,
    backgroundColor: COLORS.white,
    marginHorizontal: 20,
  },
  imagePickerButton: {
    backgroundColor: COLORS.gray,
    paddingVertical: SIZES.padding,
    borderRadius: SIZES.radius,
    alignItems: "center",
    justifyContent: "center",
    marginTop: SIZES.padding,
  },
  imagePickerButtonText: {
    color: COLORS.white,
    ...SIZES.body3,
  },
  saveButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: SIZES.padding,
    borderRadius: SIZES.radius,
    alignItems: "center",
    justifyContent: "center",
    marginTop: SIZES.padding,
  },
  saveButtonText: {
    color: COLORS.white,
    ...SIZES.body3,
  },
  genderContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 0,
  },
  genderCircle: {
    width: 50,
    height: 50,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: COLORS.primary,
    backgroundColor: COLORS.transparent,

    alignItems: "center",
    justifyContent: "center",
  },
  selectedGenderCircle: {
    backgroundColor: COLORS.primary,
  },
  genderText: {
    color: COLORS.primary,
    ...SIZES.body3,
  },
  selectedGenderText: {
    color: COLORS.white,
  },
});
export default CreateElderForm;
