import {
  ADD_PLACE,
  ADD_TASK,
} from '../actions/actions';

export default function ErrandsReducer(state = {places: {}}, action) {
  switch(action.type) {
    case ADD_PLACE:
      let oldState = state;
      oldState.places[action.payload.place.id] = action.payload.place
      return oldState;

    case ADD_TASK:
      return state;

    default:
      return state;
  }
}
