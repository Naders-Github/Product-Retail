import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import Reviews from './R&R/Reviews//Reviews.jsx';
import Ratings from './R&R/Ratings/Ratings.jsx';
import Overview from './products/Overview.jsx';
import token from '../../../config.js';
// import Questions from './Q&A/Main.jsx';

const url = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax';
const auth = {
  headers: {
    Authorization: token
  }
};

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get(`${url}/reviews/?count=100&product_id=16060`, auth)
      .then(({ data }) => {
        dispatch({ type: 'reviews', reviews: data });
      })
      .catch((err) => consle.error(err));
  }, [])
  useEffect(() => {
    axios.get(`${url}/products/?count=100&product_id=16060`, auth)
      .then(({ data }) => {
        dispatch({ type: 'products', products: data });
      })
      .catch((err) => consle.error(err));
  }, [])

  return (
    <div>
      <div className="main" data-spy="scroll" data-target="navbar" data-offset="0">
        <Overview/>
      </div>
      <div className="ratings">
        <Ratings/>
      </div>
      <div className="reviews">
        <Reviews/>
      </div>
      <br/>
      <div className="questions">
        {/* <Questions/> */}
      </div>
    </div>
  );
};

export default App;