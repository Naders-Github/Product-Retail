import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Stars from '../styles/Stars.js';

const SortReviews = ({ reviews, changeReview }) => {

  const handleSort = (event) => {
    changeReview(event.target.value);
  };

    return (
      <div>
        <span>
          <label id="labelNd"><b>{reviews.length} Reviews</b></label>
          <DropdownButton
            size="m"
            variant="secondary"
            title="sorted by"
          >
            <Dropdown.Item as="button" value="relevance" onClick={handleSort}>Relevance</Dropdown.Item>
            <Dropdown.Item as="button" value="helpfulness" onClick={handleSort}>Helpfulness</Dropdown.Item>
            <Dropdown.Item as="button" value="newest" onClick={handleSort}>Newest</Dropdown.Item>
          </DropdownButton>
        </span>
      </div>
    );
};

export default SortReviews;
