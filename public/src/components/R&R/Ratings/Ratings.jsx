import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import token from '../../../../../config.js';
import regeneratorRuntime from "regenerator-runtime";
import RatingsEntry from './RatingsEntry.jsx';
import CharProductBreakDown from './CharProductBreakDown.jsx';
import AddReview from '../Modal/AddReview.jsx';

const url = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax';
const auth = {
  headers: {
    Authorization: token
  }
};

const Reviews = () => {
  const [filter, setFilter] = useState([]);
  const [metaReviews, setMetaReviews] = useState([]);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axios.get(`${url}/reviews/?page=1&count=100&product_id=16060`, auth)
      .then(({ data }) => {
        console.log(data)
        setReviews(data.results)
      })
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    axios.get(`${url}/reviews/meta/?product_id=16060`, auth)
      .then(({ data }) => {
        setMetaReviews(data)
      })
      .catch((err) => console.error(err));
  }, []);

  const fillRatingStars = (num) => {
    const rating = Array(5).fill(<i className="far fa-star"></i>);
    for (let i = 0; i < num; i++) {
      rating[i] = <i key={i} className="fas fa-star"></i>
      if (num % 1 !== 0) {
        rating[Math.floor(Math.abs(num))] = <i key={i} className="fas fa-star-half-alt"></i>
      }
    }
    return rating;
  };

  const getAverageRating = (ratings) => {
    const avg = ratings.reduce((avg, review) => avg += review.rating, 0) / reviews.length;
    return Math.max(Math.round(avg * 10) / 10);
  };

  const getPercentage = (rating) => {
    return Math.round(rating / reviews.length * 100);
  };

  const countNumOfEachRating = (list) => {
    return list.reduce((count, review) => {
      const rating = review.rating;
      count[rating] += 1;
      return (count <= 9) ? '0 ' + count : count;
    }, { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 });
  };

  const getMetaPercentage = (rating) => {
    return Math.round(rating / reviewsMeta.length * 100)
  }

  return (
    <div>
      <h1 className="RnRTitle">Ratings and Reviews</h1>
      <div className="column1Nd">
        <span><AddReview/></span>
        <RatingsEntry
          reviews={reviews}
          metaReviews={metaReviews}
          stars={fillRatingStars(getAverageRating(reviews))}
          averageStars={getAverageRating(reviews)}
          numOfEachcRating={countNumOfEachRating(reviews)}
          getPercentage={getPercentage}
          />
        <div>
          <CharProductBreakDown
            reviewsMeta={metaReviews}
            getAverageRating={getAverageRating}
            getMetaPercentage={getMetaPercentage}
          />
        </div>
      </div>
    </div>
  )
};

export default Reviews;