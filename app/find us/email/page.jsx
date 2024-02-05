// Importing necessary modules and styles
"use client";
import React, { useState } from 'react';
import styles from './contact.module.css'; // Adjust the path based on your project structure

// Functional component for the Contact Us banner
const ContactUsBanner = () => {
  // State to store the email input value
  const [email, setEmail] = useState('');

  // Function to handle the click event on the "Notify Me" button
  const handleNotifyClick = () => {
    // Checking if the entered email is valid
    if (isValidEmail(email)) {
      // Extracting the username from the email
      const username = email.split('@')[0];
      // Displaying a success alert message
      alert(`Thank you ${username}! We will get in touch with you anywhere from 3 to 5 working days.`);
    } else {
      // Displaying an error alert message for invalid email
      alert('Please enter a valid email. :)');
    }
  };

  // Function to validate the email format
  const isValidEmail = (inputEmail) => {
    // Basic email validation, checking if '@' exists,
    // if there is content before and after '@',
    // if there is a dot (.) after '@', and no spaces
    const atIndex = inputEmail.indexOf('@');
    const dotIndex = inputEmail.indexOf('.', atIndex + 1);
    
    return (
      // Check if the '@' symbol is present in the email address
      atIndex !== -1 &&
  
      // Ensure that the '@' symbol is not the first character of the email address
      atIndex !== 0 &&

      // Ensure that the '@' symbol is not the last character of the email address
      atIndex !== inputEmail.length - 1 &&

      // Check if a dot (.) is present in the email address
      dotIndex !== -1 &&

      // Ensure that the dot (.) is not the last character of the email address
      dotIndex !== inputEmail.length - 1 &&

      // Verify that there are no spaces in the email address
      !inputEmail.includes(' ')

      );
    };

  // Function to handle changes in the email input
  const handleInputChange = (event) => {
    setEmail(event.target.value);
  };

  // Function to handle the Enter key press event
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      // Triggering the Notify Click function on Enter key press
      handleNotifyClick();
    }
  };

  // JSX structure for the Contact Us banner
  return (
    <div className={styles.banner}>
      <h2>Contact Us</h2>
      <p>We'd love to hear from you! Enter your email below, and we'll get in touch.</p>
      <div className={styles['inner-container']}>
        <input
          type="text"
          placeholder="Your email"
          value={email}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
        />
        <button onClick={handleNotifyClick}>Notify Me</button>
      </div>
    </div>
  );
};

// Exporting the ContactUsBanner component
export default ContactUsBanner;
