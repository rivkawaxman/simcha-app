import * as React from 'react';
import Header from './Header';
import Home from './Home';
import Simchas from './Simchas/Simchas';
import Contributors from './Contributors/Contributors'
import * as Router from 'react-router-dom';


class App extends React.Component<{}, null> {
  render() {
    return (
      <Router.BrowserRouter>
        <div>
          <Header />
          <Router.Switch>
            <Router.Route exact path="/" component={Home} />
            <Router.Route path="/simchas" component={Simchas} />
            <Router.Route path="/contributors" component={Contributors} />
          </Router.Switch>
        </div>
      </Router.BrowserRouter>
    );
  }
}

export default App;
