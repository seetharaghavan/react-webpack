import React from 'react'; 
import ReactDOM from 'react-dom'; 
import { BrowserRouter, Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { Provider } from 'react-redux'; 

import store from './store'; 
import AuthView from './views/Auth'; 
import NotesView from './views/Notes';

import './App.css'

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={withRouter(AuthView)} />
                <Route path="/notes" exact component={withRouter(NotesView)} />
                <Redirect from="**" to="/" />
            </Switch>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);