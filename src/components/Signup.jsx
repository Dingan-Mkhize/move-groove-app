import React from 'react'
import signupImg from '../assets/signupImg.jpeg'

const Signup = () => {
  return (
    <div className="h-screen w-full grid grid-cols-1 sm:grid-cols-2">
      <div className="hidden sm:block">
        <img className="w-full h-full object-cover" src={signupImg} alt="" />
      </div>

      <div className="flex flex-col justify-center">
        <form className="max-w-[400px] w-full mx-auto rounded-md shadow-xl bg-zinc-300 p-6">
          <p className='text-center -mb-3 italic font-bold'>Come and join us at</p>
          <h2 className="text-4xl font-bold text-center py-6">
            Moove & Groove!
          </h2>
          <div className="flex flex-col py-2">
            <label>First Name</label>
            <input className="border-2 border-black rounded-full p-2" type="text" />
          </div>
          <div className="flex flex-col py-2">
            <label>Surname</label>
            <input className="border-2 border-black rounded-full p-2" type="text" />
          </div>
          <div className="flex flex-col py-2">
            <label>Email</label>
            <input className="border-2 border-black rounded-full p-2" type="email" />
          </div>
          <div className="flex flex-col py-2">
            <label>Confirm Email</label>
            <input className="border-2 border-black rounded-full p-2" type="email" />
          </div>
          <div className="flex flex-col py-2">
            <label>Password</label>
            <input className="border-2 border-black rounded-full p-2" type="password" />
          </div>
          <button className="border w-full my-3 py-2 bg-indigo-600 rounded-full text-white hover:animate-bounce shadow-x">
            Sign Up
          </button>
          
        </form>
      </div>
    </div>
  );
}

export default Signup