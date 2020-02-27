import React from 'react';
import './App.css';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import BoggleProvider from './state/boggleContext';
import Home from './pages/Home';
import Game from './pages/Game';
import GameEnd from './pages/GameEnd';
import * as routes from './constants/routeConstants';

function App() {
  return (
    <BoggleProvider>
      <BrowserRouter>
        <Switch>
          <Route path={routes.HOME} component={Home} exact />
          <Route path={routes.GAME} component={Game} exact />
          <Route path={routes.GAME_END} component={GameEnd} exact />
        </Switch>
      </BrowserRouter>
    </BoggleProvider>
  );
}

export default App;
