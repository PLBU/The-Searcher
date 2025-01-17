import * as React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

// importing pages
import Home from './pages/home'
import How from './pages/how'
import AboutUs from './pages/aboutus'
import Upload from './pages/upload'

//importing components
import Nav from './components/Nav'

// importing styling
import './css/main.css'

const App = () => {
  return (
      <Router>
        <Nav/>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/how" component={How} />
          <Route path="/about-us" component={AboutUs} />
          <Route path="/upload" component={Upload} />
        </Switch>
      </Router>
  )
}

export default App