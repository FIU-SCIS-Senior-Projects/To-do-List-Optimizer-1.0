METER_TO_FEET   = 3.28084;
MILES_TO_FOOT   = 5280;
MIN_TO_SECONDS  = 60;
export function formatTime(timeInSeconds){
  var {hours, minutes} = convertTime(timeInSeconds);

  if (hours >= 1) {
    return `${hours} hour${hours>1? 's':''} ${minutes.toFixed(1)} min${minutes>1? 's':''}.`
  } else{
    return `${minutes.toFixed(1)} min${minutes>1? 's':''}.`
  }
}


/******************************************************************************
* TIME TOOLS
******************************************************************************/

/**
 * [convertTime description]
 * @param  {[type]} timeInSeconds Time In seconds
 * @return {{Integer, Integer}}   Returns and Object {hours,minutes}
 */
export function convertTime(timeInSeconds){
  if(timeInSeconds){
    var timeInMin = convertSecondsToMin(timeInSeconds);

    return convertMinToHours(timeInMin);
  }
  else {
    return {hours:0, minutes:0};
  }
}
/**
 *  Converts a time in seconds to time in minutes
 * @param  {[Integer]} timeInSeconds Time in seconds
 * @return {Integer} Time in minutes
 */
export function convertSecondsToMin(timeInSeconds){

    return timeInSeconds/60;
}

/**
 *  Converts a time in minutes to time in hours and minutes
 * @param  {[Integer]} timeInMinutes Time in minutes
 * @return {{Integer, Integer}}   Returns and Object {hours,minutes}
 */
export function convertMinToHours(timeInMin){

  if (timeInMin >= 60) {
    var hours         = Math.floor(timeInMin / MIN_TO_SECONDS)
    var remaindingMin = timeInMin % MIN_TO_SECONDS;
    return {hours:hours, minutes:remaindingMin}

  } else{
    return {hours:0, minutes:timeInMin}
  }
}

/******************************************************************************
* DISTANCE TOOLS
******************************************************************************/

export function convertDistance(distanceInMeters){
  var distanceInFeet = convertMetersToFeet(distanceInMeters)
  var miles = Math.floor(distanceInFeet/MILES_TO_FOOT)
  var foot  = distanceInFeet % MILES_TO_FOOT
  return {miles: miles, foot: foot }
}


export function convertFeetToMiles(distanceInFeet){
  return distanceInFeet * FEET_TO_MILES;
}

export function convertMetersToFeet(distanceInMeters){
  return distanceInMeters * METER_TO_FEET;
}
