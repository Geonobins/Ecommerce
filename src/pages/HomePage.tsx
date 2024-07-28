"use client";
import Navbar from "@/components/Navbar"
import { Carousel } from "flowbite-react";
import Banner1 from "../images/Banner1.png"
import Banner2 from "../images/Banner2.png"
import Banner3 from "../images/Banner3.png"
import Banner4 from "../images/Banner4.png"
import { ProductCarousel } from "@/components/ProductCarousel";
import { FooterComponent } from "@/components/FooterComponent";


function HomePage() {


  return (
    <>
      <Navbar />
      <center>
      <div className="h-96 sm:h-64 xl:h-80 2xl:h-96  max-w-[90%]">
        <Carousel slideInterval={2000} slide={true}>
          <img src={Banner1} alt="..." className="w-full h-full object-cover" />
          <img src={Banner2} alt="..." className="w-full h-full object-cover" />
          <img src={Banner3} alt="..." className="w-full h-full object-cover" />
          <img src={Banner4} alt="..." className="w-full h-full object-cover" />

        </Carousel>
      </div>
      </center>
      <div className="mx-24">
          <h1 className='text-zinc-500 mr-2 py-8 font-serif text-2xl ' >Trending Products</h1>
          <ProductCarousel subcategory=""/>
        
      </div>  
    <div/>
    <FooterComponent/>
    </>
  )
}

export default HomePage
