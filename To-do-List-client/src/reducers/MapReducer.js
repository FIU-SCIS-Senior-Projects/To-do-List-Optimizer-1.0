import {
    Dimensions,
} from 'react-native'

import {
  GET_ROUTE_REQUESTED,
  GET_ROUTE_SUCCESS,
  GET_ROUTE_FAILURE,
  OVERVIEW,
  CENTER
} from '../actions/actions';

const {width, height} = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 26.14777;
const LONGITUDE = -81.79091;
const LATITUDE_DELTA = 0.0922;
const LATITUDE_DELTA_ZOOMED = 0.0035;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const LONGITUDE_DELTA_ZOOMED = LATITUDE_DELTA_ZOOMED * ASPECT_RATIO;
const DELTA_MARGIN = 0.001;

let InitialRegion = {
  latitude: LATITUDE,
  longitude: LONGITUDE,
  latitudeDelta: LATITUDE_DELTA,
  longitudeDelta: LONGITUDE_DELTA
}

export default function MapReducer(state = {
                                            route: {},
                                            currentRegion: InitialRegion,
                                            overview: true,
                                            navigating: false,
                                            isRouting: false,
                                            error: null}, action) {
  switch(action.type) {
    case OVERVIEW:
      if (state.isRouting) {
        return state;
      } else {
        return {...state, currentRegion: state.route.bounds.region, overview: true}
      }
    case CENTER:
      return {
        ...state,
        currentRegion: getCenterRegion(action.payload),
        overview: false}

    case GET_ROUTE_REQUESTED:
      return {...state, isRouting: true};

    case GET_ROUTE_SUCCESS:
      return {
        ...state,
        isRouting: false,
        route: convertGoogleResponse(action.payload.response)
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

  var latitude_span = (route.bounds.northeast.lat + route.bounds.southwest.lat);
  var longitude_span = (route.bounds.northeast.lng + route.bounds.southwest.lng);

  var latitude_difference = (route.bounds.northeast.lat - route.bounds.southwest.lat);
  var longitude_difference = (route.bounds.northeast.lng - route.bounds.southwest.lng);
  processedRoute = {
  ...route,
  bounds: {
    ...route.bounds,
    region: {
      latitude: latitude_span / 2,
      longitude: longitude_span / 2,
      latitudeDelta: latitude_difference + DELTA_MARGIN,
      longitudeDelta: longitude_difference + DELTA_MARGIN,
    },
  },
  total_distance: calculateTotalDistance(route.legs),
  total_time: calculateTotalTime(route.legs), //in seconds
  overview_polyline: decodePoints(route.overview_polyline.points),
}

return processedRoute;

}

function calculateTotalDistance(legs){
  let totalDistance = 0;  //in feet

  legs.forEach((leg) => {
    totalDistance += leg.distance.value;
  });

  return totalDistance;
}

function calculateTotalTime(legs){
  let totalTime = 0;  //in seconds

  legs.forEach((leg) => {
    totalTime += leg.duration.value;
  });

  return totalTime;
}

function getCenterRegion(coords){
  let processedRegion = {};

  processedRegion = {
    latitude: coords.latitude,
    longitude: coords.longitude,
    latitudeDelta: LATITUDE_DELTA_ZOOMED,
    longitudeDelta: LONGITUDE_DELTA_ZOOMED,

  };

  return processedRegion;
}
