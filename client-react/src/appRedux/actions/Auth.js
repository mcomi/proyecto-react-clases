import {
  FETCH_ERROR,
  FETCH_START,
  FETCH_SUCCESS,
  INIT_URL,
  SIGNOUT_USER_SUCCESS,
  USER_DATA,
  USER_TOKEN_SET,
  SHOW_MESSAGE,
} from '../../constants/ActionTypes'
import {apiCRM} from 'util/Api'
import {
  onLayoutTypeChange,
  onNavStyleChange,
  setThemeType,
} from 'appRedux/actions/Setting'
export const setInitUrl = url => {
  return {
    type: INIT_URL,
    payload: url,
  }
}

export const userSignUp = ({email, password, name, username}) => {
  console.log(email, password)
  return dispatch => {
    dispatch({type: FETCH_START})
    apiCRM
      .post('/signup', {
        email: email,
        password: password,
        name: name,
        username: username,
        roles: ['ADMIN'],
      })
      .then(({data}) => {
        console.log('data:', data)
        if (data.ok) {
          dispatch({
            type: SHOW_MESSAGE,
            payload: 'Registro exitoso',
          })
        } else {
          console.log('payload: data.error', data.error)
          dispatch({type: FETCH_ERROR, payload: 'Network Error'})
        }
      })
      .catch(function(error) {
        dispatch({type: FETCH_ERROR, payload: error.message})
        console.log('Error****:', error.message)
      })
  }
}

export const userSignIn = ({email, password}) => {
  return dispatch => {
    dispatch({type: FETCH_START})
    apiCRM
      .post('/login', {
        email: email,
        password: password,
      })
      .then(({data}) => {
        console.log('userSignIn: ', data)
        if (data.auth) {
          localStorage.setItem('token', JSON.stringify(data.accessToken))
          apiCRM.defaults.headers.common['access-token'] = data.accessToken
          dispatch({type: FETCH_SUCCESS})
          dispatch({type: USER_TOKEN_SET, payload: data.accessToken})
          dispatch()
        } else {
          dispatch({type: FETCH_ERROR, payload: data.error})
        }
      })
      .catch(function(error) {
        dispatch({type: FETCH_ERROR, payload: error.message})
        console.log('Error****:', error.message)
      })
  }
}

export const getUser = () => {
  return dispatch => {
    dispatch({type: FETCH_START})
    apiCRM
      .post('/me')
      .then(({data}) => {
        console.log('userSignIn: ', data)
        if (data.user) {
          dispatch({type: FETCH_SUCCESS})
          dispatch({type: USER_DATA, payload: data.user})
        } else {
          dispatch({type: FETCH_ERROR, payload: data.error})
        }
      })
      .catch(function(error) {
        dispatch({type: FETCH_ERROR, payload: error.message})
        console.log('Error****:', error.message)
      })
  }
}

export const userSignOut = () => {
  return dispatch => {
    dispatch({type: FETCH_START})
    setTimeout(() => {
      localStorage.removeItem('token')
      dispatch({type: FETCH_SUCCESS})
      dispatch({type: SIGNOUT_USER_SUCCESS})
    }, 2000)
  }
}
