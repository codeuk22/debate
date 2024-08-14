import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import '../styles/topic.css';
import { useForm } from 'react-hook-form';
import like from '../assests/liked.svg';
import unlike from '../assests/unlike.svg';
import { publicRequest, userRequest } from '../requestMethod';
import Header from '../components/Header';
import { toast } from 'react-toastify';

const TopicPage = () => {
  const { topicId } = useParams();
  const location = useLocation();

  const { topicName } = location.state || {};
  const [commentId, setCommentId] = useState({});
  const [comments, setComments] = useState([]);
  const [newReply, setNewReply] = useState({});
  const [replyingTo, setReplyingTo] = useState(null);
  const { register, handleSubmit, reset } = useForm(); // Add reset here
  const [replies, setReplies] = useState([]);

  const addComment = async (data) => {
    try {
      const commentData = { comment: data.comment, topicId: topicId };
      const comment = await userRequest.post(`${process.env.REACT_APP_API_URL}comment/create`, commentData);
      console.log(comment.data);
      toast.success('Comment added successfully');
      setComments([...comments, comment.data]);
      reset(); // Reset the form input field
      fetchTopic();
    } catch (error) {
      toast.error('Something went wrong, Please try again');
    }
  };

  const fetchTopic = async () => {
    try {
      const response = await publicRequest.get(`${process.env.REACT_APP_API_URL}topic/${topicId}`);
      const { data: { _comment: comments } } = response.data;
      console.log(response.data, 'topic');
      setComments(comments);
    } catch (error) {
      console.error('Error fetching topic:', error);
    }
  };

  useEffect(() => {
    fetchTopic();
  }, [topicId]);

  const addReply = async (index) => {
    if (newReply[index] && newReply[index].trim()) {
      try {
        const replyData = {
          reply: newReply[index],
          commentId: comments[index]._id,
        };
        const reply = await userRequest.post(`${process.env.REACT_APP_API_URL}reply/create`, replyData);
        console.log(reply.data);

        const updatedComments = [...comments];
        updatedComments[index].replies.push(reply.data);
        setComments(updatedComments);
        setNewReply({ ...newReply, [index]: '' });
        setReplyingTo(null);
      } catch (error) {
        console.error('Error adding reply:', error.message);
      }
    }
  };

  const getReply = async (id) => {
    try {
      const response = await publicRequest.get(`${process.env.REACT_APP_API_URL}comment/${id}`);
      console.log('replies are ', response);
      console.log('comment id', id);
      setReplies(response.data.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getReply();
  }, [commentId]);

  const handleReplyClick = (id) => {
    setCommentId(id);
  }

  return (
    <>
      <Header />
      <div className="topic-page">
        <div className="left-panel">
          <h1>{topicName}</h1>
        </div>
        <div className="right-panel h-auto">
          <div className="comment-section">
            <form onSubmit={handleSubmit(addComment)}>
              <input
                type="text"
                placeholder="Add a new comment"
                {...register('comment', { required: true })}
              />
              <button type="submit">Submit</button>
            </form>
          </div>
          {comments.map((item, index) => (
            <div key={index} className="border shadow-md rounded-md w-full m-1 p-4">
              <div className="comment-text text-xl">{item.comment}</div>
              <div className="replies">
                {(item.replies || []).map((reply, replyIndex) => (
                  <div key={replyIndex} className="reply">{reply.text}</div>
                ))}
              </div>
              <div className=" text-sm flex gap-3 ml-2">
                <button className='bg-gray-200 border flex items-center justify-center rounded gap-2 px-2'>
                  <img className='w-[18px] h-[15px]' src={unlike} /> Like
                </button>
                <button onClick={() => setReplyingTo(index)} className='bg-gray-200 border rounded px-2'>Reply</button>
                <button onClick={() => getReply(item._id)} className='bg-gray-200 border rounded px-2'>view Reply</button>
              </div>
              {
                replies && ( replies.map((reply, index) => (
                  <div key={index} className="reply">
                    {reply._reply.map((r) => {
                      return (<h1 key={r._id}>{r.reply}</h1>)
                    }
                    )}
                  </div>)))
              }
                    <div>
            </div>

              {replyingTo === index && (
                <div className="reply-section">
                  <input
                    type="text"
                    value={newReply[index] || ''}
                    onChange={(e) => setNewReply({ ...newReply, [index]: e.target.value })}
                    placeholder="Add a reply..."
                  />
                  <button onClick={() => addReply(index)}>Submit</button>
                </div>
              )}

            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default TopicPage;
