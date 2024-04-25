import React, { useState } from "react";
import { View, Text, TextInput, Button, TouchableOpacity ,SafeAreaView,Image} from "react-native";
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
  const [carerName, setCarerName] = useState("");
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
      carerName.trim() === "" ||
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
    if (!/^[a-zA-Z\s]*$/.test(carerName)) {
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

    // Save data to backend or do other actions here
    // For now, just alert the data
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
      <View style={homeStyle.container}>
        <Input
          iconName="account-child-circle"
          placeholder="Họ và tên"
          value={carerName}
          onChangeText={(text) => setCarerName(text)}
        />
        <Input
          iconName="home-account"
          placeholder="Địa chỉ"
          value={location}
          onChangeText={(text) => setLocation(text)}
        />
        <Picker
          style={[homeStyle.picker, { borderWidth: 1, borderColor: "#ccc" }]}
          selectedValue={gender}
          onValueChange={(itemValue) => setGender(itemValue)}
          itemStyle={homeStyle.pickerItem}
          mode="dropdown"
        >
          <Picker.Item label="Select gender" value="" />
          <Picker.Item label="Male" value="Male" />
          <Picker.Item label="Female" value="Female" />
        </Picker>

        <Input
          iconName="human-male-female-child"
          placeholder="Quan hệ với khách hàng"
          value={timeShift}
          onChangeText={(text) => setTimeShift(text)}
        />
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
        <Button
          title="Pick an image"
          onPress={pickImage}
          style={{ backgroundColor: COLORS.gray }}
        />
        <TouchableOpacity onPress={handleSave} style={homeStyle.button}>
          <Text style={homeStyle.buttonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default CreateElderForm;
