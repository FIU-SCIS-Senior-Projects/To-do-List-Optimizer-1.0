const BASE_URL = 'https://maps.googleapis.com/maps/api/directions/json?';

/**
* Decodes de google format for the coordinates of each point in the path
* @param {string} t - The string of encoded characters
* @return {[latitude, longitude]} - Array of all the points already translated
*/
function decode(t) {
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
* Connects to the google API to get the best route to traverse some locations
* @param {object} current - The current content of the user user: {location:{}}
* @param {[object]} places - Array of all the places that need to be traverse
*                             no including the final destination.
* @param {object} destination - final destination destination{name: , location: {}}
* @param {boolean} optimize - a flag that sets the optimization feature on or off
* @param {ItineraryForm} currentClass - this is a reference to the class that
*                                       generated the callback.
* @param {function} callback - callback function that handles the change in setState
*                               of the ItineraryForm class.
*/
export function getRoute(current, places, destination, optimize, currentClass,callback) {
  var query = ''; // This holds the formatted list of places

  var origin = `origin=${current.latitude},${current.longitude}`; // creates the origin part of the query
  var destination = `&destination=${destination.latitude},${destination.longitude}`; // creates the destination part of the query
  var optimization = `&waypoints=optimize:${optimize? 'true': 'false'}`; // creates the optimization part of the query

  places.map((place,id) => {query += `|${place.location.latitude},${place.location.longitude}`}); // creates the places generation part of the query

  var url = `${BASE_URL}${origin}${destination}${optimization}${query}`

  fetch(url)
  .then(response => response.json())
  .then(responseJson => {
    if (responseJson.routes.length) {
      var latitude = (responseJson.routes[0].bounds.northeast.lat + responseJson.routes[0].bounds.southwest.lat) / 2;
      var longitude = (responseJson.routes[0].bounds.northeast.lng + responseJson.routes[0].bounds.southwest.lng) / 2;
      var order = responseJson.routes[0].waypoint_order
      callback(currentClass,{
        polylines: decode(responseJson.routes[0].overview_polyline.points), // definition below
        route: {
          overview:  {
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: (responseJson.routes[0].bounds.northeast.lat - latitude) * 2,
            longitudeDelta: (responseJson.routes[0].bounds.northeast.lng - longitude) * 2
          },
          order: order,
        }
      });
    }
  }).catch(e => {
    console.warn(e)
  });
}
