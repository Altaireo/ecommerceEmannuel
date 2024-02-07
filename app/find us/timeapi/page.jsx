"use client";

import useSWR from "swr";
import Spinner from "react-bootstrap/Spinner";
import styles from './time.module.css';

// Define a function to fetch and deserialize data from an API
const fetcher = (...args) => fetch(...args).then((res) => res.json());

// Define a function to get the name of the day based on its number (0-6)
function getDayName(dayNumber) {
  // Define an array of day names
  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  // Ensure the dayNumber is within a valid range (0-6)
  const normalizedDayNumber = (dayNumber >= 0 && dayNumber <= 6) ? dayNumber : null;
  // Return the day name or "Invalid day number" if the dayNumber is outside the valid range
  return normalizedDayNumber !== null ? daysOfWeek[normalizedDayNumber] : "Invalid day number";
}

// Define the main component
export default function App() {
  // Define the URL for the World Time API
  const WORLD_TIME_API_URL = "http://worldtimeapi.org/api/ip";

  // Use the SWR (Stale-While-Revalidate) hook to fetch data from the API
  const { data, error, isLoading } = useSWR(WORLD_TIME_API_URL, fetcher, {
    dedupingInterval: 500, // Avoid duplicate requests within 0.5 seconds
    refreshInterval: 1000, // Refresh the data every 1 second
  });

  // Handle errors during data fetching
  if (error) {
    return <h1 className={styles.error}>Failed to load</h1>;
  }

  // Display a loading spinner while data is being fetched
  if (isLoading) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }

  // Format the received date and time data
  const formattedDateTime = new Date(data.datetime).toLocaleString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  // Get the day of the week as a number (0-6)
  const dayOfWeek = new Date(data.datetime).getDay();

  // Get the name of the day using the getDayName function
  const dayName = getDayName(dayOfWeek);

  // Split the formatted date and time
  const [date, time] = formattedDateTime.split(',');

  // Render the component with the fetched and formatted data
  return (
    <div className={styles.fixedTopLeft}>
      <p>Day: {dayName}</p>
      <p>Date: {date.trim()}</p>
      <p>Time: {time.trim()}</p>
    </div>
  );
}
