/**
 *  List of all the possible images that the app is going to load.
 *
 * React Native doesnt allow dynamic creation of require statement. After looking
 * on internet the best solution out there is to create a file with all the possible
 * require statments.
 */
export default {
  'straight':           require('../assets/icons/maneuvers/straight.png'),
  'turn-left':          require('../assets/icons/maneuvers/turn-left.png'),
  'turn-right':         require('../assets/icons/maneuvers/turn-right.png'),
  'turn-sharp-right':   require('../assets/icons/maneuvers/sharp-right-turn.png'),
  'turn-sharp-left':    require('../assets/icons/maneuvers/sharp-left-turn.png'),
  'none':               require('../assets/icons/maneuvers/none.png'),

}
