import carReducer from './reducers/carReducer'
import userReducer from './reducers/userReducer'
import { createStore, combineReducers } from 'redux';

const rootReducer = combineReducers({
  carReducer: carReducer,
  userReducer: userReducer
})

const configureStore = createStore(rootReducer);
export default configureStore;