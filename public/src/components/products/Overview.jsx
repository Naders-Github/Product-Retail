import React from 'react';
import ProductDetail from './ProductDetail.jsx';
import axios from 'axios';
import token from '../../../../config.js';
import captureData from '../clickData/captureData.jsx';

const url = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/products/';
const auth = {
  headers: {
    Authorization: token
  }
};

class Overview extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      selected: 16072,
      currentProduct: '',
      productStyles: '',
      availProducts: ''
    }
    this.getProduct = this.getProduct.bind(this);
    this.getStyles = this.getStyles.bind(this);
    this.getProducts = this.getProducts.bind(this);
    this.selectId = this.selectId.bind(this);
  }
  componentDidMount() {
    this.getProducts();
    this.getProduct();
  }


  selectId(e) {
    this.setState({
      selected: e.target.value
    });
  }
  getProducts() {
    axios.get(url, auth)
      .then(({ data }) => {
        this.setState({
          availProducts: data
        })
      })
      .catch(err => {
        console.log(err);
      });
  }
  getProduct() {
    axios.get(url + `${this.state.selected}`, auth)
      .then(({ data }) => {
        this.setState({
          currentProduct: {
            id: data.id,
            name: data.name,
            slogan: data.slogan,
            description: data.description,
            category: data.category,
            default_price: data.default_price,
            features: data.features
          }
        });
        this.getStyles(this.state.selected);
      })
      .catch(err => {
        console.log(err);
      });
  }

  getStyles(id) {
    axios.get(url + `${id}/styles`, auth)
      .then(({ data }) => {
        this.setState({
          productStyles: data.results
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    if (this.state.currentProduct && this.state.productStyles && this.state.availProducts) {
      return (
        <React.Fragment>
          <nav className="navbar sticky-top navbar-light">
            <span className="navbar-brand mb-0 h1">NNS</span>
            <div className="nav-item input-group" style={{ width: 'fit-content'}}>
              <select onChange={this.selectId}>
                <option selected>Select Product</option>
                {this.state.availProducts.map(({ name, id }, ind) => (
                  <option value={id} key={ind}>{name}</option>
                ))}
              </select>
              <button onClick={this.getProduct}>Get Product</button>
            </div>
            <a className="nav-link" href="#productInfo">Product Info</a>
            <a className="nav-link" href="#ratingsReviews">Reviews</a>
            <a className="nav-link" href="#QA">Q and A</a>
            <a className="nav-link" href="#">{`Check Out `}
              <i className="fas fa-shopping-cart"></i>
            </a>
          </nav>

          <div className="main" data-spy="scroll" data-target="navbar" data-offset="0" >
            <ProductDetail
              product={this.state.currentProduct}
              productStyles={this.state.productStyles} />
          </div>
        </React.Fragment>
      )
    } else {
      return (
        <div>Overview rendering</div>
      )
    }
  }
};

export default Overview;