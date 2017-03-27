'use strict'

import { combineReducers } from 'redux'
import {
  INIT_USER_CLIENT, SIGN_IN_USER, SIGN_OUT_USER,
  COMPLETE_SIGN_IN, SHARE_RESULT, UPDATE_CALENDAR_MIN,
  IMPORT_CALENDAR, CLEAR_CALENDAR
} from '../actions/actions'

function User(state = {
  isInitated: false,
  isSigningIn: false,
  isSignedIn: false
}, action){
  switch (action.type){
    case INIT_USER_CLIENT:
      return Object.assign({}, state, {
        isInitated: true,
        isSignedIn: action.isSignedIn
      })
    case SIGN_IN_USER:
      return Object.assign({}, state, {
        isSigningIn: false
      })
    case COMPLETE_SIGN_IN:
      return Object.assign({}, state, {
        isSignedIn: true,
        isSigningIn: false
      })
    case SIGN_OUT_USER:
      return Object.assign({}, state, {
        isSignedIn: false
      })
    default:
      return state
  }
}

function Calendar(state={
  allEvents:[],
  payload:{},
  isLoaded: false
}, action){
  const payload = Object.assign({}, state.payload, action.payload)
  switch (action.type) {
    case IMPORT_CALENDAR:
      return Object.assign({}, state, {
        allEvents: action.allEvents,
        isLoaded: action.isLoaded
      })
    case CLEAR_CALENDAR:
      return {
        allEvents:[],
        payload:{},
        isLoaded: false
      }
    case UPDATE_CALENDAR_MIN:
      return Object.assign({}, state, {payload})
    case SHARE_RESULT:
      return Object.assign({}, state, {payload})
    default:
      return state
  }
}

const rootReducer = combineReducers({
  User,
  Calendar
})

export default rootReducer
