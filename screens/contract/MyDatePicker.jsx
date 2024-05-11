import React, { useState } from "react";
import { View, Text, Button, Platform } from "react-native";
// import DateTimePicker from "@react-native-community/datetimepicker";

const MyDatePicker = () => {

  return (
    <View>
      {/* <View>
        <Text>Start Date: {startDate.toISOString()}</Text>
        <Button onPress={showStartDatepicker} title="Select Start Date" />
        {showStartDatePicker && (
          <DateTimePicker
            testID="startDateTimePicker"
            value={startDate}
            mode="datetime"
            is24Hour={true}
            display="default"
            onChange={onChangeStartDate}
          />
        )}
      </View>
      <View>
        <Text>End Date: {endDate.toISOString()}</Text>
        <Button onPress={showEndDatepicker} title="Select End Date" />
        {showEndDatePicker && (
          <DateTimePicker
            testID="endDateTimePicker"
            value={endDate}
            mode="datetime"
            is24Hour={true}
            display="default"
            onChange={onChangeEndDate}
          />
        )}
      </View> */}
    </View>
  );
};

export default MyDatePicker;
