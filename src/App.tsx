import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'

import QuizPage from './pages/QuizPage'
import Home from './pages/Home'

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path={'/quizzes/:id'} key={uuidv4()}>
          <QuizPage />
        </Route>
        <Route path='/'>
          <Home />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
