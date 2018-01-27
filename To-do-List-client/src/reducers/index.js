import { combineReducers } from 'redux';
import TeamReducer from './TeamReducer';
import CharactersReducer from './CharactersReducer';

 export default combineReducers({
   team: TeamReducer,
   characters: CharactersReducer
 });
