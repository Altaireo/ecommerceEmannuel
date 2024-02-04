import React from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
const Rating = ({ rating }) => {
  const greenStars = [...Array(rating)].map((_, i) => (
    <span key={i} className="text-green-700">★</span>
  ));
  const grayStars = [...Array(5 - rating)].map((_, i) => (
    <span key={i} className="text-gray-500">★</span>
  ));

  return (
    <div className="flex">
      {greenStars}
      {grayStars}
    </div>
  );
};
const Review = ({ reviewName, reviewSubject, rating, reviewDesc }) => (
  <div className="my-2 border-b border-gray-200 pb-2">
    <div className="flex justify-between items-center">
      <h4 className="font-bold">{reviewName}</h4>
      <Rating rating={rating} />
    </div>
    <h5 className="text-lg mt-1">{reviewSubject}</h5>
    <p className="text-gray-600">{reviewDesc}</p>
  </div>
);
function Icon({ id, open }) {
  return (
    <svg
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={5}
      stroke="purple"
      className={`${id === open ? "rotate-180" : ""} h-5 w-5 transition-transform`}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
    </svg>
  );
}
const Temp = () => {
  const reviews = [
    {
      reviewName: "Emmanuel Chang",
      reviewSubject: "Worth every single cent!",
      rating: 4,
      reviewDesc: "This product is simply amazing. Wearing this makes me feel so confident!"
    },
    {
      reviewName: "Araki Yeo",
      reviewSubject: "Best purchase ever",
      rating: 4,
      reviewDesc: "This product is super durable. Highly recommend it."
    },
    {
      reviewName: "Kishor",
      reviewSubject: "Vely nice!",
      rating: 4,
      reviewDesc: "Buy it while stocks last!!!"
    },
    {
      reviewName: "Benjamin",
      reviewSubject: "Unbelievably cheap",
      rating: 4,
      reviewDesc: "Cheap product for its price!!!"
    },
  ];
  const [open, setOpen] = React.useState(0);

  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  return (
    <>
      <Accordion open={open === 1} icon={<Icon id={1} open={open} />}>
        <AccordionHeader onClick={() => handleOpen(1)}>Can I have a size chart for this product?"?</AccordionHeader>
        <AccordionBody>
          Certainly! The comprehensive size chart is available for your reference below the product description. We recommend measuring yourself and consulting the chart to guarantee an ideal fit. Should you encounter any concerns or require additional assistance, don't hesitate to contact our customer support team.
        </AccordionBody>
      </Accordion>
      <Accordion open={open === 2} icon={<Icon id={2} open={open} />}>
        <AccordionHeader onClick={() => handleOpen(2)}>
          Is product true to its pictures?
        </AccordionHeader>
        <AccordionBody>
          Certainly! Your question is excellent! We aim to present our product photos with the utmost precision regarding color representation. It's important to acknowledge that slight variations in the actual color may occur due to monitor settings and lighting conditions at the time the photo was captured. Should you find the color of the jacket unsatisfactory upon receipt, our return policy ensures a hassle-free process for returning it.
        </AccordionBody>
      </Accordion>
      <Accordion open={open === 3} icon={<Icon id={3} open={open} />}>
        <AccordionHeader onClick={() => handleOpen(3)}>
          Reviews
        </AccordionHeader>
        <AccordionBody>
          {reviews.map((review, index) => (
            <Review key={index} {...review} />
          ))}
        </AccordionBody>
      </Accordion>
    </>
  );
}

export default Temp