import React, { useCallback, useState, useEffect } from 'react';
import { SafeAreaView, Text, StyleSheet, ActivityIndicator, View, Image, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Calendar } from 'react-native-calendars';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';

const OrderPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [markedDates, setMarkedDates] = useState({});
  const [selectedDayData, setSelectedDayData] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        try {
          const storedToken = await AsyncStorage.getItem("tokenUser");
          const response = await axios.get('https://elder-care-api.monoinfinity.net/api/Carer/3/TrackingTimetables', {
            headers: {
              Authorization: `Bearer ${storedToken}`
            }
          });
          setData(response.data);
          setLoading(false);
        } catch (error) {
          console.error(error);
          setLoading(false);
        }
      };

      fetchData();
    }, [])
  );

  useEffect(() => {
    if (data.length > 0) {
      const dates = {};
      data.forEach(item => {
        const date = item.reportDate.split('T')[0];
        dates[date] = { marked: true };
      });
      setMarkedDates(dates);
    }
  }, [data]);

  const handleDayPress = (day) => {
    const selectedDateString = day.dateString;
    setSelectedDate(selectedDateString);
    const dayData = data.filter(item => item.reportDate.split('T')[0] === selectedDateString);
    setSelectedDayData(dayData.length > 0 ? dayData[0] : null);
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Calendar
        markedDates={markedDates}
        onDayPress={handleDayPress}
        theme={{
          todayTextColor: '#00adf5',
          arrowColor: '#00adf5',
          selectedDayBackgroundColor: '#00adf5',
          selectedDayTextColor: '#ffffff',
        }}
      />
      {selectedDayData ? (
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent}>
          <View style={styles.itemContainer}>
            <Text style={styles.dateText}>Date: {selectedDayData.reportDate.split('T')[0]}</Text>
            <Text style={styles.timeframeText}>Timeframe: {selectedDayData.timeframe}</Text>
            {selectedDayData.trackings.map((tracking, idx) => (
              <View key={idx} style={styles.trackingContainer}>
                <Text style={styles.trackingTitle}>Title: {tracking.title}</Text>
                <Text style={styles.trackingStatus}>Status: {tracking.status}</Text>
                {tracking.image && (
                  <Image
                    source={{ uri: tracking.image }}
                    style={styles.trackingImage}
                  />
                )}
                <Text style={styles.trackingContent}>Report: {tracking.reportContent}</Text>
              </View>
            ))}
          </View>
        </ScrollView>
      ) : (
        <Text style={styles.noDataText}>KHÔNG CÓ DỮ LIỆU CHO NGÀY {selectedDate}</Text>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
    marginTop: 10,
  },
  scrollViewContent: {
    padding: 20,
    paddingBottom: 200, 
  },
  itemContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
    elevation: 2,
  },
  dateText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  timeframeText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  trackingContainer: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  trackingTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#444',
  },
  trackingStatus: {
    fontSize: 14,
    color: '#777',
    marginTop: 5,
  },
  trackingImage: {
    width: '100%',
    height: 200,
    marginTop: 10,
    borderRadius: 6,
  },
  trackingContent: {
    fontSize: 14,
    color: '#666',
    marginTop: 10,
  },
  noDataText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#888',
  },
});

export default OrderPage;
