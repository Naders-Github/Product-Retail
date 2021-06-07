import React from 'react';
import { useSelector } from 'react-redux';

const Reviews = () => {
  const reviews = useSelector((state) => state.reviewsReducer.reviews);

  return (
    <div>
      Reviews Component
    </div>
  )
};

export default Reviews;