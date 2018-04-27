const BASE_DIRECTIONS_URL = 'https://maps.googleapis.com/maps/api/directions/json?';
const BASE_DISTANCE_URL = 'https://maps.googleapis.com/maps/api/distancematrix/json?';


/**
* Connects to the google API to get the best route to traverse some locations
* @param {object} current - The current content of the user user: {location:{}}
* @param {[object]} places - Array of all the places that need to be traverse
*                             no including the final destination.
* @param {object} destination - final destination destination{name: , location: {}}
* @param {boolean} optimize - a flag that sets the optimization feature on or off
*                               of the ItineraryForm class.
*/
export function getRoute(current, places, destination, optimize) {
  // This holds the formatted list of places
  var query         = '';

  // creates the origin part of the query
  var origin        = `origin=${current.latitude},${current.longitude}`;

  // creates the destination part of the query
  var destination   = `&destination=${destination.location.latitude},${destination.location.longitude}`;

  // creates the optimization part of the query
  var optimization  = `&waypoints=optimize:${optimize? 'true': 'false'}`;

  // creates the places generation part of the query
  places.forEach(
    (place) => {
      query += `|${place.location.latitude},${place.location.longitude}`
    }
  );

  var url = `${BASE_DIRECTIONS_URL}${origin}${destination}${optimization}${query}`;
  return fetch(url)
  .then(response => response.json())
  .then(responseJson => {
    return responseJson.routes[0];
  }).catch(e => {
    console.warn(e)
  });
}

/**
 * Connects to the Google API to get the distance between two points. It uses
 * DistanceMatrix Api.
 * @param  {object} origin      - The origin place. Usually the user
 * @param  {object} destination - The destination place. Usually the nearest Place
 * @return {[type]}             [description]
 */
export function getDistance(origin, destination){

  // creates the origin part of the query
  var origin        = `origins=${origin.location.latitude},${destination.location.longitude}`;

  // creates the destination part of the query
  var destination   = `&destinations=${destination.location.latitude},${destination.location.longitude}`;

  var url = `${BASE_DISTANCE_URL}${origin}${destination}`;

  return fetch(url)
  .then(response => response.json())
  .then(responseJson => {
    return responseJson;
  }).catch(e => {
    console.warn(e)
  });
}
