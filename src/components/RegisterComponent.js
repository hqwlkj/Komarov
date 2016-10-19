'use strict';

import React from 'react';
import { Button } from 'antd';
import Foooter from './FooterComponent';
import Header from './HeaderComponent';
import MiniLogin from './MiniLoginComponent';

require('styles//Register.less');

class RegisterComponent extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      visibleSuccess:false
    }
    this.sendReg = this.sendReg.bind(this);
    this.maskPopClose = this.maskPopClose.bind(this);
  }
  componentWillReceiveProps(){
    MiniLogin.hide();
  }

  componentWillMount(){
    MiniLogin.hide();
  }

  sendReg(){
    setTimeout(()=>{
      this.setState({
        visibleSuccess:true
      });
    },1500);
  }

  maskPopClose(){
    this.setState({
      visibleSuccess:false
    });
  }

  render() {
    return (
      <div className='register-component'>
        <Header />
        <div className='content-wrapper'>
            <div className='account-box-wrapper'>
              <div className='account-box'>
                <div className='register-form'>
                  <div className='account-form-title'>
                    <label htmlFor=''>账号注册</label>
                  </div>
                  <div className='account-input-area'>
                    <input id='global_key' name='global_key' type='text' placeholder='用户名 (即个性后缀，注册后无法修改)' />
                    <div className='format-error-label' style={{display:'none'}} name='gk_format_error'>
                      <span><i className='iconfont'>&#xe60a;</i></span>
                      <span className='error-message'>错误信息</span>
                    </div>
                  </div>
                  <div className='account-input-area hasflag'>
                    <div className='phone-wrapper'>
                      <input id='phone' name='phone' type='phone' placeholder='手机号' className='short hasflag'/>
                    </div>
                    <Button className='account-send-code' type='button'>发送验证码</Button>
                    <div className='format-error-label' style={{display:'none'}} name='phone_format_error'>
                      <span><i className='iconfont'>&#xe60a;</i></span>
                      <span className='error-message'>错误信息</span>
                    </div>
                  </div>
                  <div className='account-input-area'>
                    <input id='verification_code' name='verification_code' type='number' placeholder='手机验证码' />
                      <div className='format-error-label' style={{display:'none'}} name='verification_code_format_error' >
                        <span><i className='iconfont'>&#xe60a;</i></span>
                        <span className='error-message'></span>
                      </div>
                  </div>
                  <div className='account-input-area'>
                    <input id='password' name='password' type='password' placeholder='密码' />
                      <div className='format-error-label' style={{display:'none'}} name='password_format_error'>
                        <span><i className='iconfont'>&#xe60a;</i></span>
                        <span className='error-message'></span>
                      </div>
                  </div>
                  <div className='account-input-area'>
                    <input id='repeat-password' name='repeat-password' type='password' placeholder='重复密码' className="format-error" />
                      <div className='format-error-label' style={{display:'none'}} name='repeat_password_format_error'>
                        <span><i className='iconfont'>&#xe60a;</i></span>
                        <span className='error-message'></span>
                      </div>
                  </div>
                  <div className='account-input-area account-captcha'>
                    <input id='captcha' name='captcha' type='text' placeholder='验证码' className='short' autoComplete='off'/>
                    <img className='captcha' alt='验证码' src='https://coding.net/api/getCaptcha?code=0.4359082529552596' />
                  </div>


                  <div className='account-input-area icheckbox'>
                    <input id='agreement' name='agreement' type='checkbox' />
                    <label htmlFor="agreement">
                      <div className='icheckbox-square-parsec'></div>&nbsp;我同意遵守<a href='#/agreement' target='_blank'>《用户服务协议》</a>
                    </label>

                    <div className='format-error-label' style={{display:'none'}} name='agreement_format_error'>
                      <span><i className='iconfont'>&#xe60a;</i></span>
                      <span className='error-message'></span>
                    </div>
                  </div>

                  <a href="javascript:void(0);" >
                    <Button className="account-button" type="button" onClick={()=>{this.sendReg()}}>
                      <span>注册</span>
                    </Button>
                  </a>

                  <div className="account-bottom-tip to-login">
                    <label>已注册过帐号？<a href="#/login">点击登录！</a></label>
                  </div>

                </div>
              </div>
              {/*注册成功的提示弹窗*/}
              <div className="modal-mask-layer" style={{display:this.state.visibleSuccess ? ' block': 'none'}}></div>
              <div id="survey-pop-box" className="survey-pop-box" style={{display:this.state.visibleSuccess ? ' block': 'none'}}>
                <span className="survey-close-btn" onClick={()=>{this.maskPopClose()}}>
                  <i className="iconfont">&#xe608;</i>
                </span>
                <div className="survey-wrapper">
                  <div className="survey-header">
                    <span className="success-icon">
                      <i className="iconfont">&#xe60b;</i>
                    </span>
                    <span className="success-words">恭喜您，注册成功！</span>
                  </div>
                  <div className="survey-detail">
                    <Button className="btn" onClick={()=>{window.location.href='#/'}}>立即使用</Button>
                  </div>
                </div>
              </div>
            </div>
        </div>
        <Foooter/>
      </div>
    );
  }
}

RegisterComponent.displayName = 'RegisterComponent';

// Uncomment properties you need
// RegisterComponent.propTypes = {};
// RegisterComponent.defaultProps = {};

export default RegisterComponent;
