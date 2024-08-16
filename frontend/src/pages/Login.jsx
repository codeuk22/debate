import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = () => {
  const { register, handleSubmit } = useForm();

  const navigate = useNavigate(); // Correct use of the useNavigate hook



  const onSubmit = async (data) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}user/login`, data);
      if (response?.data?.success) {
        localStorage.setItem("token", response?.data?.data?.token);
        toast.success("Login Successfully!");
        setTimeout(() => {
          navigate('/');
        }, 2000)
      }
    } catch (error) {
      toast.error(error.response.data.message);
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
                  <span className="flex-shrink-0 text-3xl font-black text-[#ffa500]  tracking-tight opacity-100">Debate Platform</span>
                </a>
              </div>

              <h4 className="mb-2 font-medium text-gray-700 xl:text-xl">Welcome to Debate Platform</h4>
              <p className="mb-6 text-gray-500">Please sign-in to access your account</p>

              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4">
                  <label htmlFor="email" className="mb-2 inline-block text-xs font-medium uppercase text-gray-700">Email</label>
                  <input {...register('email', { required: true })} type="text" className="block w-full cursor-text appearance-none rounded-md border border-gray-400 bg--100 py-2 px-3 text-sm outline-none focus:border-indigo-500 focus:bg-white focus:text-gray-600 focus:shadow" placeholder="Enter your email" autoFocus />
                </div>
                <div className="mb-4">
                  <div className="flex justify-between">
                    <label className="mb-2 inline-block text-xs font-medium uppercase text-gray-700" htmlFor="password">Password</label>
                    {/* <a href="auth-forgot-password-basic.html" className="cursor-pointer text-indigo-500 no-underline hover:text-indigo-500">
                      <small>Forgot Password?</small>
                    </a> */}
                  </div>
                  <div className="relative flex w-full flex-wrap items-stretch">
                    <input type="password" {...register('password', { required: true })} className="relative block flex-auto cursor-text appearance-none rounded-md border border-gray-400 bg--100 py-2 px-3 text-sm outline-none focus:border-indigo-500 focus:bg-white focus:text-gray-600 focus:shadow" placeholder="············" />
                  </div>
                </div>
                <div className="mb-4">
                  {/* <div className="block">
                    <input className="mt-1 mr-2 h-5 w-5 appearance-none rounded border border-gray-300 bg-contain bg-no-repeat align-top text-black shadow checked:bg-indigo-500 focus:border-indigo-500 focus:shadow" type="checkbox" id="remember-me" defaultChecked />
                    <label className="inline-block" htmlFor="remember-me"> Remember Me </label>
                  </div> */}
                </div>



                <div className="mb-4">
                  <button className="grid w-full text-xl cursor-pointer select-none rounded-md border border-[#ffa500] bg-[#ffa500] py-2 px-5 text-center align-middle text-sm text-white shadow hover:border-yellow-500 hover:bg-yellow-600 hover:text-white focus:border-indigo-600 focus:bg-indigo-600 focus:text-white focus:shadow-none" type="submit">
                    login
                  </button>
                </div>
              </form>
              <p className="mb-4 text-center">
                New on Debate Platform?{' '}
                <Link to="/signup" className="cursor-pointer text-[#ffa500] no-underline hover:text-indigo-500">Create an account</Link >
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
