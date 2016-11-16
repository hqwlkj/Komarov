'use strict';

import React from 'react';
import {Dropdown, Menu, Badge, Icon, Modal} from 'antd';
import SS from  'parsec-ss';
import LS from  'parsec-ls';
import Config from 'config';
import Console from '../Console';
import request from '../Request';

require('styles//Header.less');
let logo = require('../images/loading.png');

class HeaderComponent extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isLogin: false,
      msgCount: 0,
      msgData: [],
      userData:{}
    }
    this.initUi = this.initUi.bind(this);
    this.loadData = this.loadData.bind(this);
    this.loginOut = this.loginOut.bind(this);
  }

  componentWillMount() {
    this.initUi();
  }

  initUi() {
    if (SS.get(Config.token) == null) {
      this.setState({
        isLogin: false
      })
    } else {
      this.loadData();
      this.setState({
        isLogin: true
      });
    }
  }


  loadData() {
    request({
      type:'get',
      url:Config.host + '/people/info',
      data:{},
      success:(data)=>{
        if(data.code === 1 ){
          location.href = '#/login';
          return;
        }
        this.setState({
          userData:data
        });
      }
    });
  }

  loginOut() {
    Modal.confirm({
      title: '您是否确认要退出系统',
      content: '',
      onOk() {
        SS.clear();
        LS.clear();
        window.location.href = '#/login';
      },
      onCancel() {
      }
    });
  }
  render() {

    return (
      <div className="header-component">
        <div className="content">
          <div className="header">
            <a href="http://www.parsec.com.cn">
              <img src={logo} alt="秒差距码市" className="logo-image"/>
            </a>
            <ul className="nav">
              <li>
                <a href="#/">首页</a>
              </li>
            </ul>
            <div className="right-zone">
              <div className={this.state.isLogin ? 'login-zone hide' : 'login-zone'}>
                <div className="btns">
                  <a href="#/login" className="button">登录</a>
                  <a href="#/register" className="button hide">注册</a>
                </div>
              </div>
              <div className={this.state.isLogin ? 'user-avatar' : 'hide user-avatar'}>
                <div className='nav-user'>
                  <Dropdown
                    getPopupContainer={()=>document.querySelector('.nav-user')}
                    overlay={(
                      <Menu className='nav-dropdown-menu'>
                        <Menu.Item className="nav-dropdown-menu-item">
                          <span>欢迎您,</span>
                          <span>{this.state.userData === null ? '我是默认的' : this.state.userData.username}</span>
                        </Menu.Item>
                        <Menu.Item className="hide"><a href='#/user/center'><i className="iconfont">&#xe611;</i>&nbsp;&nbsp;个人中心</a></Menu.Item>
                        <Menu.Item><a href='#/user/projects'><i className="iconfont">&#xe65e;</i>&nbsp;&nbsp;我的项目</a></Menu.Item>
                        <Menu.Item className="hide"><a href='#/password/setting'><i className="iconfont">&#xe612;</i>&nbsp;&nbsp;修改密码</a></Menu.Item>
                        <Menu.Divider />
                        <Menu.Item><a target='_blank' onClick={()=> {
                          this.loginOut()
                        }}><i className="iconfont">&#xe610;</i>&nbsp;&nbsp;安全退出</a></Menu.Item>
                      </Menu>
                    )}>
                    <span className='ant-dropdown-link'>
                      <a href="javascript:void(0);" className="avatar-link" target="_self">
                        <img src="https://gitlab.com/uploads/user/avatar/711661/avatar.png" height="40px" />
                      </a>
                      <i className="iconfont">&#xe60f;</i>
                    </span>
                  </Dropdown>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

HeaderComponent.displayName = 'HeaderComponent';

// Uncomment properties you need
// HeaderComponent.propTypes = {};
// HeaderComponent.defaultProps = {};

export default HeaderComponent;
