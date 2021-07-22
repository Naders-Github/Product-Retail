import React from 'react';

const FilterStarRating = ({ reviews }) => {
  let rating = 0;
  for (let i = 0; i < reviews.length; i++) {
    rating = reviews[i].rating
  }
  console.log(reviews)

  return (
    <div className="ratingFilterNd">
      <h3 className="filterRatingTitleNd"><b>Filter reviews by star rating</b></h3>
      {rating ? reviews.map((review, index) => (
        <div>sd</div>
      ))
      : null}
     </div>
  )
}
export default FilterStarRating;