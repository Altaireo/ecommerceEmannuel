// API KEY: AIzaSyDazY_-ZKcsRYbz5lNpMFdwdbBzTBm9xsA

"use client";
import React from 'react';
import styles from './map.module.css';

const GoogleMap = () => {
  const apiKey = 'AIzaSyDazY_-ZKcsRYbz5lNpMFdwdbBzTBm9xsA'; 

  return (
    <div className={styles.mapContainer}>
      <div className={styles.banner}>
        <p>You can find our stores in the map below:</p>
      </div>
      <div className={styles.googleMapContainer}>
        <script
          async
          src={`https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=console.debug&libraries=maps,marker&v=beta`}
        ></script>
        <gmp-map center="1.334826111793518,103.7468490600586" zoom="14" map-id="DEMO_MAP_ID">
          
          <gmp-advanced-marker position="1.3348,103.7468"></gmp-advanced-marker>
          <gmp-advanced-marker position="1.2646,103.8230"></gmp-advanced-marker>
          <gmp-advanced-marker position="1.3349,103.7469"></gmp-advanced-marker>
          <gmp-advanced-marker position="1.3045,103.8362"></gmp-advanced-marker>
          <gmp-advanced-marker position="1.3027,103.8368"></gmp-advanced-marker>
          <gmp-advanced-marker position="1.2646,103.8230"></gmp-advanced-marker>
          <gmp-advanced-marker position="1.2994,103.8549"></gmp-advanced-marker>
          <gmp-advanced-marker position="1.2960,103.8590"></gmp-advanced-marker>
          <gmp-advanced-marker position="1.3602,103.9898"></gmp-advanced-marker>
        </gmp-map>
      </div>
    </div>
  );
};

export default GoogleMap;
