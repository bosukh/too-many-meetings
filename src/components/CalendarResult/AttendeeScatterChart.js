'use strict'

import React, { PropTypes } from 'react'
import {ScatterChart, Scatter, XAxis,
  YAxis, ZAxis, CartesianGrid,
  Tooltip,  ResponsiveContainer, Text } from 'recharts'
import { Row, Col} from 'react-materialize'

class CustomTooltip extends React.Component {
  render() {
    const { active } = this.props
    if (active) {
      const { payload } = this.props.payload[0]
      return (
        <div className="custom-tooltip">
          <p className="name">{payload.name}</p>
          <p className="label">{payload.totalHours} hrs</p>
          <p className="label">{payload.totalNum} meetings</p>
          <p className="label">{parseInt(payload.avgHourPerEvent*100)/100}  hr/meeting</p>
        </div>
      );
    }
    return null
  }
}
// CustomTooltip.propTypes= {
//   name: PropTypes.string,
//   avgHourPerEvent: PropTypes.array,
//   label: PropTypes.string
// }

const AttendeeScatterChart = ({data}) => (
  <div>
    <Row>
      <h3>
        Let's see who you've been meeting with.
      </h3>
    </Row>
    <Row>
      <ResponsiveContainer minWidth={320} minHeight={400} >
        <ScatterChart margin={{top: 5, right: 0, left: 0, bottom: 5}}>
          <XAxis dataKey={'avgHourPerEvent'} name='Daily Average Hours Meeting' unit=' hr/meeting' />
          <YAxis dataKey={'totalNum'} name='Daily Total Count' unit=' meetings'/>
          <ZAxis dataKey={'totalHours'} range={[60, 1000]} name='Daily Total Hours' unit=' hr'/>
          <CartesianGrid />
          <Tooltip content={<CustomTooltip/>}/>
          <Text />
          <Scatter data={data} fill='#26a69a' />
        </ScatterChart>
      </ResponsiveContainer>
    </Row>
  </div>
)

AttendeeScatterChart.propTypes = {
  data: PropTypes.array.isRequired
}

export default AttendeeScatterChart
