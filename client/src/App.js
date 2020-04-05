import React , { Component } from 'react';
import './App.css';
import { BrowserRouter , Switch , Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store/store';

import Home from './components/Home';
import Select from './components/Select';
import Outlet from './components/Outlet';
import User from './components/User';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Purchase from './components/Purchase';
import Admin from './components/Admin';

class App extends Component {
  render(){
    return(
      <Provider store={store}>
        <BrowserRouter>
          <div className="container-fluid">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/admin" component={Admin} />
              <Route exact path="/select" component={Select} />
              <Route path="/select/:outlet" component={Outlet} />
              <Route exact path="/user" component={User} />
              <Route exact path="/user/register" component={Register} />
              <Route exact path="/user/login" component={Login} />
              <Route path="/dashboard/:user" component={Dashboard} />
              <Route exact path="/purchase" component={Purchase} />
            </Switch>
          </div>
        </BrowserRouter>
      </Provider>
    )
  }
};

export default App;
