// gapi is loaded before the bundle.js as an external dependancy
export const INIT_USER_CLIENT = 'INIT_USER_CLIENT'
export const SIGN_IN_USER = 'SIGN_IN_USER'
export const COMPLETE_SIGN_IN = 'COMPLETE_SIGN_IN'
export const SIGN_OUT_USER = 'SIGN_OUT_USER'
export const IMPORT_CALENDAR = 'IMPORT_CALENDAR'
export const CLEAR_CALENDAR = 'CLEAR_CALENDAR'
export const UPDATE_CALENDAR_MIN = 'UPDATE_CALENDAR_MIN'
export const SHARE_RESULT = 'SHARE_RESULT'

export const InitUserClient = (isSignedIn) => {
  return {
    type: INIT_USER_CLIENT,
    isSignedIn
  }
}

export const SignInUser = () => {
  return {
    type: SIGN_IN_USER
  }
}

export const CompleteSignIn = () => {
  return {
    type: COMPLETE_SIGN_IN
  }
}

export const SignOutUser = () => {
  return {
    type: SIGN_OUT_USER
  }
}

export const ImportCalendar = (allEvents, isLoaded) => {
  return {
    type: IMPORT_CALENDAR,
    allEvents,
    isLoaded
  }
}

export const ClearCalendar = () => {
  return {
    type: CLEAR_CALENDAR
  }
}

export const UpdateCalanderMin = (timeMin) => {
  return {
    type: UPDATE_CALENDAR_MIN,
    payload:{
      timeMin
    }
  }
}

export const ShareResult = (snsType) => {
  return {
    type: SHARE_RESULT,
    payload:{
      snsType
    }
  }
}

export function AuthInit() {
  return dispatch => {
    gapi.load('client:auth2', () => {
      gapi.client.init({
        discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"],
        clientId: '26806576869-c73i9b2v985rp2hfbkg3oqgs00ush20b.apps.googleusercontent.com',
        scope: "https://www.googleapis.com/auth/calendar.readonly"
      }).then(()=>{
        if (gapi.auth2.getAuthInstance().isSignedIn.get()){
          dispatch(ImportCalendarRequest())
        }
        return dispatch(InitUserClient(gapi.auth2.getAuthInstance().isSignedIn.get()))
      })
      }
    )
  }
}

export function AuthControl(isSignedIn) {
  return dispatch => {
    if (isSignedIn) {
      return SignOut(dispatch)
    } else {
      return SignIn(dispatch)
    }
  }
}

function SignIn(dispatch) {
  gapi.auth2.getAuthInstance().signIn()
  gapi.auth2.getAuthInstance().isSignedIn.get()
  return dispatch(SignInUser())
}

function SignOut(dispatch) {
  gapi.auth2.getAuthInstance().signOut()
  return dispatch(SignOutUser())
}

export function ImportCalendarRequest() {
  return dispatch => {
    var timeMin = new Date()
    timeMin.setHours(0,0,0,0)
    timeMin.setMonth(timeMin.getMonth() - 3)
    var timeMax = new Date()
    timeMax.setHours(0,0,0,0)
    while (timeMax.getDay() !== 0) {
      timeMax.setDate(timeMax.getDate() + 1)
    }
    timeMax.setDate(timeMax.getDate() + 7)
    gapi.client.calendar.events.list(
      {
        'calendarId': 'primary',
        'timeMax': timeMax.toISOString(),
        'timeMin': timeMin.toISOString(),
        'showDeleted': false,
        'singleEvents': true,
        'maxResults': 10000,
        'orderBy': 'startTime'
      }
    ).then(
      response => {
        return dispatch(ImportCalendar(response.result.items, true))
      }
    )
  }
}
