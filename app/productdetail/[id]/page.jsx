// Importing necessary modules and components
'use client';
import { useState, useEffect } from "react";
import { Typography, Button } from "@material-tailwind/react";

// Imported utility functions and components
import { addToCart } from '@utils/idb';
import { toast } from 'sonner';
import { useAppContext } from '@utils/appProvider';
import AccordionTemp from "@components/AccordionTemp";

// Functional component Product
const Product = ({ params }) => {
  // Using custom hook to access global state and functions
  const { cartItemCount, add2Cart } = useAppContext();

  // Define product sizes and colors
  const sizes = ['S', 'M', 'L', 'XL'];
  const colors = ['Maroon-Red', 'Navy Blue', 'Black', 'Lemon Green'];

  // State variables
  const [userSize, setSelectedSize] = useState('');
  const [userColour, setSelectedColor] = useState('');
  const [productDetails, setProductData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [discountedPrice, setDiscountedPrice] = useState(true);
  const [activeImage, setActiveImage] = useState(null);
  const [quantity, setQuantity] = useState(1);

  // Function to fetch product data
  // Function to fetch product data
  const getProduct = async () => {
    try {
      // Send a request to fetch product data by its ID
      const response = await fetch(`/api/product/${params.id}`);

      // Check if the response is not okay
      if (response.ok === false) {
        throw new Error('Network response is not working');
      }

      // Parse response data as JSON
      const data = await response.json();

      // Log the fetched data
      console.log("Getting Data", data);

      // Set product data and initial image
      setProductData(data);
      setActiveImage(data.images[0]);
      setIsLoading(false);

      // Calculate discounted price if available
      const Discounted =
        data.discount > 0 ?
          (data.price - (data.price * data.discount / 100)).toFixed(2) :
          null;
      setDiscountedPrice(Discounted);
    } catch (error) {
      // Log error if fetching data fails
      console.error('Unable to fetch (Error): ', error);
    }
  };


  // Function to handle adding product to cart
  const handleAddToCart = async () => {
    try {
      // Add product to cart using IndexedDB
      await addToCart(productDetails);
      // Show success toast
      toast.success("Added item to cart!");
      // Increment cart item count
      handleAdd2Cart();
      console.log('cart item count: ', cartItemCount);
    } catch (error) {
      console.error('Error adding item to cart:', error);
      // Show error toast if product is already in cart
      toast.error('Product already in cart!', { background: 'pink' });
    }
  };

  // Fetch product data on component mount
  useEffect(() => {
    getProduct();
  }, []);

  // Update product data when selected size or color changes
  useEffect(() => {
    setProductData(prevState => ({
      ...prevState,
      userSize,
      userColour,
    }));
  }, [userSize, userColour]);

  // Render product details and UI elements
  return (
    <div className="flex flex-col md:flex-row m-8">
      {isLoading ? <div>Loading</div> :
        <>
          <div className="flex flex-col-reverse md:flex-col md:w-1/2">
            {/* Main product image */}
            <div className="h-[40%] flex items-center justify-center overflow-hidden rounded-xl">
              <img
                src={activeImage || productDetails.image}
                alt="Large product"
                className="w-full object-cover transform transition-transform duration-500 hover:scale-90"
              />
            </div>

            {/* Product image thumbnails */}
            <div className="flex space-x-2 mt-2 rounded-xl">
              {productDetails.images.map((img, idx) => (
                <div
                  key={idx}
                  className="relative w-16 h-16 cursor-pointer rounded-xl overflow-hidden"
                  onClick={() => setActiveImage(img)}
                >
                  <img
                    src={img}
                    alt={`Thumbnail ${idx}`}
                    className="w-full h-full object-cover"
                  />
                  {activeImage === img && (
                    <div className="absolute inset-0 bg-gray opacity-100 ring-2 ring-black"></div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Product details and controls */}
          <div className="md:w-1/2 p-4">
            <h1 className="text-xl md:text-3xl mb-2">{productDetails.name}</h1>
            <p className="text-sm md:text-base mb-2">★★★★★ (100 reviews)</p>
            <Typography color="pink" className="mb-4 font-normal custom-font-class">
              {productDetails.desc}
            </Typography>

            {/* Display price and discount if available */}
            <div className="flex">
              {productDetails.discount ? (
                <>
                  <Typography variant="h5" color="red" className="font-roboto font-semi-bold text-lg mr-2 mb-4">
                    ${discountedPrice}
                  </Typography>
                  <Typography variant="h5" color="red" className="font-roboto font-bold line-through mb-4">
                    ${productDetails.price}
                  </Typography>

                </>
              ) : (
                <Typography variant="h5" color="green" className="font-roboto font-bold mb-4">
                  ${productDetails.price}
                </Typography>
              )}
            </div>

            {/* Size Selector */}
            <div className="mb-3">
              {sizes.map((selectedSize, index) => (
                <Button
                  key={index}
                  className={userSize === selectedSize ? "bg-red-700 text-white m-1 px-4 py-1 rounded-lg" : "bg-transparent text-black border border-black m-1 px-4 py-1 rounded-lg"}
                  onClick={() => setSelectedSize(selectedSize)}
                >
                  {selectedSize}
                </Button>
              ))}
            </div>

            {/* Color Selector */}
            <div className=" mb-3">
              {colors.map((selectedColour, index) => (
                <Button
                  key={index}
                  className={userColour === selectedColour ? "bg-red-700 text-white m-1 px-4 py-1 rounded-lg" : "bg-transparent text-black border border-black m-1 px-4 py-1 rounded-lg"}
                  onClick={() => setSelectedColor(selectedColour)}
                >
                  {selectedColour}
                </Button>
              ))}
            </div>

            {/* Quantity controls and Add to Cart button */}
            <div className="flex items-center mt-auto">
              <Button
                onClick={() => setQuantity(q => Math.max(q - 1, 1))}
                className="m-1 bg-blue-300 text-gray shadow-none text-lg"
              >
                -
              </Button>
              <Typography color="black" className="mx-4">
                {quantity}
              </Typography>
              <Button
                color="gray"
                onClick={() => setQuantity(q => q + 1)}
                className="m-1 bg-blue-300 text-white shadow-none text-lg"
              >
                +
              </Button>
              <Button
                color="red" // Change color to red for a more prominent appearance
                className="m-4 bg-black hover:bg-green-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75" // Add Tailwind CSS classes for styling
                ripple="dark" // Change ripple effect to dark for a subtle effect
                onClick={() => { handleAddToCart() }}
                disabled={!userColour || !userSize}
                fullWidth
              >
                Add to my Cart
              </Button>

            </div>

            {/* Accordion component */}
            <AccordionTemp />
          </div>
        </>
      }
    </div>
  );
};

export default Product;
