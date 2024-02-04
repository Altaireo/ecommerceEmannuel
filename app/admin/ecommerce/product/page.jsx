'use client';
import React from 'react';
import {
  IconButton,
  SpeedDial,
  SpeedDialHandler,
  SpeedDialContent,
  SpeedDialAction,
} from "@material-tailwind/react";
import {
  PlusIcon,
  HomeIcon,
  CogIcon,
  Square3Stack3DIcon,
} from "@heroicons/react/24/outline";

import GetProduct from '@components/GetProduct';
import FormModal from '@components/FormModal';

function AdminProducts() {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(!open);

  return (
    <div className="flex flex-col w-full max-h-[88vh]">
      <FormModal handleOpen={handleOpen} open={open} />
      <h1 className="text-3xl font-bold mt-10 mb-6 text-red-600">Products</h1>

      <section className="my-6 w-full overflow-y-auto">
        <GetProduct view='admin' />
      </section>
      
      <div className="fixed right-10 bottom-10">
        <SpeedDial>
          <SpeedDialHandler>
            <IconButton size="lg" className="bg-red-600 hover:bg-red-700 focus:ring-2 focus:ring-offset-2 focus:ring-red-500 text-white rounded-full">
              <PlusIcon className="h-5 w-5 transition-transform group-hover:rotate-45" />
            </IconButton>
          </SpeedDialHandler>
          <SpeedDialContent>
            <SpeedDialAction className="bg-yellow-500 hover:bg-yellow-600 text-white">
              <HomeIcon className="h-5 w-5" />
            </SpeedDialAction>
            <SpeedDialAction className="bg-yellow-500 hover:bg-yellow-600 text-white" onClick={() => handleOpen()}>
              <CogIcon className="h-5 w-5" />
            </SpeedDialAction>
            <SpeedDialAction className="bg-yellow-500 hover:bg-yellow-600 text-white">
              <Square3Stack3DIcon className="h-5 w-5" />
            </SpeedDialAction>
          </SpeedDialContent>
        </SpeedDial>
      </div>
    </div>
  );
}

export default AdminProducts;
