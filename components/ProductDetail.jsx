'use client';
import React, { useState } from 'react'
import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Button,
} from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import RatingStars from '@components/RatingStars';
import { addToCart } from '@utils/idb';
import { toast } from 'sonner';
import { useAppContext } from '@utils/appProvider';
import { useSession } from "next-auth/react";

import Link from 'next/link';
const FirstProductDetailPage = (temp) => {
    const { cartItemCount, add2Cart } = useAppContext();
    const { data: session } = useSession();
    const sizes = ['S', 'M', 'L', 'XL',];
    const colors = ['Maroon Red', 'Navy Blue', 'Black', 'Lemon Green'];
    const { category, desc, image, name, price, _id, images } = temp.product
    const [quantity, setQuantity] = useState(1);
    const [selectedSize, setSelectedSize] = useState('');
    const [selectedColor, setSelectedColor] = useState('');
    const discountedPrice = temp.discountedPrice;
    const handleButton = () => {
        temp.handleOpen(false);
    }
    const handleAdd2Cart = () => {
        add2Cart(1);
    };
    const handleAddToCart = async () => {
        const usersProduct = {
            creator: session?.user?.id,
            _id,
            name,
            desc,
            price,
            discountedPrice,
            selectedSize,
            selectedColor,
            quantity,
            image,
            images,
            category,
        };

        console.log("Adding the following product to cart:", usersProduct);
        try {
            await addToCart(usersProduct);
            toast.success("Added item to cart!");
            handleAdd2Cart();
            handleButton();
            console.log('Cart item count:p', cartItemCount);
        } catch (error) {
            console.error('Unable to add item into cart (Error):', error);
            toast.error('This product is already in the cart !', { background: 'pink' },);
            handleButton();
        }
    };
    return (
        <Card className="lg:flex-row sm:flex-col relative">
            <button
                className="absolute top-4 z-10 right-4 p-2 bg-white rounded-full hover:shadow-xl hover:bg-red-100"
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
                    src={image || images[0]}
                    alt="product-image"
                    className=" object-fill"
                />
            </CardHeader>
            <CardBody>
                <Typography variant="h5" color="pink" className="mb-3 uppercase">
                    {name}
                </Typography>
                <Typography color="pink" className="font-roboto font-semi-bold mb-4">
                    {desc}
                </Typography>
                <RatingStars />
                <div className="flex">
                    {temp.discountedPrice ? (
                        <><Typography variant="h5" color="red" className="font-roboto font-semi-bold text-lg mr-2 mb-4">
                            ${temp.discountedPrice || price}
                        </Typography><Typography variant="h5" color="red" className="font-roboto font-bold line-through mb-4">
                                ${price}
                            </Typography></>
                    ) : (<Typography variant="h5" color="green" className="font-bold mb-4">
                        ${price}
                    </Typography>)}
                </div>

                {/* Size Selector */}
                <div className=" mb-3">
                    {sizes.map((sizes, index) => (
                        <Button
                            key={index}
                            className={selectedSize === sizes ? "bg-red-700 text-white m-1 px-4 py-1 rounded-lg" : "bg-transparent text-black border border-black m-1 px-4 py-1 rounded-lg"}
                            onClick={() => setSelectedSize(sizes)}
                        >
                            {sizes}
                        </Button>
                    ))}
                </div>

                {/* Color Selector */}
                <div className=" mb-3">
                    {colors.map((Color, indexes) => (
                        <Button
                            key={indexes}
                            className={selectedColor === Color ? "bg-red-700 text-white m-1 px-4 py-1 rounded-lg" : "bg-transparent text-black border border-black m-1 px-4 py-1 rounded-lg"}
                            onClick={() => setSelectedColor(Color)}
                        >
                            {Color}
                        </Button>
                    ))}
                </div>

                {/* Quantity Selector */}
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
                        disabled={!selectedColor || !selectedSize}
                        fullWidth
                    >
                        Add to my Cart
                    </Button>
                </div>
                <Link href={`/productdetail/${_id}`}>
                    <Button fullWidth>Click here for product details!</Button>
                </Link>

            </CardBody>
        </Card>

    )
}

export default FirstProductDetailPage