'use strict'

import React, { PropTypes } from 'react'
import { Row, Col, Icon } from 'react-materialize'

const PastAnalysis = ({ totalMeetings,
  totalHours,
  avgHoursWeekly,
  avgMeetingsWeekly,
  avgHoursDaily
}) => (
  <div className='statements'>
    <br/>
    <Row>
      <h3>
        In past 3 months...
      </h3>
    </Row>
    <Row>
      <h5>
        <Icon>play_arrow</Icon> You had {totalMeetings} events/meetings.
      </h5>
    </Row>
    <Row>
      <h5>
        <Icon>play_arrow</Icon> You spent {totalHours} hours in the events/meetings.
      </h5>
    </Row>
    <br/>
    <Row>
      <h3>
        On weekly basis...
      </h3>
    </Row>
    <Row>
      <h5>
        <Icon>play_arrow</Icon> That is {parseInt(avgMeetingsWeekly*100)/100} events/meetings per week on average.
      </h5>
    </Row>
    <Row>
      <h5>
        <Icon>play_arrow</Icon> You spent {parseInt(avgHoursWeekly*100)/100} hours in the events/meetings per week on average.
      </h5>
    </Row>
    <br/>
    <Row>
      <h3>
        On daily basis...
      </h3>
    </Row>
    <Row>
      <h5>
        <Icon>play_arrow</Icon> That is {parseInt(avgHoursDaily*100)/100} hours per workday on average.
      </h5>
    </Row>
    <Row>
      <h5>
        <Icon>play_arrow</Icon> You probably had {parseInt((avgHoursDaily ? 9 - avgHoursDaily : 0)*100)/100} hours to get your work done.
      </h5>
    </Row>
    <Row>
      <h5>
        <Icon>play_arrow</Icon> If we take out lunch, it becomes {parseInt((avgHoursDaily ? 8 - avgHoursDaily : 0)*100)/100} hours
      </h5>
    </Row>
  </div>
)

PastAnalysis.propTypes = {
  totalMeetings: PropTypes.number.isRequired,
  totalHours: PropTypes.number.isRequired,
  avgHoursWeekly: PropTypes.number.isRequired,
  avgMeetingsWeekly: PropTypes.number.isRequired,
  avgHoursDaily: PropTypes.number.isRequired
}

export default PastAnalysis
