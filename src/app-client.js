'use strict'

import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import rootReducer from './reducers/reducers'
import { AuthInit } from './actions/actions'
import Root from './components/Root'

const loggerMiddleware = createLogger()
let store = createStore(rootReducer,
  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware
  )
)

store.dispatch(AuthInit())

window.onload = () => {
  ReactDOM.render(
    <Root store={store} />,
    document.getElementById('main')
  )
}
