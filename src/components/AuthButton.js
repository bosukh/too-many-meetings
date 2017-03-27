'use strict'

import React, { PropTypes } from 'react'
import SignInButton from './Buttons/SignInButton'
import SignOutButton from './Buttons/SignOutButton'
import { Row } from 'react-materialize'

class AuthButton extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    let button = null
    if (this.props.isSignedIn) {
      button = <SignOutButton
        isSignedIn = {this.props.isSignedIn}
        SignOutClick = {this.props.SignOutClick} />
    } else {
      button = <SignInButton
        isSignedIn = {this.props.isSignedIn}
        SignInClick = {this.props.SignInClick} />
    }
    return (
      <Row>
        {button}
      </Row>
    )
  }
}

AuthButton.propTypes = {
  isSignedIn: PropTypes.bool.isRequired,
  SignInClick: PropTypes.func.isRequired,
  SignOutClick: PropTypes.func.isRequired
}

export default AuthButton
