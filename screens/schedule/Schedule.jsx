import React, { useState } from "react";
import { ScrollView, Text, StyleSheet, TouchableOpacity, SafeAreaView, StatusBar, View, Button } from "react-native";
import { Calendar, LocaleConfig } from "react-native-calendars";
import ScheduleStyle from "./Schedule.style";
import { AppBar, ReusedButton, ReusedText, reuse } from "../../components";
import { COLORS, SIZES } from "../../constants";
import DateTimePicker from '@react-native-community/datetimepicker'

const Schedule = ({ route, navigation }) => {
    const [pickUpDate, setPickUpDate] = useState('')
    const [deliveryTime, setDeliveryTime] = useState(new Date())
    const [selectedDate, setSelectedDate] = useState('')
    const [formData, setFormData] = useState({
       
      })
    const [showTimePicker, setShowTimePicker] = useState(false)
    const handlePickupDate = (date) => {
        setPickUpDate(date);
        setSelectedDate(date);
    
        // Assume you have a function to fetch the note based on the selected date
        const noteForSelectedDate = getNoteForDate(date);
    
        const combinedDateTime = `${date} ${deliveryTime.toLocaleTimeString()}`;
        const newTime = convertDateTime(combinedDateTime);
    
        setFormData({
          ...formData,
          pickUpTime: newTime,
          note: noteForSelectedDate, // Include the note in formData
        });
      };
    
      const onChange = (event, selectedTime) => {
        const currentTime = selectedTime || deliveryTime
        setShowTimePicker(false)
        setDeliveryTime(currentTime)
    
        const combinedDateTime = `${pickUpDate} ${currentTime.toLocaleTimeString()}`
        const newtime = convertDateTime(combinedDateTime)
        setFormData({ ...formData, pickUpTime: newtime })
      }
      const getNoteForDate = (selectedDate) => {
        // Simulating fetching the note for the selected date
        // Replace this with your logic to retrieve the actual note
        const notes = {
          '2024-03-24': 'Working day',
          // Add more entries for other dates and their corresponding notes
        };
      
        return notes[selectedDate] || 'No note available';
      };
      const convertDateTime = (datetime) => {
        const parts = datetime.split(' ')
        const datePart = parts[0]
        const timePart = parts[1]
    
        // Convert time to 24-hour format
        let hours = parseInt(timePart.split(':')[0])
        const minutes = parseInt(timePart.split(':')[1])
    
        if (parts[2] === 'CH' && hours !== 12) {
          hours += 12
        } else if (parts[2] === 'SA' && hours === 12) {
          hours = 0
        }
    
        // Combine date and time parts
        const combinedDateTime = new Date(`${datePart}T${hours}:${minutes}:00.000Z`)
    
        // Format as ISO string
        const isoString = combinedDateTime.toISOString()
        return isoString
      }
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
    <SafeAreaView style={reuse.containerAndroidSafeArea}>
      <StatusBar style="auto" />

      <View style={ScheduleStyle.formCalendar}>
        <Calendar
          onDayPress={(day) => handlePickupDate(day.dateString)}
          minDate={new Date()}
          markedDates={
            selectedDate
              ? {
                  [selectedDate]: {
                    selected: true,
                    selectedColor: COLORS.primary,
                  },
                }
              : {}
          }
        />
      </View>

      {selectedDate && (
          <View style={ScheduleStyle.selectedDateInfo}>
            <ReusedText style={ScheduleStyle.dateInfoText}>
              Selected Date: {selectedDate}
            </ReusedText>
            <ReusedText style={ScheduleStyle.dateInfoText}>
              Note: {formData.note}
            </ReusedText>
            {/* Add more information or components related to the selected date */}
            {/* For example, you can add a time picker here */}
            <TouchableOpacity onPress={() => setShowTimePicker(true)}>
              <ReusedText style={ScheduleStyle.dateInfoText}>
                Select Delivery Time
              </ReusedText>
            </TouchableOpacity>

            {showTimePicker && (
              <DateTimePicker
                value={deliveryTime}
                mode="time"
                is24Hour={false}
                display="default"
                onChange={onChange}
              />
            )}
        </View>
      )}

      <View>
        <ReusedButton
          text={'TIẾP TỤC'}
          color={COLORS.white}
          backgroundColor={COLORS.primary}
        />
      </View>
    </SafeAreaView>
  </ScrollView>
  );
};


export default Schedule;
