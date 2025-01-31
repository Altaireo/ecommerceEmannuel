'use client';
import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";
import FormModal from '@components/FormModal';

export default function HorizontalCard({ product, setReload }) {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(!open);

  const deleteProduct = async () => {
    try {
      const response = await fetch(`/api/product/delete/${product._id}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      setReload(true);
    } catch (error) {
      console.error('There has been a problem with your fetch operation:', error);
    }
  };

  return (
    <Card className="w-full max-w-[48rem] mx-auto flex-row bg-red-50 border border-red-200">
      <CardHeader
        shadow={false}
        floated={false}
        className="m-0 w-2/5 shrink-0 rounded-r-none"
      >
        <img
          src={product?.image || product.images[0] || 'https://cutewallpaper.org/24/image-placeholder-png/croppedplaceholderpng-%E2%80%93-osa-grappling.png'}
          alt="card-image"
          className="h-full w-full object-cover"
        />
      </CardHeader>
      <CardBody className="flex flex-col justify-between text-red-700">
        <div>
          <Typography variant="h6" color="gray" className="mb-4 uppercase">
            {product.category} - Chinese New Year Edition
          </Typography>
          <Typography variant="h4" color="blue-gray" className="mb-2">
            {product.name}
          </Typography>
          <Typography color="gray" className="mb-auto font-normal">
            {product.desc}
          </Typography>
        </div>

        <div className="flex items-center gap-2">
          <Button
            className="bg-red-500 hover:bg-red-600 hover:shadow-lg p-2 text-white"
            buttonType="filled"
            size="regular"
            rounded={true}
            block={false}
            iconOnly={false}
            ripple="light"
            onClick={() => handleOpen()}
          >
            Update
          </Button>
          <Button
            className="bg-yellow-500 hover:bg-yellow-600 hover:shadow-lg p-2 text-white"
            buttonType="filled"
            size="regular"
            rounded={true}
            block={false}
            iconOnly={false}
            ripple="light"
            onClick={deleteProduct}
          >
            Delete
          </Button>
        </div>
      </CardBody>
      <FormModal handleOpen={handleOpen} open={open} update={true} productId={product._id} />
    </Card>
  );
}
