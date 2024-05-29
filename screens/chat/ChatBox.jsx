import React, { useEffect, useState } from "react";
import { Image, SafeAreaView, ScrollView, StatusBar, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { COLORS } from "../../constants";
import * as ImagePicker from 'expo-image-picker';
import useFirebase from "../../hook/useFirebase";

const ChatBox = () => {
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
      setImage(result.assets[0].uri);
      const image_data = await useFirebase().updateImage(result.assets[0].uri, 'images')
      console.log(image_data);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {/* <Button title="Pick an image from camera roll" onPress={pickImage} styl={{    backgroundColor: COLORS.gray,
}} /> */}
      {image && (
        <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
      )}
      <Text>aa</Text>
    </SafeAreaView>
  );
};

export default ChatBox;
