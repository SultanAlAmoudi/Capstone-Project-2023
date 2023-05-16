import {
  SET_SCREAMS,
  LOADING_DATA,
  LIKE_SCREAM,
  UNLIKE_SCREAM,
  DELETE_SCREAM,
  SET_ERRORS,
  POST_SCREAM,
  CLEAR_ERRORS,
  LOADING_UI,
  SET_SCREAM,
  STOP_LOADING_UI,
  SUBMIT_COMMENT,
  POST_REQUEST,
  SET_PUBLICREQUESTS,
  SET_REQUESTS,
  MAKE_OFFER,
  SET_OFFERS,
  SET_USEROFFERS,
} from '../types';
import axios from 'axios';

// Get all screams
export const getRequests = () => dispatch => {
  dispatch({ type: LOADING_DATA });
  axios
    .get('/requests')
    .then(res => {
      dispatch({
        type: SET_PUBLICREQUESTS,
        payload: res.data,
      });
    })
    .catch(err => {
      dispatch({
        type: SET_PUBLICREQUESTS,
        payload: [],
      });
    });
};
export const getOffers = requestId => dispatch => {
  dispatch({ type: LOADING_DATA });
  axios
    .get(`/offers/${requestId}`)
    .then(res => {
      console.log(res.data);
      dispatch({
        type: SET_OFFERS,
        payload: res.data,
      });
    })
    .catch(err => {
      dispatch({
        type: SET_OFFERS,
        payload: [],
      });
    });
};
export const getScream = screamId => dispatch => {
  dispatch({ type: LOADING_UI });
  axios
    .get(`/scream/${screamId}`)
    .then(res => {
      dispatch({
        type: SET_SCREAM,
        payload: res.data,
      });
      dispatch({ type: STOP_LOADING_UI });
    })
    .catch(err => console.log(err));
};
// Post a scream
export const postScream = newScream => dispatch => {
  dispatch({ type: LOADING_UI });
  axios
    .post('/scream', newScream)
    .then(res => {
      dispatch({
        type: POST_SCREAM,
        payload: res.data,
      });
      dispatch(clearErrors());
    })
    .catch(err => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};
//Create Request
export const postRequest = (newRequest, history) => dispatch => {
  dispatch({ type: LOADING_UI });
  axios
    .post('/Request', newRequest)
    .then(res => {
      dispatch({
        type: POST_REQUEST,
        payload: res.data,
      });
      dispatch(clearErrors());
      history.push({
        pathname: '/MyJopListings',
        state: { requestModal: false },
      });
    })
    .catch(err => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};
// Like a scream
export const likeScream = screamId => dispatch => {
  axios
    .get(`/scream/${screamId}/like`)
    .then(res => {
      dispatch({
        type: LIKE_SCREAM,
        payload: res.data,
      });
    })
    .catch(err => console.log(err));
};

export const makeOffer = (newOffer, requestId, history) => dispatch => {
  dispatch({ type: LOADING_UI });

  axios
    .post(`/request/${requestId}/offer`, newOffer)
    .then(res => {
      dispatch({
        type: MAKE_OFFER,
        payload: res.data,
      });
      dispatch(clearErrors());
      history.push({
        pathname: '/PublicRequests',
        state: { offerModal: false },
      });
    })
    .catch(err => {
      dispatch(clearErrors());
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};
// Unlike a scream
export const unlikeScream = screamId => dispatch => {
  axios
    .get(`/scream/${screamId}/unlike`)
    .then(res => {
      dispatch({
        type: UNLIKE_SCREAM,
        payload: res.data,
      });
    })
    .catch(err => console.log(err));
};
// Submit a comment
export const submitComment = (screamId, commentData) => dispatch => {
  axios
    .post(`/scream/${screamId}/comment`, commentData)
    .then(res => {
      dispatch({
        type: SUBMIT_COMMENT,
        payload: res.data,
      });
      dispatch(clearErrors());
    })
    .catch(err => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const acceptOffer = (requestId, offerId) => dispatch => {
  dispatch({ type: LOADING_UI });
  axios
    .post(`/requests/${requestId}/${offerId}/accept`)
    .then(res => {
      dispatch({
        type: SET_OFFERS,
        payload: [res.data],
      });
      dispatch(clearErrors());
      dispatch({ type: STOP_LOADING_UI });
    })
    .catch(err => {
      dispatch(clearErrors());
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
      dispatch({ type: STOP_LOADING_UI });
    });
};
export const deleteScream = screamId => dispatch => {
  axios
    .delete(`/scream/${screamId}`)
    .then(() => {
      dispatch({ type: DELETE_SCREAM, payload: screamId });
    })
    .catch(err => console.log(err));
};

export const getUserData = userHandle => dispatch => {
  dispatch({ type: LOADING_DATA });
  axios
    .get(`/user/${userHandle}`)
    .then(res => {
      dispatch({
        type: SET_REQUESTS,
        payload: res.data.requests,
      });
    })
    .catch(() => {
      dispatch({
        type: SET_REQUESTS,
        payload: null,
      });
    });
};

export const getUserOffers = () => dispatch => {
  dispatch({ type: LOADING_DATA });
  axios
    .get(`/user/offers`)
    .then(res => {
      dispatch({
        type: SET_USEROFFERS,
        payload: res.data.offers,
      });
    })
    .catch(() => {
      dispatch({
        type: SET_USEROFFERS,
        payload: null,
      });
    });
};
export const clearErrors = () => dispatch => {
  dispatch({ type: CLEAR_ERRORS });
};
