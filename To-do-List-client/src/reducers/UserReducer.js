import {Dimensions} from 'react-native';
import {
  UPDATE_LOCATION,
} from '../actions/actions';

const {width, height} = Dimensions.get('window');

const ASPECT_RATIO = width / height;

const LATITUDE_DELTA_ZOOMED = 0.015;
const LONGITUDE_DELTA_ZOOMED = LATITUDE_DELTA_ZOOMED * ASPECT_RATIO;

export default function UserReducer(state = {location: {}}, action) {
  switch(action.type) {
    case UPDATE_LOCATION:
      return {location: action.payload.location}

    default:
      return state;
  }
}
