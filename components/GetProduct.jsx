/*kishor*/
'use client';
import React, { useEffect, useState } from 'react';
import ProductCard from '@components/ProductCard';
import SellPageProductCard from './SellPageProductCard';
import {
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
} from "@material-tailwind/react";
import Loading from './Loading';

const GetProduct = ({ view }) => {
    const [products, setProducts] = useState([]);
    const [reload, setReload] = useState(false);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = React.useState("Shoes");
    // Categories with emojis for Chinese New Year theme
    const categories = [
        { name: 'Shirts', emoji: '👕' },
        { name: 'Pants', emoji: '👖' },
        { name: 'Shoes', emoji: '👟' },
        { name: 'Accessories', emoji: '🎒' },
        { name: 'Sports', emoji: '🏀' },
    ];

    useEffect(() => {
        const fetchProducts = async () => {
            // Fetch logic remains unchanged
        };
        fetchProducts();
    }, [reload]);

    const CardComponent = view === 'admin' ? ProductCard :
        view === 'user' ? SellPageProductCard : null;

    if (!CardComponent) {
        return <p>Invalid view type. Please provide a valid view type: 'admin' or 'user'.</p>
    }

    const gridClasses = view === 'user'
        ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 overflow-x-auto'
        : 'flex overflow-x-auto space-x-4';

    return (
        <>
            {view === 'admin' ? (
                <>
                    {loading ? (
                        <div><Loading /></div>
                    ) : (
                        <div className='flex flex-col overflow-y-auto space-y-4'>
                            {products.map((product, index) => (
                                <CardComponent key={index} product={product} setReload={setReload} />
                            ))}
                        </div>
                    )}
                </>
            ) : (
                <div>
                    <Tabs value={activeTab} className="text-red-600">
                        <TabsHeader
                            className="rounded-none border-b border-red-200 bg-red-50 p-0"
                            indicatorProps={{
                                className: "bg-red-600 border-b-2 border-red-600 shadow-none rounded-none",
                            }}
                        >
                            {categories.map((category, index) => (
                                <Tab
                                    key={index}
                                    value={category.name}
                                    onClick={() => setActiveTab(category.name)}
                                    className={activeTab === category.name ? "text-red-600 font-bold" : "text-gray-600"}
                                >
                                    {category.name} {category.emoji}
                                </Tab>
                            ))}
                        </TabsHeader>
                        {loading ? (
                            <div><Loading /></div>
                        ) : (
                            <TabsBody className={gridClasses}>
                                {products.map((product, index) => (
                                    <TabPanel key={index} value={product.category}>
                                        <CardComponent key={index} product={product} setReload={setReload} />
                                    </TabPanel>
                                ))}
                            </TabsBody>
                        )}
                    </Tabs>
                </div>
            )}
        </>
    );
};

export default GetProduct;
