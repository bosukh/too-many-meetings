'use strict'

import React, { PropTypes } from 'react'
import PastAnalysis from './CalendarResult/PastAnalysis'
import FutureAnalysis from './CalendarResult/FutureAnalysis'
import DailyLineChart from './CalendarResult/DailyLineChart'
import AttendeeScatterChart from './CalendarResult/AttendeeScatterChart'
import { Row } from 'react-materialize'

const NoResult = ({}) => (
  <div style={{textAlign:'center'}}>
    <Row>
      <h3>
        There seems to be no meetings on you calendar for the past 3 months.
      </h3>
    </Row>
  </div>
)
class CalendarResult extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    const avgHoursDaily = Math.round(this.props.totalHours/this.props.workDays * 10) / 10
    const avgMeetingsWeekly = Math.round(this.props.totalMeetings/this.props.totalWeeks * 10) / 10
    const avgHoursWeekly = Math.round(this.props.totalHours/this.props.totalWeeks * 10) / 10
    const totalHours = Math.round(this.props.totalHours * 10) / 10
    const attendeeAnalysis = (this.props.byAttendee || []).length
                             ? <AttendeeScatterChart data = {this.props.byAttendee || []} />
                             : null
    var pastAnalysis = <NoResult/>
    var dailyLineChart = null
    if ((this.props.dailyAggregatedEvents || []).length ){
      pastAnalysis = <PastAnalysis totalMeetings = {this.props.totalMeetings}
                totalHours = {this.props.totalHours}
                avgHoursWeekly = {avgHoursWeekly}
                avgMeetingsWeekly = {avgMeetingsWeekly}
                avgHoursDaily = {avgHoursDaily} />
      dailyLineChart  = <DailyLineChart data = {this.props.dailyAggregatedEvents || []} />
    }
    return (
      <div>
        {pastAnalysis}
        <br/>
        {dailyLineChart}
        <br/>
        {attendeeAnalysis}
        <br/>
        <FutureAnalysis data = {this.props.nextWeekEvents} />
      </div>
    )
  }
}

CalendarResult.propTypes = {
  nextWeekEvents: PropTypes.array.isRequired,
  byAttendee: PropTypes.array.isRequired,
  dailyAggregatedEvents: PropTypes.array.isRequired,
  payload: PropTypes.object.isRequired,
  isLoaded: PropTypes.bool.isRequired,
  totalHours: PropTypes.number,
  totalMeetings: PropTypes.number,
  workDays: PropTypes.number,
  totalWeeks: PropTypes.number
}

export default CalendarResult
