import React from 'react';
import { BsInstagram } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa";
import { FaPhone } from "react-icons/fa6";
const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4 h-64">
      <div className="container mx-auto flex justify-center items-center">
        <a href='https://www.instagram.com' className="mr-4"><BsInstagram className="text-white hover:text-blue-500 transition-colors duration-300" size={30} /></a>
        <a href='https://www.facebook.com/OfficialFahadMustafa/' className="mr-4"><FaFacebook className="text-white hover:text-blue-500 transition-colors duration-300" size={30} /></a>
        <div className="flex items-center">
          <FaPhone className="mr-2" size={30} />
          <span className="text-white">+92 3484966979</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
