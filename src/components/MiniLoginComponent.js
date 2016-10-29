'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import {Button, Form, Row, Col, Icon} from 'antd';
import Console from '../Console';
import Config from 'config';
import request from '../Request';
import SS from  'parsec-ss';

require('styles//MiniLogin.less');

let id = 'id' + Date.now().toString(16);
let instance;


class MiniLoginComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true,
      errormsg:'',
      passwordShowType: 'hide'
    }
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    this.closeLoginWindow = this.closeLoginWindow.bind(this);
    this.login = this.login.bind(this);
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
    this.props.form.validateFieldsAndScroll((errors, values) => {
      if (!!errors) {
        for (let key in errors) {
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
        this.setState({
          errormsg: '',
          visible:false
        });
        if(typeof  this.props.onLogin === 'function'){
          this.props.onLogin();
        }
      },
      error: (data)=> {
        this.setState({
          errormsg:  data.message
        });
      }
    });
  }

  closeLoginWindow(){
    this.setState({
      visible:false
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <div className="minilogin-component" style={{display: this.state.visible ? 'block' : 'none'}}>
        <div className="mini-login-modal">
          <div className="mini-login-modal-content">
            <Button shape="circle-outline" className="mini-login-modal-close" onClick={()=>{this.closeLoginWindow()}}><i className="iconfont">&#xe608;</i></Button>
            <div className="mini-login-modal-header">
              <div className="mini-login-modal-title">账户登录</div>
            </div>
            <div className="mini-login-modal-body">
              <div className={this.state.errormsg === '' ? 'mini-msg error hide' : 'mini-msg error'}><i className="iconfont">&#xe60a;</i>{this.state.errormsg}</div>
              <div className="login-form">
                <div className="item username">
                  <i className="iconfont">&#xe609;</i>
                  {getFieldDecorator('username', {
                    rules: [
                      { required: true, pattern: new RegExp(Config.validateRegExp.tel), message: '请输入正确的手机号码', type: 'string'},
                    ],
                  })(
                    <input id="username" name="username" type="text" placeholder="手机号码" autoComplete="off" />
                  )}
                </div>
                <div className="item password">
                  <i className="iconfont">&#xe607;</i>
                  {getFieldDecorator('password', {
                    rules: [
                      { required: true,  pattern: /\S{6,18}/, message: "密码长度为6~18位",type: 'string'},
                    ],
                  })(
                    <input id="password" name="password" type="password" placeholder="密码" autoComplete="off"/>
                  )}
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
