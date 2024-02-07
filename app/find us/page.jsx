import React from 'react';
import Email from 'app/email/page.jsx';
import Clock from 'app/timeapi/page.jsx';
import GoogleMap from 'app/mapapi/page.jsx'; 
import StoreComponent from 'app/stores/page.jsx';

const MainPage = () => {
  return (
    <div>
      
      <Clock />
      <StoreComponent />
      <GoogleMap />
      <Email />
    </div>
  );
};

export default MainPage;