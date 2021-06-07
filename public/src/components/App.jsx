import React, { useState, useEffect} from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import token from '../../../config.js';
import Reviews from './R&R/Reviews.jsx';
import Products from './products/Products.jsx';
import Questions from './Q&A/Questions.jsx';

const url = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax';
const auth = {
  headers: {
    Authorization: token
  }
};

const App = () => {
  const dispatch = useDispatch();
  const [products, setProducts] = useState({
    currentProduct: null,
    styles: [],
    currentStyle: []
  });

  useEffect(() => {
    axios.get(`${url}/products/?page=1&count=100&product_id=16060`, auth)
      .then(({ data }) => {
        dispatch({ type: 'products', products: data })
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    axios.get(`${url}/qa/questions/?page=1&count=100&product_id=16060`, auth)
      .then(({ data }) => {
        dispatch({ type: 'questions', questions: data.results })
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    axios.get(`${url}/reviews/?page=1&count=100&product_id=16060`, auth)
      .then(({ data }) => {
        dispatch({ type: 'reviews', reviews: data.results })
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <div className="products">
        <Products/>
      </div>
      <div className="reviews">
        <Reviews/>
      </div>
      <div className="questions">
        <Questions/>
      </div>
    </div>
  );
};

export default App;