// store.ts
import { legacy_createStore, combineReducers, compose } from 'redux';
import  createGenericReducer  from './redux/genericReducer';

const rootReducer = combineReducers({
    generic: createGenericReducer,
});

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = legacy_createStore(
    rootReducer,
    composeEnhancers()
);



export default store;
