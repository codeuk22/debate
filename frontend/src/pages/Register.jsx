import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Register = () => {
//   const [mode, setMode] = useState('login');
  const { register, handleSubmit } = useForm();
  const onSubmit =  (data) => {
    try {
      const response =  axios.post(`${process.env.REACT_APP_API_URL}user/signup`, data);
      alert("Registered successfully");
      console.log(data,response);

    } catch (error) {
        if (error.response) {
            console.error("Error Response Data:", error.response.data);
            console.error("Error Response Status:", error.response.status);
            console.error("Error Response Headers:", error.response.headers);
          } else if (error.request) {
            console.error("Error Request Data:", error.request);
          } else {
            console.error("Error Message:", error.message);
          }
    }
  };
  

  return (
    <>
      <div className="flex min-h-screen w-screen w-full items-center justify-center text-gray-600 bg-gray-50">
        <div className="relative">
          <div className="hidden sm:block h-56 w-56 text-indigo-300 absolute a-z-10 -left-20 -top-20">
            <svg id='patternId' width='100%' height='100%' xmlns='http://www.w3.org/2000/svg'>
              <defs>
                <pattern id='a' patternUnits='userSpaceOnUse' width='40' height='40' patternTransform='scale(0.6) rotate(0)'>
                  <rect x='0' y='0' width='100%' height='100%' fill='none' />
                  <path d='M11 6a5 5 0 01-5 5 5 5 0 01-5-5 5 5 0 015-5 5 5 0 015 5' strokeWidth='1' stroke='none' fill='currentColor' />
                </pattern>
              </defs>
              <rect width='800%' height='800%' transform='translate(0,0)' fill='url(#a)' />
            </svg>
          </div>
          <div className="hidden sm:block h-28 w-28 text-indigo-300 absolute a-z-10 -right-20 -bottom-20">
            <svg id='patternId' width='100%' height='100%' xmlns='http://www.w3.org/2000/svg'>
              <defs>
                <pattern id='b' patternUnits='userSpaceOnUse' width='40' height='40' patternTransform='scale(0.5) rotate(0)'>
                  <rect x='0' y='0' width='100%' height='100%' fill='none' />
                  <path d='M11 6a5 5 0 01-5 5 5 5 0 01-5-5 5 5 0 015-5 5 5 0 015 5' strokeWidth='1' stroke='none' fill='currentColor' />
                </pattern>
              </defs>
              <rect width='800%' height='800%' transform='translate(0,0)' fill='url(#b)' />
            </svg>
          </div>
          <div className="relative flex flex-col sm:w-[30rem] rounded-lg border-gray-400 bg-white shadow-lg px-4">
            <div className="flex-auto p-6">
              <div className="mb-10 flex flex-shrink-0 flex-grow-0 items-center justify-center overflow-hidden">
                <a href="#" className="flex cursor-pointer items-center gap-2 text-indigo-500 no-underline hover:text-indigo-500">
                  <span className="flex-shrink-0 text-3xl  text-[#ffa500] lowercase tracking-tight opacity-100">Debate Platform</span>
                </a>
              </div>

              <h4 className="mb-2 font-medium text-gray-700 xl:text-xl">Welcome to Debate Platform</h4>
              <p className="mb-6 text-gray-500">Please sign-in to access your account</p>

              <form onSubmit={handleSubmit(onSubmit)}>
                  <>
                    <div className="mb-4">
                      <label htmlFor="name" className="mb-2 inline-block text-xs font-medium uppercase text-gray-700">Name</label>
                      <input {...register('name')} type="text" className="block w-full cursor-text appearance-none rounded-md border border-gray-400 bg--100 py-2 px-3 text-sm outline-none focus:border-indigo-500 focus:bg-white focus:text-gray-600 focus:shadow" placeholder="Enter your name" autoFocus />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="email" className="mb-2 inline-block text-xs font-medium uppercase text-gray-700">Email</label>
                      <input {...register('email', { required: true })} type="text" className="block w-full cursor-text appearance-none rounded-md border border-gray-400 bg--100 py-2 px-3 text-sm outline-none focus:border-indigo-500 focus:bg-white focus:text-gray-600 focus:shadow" placeholder="Enter your email" autoFocus />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="phone" className="mb-2 inline-block text-xs font-medium uppercase text-gray-700">Phone</label>
                      <input {...register('phone', { required: true })} type='number' className="block w-full cursor-text appearance-none rounded-md border border-gray-400 bg--100 py-2 px-3 text-sm outline-none focus:border-indigo-500 focus:bg-white focus:text-gray-600 focus:shadow" placeholder="Enter your phone number" autoFocus />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="password" className="mb-2 inline-block text-xs font-medium uppercase text-gray-700">Password</label>
                      <input {...register('password', { required: true })} type="password" className="block w-full cursor-text appearance-none rounded-md border border-gray-400 bg--100 py-2 px-3 text-sm outline-none focus:border-indigo-500 focus:bg-white focus:text-gray-600 focus:shadow" placeholder="Enter your password" autoFocus />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="confirmPassword" className="mb-2 inline-block text-xs font-medium uppercase text-gray-700">Confirm Password</label>
                      <input {...register('confirmPassword', { required: true })} type="password" className="block w-full cursor-text appearance-none rounded-md border border-gray-400 bg--100 py-2 px-3 text-sm outline-none focus:border-indigo-500 focus:bg-white focus:text-gray-600 focus:shadow" placeholder="Confirm your password" autoFocus />
                    </div>
                  </>
                <div className="mb-4">
                  <button className="grid w-full cursor-pointer text-xl select-none rounded-md border border-[#ffa500] bg-[#ffa500] py-2 px-5 text-center align-middle text-sm text-white shadow hover:border-yellow-200 hover:bg-amber-500 hover:text-white focus:border-indigo-600 focus:bg-indigo-600 focus:text-white focus:shadow-none" type="submit">
                    Register
                  </button>
                </div>
              </form>
              <p className="mb-4 text-center">
                    Already have an account?{' '}
                    <Link to="/login" className="cursor-pointer text-indigo-500 no-underline hover:text-indigo-500">Login</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
