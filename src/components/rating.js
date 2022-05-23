import React, { useState } from "react";
import { Rating } from "react-simple-star-rating";
import "../styles/rating.css";
export default function RatingStar() {
  const [rating, setRating] = useState(4);

  const handleRating = (rate) => {
    setRating(rate);
  };

  return (
    <div className="RatingStar">
      <span className="ratingNumber">{rating}</span>
      <Rating
        onClick={handleRating}
        ratingValue={rating}
        size={30}
        label
        transition
        fillColor="orange"
        emptyColor="gray"
        className="foo"
      />
    </div>
  );
}
