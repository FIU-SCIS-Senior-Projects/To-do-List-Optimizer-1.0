import * as googleApi from '../api/googleApi';
import {calculateTotalTime} from '../tools/ApiTools'
import {calculateTotalDistance} from '../tools/ApiTools'

// Map actions declaration
export const GET_ROUTE_REQUESTED    = 'GET_ROUTE_REQUESTED';
export const GET_ROUTE_SUCCESS      = 'GET_ROUTE_SUCCESS';
export const GET_ROUTE_FAILURE      = 'GET_ROUTE_FAILURE';

export const OVERVIEW               = 'OVERVIEW';
export const CENTER                 = 'CENTER';

export const START_NAVIGATION       = 'START_NAVIGATION';
export const STOP_NAVIGATION        = 'STOP_NAVIGATION';

// User actions declaration
export const UPDATE_LOCATION        = 'UPDATE_LOCATION';
export const GET_DISTANCE_REQUESTED = 'GET_DISTANCE_REQUESTED'
export const GET_DISTANCE_SUCCESS   = 'GET_DISTANCE_SUCCESS'
export const GET_DISTANCE_FAILURE   = 'GET_DISTANCE_FAILURE'

// Errands actions declaration
export const ADD_PLACE              = 'ADD_PLACE';
export const ADD_TASK               = 'ADD_TASK';




/******************************************************************************
* MAP ACTIONS
******************************************************************************/
/*
  TODO: Change the center method to not take the user position since it is in the Store
 */

/**
 * Action to manage the routing of the map
 * @param {object} current - The current content of the user user: {location:{}}
 * @param {[object]} places - Array of all the places that need to be traverse
 *                             no including the final destination.
 * @param {boolean} optimize - a flag that sets the optimization feature on or off
 * @return {[type]}             [description]
 */
export function getRoute(current, places, optimize) {
  return (dispatch) => {
    // each api call is going to be a promise so we can use Promise.all()
    var promises = []

    // Trying all the possible combinations of destinations to get the best time
    var arrPlaces = Object.keys(places).map(function (key) { return places[key]; });

    arrPlaces.forEach( (possibleDestination) => {
      var remainingPlaces = arrPlaces.filter((place) => place.id !== possibleDestination.id)

      promises.push(googleApi.getRoute(current, remainingPlaces, possibleDestination, optimize))

    })

    var bestTime             = 0;
    var placeIndex           = 0;
    var tempResults          = {};
    var tempDestination      = {};
    var nonDestinationPlaces = []

    // Make all the API calls at the same time and waits for all the responses
    Promise.all(promises).then( function(responses){
      var index = 0;

      // from all the responses it picks the one with the lowest time
      responses.forEach(function(response){
        var totalTime = calculateTotalTime(response.legs);

        if (bestTime) {
          if (totalTime < bestTime) {
            bestTime              = totalTime;
            tempResults           = response;
            tempDestination       = arrPlaces[index];
            nonDestinationPlaces  = arrPlaces.filter((place) =>
                                      place.id !== arrPlaces[index].id)
          }
        } else {
          bestTime                = totalTime;
          tempResults             = response;
          tempDestination         = arrPlaces[index];
          nonDestinationPlaces    = arrPlaces.filter((place) =>
                                    place.id !== arrPlaces[index].id)
        }

        index += 1;
      })

      // dispatches the best response with the lowest time
      dispatch(getRouteSuccess({
        ...tempResults,
        total_time:           bestTime,
        total_distance:       calculateTotalDistance(tempResults.legs),
        destination:          tempDestination,
        nonDestinationPlaces: nonDestinationPlaces,
      }));
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

export function center(userLocation){
  return{
    type: CENTER,
    payload: userLocation,
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

export function startNavigation(){
  return {
    type: START_NAVIGATION,
  }
}

export function stopNavigation(){
  return {
    type: STOP_NAVIGATION,
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

export function getDistanceToPlace(origin, destination){
  return (dispatch) => {
    googleApi.getDistance(origin, destination)
    .then( (result) => {
      dispatch(getDistanceSuccess(result.rows[0].elements[0].distance.value));
    }).catch((error) => {
            dispatch(getDistanceFailure(error));
        })
  }
}

export function getDistanceRequested() {
  return {
    type: GET_DISTANCE_REQUESTED
  };
};

export function getDistanceSuccess(distance) {
  return {
    type: GET_DISTANCE_SUCCESS,
    payload: { distance }
  };
};

export function getDistanceFailure(error) {
  return {
    type: GET_DISTANCE_FAILURE,
    payload: { error }
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
