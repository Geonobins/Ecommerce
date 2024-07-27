"use client";
import Navbar from "@/components/Navbar"
import { Link } from "react-router-dom"
import { Carousel } from "flowbite-react";

function HomePage() {
  

  return (
    <>
    <Navbar/>
    <div className="h-96 sm:h-64 xl:h-80 2xl:h-96">
      <Carousel slideInterval={2000} slide={true}>
        <img src="https://m.media-amazon.com/images/I/51wvJ4LiuBL._SX522_.jpg" alt="..." />
        <img src="https://images.pexels.com/photos/189333/pexels-photo-189333.jpeg" alt="..." />
        <img src="https://m.media-amazon.com/images/I/51wvJ4LiuBL._SX522_.jpg" alt="..." />
        <img src="https://m.media-amazon.com/images/I/51wvJ4LiuBL._SX522_.jpg" alt="..." />
        <img src="https://m.media-amazon.com/images/I/51wvJ4LiuBL._SX522_.jpg" alt="..." />
      </Carousel>
    </div>
    
      <h1 className='text-4x1 text-blue-500 mb-10'>Ecommerce Project</h1>
      <Link to='/home/all products' className="p-5 bg-blue-500">Products</Link>
    </>
  )
}

export default HomePage
