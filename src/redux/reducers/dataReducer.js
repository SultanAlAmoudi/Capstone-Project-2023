import {
  SET_SCREAMS,
  LIKE_SCREAM,
  UNLIKE_SCREAM,
  LOADING_DATA,
  DELETE_SCREAM,
  POST_REQUEST,
  SET_REQUESTS,
  POST_SCREAM,
  SET_SCREAM,
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
    case SET_SCREAMS:
      return {
        ...state,
        screams: action.payload,
        dataloading: false,
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
    case SET_SCREAM:
      return {
        ...state,
        scream: action.payload,
      };
    case LIKE_SCREAM:
      return {
        ...state,
        scream: action.payload,
      };
    case MAKE_OFFER:
      return {
        ...state,
        offers: [action.payload, ...state.offers],
      };
    case UNLIKE_SCREAM:
      let index = state.screams.findIndex(
        scream => scream.screamId === action.payload.screamId,
      );
      state.screams[index] = action.payload;
      if (state.scream.screamId === action.payload.screamId) {
        state.scream = action.payload;
      }
      return {
        ...state,
      };
    case DELETE_SCREAM:
      index = state.screams.findIndex(
        scream => scream.screamId === action.payload,
      );
      state.screams.splice(index, 1);
      return {
        ...state,
      };
    case POST_SCREAM:
      return {
        ...state,
        screams: [action.payload, ...state.screams],
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
