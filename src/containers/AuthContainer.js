'use strict'

import { connect } from 'react-redux'
import {
  AuthControl, CompleteSignIn,
  ImportCalendarRequest, ClearCalendar } from '../actions/actions'
import AuthButton from '../components/AuthButton'

const mapDispatchToProps = (dispatch) => {
  return {
    SignInClick: (isSignedIn) => {
      dispatch(AuthControl(isSignedIn))
      gapi.auth2.getAuthInstance().isSignedIn.listen(
        (isSignedIn) => {
          if (isSignedIn) {
            dispatch(CompleteSignIn())
            dispatch(ImportCalendarRequest())
          }
        }
      )
    },
    SignOutClick: (isSignedIn) => {
      dispatch(AuthControl(isSignedIn))
      dispatch(ClearCalendar())
    }
  }
}

const mapStateToProps = (state) => {
  return {isSignedIn: state.User.isSignedIn}
}

const AuthContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthButton)

export default AuthContainer
