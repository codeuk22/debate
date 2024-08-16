import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { userRequest } from '../requestMethod';

const ChangePassword = () => {
  const { register, handleSubmit } = useForm();

  const navigate = useNavigate(); // Correct use of the useNavigate hook

  const onSubmit = async (data) => {
    try {
      const response = await userRequest.post(`${process.env.REACT_APP_API_URL}user/change-password`, data);
      console.log(response.data);
      navigate('/');
    } catch (error) {
      console.error(error.response ? error.response.data : error.message);
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
                <a href="#" className="flex cursor-pointer items-center gap-2  no-underline hover:text-indigo-500">
                  <span className="flex-shrink-0 text-3xl font-black tracking-tight opacity-100 text-[#ffa500]">Debate</span>
                </a>
              </div>

              <h4 className="mb-2 font-medium text-gray-700 xl:text-xl font-helvetica">Change Password</h4>

              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4">
                  <label htmlFor="oldPassword" className="mb-2 inline-block text-xs font-medium uppercase text-gray-700 font-helvetica">Old Password</label>
                  <input {...register('oldPassword', { required: true })} type="password" className="block w-full cursor-text appearance-none rounded-md border border-gray-400 bg--100 py-2 px-3 text-sm outline-none focus:border-indigo-500 focus:bg-white focus:text-gray-600 focus:shadow" placeholder="Password" autoFocus />
                </div>
                <div className="mb-4">
                  <label htmlFor="NewPassword" className="mb-2 inline-block text-xs font-medium uppercase text-gray-700 font-helvetica">New Password</label>
                  <input {...register('newPassword', { required: true })} type="text" className="block w-full cursor-text appearance-none rounded-md border border-gray-400 bg--100 py-2 px-3 text-sm outline-none focus:border-indigo-500 focus:bg-white focus:text-gray-600 focus:shadow" placeholder="Password" autoFocus />
                </div>
                <div className="mb-4">
                  <label htmlFor="confirmNewPassword" className="mb-2 inline-block text-xs font-medium uppercase text-gray-700 font-helvetica">Confirm Password</label>
                  <input {...register('confirmNewPassword', { required: true })} type="password" className="block w-full cursor-text appearance-none rounded-md border border-gray-400 bg--100 py-2 px-3 text-sm outline-none focus:border-indigo-500 focus:bg-white focus:text-gray-600 focus:shadow" placeholder="Password" autoFocus />
                </div>


                <div className="mb-4">
                  <button className="grid w-full text-xl cursor-pointer select-none rounded-md border border-white bg-[#ffa500] py-2 px-5 text-center align-middle text-sm text-white shadow hover:border-black hover:bg-[#ffa600] hover:text-white focus:border-indigo-600 focus:bg-indigo-600 focus:text-white focus:shadow-none" type="submit">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChangePassword;
