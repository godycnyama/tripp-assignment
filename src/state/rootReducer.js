import { combineReducers } from 'redux';
import driversReducer from './slices/driversSlice';
import trailersReducer from './slices/trailersSlice';
import trucksReducer from './slices/trucksSlice';
import accountReducer from './slices/accountSlice';

const rootReducer = combineReducers({
    drivers: driversReducer,
    trailers: trailersReducer,
    trucks: trucksReducer,
    account: accountReducer
});

export default rootReducer;
