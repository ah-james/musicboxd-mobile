import React from 'react';
import { Provider } from 'react-redux'
import { createStore, combineReducers, applyMiddleware } from 'redux';
import Thunk from 'redux-thunk'

import Navigator from './navigation/Navigator'
import reviewReducer from './store/reducers/reviewReducer'
import authReducer from './store/reducers/authReducer'

// use combineReducers to eventually expand application
const rootReducer = combineReducers({
  reviews: reviewReducer,
  auth: authReducer
})

const store = createStore(rootReducer, applyMiddleware(Thunk))

export default function App() {
  return(
    <Provider store={store}>
      <Navigator />
    </Provider>
  )
}
