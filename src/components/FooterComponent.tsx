
"use client";

import { Footer } from "flowbite-react";
import { BsDribbble, BsFacebook, BsGithub, BsInstagram, BsTwitter } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

export function FooterComponent() {
  const navigate = useNavigate();

  const handleClick = (str: string) => {
    navigate(`/${str}`);
  }
  return (
    <Footer bgDark className="rounded-none bg-slate-100">
      <div className="w-full py-1 ">
        <div className="grid w-full grid-cols-2 gap-8 px-6 py-8 md:grid-cols-4">
          <div>
            <Footer.Title title="STORE" />
            <Footer.LinkGroup col>
              <p className="cursor-pointer" onClick={() => { handleClick("all products") }}>All products</p>
              <p className="cursor-pointer" onClick={() => { handleClick("Living Room") }}>Living</p>
              <p className="cursor-pointer" onClick={() => { handleClick("Dining") }}>Dining</p>
              <p className="cursor-pointer" onClick={() => { handleClick("Dining") }}>Bedroom</p>
            </Footer.LinkGroup>
          </div>
          <div>
            <Footer.Title title="help center" />
            <Footer.LinkGroup col>
              <Footer.Link href="#" >Discord Server</Footer.Link>
              <Footer.Link href="#" >Twitter</Footer.Link>
              <Footer.Link href="#" >Facebook</Footer.Link>
              <Footer.Link href="#" >Contact Us</Footer.Link>
            </Footer.LinkGroup>
          </div>
          <div>
            <Footer.Title title="legal" />
            <Footer.LinkGroup col>
              <Footer.Link href="#">Privacy Policy</Footer.Link>
              <Footer.Link href="#">Licensing</Footer.Link>
              <Footer.Link href="#">Terms &amp; Conditions</Footer.Link>
            </Footer.LinkGroup>
          </div>
          <div>
            <Footer.Title title="download" />
            <Footer.LinkGroup col>
              <Footer.Link href="#" >iOS</Footer.Link>
              <Footer.Link href="#" >Android</Footer.Link>
              <Footer.Link href="#" >Windows</Footer.Link>
              <Footer.Link href="#" >MacOS</Footer.Link>
            </Footer.LinkGroup>
          </div>
        </div>
        <div className="w-full bg-gray-200 px-4 py-6 sm:flex sm:items-center sm:justify-between">
          <Footer.Copyright href="#" by="HomeCraft™" year={2024} />
          <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
            <Footer.Icon href="#" icon={BsFacebook} />
            <Footer.Icon href="#" icon={BsInstagram} />
            <Footer.Icon href="#" icon={BsTwitter} />
            <Footer.Icon href="#" icon={BsGithub} />
            <Footer.Icon href="#" icon={BsDribbble} />
          </div>
        </div>
      </div>
    </Footer>
  );
}
