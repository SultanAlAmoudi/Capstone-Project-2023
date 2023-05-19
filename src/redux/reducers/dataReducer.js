import {
  UNLIKE_SCREAM,
  LOADING_DATA,
  POST_REQUEST,
  SET_REQUESTS,
  SUBMIT_COMMENT,
  SET_PUBLICREQUESTS,
  MAKE_OFFER,
  SET_OFFERS,
  SET_UNAUTHENTICATED,
  SET_USEROFFERS,
} from '../types';

const initialState = {
  screams: [],
  scream: {},
  publicRequests: [],
  request: {},
  requests: [],
  offers: [],
  userOffers: [],
  dataloading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        dataloading: true,
      };
    case SET_REQUESTS:
      return {
        ...state,
        requests: action.payload,
        dataloading: false,
      };
    case SET_OFFERS:
      return {
        ...state,
        offers: action.payload,
        dataloading: false,
      };
    case SET_PUBLICREQUESTS:
      return {
        ...state,
        publicRequests: action.payload,
        dataloading: false,
      };
    case SET_USEROFFERS:
      return {
        ...state,
        userOffers: action.payload,
        dataloading: false,
      };
    case MAKE_OFFER:
      return {
        ...state,
        offers: [action.payload, ...state.offers],
      };

    case POST_REQUEST:
      return {
        ...state,
        requests: [action.payload, ...state.requests],
      };
    case SUBMIT_COMMENT:
      return {
        ...state,
        scream: {
          ...state.scream,
          comments: [action.payload, ...state.scream.comments],
        },
      };
    case SET_UNAUTHENTICATED:
      return initialState;
    default:
      return state;
  }
}
