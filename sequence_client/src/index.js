import React from 'react';
import { render } from 'react-dom'
import './index.css';
import App from './App';
import { Provider } from 'react-redux'
import rootReducer from './reducers'
import { BrowserRouter } from 'react-router-dom'
import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import { watcherSaga } from "./sagas";
const sagaMiddleware = createSagaMiddleware();

// dev tools middleware
const reduxDevTools =
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

let store = createStore(
  rootReducer,
  compose(applyMiddleware(sagaMiddleware), reduxDevTools)
);

// run the saga
sagaMiddleware.run(watcherSaga);

render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>, 
  document.getElementById('root')
  );
