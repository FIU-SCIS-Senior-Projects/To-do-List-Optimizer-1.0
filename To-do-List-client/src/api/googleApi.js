const BASE_URL = 'https://maps.googleapis.com/maps/api/directions/json?';


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
  var query = ''; // This holds the formatted list of places

  var origin = `origin=${current.latitude},${current.longitude}`; // creates the origin part of the query
  var destination = `&destination=${destination.latitude},${destination.longitude}`; // creates the destination part of the query
  var optimization = `&waypoints=optimize:${optimize? 'true': 'false'}`; // creates the optimization part of the query

  places.map((place,id) => {query += `|${place.location.latitude},${place.location.longitude}`}); // creates the places generation part of the query

  var url = `${BASE_URL}${origin}${destination}${optimization}${query}`

  fetch(url)
  .then(response => response.json())
  .then(responseJson => {
    return responseJson.routes[0];
  }).catch(e => {
    console.warn(e)
  });
}