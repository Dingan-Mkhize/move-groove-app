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
    <div name="footer" className="w-full mt-24 bg-indigo-900 text-white px-2">
      <div className="flex justify-center px-4 max-w-[1240px] mx-auto grid-cols-2 md:grid-cols-2 border-b-2 border-gray-600 py-8">
        
        <div className="mr-3">
          <ul className="">
            <h3 className="text-center font-bold uppercase pt-2 mb-5">Socials</h3>
            <li className="flex items-center py-1">
              <FaInstagram className="mr-2" />
              Instagram
            </li>
            <li className="flex items-center py-1">
              <FaFacebook className="mr-2" />
              Facebook
            </li>
            <li className="flex items-center py-1">
              <FaTwitter className="mr-2" />
              Twitter
            </li>
          </ul>
        </div>

        <div className="ml-3">
          <ul className="">
            <h3 className="text-center font-bold uppercase pt-2 mb-5">Contact</h3>
            <li className="flex items-center py-1">
              <FaAddressBook className="mr-2" />
              Address
            </li>

            <li className="flex items-center py-1">
              <FaEnvelope className="mr-2" />
              Email
            </li>

            <li className="flex items-center py-1">
              <FaPhoneAlt className="mr-2" />
              Phone
            </li>
          </ul>
        </div>
      </div>

      <div className="flex-wrap flex-col max-w-[1240px] px-2 py-4 mx-auto justify-between sm:flex-row text-center text-white">
        <p className="py-4">2023 Move & Groove | All rights reserved</p>
      </div>
    </div>
  );
};

export default Footer;
