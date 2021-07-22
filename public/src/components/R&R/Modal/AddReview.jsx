import React, { useState, useEffect, Component } from 'react';
import Modal from '@material-ui/core/Modal';
import Rating from 'react-rating';
import axios from 'axios';
import token from '../../../../../config.js';
import ModalChars from './ModalChars.jsx';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import ModalAddReview from './ModalAddReview.jsx';
import styles from '../styles/makeStyles';

const url = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax';
const auth = {
  headers: {
    Authorization: token
  }
};

const AddReview = () => {
  const style = styles.useStyles();
  const [modalStyle] = useState(styles.getModalStyle);
  const [addReview, setAddReview] = useState({
    product_id: 16060,
    rating: 0,
    summary: '',
    body: '',
    recommend: true,
    name: '',
    email: '',
    photos: [],
    Size: 0,
    Width: 0,
    Comfort: 0,
    Quality: 0,
  });
  const [open, setOpen] = useState(false);
  const [bodyText, setBodyText] = useState(50 + 'Characters Required');
  const [summaryText, setSummaryText] = useState(60 + 'Characters Remaining');

  const handleSubmit = (event) => {
    event.preventDefault();
    axios({
      method: 'post',
      url: `${url}/reviews`,
      data: {
        product_id: addReview.product_id,
        rating: Number(addReview.rating),
        summary: addReview.summary,
        body: addReview.body,
        recommend: addReview.recommend === 'true' ? true : false,
        name: addReview.name,
        email: addReview.email,
        photos: addReview.photos,
        characteristics: { 53856: Number(addReview.Size), 53857: Number(addReview.Width), 53858: Number(addReview.Comfort), 53859: Number(addReview.Quality) }
      },
      headers: auth.headers,
    })
      .then(({ data }) => {
        setAddReview(data)
      })
      .catch((err) => console.error(err));
  }

  const handleBodyChange = (event) => {
    let input = event.target.value;
    if (input.length <= 50) {
      setReviewText((50 - input.length) + ' Characters Required');
    } else {
      setReviewText((1000 - input.length) + ' Characters remaining');
    }
  }

  const handleSummaryChange = (event) => {
    let input = event.target.value;
    if (input.length <= 60) {
      setSummaryText((60 - input.length) + ' Characters Remaining');
    }
  };

  const handleChange = (event) => {
    setBodyText(event.target.value)
    setSummaryText(event.target.value)
  }

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div style={modalStyle} className={style.paper1}>
      <form onSubmit={(event) => Submit(event)}>
        <ModalAddReview
          handleChange={handleChange}
          summaryText={summaryText}
          bodyText={bodyText}
          handleBodyChange={handleBodyChange}
          handleSummaryChange={handleSummaryChange}
          handleClose={handleClose} />
        <input className="submitButtonNd" type="submit" />
        <input className="closeModalNd" type="button" value="Cancel" onClick={handleClose} />
    </form>
    </div>
  )

  return (
    <div>
      <input className="addReviewsButtonNd" value="ADD A REVIEW +" type="button" onClick={handleOpen}/>
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      {body}
    </Modal>
  </div>
  );
}
export default AddReview;
