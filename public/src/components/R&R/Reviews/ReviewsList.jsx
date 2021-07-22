import React, { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ReviewStars from '../styles/ReviewStars.js';
import axios from 'axios';
import token from '../../../../../config.js';

const url = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax';
const auth = {
  headers: {
    Authorization: token
  }
};

const ReviewsList = ({ review, stars, helpfulChange, searchValue }) => {
  const allReviews = useSelector((state) => state.reviewsReducer.reviews);
  console.log('REDUX REVIEWLIST', allReviews);
  const allProducts = useSelector((state) => state.productsReducer.products);
  console.log('REDUX REVIEWLIST PRODUCTS', allProducts);
  const [helpfulness, setHelpfulness] = useState(review.helpfulness);
  const helpRef = useRef();
  const reportRef = useRef();

  let photos = ''
  for (var i = 0; i < review.photos.length; i++) {
    photos += review.photos[i].url
  }

  const handleHelpful = (event) => {
    event.preventDefault()
    const id = review.review_id;
    alert("Thanks for the help!")
    axios({
      method: 'put',
      url: `${url}/reviews/${id}/helpful`,
      headers: auth.headers,
    })
      .then(() => {
        if (helpRef.current) {
          helpRef.current.setAttribute('disabled', 'disabled');
        }
        setHelpfulness(helpfulness + 1);
      })
      .catch((err) => {
        throw err;
      });
  };

  const handleReport = (event) => {
    event.preventDefault();
    alert("Review has been reported!")
    const id = review.review_id;
    axios({
      method: 'put',
      url: `${url}/reviews/${id}/report`,
      headers: auth.headers,
    })
      .then(() => {
        if (reportRef.current) {
          reportRef.current.setAttribute('disabled', 'disabled');
        }
      })
      .catch((err) => {
        throw err;
      });
  };

  return (
    <div>
      {review.summary.toLowerCase().includes(searchValue.toLowerCase()) ? (
        <div>
          {review.summary.length > 50 ?
            <h2 className="reviewTitleNd">{review.summary.slice(0, 57)}...</h2> :
            <h2 className="reviewTitleNd">{review.summary}</h2>}
          <div className="starUserDateNd">
            <div><ReviewStars>{stars}</ReviewStars></div>
            <span>{review.reviewer_name}, {new Date(review.date).toString().slice(0, 16)}</span>
          </div>
          <div>
            <p className="reviewFeedBodyNd">{review.body}</p>
            <p className="reviewRecommendNd">{review.recommend}</p>
            {!photos ? null :
              <img width="200" height="300" src={photos} />}
            <br />
            {!review.response ? <b>This review has no response</b> :
              <div className="reviewResponseNd">
                <b>Response:{review.response}</b>
              </div>}
            <div className="helpfulNd">
              <button className="underline" ref={helpRef} type="submit" onClick={handleHelpful}>Helpful? 👍🏼 {review.helpfulness}</button>
            </div>
            <div className="reportNd">
              <button className="underline" ref={reportRef} type="submit" onClick={handleReport}>Report</button>
            </div>
          </div>
          <hr />
        </div>
      ) : null}
    </div>
  )
}

export default ReviewsList;