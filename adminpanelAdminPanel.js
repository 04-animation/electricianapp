import React, { useEffect, useState } from 'react';

function AdminPanel() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/bookings')
      .then(res => res.json())
      .then(data => setBookings(data));
  }, []);

  const updateStatus = (id, status) => {
    fetch(`http://localhost:5000/bookings/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    })
      .then(res => res.json())
      .then(data => {
        alert('Status updated!');
        const updated = bookings.map(b =>
          b._id === id ? { ...b, status: data.booking.status } : b
        );
        setBookings(updated);
      });
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Electrician Admin Panel</h1>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Customer</th>
            <th>Service</th>
            <th>Date</th>
            <th>Time</th>
            <th>Address</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map(booking => (
            <tr key={booking._id}>
              <td>{booking.customerName}</td>
              <td>{booking.service}</td>
              <td>{booking.date}</td>
              <td>{booking.time}</td>
              <td>{booking.address}</td>
              <td>{booking.status}</td>
              <td>
                <button onClick={() => updateStatus(booking._id, 'confirmed')}>Confirm</button>
                <button onClick={() => updateStatus(booking._id, 'completed')}>Complete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminPanel;
