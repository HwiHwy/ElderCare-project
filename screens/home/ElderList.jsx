import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ELDER_DETAIL_SCREEN } from "../../constants/nameRoute";

const ElderList = () => {
  const navigation = useNavigation();
  const [elderData, setElderData] = useState([]);
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [bearerToken, setBearerToken] = useState("");

  const fetchBearerToken = useCallback(async () => {
    try {
      const token = await AsyncStorage.getItem("tokenUser");
      if (token) {
        setBearerToken(token);
      }
    } catch (error) {
      console.error("Error fetching bearer token:", error);
    }
  }, []);

  useEffect(() => {
    fetchBearerToken();
  }, [fetchBearerToken]);

  useEffect(() => {
    if (bearerToken) {
      fetchData();
    }
  }, [bearerToken]);

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(
        "https://elder-care-api.monoinfinity.net/api/Elder",
        {
          headers: {
            Authorization: `Bearer ${bearerToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      if (!data || data.length === 0) {
        throw new Error("Empty response received");
      }

      setElderData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsDataLoading(false);
    }
  }, [bearerToken]);

  const handleCardPress = (elderId) => {
    navigation.navigate(ELDER_DETAIL_SCREEN, { elderId });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleCardPress(item.elderlyId)}>
      <View style={styles.itemContainer}>
        <Image
          source={{
            uri: "https://files.scmagazine.com/wp-content/uploads/2022/09/091222_google_logo.jpg",
          }}
          style={styles.image}
        />
        <View style={styles.textContainer}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.details}>
          {item.relationshiptocustomer}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {isDataLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={elderData}
          renderItem={renderItem}
          keyExtractor={(item) => (item && item.elderlyId ? item.elderlyId.toString() : null)}
        />
      )}
    </View>
  );
};

const ElderListScreen = () => {
  useFocusEffect(
    useCallback(() => {
    }, [])
  );

  return <ElderList />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  details: {
    fontSize: 16,
    marginTop: 2,
  },
});

export default ElderListScreen;
