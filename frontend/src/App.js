import React, { Component } from 'react';
import Header from './Header';
import Home from './Home';
import Simchas from './Simchas';
import Contributors from './Contributors'
import Router from 'react-router/BrowserRouter';
import Match from 'react-router/Match';
import Link from 'react-router/Link';


class App extends Component {
  render() {
     return (
      <Router>
        <div>
          <Header/>

            <Match exactly pattern="/" component={Home} />
            <Match exactly pattern="/simchas" component={Simchas} />   
              <Match exactly pattern="/contributors" component={Contributors} />    
                
        </div>
      </Router>
    );
  }
}

export default App;