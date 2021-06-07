import React from 'react';
import { useSelector } from 'react-redux';

const Products = ({ product, currentProduct, currentStyle }) => {
  const products = useSelector((state) => state.productsReducer.products);

  return (
    <div>
      Products Component
    </div>
  )
};

export default Products;