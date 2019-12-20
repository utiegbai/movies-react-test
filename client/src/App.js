import React from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom'
import './App.css';

import Home from './pages/Home.js'
import Watchlist from './pages/Watchlist.js'
import Show from './pages/Show'
import { Provider } from './context';

function App() {
  return (
    <Provider>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/watchlist" exact component={Watchlist} />
          <Route path="/shows/:id" exact component={Show} />
          <Route path="/" render={() => (
            <h1 className="text-center text-3xl">404</h1>
          )} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
