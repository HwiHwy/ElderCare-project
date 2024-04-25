// CarerListItem.js

import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { COLORS } from "../../constants";

const CarerListItem = ({ carer }) => {
  return (
    <View style={styles.itemContainer}>
      <Text style={styles.name}>{carer.name}</Text>
      <Text style={styles.email}>{carer.email}</Text>
      <Text style={styles.phone}>{carer.phone}</Text>
      <Text style={styles.gender}>{carer.gender}</Text>
      <Text style={styles.age}>{carer.age}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: COLORS.lightGray,
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    marginBottom: 5,
  },
  phone: {
    fontSize: 16,
    marginBottom: 5,
  },
  gender: {
    fontSize: 16,
    marginBottom: 5,
  },
  age: {
    fontSize: 16,
  },
});

export default CarerListItem;
