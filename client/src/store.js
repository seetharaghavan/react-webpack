import {createStore, combineReducers, applyMiddleware} from 'redux'; 
import ReduxThunk  from 'redux-thunk'; 
import authReducer from './reducers/auth.reducer';
import noteReducer from './reducers/note.reducer';
import sideBarReducer from './reducers/sidebar.reducer';

const store = createStore( 
    combineReducers({
        authState: authReducer,
        noteState: noteReducer,
        sidebarState: sideBarReducer
    }),
    {},
    applyMiddleware(ReduxThunk)
)

export default store; 

