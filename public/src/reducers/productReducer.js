const intialState = { product: {} };

const productReducer = (state = intialState, action) => {
  if (action.type === 'product') {
    return {
      product: action.product
    };
  }
  return state;
};

export default productReducer;