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
    
        const noteForSelectedDate = getNoteForDate(date);
    
        const combinedDateTime = `${date} ${deliveryTime.toLocaleTimeString()}`;
        const newTime = convertDateTime(combinedDateTime);
    
        setFormData({
          ...formData,
          pickUpTime: newTime,
          note: noteForSelectedDate,
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

        const notes = {
          '2024-03-24': 'Working day',
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


    </SafeAreaView>
  </ScrollView>
  );
};


export default Schedule;
