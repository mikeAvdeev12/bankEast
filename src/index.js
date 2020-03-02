import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App';
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom';


function authReducer (state = {}, action) {
  if (action.type === 'SET_TOKEN') {
    return {
      ...state,
      token: action.payload
    }
  }

  return state
}

const reducer = combineReducers({
  auth: authReducer
})

const store = createStore(reducer, {
  auth: { 
    token: null
  }
})

ReactDOM.render((
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
), document.getElementById('root'));
