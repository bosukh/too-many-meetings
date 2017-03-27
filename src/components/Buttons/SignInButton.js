'use strict'

import React, { PropTypes } from 'react'
import { Button } from 'react-materialize'

const SignInButton = ({ isSignedIn, SignInClick }) => (
  <Button onClick= {() => SignInClick(isSignedIn)}>
    Import Google Calendar
  </Button>
)

SignInButton.propTypes = {
  isSignedIn: PropTypes.bool.isRequired,
  SignInClick: PropTypes.func.isRequired
}

export default SignInButton
