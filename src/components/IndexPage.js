'use strict'

import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import AuthContainer  from '../containers/AuthContainer'
import CalendarContainer  from '../containers/CalendarContainer'
import { Row, CardPanel, Preloader, Icon } from 'react-materialize'

class IndexPage extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    const divStyle = {
      textAlign:'center',
      maxWidth:'1140px',
      margin:'auto'
    }
    var content = null
    if (this.props.isSignedIn & !this.props.isLoaded){
      content = <Preloader size='big'/>
    } else if (this.props.isSignedIn & this.props.isLoaded){
      content = <CalendarContainer />
    }
    return (
      <div>
        <CardPanel style = {{textAlign:'center'}}>
          <Row>
            <h1>Too Many Meetings!</h1>
          </Row>
          <Row>
            <h3>Analyze times you spend on meetings</h3>
          </Row>
          <AuthContainer />
        </CardPanel>
        <div style = {divStyle}>
          {content}
        </div>
      </div>
    )
  }
}

IndexPage.PropTypes = {
  isSignedIn: PropTypes.bool.isRequired,
  isLoaded: PropTypes.bool.isRequired
}

const mapStateToProps = (state) => {
  const { isSignedIn } = state.User
  const { isLoaded } = state.Calendar
  return {
    isSignedIn,
    isLoaded
  }
}

export default connect(mapStateToProps)(IndexPage)
