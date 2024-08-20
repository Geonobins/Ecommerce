"use client";
import Navbar from "@/components/Navbar"
import { Carousel } from "flowbite-react";
import Banner1 from "../images/Banner1.webp"
import Banner2 from "../images/Banner2.jpg"
import Banner3 from "../images/Banner3.png"
import Banner4 from "../images/Banner4.png"
import { ProductCarousel } from "@/components/ProductCarousel";
import { FooterComponent } from "@/components/FooterComponent";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Notification } from "@/components/Notification";
import useTranslations from "@/hooks/useTranslations";


function HomePage() {
  const location = useLocation();
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");

  const t= useTranslations();

  useEffect(() => {
    if (location.state?.showNotification) {
      setShowNotification(true);
      setNotificationMessage(location.state.message);

      // Auto-hide the notification after a few seconds
      setTimeout(() => {
        setShowNotification(false);
      }, 1000);
    }
  }, [location.state]);


  return (
    <div className="flex flex-col">
      <Navbar />
      { showNotification && <Notification msg = {notificationMessage} status="message"/>}
      <center>
        <div className=" h-96 sm:h-64 xl:h-80 2xl:h-96  max-w-[90%] my-24 md:mt-52 xl:mt-24">
          
          <Carousel slideInterval={2000} pauseOnHover={true} className="snap-x snap-mandatory"  >
            <img src={Banner1} alt="..." className="w-full h-full object-fill" />
            <img src={Banner2} alt="..." className="w-full h-full object-fill" />
            <img src={Banner3} alt="..." className="w-full h-full object-fill" />
            <img src={Banner4} alt="..." className="w-full h-full object-fill" />

          </Carousel>
        </div>
      </center>
      <div className="mx-24">
        <h1 className='text-zinc-500 mr-2 py-8 font-serif text-2xl ' >{t["Trending Products"]}</h1>
        <ProductCarousel subcategory="" />

      </div>
      <div />
      <FooterComponent />
    </div>
  )
}

export default HomePage
