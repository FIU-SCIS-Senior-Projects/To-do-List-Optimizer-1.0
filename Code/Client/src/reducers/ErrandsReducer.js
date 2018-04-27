import {
  ADD_PLACE,
  ADD_TASK,
} from '../actions/actions';

export default function ErrandsReducer(state = {places: {}, tasks: {}}, action) {
  switch(action.type) {
    case ADD_PLACE:
      let oldState = state;
      oldState.places[action.payload.place.id] = {...action.payload.place, tasks: []}

      return oldState;

    case ADD_TASK:
      let taskId = action.payload.task.id;
      let placeId = action.payload.task.placeId;

      var oldState = state;
      oldState.tasks[taskId] = action.payload.task;
      oldState.places[placeId].tasks = [...oldState.places[placeId].tasks, taskId]
      return oldState;

    default:
      return state;
  }
}
