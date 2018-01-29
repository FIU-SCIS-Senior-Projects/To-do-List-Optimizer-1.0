import {
  GET_ROUTE_REQUESTED,
  GET_ROUTE_SUCCESS,
  GET_ROUTE_FAILURE
} from '../actions/actions';

export default function MapReducer(state = {route: {}, isRouting: false, error: null}, action) {
  switch(action.type) {
    case GET_ROUTE_REQUESTED:
      return {...state, isRouting: true};

    case GET_ROUTE_SUCCESS:
    console.log('action.payload: ', action.payload);
      return {
        ...state,
        isRouting: false,
        route: convertGoogleResponse(action.payload)
      };

    case GET_ROUTE_FAILURE:
      return {...state, isRouting: false, error: action.payload.error};

    default:
      return state;
  }

}

/**
* Decodes de google format for the coordinates of each point in the path
* @param {string} t - The string of encoded characters
* @return {[latitude, longitude]} - Array of all the points already translated
*/
function decodePoints(t) {
  for (var n, o, u = 0, l = 0, r = 0, d = [], h = 0, i = 0, a = null, c = Math.pow(10, 5); u < t.length;) {
    a = null,
    h = 0,
    i = 0;
    do
      a = t.charCodeAt(u++) - 63,
      i |= (31 & a) << h,
      h += 5;
    while (a >= 32);

    n = 1 & i ? ~ (i >> 1) : i >> 1,
    h = i = 0;

    do
      a = t.charCodeAt(u++) - 63,
      i |= (31 & a) << h,
      h += 5;
    while (a >= 32);

    o = 1 & i ? ~ (i >> 1) : i >> 1,
    l += n,
    r += o,
    d.push([
      l / c,
      r / c
    ])
  }
  return d = d.map(function(t) {
    return {latitude: t[0], longitude: t[1]}
  })
}

/**
 * TODO:
 * Each of the legs has a set of points that need to be parsed as well
 *
 */

/**
 * This method is mainly to convert the positions that google returns which are
 * encripted to location type data. It also calculates the region to show the
 * overview of the trip.
 * @param  {object} route google response it looks like:
 *                            {
 *                              bounds: {}
 *                              legs: []
 *                              overview_polyline: {}
 *                              summary: '',
 *                              warnigns: [],
 *                              waypoint_order: []
 *                            }
 * @return {object}       [description]
 */
function convertGoogleResponse(route){

  let processedRoute = {};

  var latitude_difference = (route.bounds.northeast.lat + route.bounds.southwest.lat);
  var longitude_difference = (route.bounds.northeast.lng + route.bounds.southwest.lng);
  processedRoute = {
  ...route,
  bounds: {
    ...route.bounds,
    region: {
      latitude: latitude_difference / 2,
      longitude: longitude_difference / 2,
      latitudeDelta: latitude_difference,
      longitudeDelta: longitude_difference,
    }
  },
  overview_polyline: decodePoints(route.overview_polyline.points)
}

return processedRoute;

}
