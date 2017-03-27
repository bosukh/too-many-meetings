# Too Many Meetings

See the live version on [https://too-many-meetings.appspot.com/](https://too-many-meetings.appspot.com/).

This is a side project I built to learn React and Redux.
It will import Google Calendar and do little analysis on the past meetings you attended.
I got this idea by seeing some of my co-workers are rarely on their seats due to overwhelming number of meetings.

When counting the calendar events as meetings, I consider the followings.
- Event is created/organized by you, then it is a meeting.
- If you are invited, then it is a meeting only if you've accepted.
- Day-long events must not be the meetings.
- Event has to be confirmed.
