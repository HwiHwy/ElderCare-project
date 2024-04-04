import React from "react";
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native"; // Import TouchableOpacity
import { COLORS, SIZES } from "../../constants";

const PackageDetailsModal = ({ visible, onClose, packageName, packageDescription }) => {
  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.packageName}>{packageName}</Text>
          <Text style={styles.description}>{packageDescription}</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Image URL"
            onChangeText={(text) => {
              // Handle onChangeText
            }}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter Video URL"
            onChangeText={(text) => {
              // Handle onChangeText
            }}
          />
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.modalOverlay,
  },
  modalContent: {
    backgroundColor: COLORS.white,
    padding: SIZES.medium,
    borderRadius: SIZES.small,
    width: "80%",
  },
  packageName: {
    fontSize: SIZES.large,
    fontWeight: "bold",
    marginBottom: SIZES.small,
  },
  description: {
    marginBottom: SIZES.small,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.gray,
    borderRadius: SIZES.small,
    padding: SIZES.small,
    marginBottom: SIZES.small,
  },
  closeButton: {
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.small,
    padding: SIZES.medium,
    alignItems: "center",
  },
  closeButtonText: {
    color: COLORS.white,
    fontWeight: "bold",
  },
});

export default PackageDetailsModal;
