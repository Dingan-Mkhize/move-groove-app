import React from 'react'
import loginImg from '../assets/loginImg.avif'

const Login = () => {
  return (
    <div className="h-screen w-full grid grid-cols-1 sm:grid-cols-2">
      <div className="hidden sm:block">
        <img className="w-full h-full object-cover" src={loginImg} alt="" />
      </div>

      <div className="flex flex-col justify-center">
        <form className="max-w-[400px] w-full mx-auto rounded-md shadow-xl bg-zinc-300 p-6">
          <h2 className="text-4xl font-bold text-center py-6">
            Moove & Groove
          </h2>
          <div className="flex flex-col py-2">
            <label>Username</label>
            <input className="border p-2" type="text" />
          </div>
          <div className="flex flex-col py-2">
            <label>Password</label>
            <input className="border p-2" type="password" />
          </div>
          <button className="border w-full my-3 py-2 bg-indigo-600 rounded-full text-white hover:animate-bounce shadow-x">
            Log In
          </button>
          <div className="flex justify-between">
            <p className="flex items-center">
              <input className='mr-2' type="checkbox" name="" /> Remember Me
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login