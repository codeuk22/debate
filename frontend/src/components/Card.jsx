import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Card.css';

const Card = ({ topic}) => {
  const navigate = useNavigate();
  const handleClick = () => {
    console.log(topic.TopicName,'card');
    navigate(`/topic/${topic._id}`,{ state: { topicName: topic.topicName } });
  };

  return (
    <div className='card' onClick={handleClick}>
      <h2>{topic.topicName}</h2>
    </div>
  );
};

export default Card;
