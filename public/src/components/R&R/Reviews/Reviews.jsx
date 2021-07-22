import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import token from '../../../../../config.js';
import regeneratorRuntime from "regenerator-runtime";
import ReviewsList from './ReviewsList.jsx';
import SortReviews from './SortReviews.jsx';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { makeStyles } from '@material-ui/core/styles';

const url = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax';
const auth = {
  headers: {
    Authorization: token
  }
};

const useStyles = makeStyles((theme) => ({
  root: {
    float: 'right',
    marginRight: '1vh',
    marginTop: '-11vh',
  },
  paper: {
    border: "5px solid black"
  }
}));

const Reviews = () => {
  const allReviews = useSelector((state) => state.reviewsReducer.reviews);
  console.log('REDUX REVIEWS', allReviews);
  const searchBarStyle = useStyles()
  const [searchValue, setSearchValue] = useState('');
  const [filter, setFilter] = useState([]);
  const [metaReviews, setMetaReviews] = useState([]);
  const [reviews, setReviews] = useState({
    currentProductID: null,
    results: [],
    moreReviews: [],
    sort: 'helpfulness',
  });
  const [sort, setSort] = useState(reviews.sort);

  useEffect(() => {
    (async () => {
      const reviewsList = await axios({
        method: 'get',
        url: `${url}/reviews/`,
        params: {
          page: 1,
          count: 20,
          sort: reviews.sort,
          product_id: 16060,
        },
        headers: auth.headers,
      });
      let copyData = reviewsList.data.results;
      let sliced = copyData.slice(0, 2);
      setReviews({
        currentProductID: reviewsList.data.product,
        results: sliced,
        moreReviews: copyData.slice(2),
      });
    })();
  }, []);

  useEffect(() => {
    axios.get(`${url}/reviews/meta/?product_id=16060`, auth)
      .then(({ data }) => {
        setMetaReviews(data)
      });
      .catch((err) => console.error(err));
  }, []);

  const changeReview = (option) => {
    setSort(option);
    (async () => {
      const reviewsList = await axios({
        method: 'get',
        url: `${url}/reviews/`,
        params: {
          page: 1,
          count: 20,
          sort: option,
          product_id: 16060,
        },
        headers: auth.headers,
      });
      let copyData = reviewsList.data.results;
      let sliced = copyData.slice(0, 2);
      setReviews({
        currentProductID: reviewsList.data.product,
        results: sliced,
        moreReviews: copyData.slice(2),
        sort: option,
      });
    })();
  };

  const handleMoreReviews = (event) => {
    setReviews({
      results: reviews.results.concat(reviews.moreReviews.slice(0, 2)),
      moreReviews: reviews.moreReviews.slice(2)
    });
  };

  const filteredSearch = reviews.results.filter((review) => {
    return review.summary.toLowerCase().includes(searchValue.toLowerCase());
  });

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

  const handleChange = (event, value) => {
    setSearchValue(value);
  };

  return (
    <div>
      <div className="columnNd">
          <Container>
            <SortReviews reviews={reviews.results} changeReview={changeReview} />
          </Container>
        <Container>
          <Autocomplete
            classes={{ paper: searchBarStyle.paper, root: searchBarStyle.root}}
            className="trainerSearchBar"
            options={reviews.results}
            getOptionLabel={(option) => option.summary}
            style={{ width: 300, height: 50 }}
            onInputChange={handleChange}
            inputValue={searchValue}
            renderInput={(params) => <TextField {...params} label="Search..." variant="outlined" />}
          />
          {/* <input type="text" onChange={handleChange} /> */}
        </Container>
        <div className="reviewsNd">
          {filteredSearch.map((review, index) => (
            <ReviewsList
              review={review}
              key={index}
              stars={fillRatingStars(review.rating)}
              searchValue={searchValue}
            />
          ))}
        </div>
        <div>
          {(reviews.moreReviews.length === 0) ? <b>No more reviews</b> : (
            <input className="moreReviewsButtonNd" type="button" value="MORE REVIEWS" onClick={handleMoreReviews} />)}
        </div>
      </div>
    </div>
  )
};



export default Reviews;