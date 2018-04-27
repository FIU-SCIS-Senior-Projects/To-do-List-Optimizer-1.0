import { combineReducers } from 'redux';
import MapReducer from './MapReducer';
import UserReducer from './UserReducer';
import ErrandsReducer from './ErrandsReducer';
// import CharactersReducer from './CharactersReducer';

 export default combineReducers({
   map: MapReducer,
   user: UserReducer,
   errands: ErrandsReducer,
   // characters: CharactersReducer
 });
