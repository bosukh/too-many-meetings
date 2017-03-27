'use strict'

import React, { PropTypes } from 'react'
import {LineChart, Line, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer,
Brush} from 'recharts'
import {Dropdown, Button, NavItem, Row, Col} from 'react-materialize'

class DailyLineChart extends React.Component {

  constructor(props) {
    super(props)
    this.state = this.state || {dataKey: 'totalHours', dataName: 'Daily Total Hours in Meetings'}
    this.dataNameToKey= {
      'Daily Total Hours in Meetings': 'totalHours',
      'Daily Total Meeting Count': 'totalNum',
      'Daily Average Hours per Meeting': 'avgHourPerEvent'
    }
    this.chooseData = this.chooseData.bind(this);
  }

  chooseData(dataName){
    this.setState(prevState => (
      {dataKey: this.dataNameToKey[dataName], dataName}
    ))
  }

  render() {
    return (
      <div>
        <Row>
          <h3>
            Here is the daily summary.
          </h3>
        </Row>
        <Row>
            <ResponsiveContainer minWidth={320} minHeight={400} >
              <LineChart data={this.props.data}
                margin={{top: 5, right: 0, left: 0, bottom: 5}}>
                <XAxis dataKey="date"/>
                <YAxis/>
                <CartesianGrid strokeDasharray="3 3"/>
                <Tooltip/>
                <Line type="monotone" name={this.state.dataName} dataKey={this.state.dataKey}
                  stroke="#26a69a" activeDot={{r: 8}} unit=' hr'/>
                <Brush dataKey='date' height={30} stroke="#26a69a"/>
              </LineChart>
            </ResponsiveContainer>
            <Dropdown trigger={<Button>{this.state.dataName}</Button>}>
              <NavItem onClick={() => (this.chooseData('Daily Total Hours in Meetings'))}>
                Daily Total Hours in Meetings
              </NavItem>
              <NavItem divider />
              <NavItem onClick={() => (this.chooseData('Daily Total Meeting Count'))}>
                Daily Total Meeting Count
              </NavItem>
              <NavItem divider />
              <NavItem onClick={() => (this.chooseData('Daily Average Hours per Meeting'))}>
                Daily Average Hours per Meeting
              </NavItem>
            </Dropdown>
        </Row>
      </div>
    )
  }
}

DailyLineChart.propTypes = {
  data: PropTypes.array.isRequired
}

export default DailyLineChart
