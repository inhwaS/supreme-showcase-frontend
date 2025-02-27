import { useState } from "react";
import React from 'react'; 
import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const LikeDislikeButton = ({ productId, initialLikes }) => {
  console.log(productId, initialLikes);
  const [likes, setLikes] = useState(initialLikes);

  const handleLike = async () => {
    try {
      await axios.post(`${API_BASE_URL}/${productId}/like`);
      setLikes(likes + 1);
    } catch (error) {
      console.error("Error updating likes:", error);
    }
  };

  return (
    <div className="flex items-center mt-2">
      <button onClick={handleLike} className="bg-green-500 text-white px-3 py-1 rounded-lg">
        👍 {likes}
      </button>
    </div>
  );
};

export default LikeDislikeButton;
