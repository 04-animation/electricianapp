import React, { useEffect, useState } from 'react';
import { View, Text, Button, TextInput, FlatList, StyleSheet } from 'react-native';

export default function App() {
  const [profile, setProfile] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [customerName, setCustomerName] = useState('');
  const [service, setService] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [address, setAddress] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/profile')
      .then(res => res.json())
      .then(data => setProfile(data));
      
    fetch('http://localhost:5000/bookings')
      .then(res => res.json())
      .then(data => setBookings(data));
  }, []);

  const makeBooking = () => {
    fetch('http://localhost:5000/book', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ customerName, service, date, time, address }),
    })
      .then(res => res.json())
      .then(data => {
        alert('Booking successful!');
        setBookings([...bookings, data.booking]);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Electrician App</Text>

      {profile && (
        <View>
          <Text style={styles.title}>{profile.name}</Text>
          <Text>Experience: {profile.experience}</Text>
          <Text>Rate: ₹{profile.rate}</Text>
          <Text>Services: {profile.services.join(', ')}</Text>
          <Text>Phone: {profile.phone}</Text>
          <Text>WhatsApp: {profile.whatsapp}</Text>
        </View>
      )}

      <Text style={styles.subHeader}>Make a Booking</Text>
      <TextInput placeholder="Your Name" style={styles.input} onChangeText={setCustomerName} />
      <TextInput placeholder="Service" style={styles.input} onChangeText={setService} />
      <TextInput placeholder="Date" style={styles.input} onChangeText={setDate} />
      <TextInput placeholder="Time" style={styles.input} onChangeText={setTime} />
      <TextInput placeholder="Address" style={styles.input} onChangeText={setAddress} />
      <Button title="Book Now" onPress={makeBooking} />

      <Text style={styles.subHeader}>My Bookings</Text>
      <FlatList
        data={bookings}
        keyExtractor={item => item._id}
        renderItem={({ item }) => (
          <Text>
            {item.service} on {item.date} at {item.time} - Status: {item.status}
          </Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, marginTop: 40 },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  subHeader: { fontSize: 18, fontWeight: 'bold', marginTop: 20 },
  title: { fontSize: 20, fontWeight: 'bold' },
  input: { borderWidth: 1, padding: 10, marginVertical: 5 },
});
