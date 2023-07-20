import React from 'react'
import { Input } from "@material-tailwind/react";
import bgImg from "../assets/hero-img.avif";

const Edit = () => {
  return (
    <div
      name="edit"
      className="h-screen w-full flex flex-col justify-between items-center"
    >
      <div className="grid md:grid-cols-2 max-w-[1240px] m-auto mx-9">
        <div className="m-9">
          <img
            className="w-full rounded-xl shadow-xl shadow-[#7d7d7d] border-2 border-indigo-600"
            src={bgImg}
            alt="/"
          />
        </div>
        <div className="flex w-72 flex-col gap-6">
          <Input color="blue" label="Input Blue" />
          <Input color="purple" label="Input Purple" />
          <Input color="indigo" label="Input Indigo" />
          <Input color="teal" label="Input Teal" />
        </div>
      </div>
    </div>
  );
}

export default Edit