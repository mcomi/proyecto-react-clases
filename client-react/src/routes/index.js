import React from 'react'
import {Route, Switch} from 'react-router-dom'

import asyncComponent from 'util/asyncComponent'

const App = ({match}) => (
  <div className='gx-main-content-wrapper'>
    <Switch>
      <Route
        path={`${match.url}sample`}
        component={asyncComponent(() => import('./SamplePage'))}
      />
      <Route
        path={`${match.url}advisor/:username`}
        component={asyncComponent(() => import('./Perfil'))}
      />
      <Route
        path={`${match.url}inicio`}
        component={asyncComponent(() => import('./Inicio'))}
      />
      <Route
        path={`${match.url}perfil`}
        component={asyncComponent(() => import('./Perfil'))}
      />
    </Switch>
  </div>
)

export default App
