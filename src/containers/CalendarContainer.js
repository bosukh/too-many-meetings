'use strict'

import { connect } from 'react-redux'
import { AuthControl } from '../actions/actions'
import CalendarResult from '../components/CalendarResult'

const mapDispatchToProps = (dispatch) => {
  return {
    SignInClick: (isSignedIn) => {
      dispatch(AuthControl(isSignedIn))
    },
    SignOutClick: (isSignedIn) => {
      dispatch(AuthControl(isSignedIn))
    }
  }
}

const mapStateToProps = (state) => {
  var events = state.Calendar.allEvents || []
  // filter and map events
  events = events.filter((event)=>{
    var invitationAccepted = true
    if (event.attendees) { // If user was invited, only include the events user accepted.
      invitationAccepted = event.attendees.filter((attendee)=>{
        return attendee.self == true
      })[0].responseStatus === 'accepted'
    }
    return event.end.dateTime !== undefined  & // If event is allday (in date, not datetime), it must not be a meeting.
      event.status === "confirmed" & invitationAccepted
  }).map((event) => {
    const date = (new Date(event.start.dateTime)).setHours(0,0,0,0)
    const duration = (new Date(event.end.dateTime) - new Date(event.start.dateTime))/(1000*60*60)
    const attendees = event.attendees ?
      event.attendees.filter((attendee)=>{
        return attendee.self !== true
          & attendee.resource !== true & attendee.responseStatus === 'accepted'
      }) : []
    return {date, duration, attendees}
  })
  // filter and create array for events in the next week.
  var nextTimeMin = new Date()
  nextTimeMin.setHours(0,0,0,0)
  while (nextTimeMin.getDay() !== 0) {
    nextTimeMin.setDate(nextTimeMin.getDate() + 1)
  }
  nextTimeMin.setDate(nextTimeMin.getDate() + 1)
  var nextWeekEvents = events.filter((event)=>{
    return nextTimeMin <= event.date
  })
  events = events.filter((event)=>{
    return nextTimeMin > event.date
  })

  var byAttendee = [] // Calculate an array with Aggregate data by attendee
  var dailyAggregatedEvents = [] // Calculate daily aggregate
  events.reduce(function (res, event) {
    // Reduce to aggregate data by Attendee
    if (event.attendees){
      for (let attendee of event.attendees){
        var name = attendee.displayName ?
                    attendee.displayName + ', '+ attendee.email :
                    attendee.email || ''
        if (!res[name]) {
          res[name]  = {
            name,
            totalHours: 0,
            totalNum: 0
          }
        }
        byAttendee.push(res[name])
        res[name].totalHours += event.duration
        res[name].totalNum += 1
      }
    }
    // Reduce for Daily aggregate events
    if (!res[event.date]) {
        res[event.date] = {
            date: (new Date(event.date)).toDateString(),
            totalHours: 0,
            totalNum: 0,
            attendees: []
        };
        dailyAggregatedEvents.push(res[event.date])
    }
    res[event.date].totalHours += event.duration
    res[event.date].totalNum += 1
    return res;
  }, {})
  byAttendee = byAttendee.map((attendee)=>{
    attendee.avgHourPerEvent = attendee.totalHours/attendee.totalNum
    return attendee
  })
  dailyAggregatedEvents = dailyAggregatedEvents.map((event)=>{
    event.avgHourPerEvent = event.totalHours/event.totalNum
    return event
  })

  // Calculate total workdays during the time range of interest
  var timeMin = new Date()
  timeMin.setMonth(timeMin.getMonth() - 3)
  timeMin.setHours(0,0,0,0)
  var timeMax = new Date()
  timeMax.setHours(0,0,0,0)
  while (timeMin.getDay() === 0 || timeMin.getDay() === 6) {
    timeMin.setDate(timeMin.getDate() + 1)
  }
  while (timeMax.getDay() === 0 || timeMax.getDay() === 6) {
    timeMax.setDate(timeMax.getDate() - 1)
  }
  var days = parseInt((timeMax - timeMin)/(1000*60*60*24) + 0.05) // to offset daylight saving
  const totalWeeks = parseInt(days/7)
  const workDays = days - totalWeeks * 2

  const totalHours = events.reduce(function(acc, event) {
    return acc + event.duration
  }, 0)
  const totalMeetings = events.length

  return Object.assign({}, state.Calendar, {
    nextWeekEvents,
    byAttendee,
    totalHours,
    totalMeetings,
    dailyAggregatedEvents,
    workDays,
    totalWeeks})
}

const CalendarContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CalendarResult)

export default CalendarContainer
