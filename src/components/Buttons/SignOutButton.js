'use strict'

import React, { PropTypes } from 'react'
import { Button } from 'react-materialize'

const SignOutButton = ({ isSignedIn, SignOutClick }) => (
  <Button onClick= {() => SignOutClick(isSignedIn)}>
    Sign Out
  </Button>
)

SignOutButton.propTypes = {
  isSignedIn: PropTypes.bool.isRequired,
  SignOutClick: PropTypes.func.isRequired
}

export default SignOutButton
