
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

function _route(current, places, destination, optimize) {
  var answer = {};
  var url = `https://maps.googleapis.com/maps/api/directions/json?origin=${current.latitude},${current.longitude}&destination=${destination.latitude},${destination.longitude}&waypoints=optimize:${optimize? `true`: `false`}`;
  var query = '';

  places.map((place,id) => {query += `|${place.latitude},${place.longitude}`});

  url += query;

  fetch(url).then(response => response.json()).then(responseJson => {
    if (responseJson.routes.length) {
      var latitude = (responseJson.routes[0].bounds.northeast.lat + responseJson.routes[0].bounds.southwest.lat) / 2;
      var longitude = (responseJson.routes[0].bounds.northeast.lng + responseJson.routes[0].bounds.southwest.lng) / 2;
      answer = {
        polylines: this.decode(responseJson.routes[0].overview_polyline.points), // definition below
        route: {
          overview:  {
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: (responseJson.routes[0].bounds.northeast.lat - latitude) * 2,
            longitudeDelta: (responseJson.routes[0].bounds.northeast.lng - longitude) * 2
          },
        }
      };
    }
  }).catch(e => {
    console.warn(e)
  });

  console.log(this.state.route.overview);
  return answer;

}

export function getRoute(current, places, destination, optimize){
  respponse = _route(current, places, destination, optimize);

  return response;
}
