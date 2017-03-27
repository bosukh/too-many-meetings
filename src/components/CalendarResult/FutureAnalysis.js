'use strict'

import React, { PropTypes } from 'react'
import { Row, Col, Icon } from 'react-materialize'


class FutureAnalysis extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    const totalHours = this.props.data.reduce(function(acc, event){
      return acc + event.duration
    }, 0)
    return (
      <div className='statements'>
        <br/>
        <Row>
          <h3>
            Next Week,
          </h3>
        </Row>
        <Row>
          <h5>
            <Icon>play_arrow</Icon>  You have {this.props.data.length} events/meetings.
          </h5>
        </Row>
        <Row>
          <h5>
            <Icon>play_arrow</Icon> You will spend {totalHours} hours in the events/meetings.
          </h5>
        </Row>
        <div style={{textAlign:'center'}}>
          <Row>
            <h3>
              Do you need all that?
            </h3>
          </Row>
        </div>
      </div>
    )
  }
}

FutureAnalysis.propTypes = {
  data: PropTypes.array.isRequired
}

export default FutureAnalysis
