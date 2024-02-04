
/*kishor*/
import React from 'react'

const Hero = () => {
  return (
    <div className="rounded-lg mx-10 items-center [h-90vh] bg-center bg-cover" style={{ backgroundImage: `url(https://img.freepik.com/premium-photo/abstract-circular-red-background_8466-2.jpg?size=626&ext=jpg&ga=GA1.1.1448711260.1706918400&semt=ais)` }}>
      <div className='flex sm:flex-row md:flex-row flex-col m-24 py-24 justify-between items-center'>
        <div className='flex flex-col gap-4'>
          <p className='text-2xl font-medium' style={{ color: '#f4f4f4' }}>Chinese New Year Special</p> {/* Updated text color */}
          <p className='text-6xl font-bold' style={{ color: '#f0e6d2' }}>Year of the Rabbit</p> {/* Updated text color */}
          <p className='text-lg font-extralight' style={{ color: '#f4f4f4' }}>Celebrate with exclusive deals</p> {/* Updated text color */}
          <button className="py-2 mb-auto mt-12 px-6 sm:py-3 sm:px-8 md:py-4 md:px-12 lg:py-5 lg:px-16 w-1/2 border border-white text-white hover:bg-white hover:text-red-700 transition duration-300 ease-in-out rounded-lg" style={{ backgroundColor: 'transparent', borderColor: '#f4f4f4', color: '#f4f4f4' }}>
            Shop Now
          </button>
        </div>
        <img className='w-[500px] rounded-full my-12' src='https://sneakernews.com/wp-content/uploads/2023/01/nike-blazer-mid-77-white-picante-red-BQ6806-122-8.jpg' alt='Fashion Shoes Sneakers'></img>
      </div>
    </div>
  )
}

export default Hero
