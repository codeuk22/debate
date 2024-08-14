import React, { useEffect, useState,useRef } from 'react';
import Card from '../components/Card.jsx';
import '../styles/Home.css';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import profile from '../assests/avatar-empty.svg';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { publicRequest, userRequest } from '../requestMethod.js';
import Header from '../components/Header.jsx';

const Home = () => {
  const [topics, setTopics] = useState([]);
  const { register, handleSubmit } = useForm();

  const fetchTopics = async () => {
    try {
      const response = await publicRequest.get(`${process.env.REACT_APP_API_URL}topic`);
      const topics = response.data.data;
      if (Array.isArray(topics)) {
        setTopics(topics);
      } else {
        console.error('Unexpected response format:', response);
      }
    } catch (error) {
      console.error('Error fetching topics:', error);
    }
  };

  const handleAddTopic = async (data) => {
    try {
      await userRequest.post(`${process.env.REACT_APP_API_URL}topic/create`, data);
      console.log("Topic added successfully");
      fetchTopics();
    } catch (error) {
      toast.error(error.response.data.message);
      console.error('Error adding topic:', error.response.data);
    }
  };

  // const handleLogout= async () => {
  //   try {
  //     await axios.post(`${process.env.REACT_APP_API_URL}user/logout`);
  //     console.log("User logged out successfully");
  //     localStorage.removeItem("token")
  //     toast.success("Logout Successfully!")
  //     setTimeout(()=>{
  //       navgiate('/');
  //     },1500)
  //   } catch (error) {
  //     console.error('Error logging out:', error.message);
  //   }
  // }

  useEffect(() => {
    fetchTopics();
  }, []);

  return (
    <div>
      <Header/>
      <div className='topic-input-container'>
        <form onSubmit={handleSubmit(handleAddTopic)}>
          <input
            type='text'
            {...register('topicName', { required: true })}
            placeholder='Add a new topic'
          />
          <button type='submit'>Add Topic</button>
        </form>
      </div>
      <div className='App'>
        {topics.map((topic, index) => (
          <Card key={index} topic={topic} />
        ))}
      </div>
    </div>
  );
};

export default Home;
