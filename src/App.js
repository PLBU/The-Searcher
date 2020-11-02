import * as React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

// importing pages
import Home from './pages/home'
import How from './pages/how'
import AboutUs from './pages/aboutus'

//importing components
import Nav from './components/Nav'

// importing styling
import './assets/css/App.css'

export default () => {
  return (
      <Router>
        <Nav/>
        <div className="header">
          <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/how" component={How} />
              <Route path="/about-us" component={AboutUs} />
            </Switch>
        </div>
      </Router>
  )
}