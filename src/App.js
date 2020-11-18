import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import asyncComponent from './hoc/asyncComponent/asyncComponent';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containters/BurgerBuilder/BurgerBuilder';
import Logout from './containters/Auth/Logout/Logout';
import * as actions from './store/actions/index';

const asynCheckout = asyncComponent(() => {
  return import('./containters/Checkout/Checkout')
});

const asynOrders = asyncComponent(() => {
  return import('./containters/Orders/Orders')
});

const asynAuth = asyncComponent(() => {
  return import('./containters/Auth/Auth')
});

class App extends Component {
  componentDidMount () {
    this.props.onTryAutoSignup();
  }

  render () {
    let routes = (
      <Switch>
        <Route path="/auth" component={asynAuth} />
        <Route path="/logout" component={Logout} />
        <Route path="/" exac component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    );

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/checkout" component={asynCheckout} />
          <Route path="/orders" component={asynOrders} />
          <Route path="/auth" component={asynAuth} />
          <Route path="/logout" component={Logout} />
          <Route path="/" exac component={BurgerBuilder} />
          <Redirect to="/" />
      </Switch>
      );
    }
    return (
      <div>
        <Layout>
         {routes}
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
