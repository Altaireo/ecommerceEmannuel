'use client';
import React, { useState, useEffect } from 'react'
import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Button,
    Input,
    Select,
} from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import RatingStars from '@smallcomponents/RatingStars'; 
import { addToCart, getCartItems } from '@utils/idb';
const ProductDetail = (promps) => {
    // const [action, setAction] = useState(false)
    console.log("new Product:", promps);
    const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
    const colors = ['red', 'blue', 'green', 'yellow'];
    const { category, desc, discount, image, name, price, _id } = promps.product
    const [quantity, setQuantity] = useState(1);
    const [selectedSize, setSelectedSize] = useState('');
    const [selectedColor, setSelectedColor] = useState('');
    const handleButton = () => {
        promps.handleOpen(false);
    }
    const handleAddToCart = async () => {
        // Create a product object to keep the data clean and structured
        const productData = {
            _id,
            name,
            desc,
            price,
            selectedSize,
            selectedColor,
            quantity,
            image,
            category,
        };

        console.log("Adding the following product to cart:", productData);
        try {
            await addToCart(productData);
            console.log('Item added to cart!');
            handleButton()
          } catch (error) {
            console.error('Error adding item to cart:', error);
          }
        // If using Redux, dispatch an action here to add  to your cart state
        // dispatch(addProductToCart(productData));

        // If sending to a server, make a POST request here
        // axios.post("/api/cart", productData);
    };
    return (
        <Card className="lg:flex-row sm:flex-col relative">
            <button
                className="absolute top-4 z-10 right-4 p-2 bg-white rounded-full hover:shadow-xl hover:bg-gray-100"
                onClick={() => { handleButton() }}
            >
                <XMarkIcon className="w-4 h-4" />
            </button>
            <CardHeader
                shadow={false}
                floated={false}
                className="m-0 lg:w-2/5 shrink-0"
            >
                <img
                    src={image}
                    alt="product-image"
                    className=" object-fill"
                />
            </CardHeader>
            <CardBody>
                <Typography variant="h6" color="gray" className="mb-4 uppercase">
                    {name}
                </Typography>
                <Typography color="gray" className="mb-4 font-normal">
                    {desc}
                </Typography>
                 <RatingStars />
                <div className="flex">
                {promps.discountedPrice ? (
                    <><Typography variant="h6" color="blue-gray" className="font-lg text-lg mr-2 mb-4">
                        ${promps.discountedPrice || price}
                    </Typography><Typography variant="h6" color="blue-gray" className="font-medium line-through mb-4">
                            ${price}
                        </Typography></>
                ) : (<Typography variant="h6" color="blue-gray" className="font-medium mb-4">
                    ${price}
                </Typography>)}
                </div>

                {/* Size Selector */}
                <div className=" mb-4">
                    {sizes.map((size, index) => (
                        <Button
                            key={index}
                            className={selectedSize === size ? "lightBlue m-1 px-4 py-1" : "ring-black ring-1 text-black bg-transparent m-1 px-4 py-1 shadow-none"}
                            onClick={() => setSelectedSize(size)}
                        >
                            {size}
                        </Button>
                    ))}
                </div>

                {/* Color Selector */}
                <div className=" mb-4">
                    {colors.map((color, index) => (
                        <Button
                            key={index}
                            className={selectedColor === color ? "lightBlue m-1 px-4 py-1" : "ring-black ring-1 text-black bg-transparent m-1 px-4 py-1 shadow-none"}
                            onClick={() => setSelectedColor(color)}
                        >
                            {color}
                        </Button>
                    ))}
                </div>

                {/* Quantity Selector */}
                <div className="flex items-center mt-auto">
                    <Button
                        
                        onClick={() => setQuantity(q => Math.max(q - 1, 1))}
                        className="m-1 bg-transparent text-black shadow-none text-lg"
                    >
                        -
                    </Button>
                    <Typography color="gray" className="mx-4">
                        {quantity}
                    </Typography>
                    <Button
                        color="gray"
                        onClick={() => setQuantity(q => q + 1)}
                        className="m-1 bg-transparent text-black shadow-none text-lg"
                    >
                        +
                    </Button>
                    <Button color="lightBlue" className="m-1" ripple="dark"
                    onClick={() => { handleAddToCart() }}
                    disabled={!selectedColor || !selectedSize}
                >
                    Add to Cart
                </Button>
                </div>
                
            </CardBody>
        </Card>

    )
}

export default ProductDetail