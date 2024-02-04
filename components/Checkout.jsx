import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useSession } from "next-auth/react";
import { toast } from 'sonner';
import LogInPrompt from './LogInPrompt';
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_TEST_PUBLIC_KEY);

const Checkout = ({ total, items }) => {
    const { data: userSession, status } = useSession();
    const [isLoading, setIsLoading] = useState(false);

    const handleCheckout = async () => {
        setIsLoading(true);

        try {
            const email = userSession?.user?.email;
            console.log("🚀 ~ file: Checkout.jsx:18 ~ handleCheckout ~ email:", email);
            const stripe = await stripePromise;
            if (!stripe) throw new Error("Stripe has not loaded properly.");
            const response = await fetch('/api/checkout_sessions', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ items, email }),
            });

            if (response.ok) {
                const session = await response.json();
                const result = await stripe.redirectToCheckout({ sessionId: session.id });
                setIsLoading(false);
                if (result.error) throw new Error(result.error.message);
            } else {
                throw new Error("Response not OK");
            }
        } catch (error) {
            console.error("Checkout Error:", error);
        }
    };

    return (
        <>
            {status === 'loading' ? <div>Loading...</div> :
                <button
                    className={`flex justify-between bg-red-600 hover:bg-red-700 text-gold-500 font-bold py-5 px-4 rounded-md shadow-md focus:outline-none focus:shadow-outline-red active:bg-red-800 w-full ${total === 0 ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                    onClick={() => { status === 'authenticated' ? handleCheckout() : toast(<LogInPrompt />, { duration: 800, icon: '🧧' }) }}
                    disabled={total === 0}
                >
                    {isLoading ? 'Loading...' : 'Proceed To Checkout'} <span className='border-l-2 px-4'> ${total} </span>
                    <span>🏮</span>
                </button>}
        </>
    );
};

export default Checkout;
