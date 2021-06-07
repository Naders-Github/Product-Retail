import React, { useState, useEffect} from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import token from '../../../config.js';

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
        console.log(data)
        dispatch({ type: 'products', products: data })
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      Rendering from App
    </div>
  )
}

export default App;