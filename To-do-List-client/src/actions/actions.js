import * as googleApi from '../api/googleApi';

export const GET_ROUTE_REQUESTED  = 'GET_ROUTE_REQUESTED';
export const GET_ROUTE_SUCCESS    = 'GET_ROUTE_SUCCESS';
export const GET_ROUTE_FAILURE    = 'GET_ROUTE_FAILURE';

export const OVERVIEW = 'OVERVIEW';

// User actions declaration
export const UPDATE_LOCATION = 'UPDATE_LOCATION';

// Errands actions declaration
export const ADD_PLACE = 'ADD_PLACE';
export const ADD_TASK = 'ADD_TASK';


/******************************************************************************
* MAP ACTIONS
******************************************************************************/

/**
 * Action to manage the routing of the map
 * @param {object} current - The current content of the user user: {location:{}}
 * @param {[object]} places - Array of all the places that need to be traverse
 *                             no including the final destination.
 * @param {object} destination - final destination destination{name: , location: {}}
 * @param {boolean} optimize - a flag that sets the optimization feature on or off
 * @return {[type]}             [description]
 */
export function getRoute(current, places, destination, optimize) {
  return (dispatch) => {
    googleApi.getRoute(current, places, destination, optimize).then((results) => {;
      dispatch(getRouteSuccess(results));
    }).catch((error) => {
      dispatch(getRouteFailure(error));
    })

  };
};

export function overview(){
  return{
    type: OVERVIEW,
  }
}

export function getRouteRequested() {
  return {
    type: GET_ROUTE_REQUESTED
  };
};

export function getRouteSuccess(response) {
  return {
    type: GET_ROUTE_SUCCESS,
    payload: { response }
  };
};

export function getRouteFailure(error) {
  return{
    type: GET_ROUTE_FAILURE,
    payload: { error }
  }
}

/******************************************************************************
* USER ACTIONS
******************************************************************************/
export function updateLocation(location) {
  return {
    type: UPDATE_LOCATION,
    payload: { location}
  };
};

/******************************************************************************
* ERRANDS ACTIONS
******************************************************************************/

export function addPlace(place){
  return{
    type: ADD_PLACE,
    payload: {place},
  }
}

export function addTask(task){
  return {
    type: ADD_TASK,
    payload: { task},
  }
}
