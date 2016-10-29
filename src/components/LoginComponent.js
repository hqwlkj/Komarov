'use strict';

import React from 'react';
import { Form, Button, notification } from 'antd';
import Foooter from './FooterComponent';
import Header from './HeaderComponent';
import MiniLogin from './MiniLoginComponent';
import Console from '../Console';
import Config from 'config';
import request from '../Request';
import SS from  'parsec-ss';

require('styles//Login.less');

class LoginComponent extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      errormsg:''
    }
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    this.login = this.login.bind(this);
  }
  componentWillReceiveProps(){
    MiniLogin.hide();
  }
  componentWillMount(){
    MiniLogin.hide();
  }

  handleLoginSubmit(){
    this.props.form.validateFieldsAndScroll((errors, values) => {
      if (!!errors) {
        for (let key in errors) {
          notification['error']({
            duration:3,
            message: errors[key]["errors"][0]["message"]
          });
          this.setState({
            errormsg: errors[key]["errors"][0]["message"]
          });
          Console.log(errors[key]["errors"][0]["message"]);
          return;
        }
      }
      this.login(values);
    });
  }
  login(values) {
    request({
      type: 'post',
      url: Config.host + '/login',
      data: {
        username:values.username,
        password:values.password
      },
      success: (data)=> {
        Console.log(data);
        SS.set(Config.token, data.token);
        window.location.href = "#/?";
      },
      error: (data)=> {
        notification['error']({
          duration:3,
          message: data.message
        });
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
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
                  {getFieldDecorator('username', {
                    rules: [
                      { required: true, message: '请输入正确的用户名/手机/邮箱', type: 'string'},
                    ],
                  })(
                    <input id="username" name="username" type="text" placeholder="用户名/手机/邮箱" autoComplete="off" />
                  )}
                </div>
                <div className="account-input-area">
                  {getFieldDecorator('password', {
                    rules: [
                      { required: true,  pattern: /\S{6,18}/, message: "密码长度为6~18位",type: 'string'},
                    ],
                  })(
                    <input id="password" name="password" type="password" placeholder="密码" autoComplete="off"/>
                  )}
                </div>
                <div className="account-input-area account-captcha hide">
                  <input id="captcha" name="captcha" type="text" placeholder="验证码" className="short" autoComplete="off"/>
                  <img className="captcha" alt="验证码" src="https://coding.net/api/getCaptcha?code=0.4359082529552596" />
                </div>
                <div className="check-box">
                  <input id="remember_me" name="remember_me" type="checkbox" />
                  <label htmlFor="remember_me"></label>
                  <span>记住我</span>
                  <a href="javaScript:void(0)" className="reset-password-href">找回密码</a>
                </div>
                <Button className="account-button login-btn" type="button" onClick={()=>{this.handleLoginSubmit()}}><span>登录</span></Button>
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
