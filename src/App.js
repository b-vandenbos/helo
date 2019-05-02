import React from 'react';
import './App.css';
import {HashRouter} from 'react-router-dom';
import routes from './routes';
import Nav from './components/Nav/Nav';

function App() {
    return (
      <HashRouter>
        <div className="App">
          <Nav />
          {routes}
        </div>
      </HashRouter>
    );
}

export default App;
