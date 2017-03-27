'use strict'

import React from 'react'
import { Link } from 'react-router'
import { Row } from 'react-materialize'

export default class NotFoundPage extends React.Component {
  render() {
    return (
      <Row>
        <h1>404</h1>
        <h2>Page not found!</h2>
        <p>
          <Link to="/">Go back to the main page</Link>
        </p>
      </Row>
    )
  }
}
