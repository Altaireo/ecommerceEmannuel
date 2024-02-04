// This page is needed for productdetail\[id]/page.jsx
import Product from "@models/product"; // Importing the Product model
import { connectToDB } from "@utils/database"; // Importing the connectToDB function

export const GET = async (request, { params }) => {
    try {
        await connectToDB(); // Connect to the database
        const selectedProduct = await Product.findById(params.id); // Find the product by ID

        // Return the selected product as a JSON response with status 200
        return new Response(JSON.stringify(selectedProduct), { status: 200 });
    } catch (error) {
        // Return an error response if the product is unavailable with status 500
        return new Response("Product is unavailable", { status: 500 });
    }
};
