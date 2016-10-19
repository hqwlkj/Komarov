require('normalize.css/normalize.css');
require('styles/App.less');

import React from 'react';
import {Row, Col} from 'antd';
import SS from 'parsec-ss';

import Foooter from './FooterComponent';
import Header from './HeaderComponent';


import Config from 'config';
let yeomanImage = require('../images/yeoman.png');

class AppComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false
    }
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin(isLogin) {
    this.setState({isLogin});
  }
  isLogin(){
    return this.state.isLogin;
  }

  render() {
    return (
      <div className="container">
        <Header />
        <div className="content-wrapper">
          {this.props.children}
        </div>
        <Foooter/>
      </div>
    );
  }
}

AppComponent.defaultProps = {};

export default AppComponent;
