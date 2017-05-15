import * as React from 'react';
import Header from './Header';
import Home from './Home';
import Simchas from './Simchas/Simchas';
import Contributors from './Contributors/Contributors';
import Login from './login/Login';
import Register from './login/Register';
import MyAccount from './login/MyAccount';
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
             <Router.Route path="/login" component={Login} />
             <Router.Route path="/register" component={Register} /> 
             <Router.Route path="/account" component={MyAccount} /> 
          </Router.Switch>
        </div>
      </Router.BrowserRouter>
    );
  }
}

export default App;
