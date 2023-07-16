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
      <div className="flex-container justify-center px-4 max-w-[1240px] mx-auto grid grid-cols-2 md:grid-cols-6 border-b-2 border-gray-600 py-8">
        
        <div className="mx-5">
          <h6 className="font-bold uppercase pt-2 mb-5 ">Socials</h6>
          <ul>
            <li className="flex flex-row items-center py-1">
              <FaInstagram />
              Instagram
            </li>
            <li className="flex flex-row items-center py-1">
              <FaFacebook />
              Facebook
            </li>
            <li className="flex flex-row items-center py-1">
              <FaTwitter />
              Twitter
            </li>
          </ul>
        </div>

        <div className="mx-5">
          <h6 className="font-bold uppercase pt-2 mb-5">Contact</h6>
          <ul>
            <li className="flex flex-row items-center py-1">
              <FaAddressBook />
              Address
            </li>
            <li className="flex flex-row items-center py-1">
              <FaEnvelope />
              Email
            </li>
            <li className="flex flex-row items-center py-1">
              <FaPhoneAlt />
              Phone
            </li>
          </ul>
        </div>
      </div>

      <div className="flex-container flex-col max-w-[1240px] px-2 py-4 mx-auto justify-between sm:flex-row text-center text-white">
        <p className="py-4">2022 Move & Groove. All rights reserved</p>
      </div>
    </div>
  );
};

export default Footer;
