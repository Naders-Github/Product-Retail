const intialState = { products: [] };

const productsReducer = (state = intialState, action) => {
  if (action.type === 'products') {
    return {
      products: action.products
    };
  }
  return state;
};

export default productsReducer;