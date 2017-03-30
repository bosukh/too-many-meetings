# Too Many Meetings

See the live version on [https://too-many-meetings.herokuapp.com](https://too-many-meetings.herokuapp.com).

This is a side project I built to learn React and Redux.
It will import Google Calendar and do little analysis on the past meetings you attended.
I got this idea by seeing some of my co-workers are rarely on their seats due to overwhelming number of meetings.

When counting the calendar events as meetings, I consider the followings.
- Event is created/organized by you, then it is a meeting.
- If you are invited, then it is a meeting only if you've accepted.
- Day-long events must not be the meetings.
- Event has to be confirmed.
- Event is on the weekday.

ToDos
- Exclude events outside of normal work hours, or partially count.
- Add onClick event triggered table next to daily summary plot to show details
- Add onClick event triggered table next to scatter plot to show details
- Add more text and visualization to NextWeek Section
- Add a demo for user to see before login.
