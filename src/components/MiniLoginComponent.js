'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import {Button, Form, Row, Col, Icon} from 'antd';
import Config from 'config';

require('styles//MiniLogin.less');

let id = 'id' + Date.now().toString(16);
let instance;


class MiniLoginComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true,
      passwordShowType: 'hide'
    }
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    instance = this;
  }

  doProps(props) {
    this.setState({
    });
  }

  componentWillReceiveProps(nextProps) {
    this.doProps(nextProps);
  }

  componentWillMount() {
    this.doProps(this.props);
  }

  handleEye(passwordShowType) {
    this.setState({passwordShowType: passwordShowType});
  }


  //登录
  handleLoginSubmit() {
    if(typeof  this.props.onLogin === 'function'){
      this.props.onLogin();
    }
  }

  render() {
    let {getFieldDecorator} = this.props.form;
    let values = this.props.form.getFieldsValue();

    return (
      <div className="minilogin-component" style={{display: this.state.visible ? 'block' : 'none'}}>
        <div className="mini-login-modal">
          <div className="mini-login-modal-content">
            <Button shape="circle-outline" className="mini-login-modal-close"><i className="iconfont">&#xe608;</i></Button>
            <div className="mini-login-modal-header">
              <div className="mini-login-modal-title">账户登录</div>
            </div>
            <div className="mini-login-modal-body">
              <div className="mini-msg error hide"><i className="iconfont">&#xe60a;</i>这里是提示信息,默认要是隐藏的哦</div>
              <div className="login-form">
                <div className="item username">
                  <i className="iconfont">&#xe609;</i>
                  <input type="text" {...getFieldDecorator("username", {
                    rules: [{
                      type: "string",
                      required: true,
                      pattern: new RegExp(Config.validateRegExp.tel),
                      message: "手机号格式不正确"
                    }]
                  })} placeholder="手机号"/>

                </div>
                <div className="item password">
                  <i className="iconfont">&#xe607;</i>
                  <input
                    type={this.state.passwordShowType == 'show' ? 'text' : 'password'} {...getFieldDecorator("password", {
                    rules: [{type: "string", required: true, pattern: /\S+/, message: "密码格式不正确"}]
                  })} placeholder="密码"/>
                  {!!values.password &&
                  <Icon type="eye" onMouseEnter={()=> {
                    this.handleEye('show')
                  }} onMouseOut={()=> {
                    this.handleEye('hide')
                  }}/>
                  }
                </div>
                <div className="item">
                  <Button type="primary" className="login-btn" onClick={()=> {
                    this.handleLoginSubmit()
                  }}>登录</Button>
                </div>
                <div className="item login-links">
                  <a href="#/register">免费注册</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

MiniLoginComponent.displayName = 'MiniLoginComponent';
MiniLoginComponent = Form.create()(MiniLoginComponent);

// Uncomment properties you need
// MiniLoginComponent.propTypes = {
//   visible: React.PropTypes.bool,
//   onIsLogin:React.PropTypes.func
// };
// MiniLoginComponent.defaultProps = {};


export default {
  show: (callback)=> {
    let elem = document.querySelector('#' + id);
    if (!elem) {
      let elem = document.createElement('div');
      elem.setAttribute('id', id);
      document.querySelector('#app').appendChild(elem);
      ReactDOM.render(<MiniLoginComponent onLogin={callback}/>, document.getElementById(id));
    }
    if(!!instance){
      instance.setState({visible:true});
    }
  },
  hide: ()=> {
    if(!!instance){
      instance.setState({visible:false});
    }
  }
}
