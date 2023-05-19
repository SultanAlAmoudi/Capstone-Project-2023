import {
  LOADING_DATA,
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  STOP_LOADING_UI,
  POST_REQUEST,
  SET_PUBLICREQUESTS,
  SET_REQUESTS,
  MAKE_OFFER,
  SET_OFFERS,
  SET_USEROFFERS,
} from '../types';
import axios from 'axios';

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

export const acceptOffer = (requestId, offerId, history) => dispatch => {
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
      history.push({
        pathname: '/MyJopListings',
        state: { refresh: false },
      });
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
        payload: [],
      });
    });
};

export const getUserOffers = history => dispatch => {
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
