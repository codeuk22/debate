import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import profile from '../assests/avatar-empty.svg';



const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isUser, setIsUser] = useState(null);
    const dropdownRef = useRef(null);
    const navgiate = useNavigate();

    const getUser = () => {
        try {
            const user = localStorage.getItem('token');
            console.log(isUser);
            if (!user) {
                return
            }
            setIsUser(user);
        } catch (error) {
            console.log(error.message);
        }
    }
    useEffect(() => {
        getUser();
    }, [isUser])
    const toggleDropdown = () => {
        setIsOpen(prev => !prev);
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            console.log('Clicked outside');
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsUser(null);
        console.log(isUser);
        navgiate('/');
    }




    return (
        <div className="flex justify-between items-center px-4">
            <h1 className="text-center flex-grow">
                Debate Topics
            </h1>
            <div className="flex items-center space-x-4 bg-[#ffa500] py-[2px] px-4 h-auto">
                {!isUser ?
                    (<div className="py-[7px] flex gap-3">
                        <Link to='/signup' className=" border rounded  px-3 text-white hover:border-black hover:bg-[#ffa500]">Sign up</Link>
                        <Link to='/login' className="border rounded  px-3 text-white hover:border-black hover:bg-[#ffa500]"> Log in</Link>
                    </div>) :
                    (
                        <>
                            <img src={profile} alt="profileimage" className="w-10 h-10 cursor-pointer" onClick={toggleDropdown} />
                            {isOpen && (
                                <div className="absolute right-4 mt-2 w-48 bg-white top-9 border border-gray-300 rounded-md shadow-lg z-10 py-2">
                                    <ul className="py-1">
                                        <li>
                                            <a href="/profile" className="block px-4 py-2 text-gray-700  hover:bg-[#ffa500] hover:text-white">My Profile</a>
                                        </li>
                                        <li>
                                            <a href="/settings" className="block px-4 py-2 text-gray-700  hover:bg-[#ffa500] hover:text-white ">Settings</a>
                                        </li>
                                        <li>
                                            <Link to="/changepassword" className="block px-4 py-2 text-gray-700  hover:bg-[#ffa500] hover:text-white">Change Password</Link>
                                        </li>
                                        <li>
                                            <a href="/account-settings" className="block px-4 py-2 text-gray-700  hover:bg-[#ffa500] hover:text-white">Account Settings</a>
                                        </li>
                                    </ul>
                                </div>)}
                            <button className="border rounded px-2 py-1 hover:bg-orange-400 hover:border-black hover:text-white" onClick={handleLogout}>
                                Logout
                            </button>
                        </>)}

            </div>
        </div>)
};

export default Header;