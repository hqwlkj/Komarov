'use strict';

import React from 'react';
import {Breadcrumb, Button, Form, Input} from 'antd';

require('styles//PwdSetting.less');

class PwdSettingComponent extends React.Component {
  render() {
    return (
      <div className="pwdsetting-component">
        <div className="content">
          <div className="breadcrumb-wrapper">
            <Breadcrumb>
              <Breadcrumb.Item>个人中心</Breadcrumb.Item>
              <Breadcrumb.Item><a href="#/password/setting">修改密码</a></Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <div className="menu">
            <div className="side-nav">
              <ul className="clearfix">
                <li className="side-nav-header border-radius-top">
                  <span className="subtitle">基本信息</span>
                </li>
                <li className="side-nav-item">
                  <a href="#/user/center" className="nav-link">
                    <i className="iconfont">&#xe611;</i>
                    <span>个人信息</span>
                  </a>
                </li>
                <li className="side-nav-item">
                  <a href="#/password/setting" className="nav-link active">
                    <i className="iconfont">&#xe612;</i>
                    <span>修改密码</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="form-container">
            <div className="form-box">
              <h1>修改密码</h1>
              <hr className="head-line"/>
              <div className="item">
                <div className="tip">
                  <span><i className="iconfont">&#xe613;</i>安全提醒：请妥善保管密码！秒差距网工作人员不会以任何理由向您索取密码。</span>
                  <span>标有星号 (*) 的栏目为必填栏目。</span>
                </div>
                <Form horizontal>
                  <div className="form-item">
                    <div className="ds-table">
                      <div className="ds-table-cell">
                        <label htmlFor="">密码 *</label>
                        <Input type='password' className='form-input' placeholder="密码"/>
                      </div>
                      <div className="ds-table-cell">
                      </div>
                    </div>
                  </div>
                  <div className="form-item">
                    <div className="ds-table">
                      <div className="ds-table-cell">
                        <label htmlFor="">新密码 *</label>
                        <Input type='password' className='form-input' placeholder="新密码"/>
                      </div>
                      <div className="ds-table-cell">
                      </div>
                    </div>
                  </div>
                  <div className="form-item">
                    <div className="ds-table">
                      <div className="ds-table-cell">
                        <label htmlFor="">确认密码 *</label>
                        <Input type='password' className='form-input' placeholder="确认密码"/>
                      </div>
                      <div className="ds-table-cell">
                      </div>
                    </div>
                  </div>
                  <div className="form-item">
                    <Button type='primary' className='sub-button'>确认修改</Button>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

PwdSettingComponent.displayName = 'PwdSettingComponent';
PwdSettingComponent = new Form.create()(PwdSettingComponent);

// Uncomment properties you need
// PwdSettingComponent.propTypes = {};
// PwdSettingComponent.defaultProps = {};

export default PwdSettingComponent;
