// Card.js
import React from 'react';
import './contect.css';

function Card({ name, mobileNumber, email, wardNo }) {
  return (
      <div className="card">
        <div className="ward_no">{wardNo}</div>
        <div className="name">Name: {name}</div>
        <div className="mobile-number">Mob No: {mobileNumber}</div>
        <div className="email">Email: {email}</div>
      </div>
  );
}

export default Card;
