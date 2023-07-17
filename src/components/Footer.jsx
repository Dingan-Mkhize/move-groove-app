import React from "react";

import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaAddressBook,
  FaEnvelope,
  FaPhoneAlt,
} from "react-icons/fa";

const Footer = () => {
  return (
    <div className="w-full mt-24 bg-indigo-900 text-white py-y px-2">
      
      <div className="flex justify-center px-4 max-w-[1240px] mx-auto grid-cols-2 md:grid-cols-2 border-b-2 border-gray-600 py-8">
        
          <h6 className="font-bold uppercase pt-2 mb-5 ">Socials</h6>
          <ul className="">
            <FaInstagram />
            <li className="items-center py-1">Instagram</li>
            <FaFacebook />
            <li className="items-center py-1">Facebook</li>
            <FaTwitter />
            <li className="items-center py-1">Twitter</li>
          </ul>

        
          <h6 className="font-bold uppercase pt-2 mb-5">Contact</h6>
          <ul>
            <FaAddressBook />
            <li className="flex flex-row items-center py-1">Address</li>
            <FaEnvelope />
            <li className="flex flex-row items-center py-1">Email</li>
            <FaPhoneAlt />
            <li className="flex flex-row items-center py-1">Phone</li>
          </ul>
      </div>

      <div className="flex-container flex-col max-w-[1240px] px-2 py-4 mx-auto justify-between sm:flex-row text-center text-white">
        <p className="py-4">2022 Move & Groove. All rights reserved</p>
      </div>
    </div>
  );
};

export default Footer;
