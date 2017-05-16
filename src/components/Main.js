require('normalize.css/normalize.css');
require('styles/App.less');

import React from 'react';
import Foooter from './FooterComponent';
import Header from './HeaderComponent';
import SideBar from './SideBarComponent';

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
        <SideBar />
      </div>
    );
  }
}

AppComponent.defaultProps = {};

export default AppComponent;
