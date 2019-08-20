import React, {Component} from 'react'
import {connect} from 'react-redux'
import URLSearchParams from 'url-search-params'
import {Redirect, Route, Switch} from 'react-router-dom'
import {LocaleProvider} from 'antd'
import {IntlProvider} from 'react-intl'

import AppLocale from 'lngProvider'
import MainApp from './MainApp'
import SignIn from '../SignIn'
import SignUp from '../SignUp'
import {setInitUrl} from 'appRedux/actions/Auth'
import {
  onLayoutTypeChange,
  onNavStyleChange,
  setThemeType,
} from 'appRedux/actions/Setting'
import axios from 'util/Api'

import {
  LAYOUT_TYPE_BOXED,
  LAYOUT_TYPE_FRAMED,
  LAYOUT_TYPE_FULL,
  NAV_STYLE_ABOVE_HEADER,
  NAV_STYLE_BELOW_HEADER,
  NAV_STYLE_DARK_HORIZONTAL,
  NAV_STYLE_DEFAULT_HORIZONTAL,
  NAV_STYLE_INSIDE_HEADER_HORIZONTAL,
  THEME_TYPE_DARK,
} from '../../constants/ThemeSetting'
import {getUser, getSettings} from '../../appRedux/actions/Auth'

const RestrictedRoute = ({component: Component, token, ...rest}) => (
  <Route
    {...rest}
    render={props =>
      token ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/signin',
            state: {from: props.location},
          }}
        />
      )
    }
  />
)

class App extends Component {
  setLayoutType = layoutType => {
    if (layoutType === LAYOUT_TYPE_FULL) {
      document.body.classList.remove('boxed-layout')
      document.body.classList.remove('framed-layout')
      document.body.classList.add('full-layout')
    } else if (layoutType === LAYOUT_TYPE_BOXED) {
      document.body.classList.remove('full-layout')
      document.body.classList.remove('framed-layout')
      document.body.classList.add('boxed-layout')
    } else if (layoutType === LAYOUT_TYPE_FRAMED) {
      document.body.classList.remove('boxed-layout')
      document.body.classList.remove('full-layout')
      document.body.classList.add('framed-layout')
    }
  }

  setNavStyle = navStyle => {
    if (
      navStyle === NAV_STYLE_DEFAULT_HORIZONTAL ||
      navStyle === NAV_STYLE_DARK_HORIZONTAL ||
      navStyle === NAV_STYLE_INSIDE_HEADER_HORIZONTAL ||
      navStyle === NAV_STYLE_ABOVE_HEADER ||
      navStyle === NAV_STYLE_BELOW_HEADER
    ) {
      document.body.classList.add('full-scroll')
      document.body.classList.add('horizontal-layout')
    } else {
      document.body.classList.remove('full-scroll')
      document.body.classList.remove('horizontal-layout')
    }
  }

  componentWillMount() {
    if (this.props.initURL === '') {
      this.props.setInitUrl(this.props.history.location.pathname)
    }
    const params = new URLSearchParams(this.props.location.search)
    if (params.has('theme')) {
      this.props.setThemeType(params.get('theme'))
    }
    if (params.has('nav-style')) {
      this.props.onNavStyleChange(params.get('nav-style'))
    }
    if (params.has('layout-type')) {
      this.props.onLayoutTypeChange(params.get('layout-type'))
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.token) {
      axios.defaults.headers.common['access-token'] = nextProps.token
    }
    if (nextProps.token && !nextProps.authUser) {
      this.props.getUser()
      this.props.getSettings()
    }
  }

  render() {
    const {
      match,
      location,
      themeType,
      layoutType,
      navStyle,
      locale,
      token,
      initURL,
    } = this.props
    if (themeType === THEME_TYPE_DARK) {
      document.body.classList.add('dark-theme')
    }
    if (location.pathname === '/') {
      if (token === null) {
        return <Redirect to={'/signin'} />
      } else if (initURL === '' || initURL === '/' || initURL === '/signin') {
        return <Redirect to={'/sample'} />
      } else {
        return <Redirect to={initURL} />
      }
    }
    this.setLayoutType(layoutType)

    this.setNavStyle(navStyle)

    const currentAppLocale = AppLocale[locale.locale]
    return (
      <LocaleProvider locale={currentAppLocale.antd}>
        <IntlProvider
          locale={currentAppLocale.locale}
          messages={currentAppLocale.messages}
        >
          <Switch>
            <Route exact path='/signin' component={SignIn} />
            <Route exact path='/signup' component={SignUp} />
            <RestrictedRoute
              path={`${match.url}`}
              token={token}
              component={MainApp}
            />
          </Switch>
        </IntlProvider>
      </LocaleProvider>
    )
  }
}

const mapStateToProps = ({settings, auth}) => {
  const {locale, navStyle, themeType, layoutType} = settings
  const {authUser, token, initURL} = auth
  return {locale, token, navStyle, themeType, layoutType, authUser, initURL}
}
export default connect(
  mapStateToProps,
  {
    setInitUrl,
    getUser,
    getSettings,
    setThemeType,
    onNavStyleChange,
    onLayoutTypeChange,
  },
)(App)
