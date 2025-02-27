import LikeDislikeButton from "./LikeDislikeButton";
import React from 'react'; 

const ProductCard = ({ id, imageUrl, likes }) => {
  return (
    <div className="product-card">
      <img
        src={imageUrl}
        alt="Supreme Product"
        className="w-full h-60 object-cover rounded-lg"
      />
      <div className="like-dislike-button">
        <LikeDislikeButton productId={id} initialLikes={likes} />
      </div>
    </div>
  );
};

export default ProductCard;
