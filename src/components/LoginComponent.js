'use strict';

import React from 'react';
import { Form, Button } from 'antd';
import Foooter from './FooterComponent';
import Header from './HeaderComponent';
import MiniLogin from './MiniLoginComponent';

require('styles//Login.less');

class LoginComponent extends React.Component {
  constructor(props){
    super(props);
    this.state = {

    }
  }
  componentWillReceiveProps(){
    MiniLogin.hide();
  }
  componentWillMount(){
    MiniLogin.hide();
  }
  render() {
    return (
      <div className="login-component">
        <Header />
        <div className="content-wrapper">
          <div className="account-box-wrapper">
            <div className="account-box">
              <Form horizontal >
                <div className="account-form-title">
                  <label htmlFor="">账号登录</label>
                </div>
                <div className="account-input-area">
                  <input id="account" name="account" type="text" placeholder="用户名/手机/邮箱" autoComplete="off" />
                </div>
                <div className="account-input-area">
                  <input id="password" name="password" type="password" placeholder="密码" autoComplete="off"/>
                </div>
                <div className="account-input-area account-captcha">
                  <input id="captcha" name="captcha" type="text" placeholder="验证码" className="short" autoComplete="off"/>
                  <img className="captcha" alt="验证码" src="https://coding.net/api/getCaptcha?code=0.4359082529552596" />
                </div>
                <div className="check-box">
                  <input id="remember_me" name="remember_me" type="checkbox" />
                  <label htmlFor="remember_me"></label>
                  <span>记住我</span>
                  <a href="javaScript:void(0)" className="reset-password-href">找回密码</a>
                </div>
                <Button className="account-button login-btn" type="button"><span>登录</span></Button>
              </Form>
            </div>
          </div>
        </div>
        <Foooter/>
      </div>
    );
  }
}

LoginComponent.displayName = 'LoginComponent';
LoginComponent = Form.create()(LoginComponent);

// Uncomment properties you need
// LoginComponent.propTypes = {};
// LoginComponent.defaultProps = {};

export default LoginComponent;
