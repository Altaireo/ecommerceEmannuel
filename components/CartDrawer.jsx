/*kishor*/
import React, { useEffect } from "react";
import { Drawer, IconButton } from "@material-tailwind/react";
import CartCard from "@components/CartCard";

export default function DrawerDefault({ closeDrawerRight, openRight }) {

  useEffect(() => {
    if (openRight) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [openRight])

  return (
    <React.Fragment>
      <Drawer
        placement="right"
        open={openRight}
        onClose={closeDrawerRight}
        className={`p-4 rounded-xl ${openRight ? 'bg-red-50 border border-red-200' : ''}`}
        size={450}
      >
        <div className="flex items-center justify-between mb-3">
          <h1 className='text-2xl tracking-wider font-medium text-red-700'>Shopping Cart</h1>
          <IconButton
            variant="text"
            color="blue-gray"
            onClick={closeDrawerRight}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-5 w-5 text-red-700"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </IconButton>
        </div>
        {/* */}
        <CartCard />
      </Drawer>
    </React.Fragment>
  );
}
