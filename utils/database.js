import mongoose from "mongoose";

// Variable to track the connection status
let isConnected = false;

// Function to connect to the MongoDB database
export const connectToDB = async () => {
    mongoose.set('strictQuery', true); // Set strictQuery option for mongoose

    // Check if already connected to the database
    if (isConnected) {
        console.log('MongoDB is already connected');
        return;
    }

    try {
        // Connect to the MongoDB database
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: "Ecommerce", // Specify the database name
            useNewUrlParser: true, // Use new URL parser
            useUnifiedTopology: true, // Use new Server Discover and Monitoring engine
        });

        // Set isConnected to true after successful connection
        isConnected = true;

        console.log("MongoDB database connected");
    } catch (error) {
        // Log any errors that occur during connection
        console.error('Error connecting to MongoDB:', error);
    }
};
