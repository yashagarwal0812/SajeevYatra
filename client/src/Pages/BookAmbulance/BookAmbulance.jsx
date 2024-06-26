import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './BookAmbulance.scss'
import socket from '../../socket';
import { useEffect } from 'react';

const BookAmbulance = () => {

  useEffect(() => {
    socket.on('gotomap', (formData) => {
      navigate('/map');
    });

  }, []);

  const [formData, setFormData] = useState({
    name: '',
    phnum: '',
    location: '',
    latitude: '',
    longitude: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    socket.emit('join-room', formData.phnum);

    socket.emit('find-ambulance', formData);
  };



  return (
    <div className="login-form-container">
      <h2>Information</h2>
      <form >
        <div className="form-row">
          <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
        </div>
        <div className="form-row">
          <input type="tel" name="phnum" value={formData.phnum} onChange={handleChange} placeholder="Phone No." pattern="[0-9]{10}" required />
        </div>
        <div className="form-row">
          <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="location" required />
        </div>
        <div className="form-row">
          <input type="text" name="latitude" value={formData.latitude} onChange={handleChange} placeholder="latitude" required />
        </div>
        <div className="form-row">
          <input type="text" name="longitude" value={formData.longitude} onChange={handleChange} placeholder="longitude" required />
        </div>
        <button type="submit" onClick={handleSubmit}>Submit</button>
      </form>
    </div>
  );
}

export default BookAmbulance;
