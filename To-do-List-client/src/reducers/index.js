import { combineReducers } from 'redux';
import MapReducer from './MapReducer';
// import CharactersReducer from './CharactersReducer';

 export default combineReducers({
   map: MapReducer,
   // characters: CharactersReducer
 });
