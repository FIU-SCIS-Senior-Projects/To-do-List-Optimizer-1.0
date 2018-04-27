import {Dimensions} from 'react-native';
import {
  UPDATE_LOCATION,
  GET_DISTANCE_REQUESTED,
  GET_DISTANCE_FAILURE,
  GET_DISTANCE_SUCCESS,
} from '../actions/actions';

const {width, height} = Dimensions.get('window');

const ASPECT_RATIO = width / height;

const LATITUDE_DELTA_ZOOMED = 0.015;
const LONGITUDE_DELTA_ZOOMED = LATITUDE_DELTA_ZOOMED * ASPECT_RATIO;

export default function UserReducer(state = {location: {}, error: null, distanceToPlace: null, fetchingDistance: false}, action) {

  switch(action.type) {
    case UPDATE_LOCATION:
      return {...state, location: action.payload.location}
    case GET_DISTANCE_REQUESTED:
      return {...state, fetchingDistance: true}
    case GET_DISTANCE_FAILURE:
      return {...state, error: action.payload.error, fetchingDistance: false}
    case GET_DISTANCE_SUCCESS:
      return {...state, distanceToPlace: action.payload.distance, fetchingDistance: false}
    default:
      return state;
  }
}
