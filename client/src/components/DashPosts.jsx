import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const DashPosts = () => {
  const {currentUser} = useSelector((state) => state.user);
  const [posts, setPosts] = useState([]);
  
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`/api/post/getposts?userId=${currentUser._id}`);
        const data = await res.json();
        if (res.ok) {
          setPosts(data.posts);
         
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    
      if(currentUser.isAdmin){
        fetchPosts()
      }
    
  }, [currentUser._id]);
   // Run the effect whenever currentUser changes

  return (
    <div>
    <h1>Hi</h1>
    </div>
  );
};

export default DashPosts;
