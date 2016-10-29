'use strict';

import React from 'react';
import {Form, Button, notification} from 'antd';
import Foooter from './FooterComponent';
import Header from './HeaderComponent';
import MiniLogin from './MiniLoginComponent';
import Console from '../Console';
import Config from 'config';
import request from '../Request';
import SS from  'parsec-ss';

require('styles//Register.less');

class RegisterComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visibleSuccess: false,
      errorMap: {},
      verifycodeTime:0
    };
    this.handleRegSubmit = this.handleRegSubmit.bind(this);
    this.maskPopClose = this.maskPopClose.bind(this);
    this.checkPass2 = this.checkPass2.bind(this);
    this.getVerifiCationCode = this.getVerifiCationCode.bind(this);
    this.handleFormItemFocus = this.handleFormItemFocus.bind(this);
    this.register = this.register.bind(this);
    this.getVerifiCationCode = this.getVerifiCationCode.bind(this);
    this.interval = setInterval(()=> {
      if (this.state.verifycodeTime <= 0) {
        return;
      }
      this.setState({
        verifycodeTime: this.state.verifycodeTime - 1
      });
    }, 1000);
  }

  componentWillMount() {
    MiniLogin.hide();
  }

  componentWillReceiveProps(nextProps) {
    MiniLogin.hide();
    if (this.xhr && this.xhr.abort) {
      this.xhr.abort();
    }
  }

  componentWillUnmount() {
    if (this.xhr && this.xhr.abort) {
      this.xhr.abort();
    }
    clearInterval(this.interval);
  }

  handleRegSubmit() {
    this.props.form.validateFieldsAndScroll((errors, values) => {
      if (!!errors) {
        let errorMap = {};
        for (let key in errors) {
          Console.log(errors);
          errorMap[key] = errors[key]['errors'][0]['message'];
        }
        this.setState({
          errorMap
        });
        return;
      }
      this.register(values);
    });
  }

  maskPopClose() {
    this.setState({
      visibleSuccess: false
    });
  }

  checkPass2(rule, value, callback) {
    const {getFieldValue} = this.props.form;
    let errorMap = this.state.errorMap;
    if (value && value !== getFieldValue('password')) {
      errorMap['rePasswd'] = '您输入的两个密码不一致！';
      this.setState({
        errorMap
      });
    } else {
      delete errorMap.password;
      delete errorMap.rePasswd;
      this.setState({
        errorMap
      });
      if (typeof callback === 'function') {
        callback();
      }
    }
  }

  register(values) {
    request({
      type: 'post',
      url: Config.host + '/register',
      data: {
        username: values.phone,
        password: values.password
      },
      success: (data)=> {
        Console.log(data);
        this.setState({
          visibleSuccess: true
        });
      },
      error: (data)=> {
        notification['error']({
          duration: 3,
          message: data.message
        });
      }
    });
  }

  getVerifiCationCode(){
    this.handleVerifyPhone((document.querySelector('input[id=phone]') || {}).value, (result)=> {
      let errorMap = this.state.errorMap;
      if (!!result) {
        errorMap['phone'] = '手机号码已经存在';
        this.setState({
          errorMap: errorMap
        });
        return;
      }
      if (this.state.verifycodeTime > 0) {
        return;
      }
      this.props.form.validateFields((errors, values) => {
        errors = errors['phone'];
        Console.log(errors);
        if (!!errors) {
          errorMap['phone'] = errors['errors'][0]['message'];
          this.setState({
            errorMap: errorMap
          });
          return;
        }

        delete errorMap['phone'];
        delete errorMap['verification_code'];

        this.setState({
          errorMap: errorMap,
          verifycodeTime: 60
        });
        // request({
        //   type: 'post',
        //   url: Config.host + '/verifyCode',
        //   data: {
        //     username: values.phone
        //   },
        //   success: (data)=> {
        //     Console.log(data);
        //   },
        //   error: (data)=> {
        //     this.setState({
        //       errorMap: data.message
        //     });
        //   }
        // });
      });
    });
  }

  //验证手机号是否已经存在
  handleVerifyPhone(phone, callback) {
    if (this.xhr && this.xhr.abort) {
      this.xhr.abort();
    }
    let errorMap = this.state.errorMap;
    if (!phone) {
      errorMap['phone'] = '手机号码不能为空';
      this.setState({
        errorMap: errorMap
      });
      return;
    }else if(!Config.validateRules.isMobile(phone)){
      errorMap['phone'] = '请输入正确的手机号码';
      this.setState({
        errorMap: errorMap
      });
      return;
    }

    let data = {'title':'SUCCESS','code':0,'message':'成功','result':false};
    if (typeof callback === 'function') {
      callback(data.result);
    }
    // this.xhr = request({
    //   url: Config.host + '',
    //   data: {username: phone},
    //   success: (data)=> {
    //     this.state.phoneIsVerify = false;
    //     if (!data.result) {
    //       this.setState({phoneIsVerify: true, errorMap: {}});
    //     } else {
    //       let err = {};
    //       err['phone'] = '手机号已存在';
    //       this.setState({phoneIsVerify: false, errorMap: err });
    //     }
    //     if (typeof callback === 'function') {
    //       Console.log(callback);
    //       callback(data.result);
    //     }
    //   }
    // });
  }

  handleVerifyKey(username){
    let errorMap = this.state.errorMap;
    if (!username) {
      errorMap['global_key'] = '用户名不能为空';
      this.setState({
        errorMap: errorMap
      });
      return;
    }else if(!Config.validateRules.isRealName(username)){
      errorMap['global_key'] = '请输入正确的用户名';
      this.setState({
        errorMap: errorMap
      });
      return;
    }
    // this.xhr = request({
    //   url: Config.host + '',
    //   data: {username: username},
    //   success: (data)=> {
    //     if (!data.result) {
    //       this.setState({phoneIsVerify: true, errorMap: {}});
    //     } else {
    //       let err = {};
    //       err['global_key'] = '用户名已存在';
    //     }
    //   }
    // });
  }

  //获取光标移除对应的错误信息
  handleFormItemFocus(key){
    let errorMap = this.state.errorMap;
    delete errorMap[key];
    this.setState({
      errorMap
    });
  }

  render() {
    const {getFieldDecorator} = this.props.form;
    return (
      <div className='register-component'>
        <Header />
        <div className='content-wrapper'>
          <div className='account-box-wrapper'>
            <div className='account-box'>
              <Form horizontal>
                <div className='register-form'>
                  <div className='account-form-title'>
                    <label htmlFor=''>账号注册</label>
                  </div>
                  <div className='account-input-area'>
                    {getFieldDecorator('global_key', {
                      rules: [
                        {required: true, message: '个性后缀至少为3位字符', min: 3, type: 'string'},
                      ]
                    })(
                      <input name='global_key' type='text' placeholder='用户名 (即个性后缀，注册后无法修改)'
                             className={!this.state.errorMap.global_key || 'format-error'} autoComplete='off'
                             onBlur={()=>{this.handleVerifyKey((document.querySelector('input[id=global_key]') || {}).value);}}
                             onFocus={()=>{this.handleFormItemFocus('global_key')}}
                      />
                    )}
                    {!this.state.errorMap.global_key ||
                    <div className='format-error-label' name='gk_format_error'>
                      <span><i className='iconfont'>&#xe60a;</i></span>
                      <span className='error-message'>{this.state.errorMap['global_key']}</span>
                    </div>
                    }
                  </div>
                  <div className='account-input-area'>
                    <div className={!this.state.errorMap.phone ? 'phone-wrapper' : 'phone-wrapper format-error'} >
                      {getFieldDecorator('phone', {
                        rules: [
                          { required: true, type: 'string', pattern: new RegExp(Config.validateRegExp.mobile), message: '请输入正确的手机号码', max:11 }
                        ]
                      })(
                        <input name='phone' type='phone' placeholder='手机号' autoComplete='off' onBlur={()=>{
                          this.handleVerifyPhone((document.querySelector('input[id=phone]') || {}).value);
                        }} onFocus={()=>{this.handleFormItemFocus('phone')}}/>
                      )}
                    </div>
                    <Button className='account-send-code' type='button' style={{cursor:this.state.verifycodeTime <= 0 ? 'pointer' : 'not-allowed' }} onClick={()=>{this.getVerifiCationCode()}} disabled={this.state.verifycodeTime <= 0 ? false : true }>
                      {this.state.verifycodeTime <= 0 ? '获取验证码' : this.state.verifycodeTime + '秒后重发'}
                    </Button>
                    {!this.state.errorMap.phone ||
                    <div className='format-error-label' name='phone_format_error'>
                      <span><i className='iconfont'>&#xe60a;</i></span>
                      <span className='error-message'>{this.state.errorMap['phone']}</span>
                    </div>
                    }
                  </div>

                  <div className='account-input-area'>
                    {getFieldDecorator('verification_code', {
                      rules: [
                        {required: true, min: 4, message: '手机验证码不能为空', type: 'number'}
                      ]
                    })(
                      <input name='verification_code' type='number' className={!this.state.errorMap.verification_code || 'format-error'} placeholder='手机验证码' autoComplete='off'
                             onFocus={()=>{this.handleFormItemFocus('verification_code')}}
                      />
                    )}
                    {!this.state.errorMap.verification_code ||
                    <div className='format-error-label' name='verification_code_format_error'>
                      <span><i className='iconfont'>&#xe60a;</i></span>
                      <span className='error-message'>{this.state.errorMap['verification_code']}</span>
                    </div>
                    }
                  </div>
                  <div className='account-input-area'>
                    {getFieldDecorator('password', {
                      rules: [
                        {required: true, pattern: /\S{6,18}/, message: '密码长度为6~18位', type: 'string'},
                      ],
                    })(
                      <input name='password' type='password' placeholder='密码' autoComplete='off'
                             className={!this.state.errorMap.password || 'format-error'} onContextMenu={false}
                             onPaste={false} onCopy={false} onCut={false}
                             onKeyUp={()=>{this.checkPass2({},(document.querySelector('input[id=rePasswd]') || {}).value,'')}}
                             onFocus={()=>{this.handleFormItemFocus('password')}}
                      />
                    )}
                    {!this.state.errorMap.password ||
                    <div className='format-error-label' name='password_format_error'>
                      <span><i className='iconfont'>&#xe60a;</i></span>
                      <span className='error-message'>{this.state.errorMap['password']}</span>
                    </div>
                    }
                  </div>
                  <div className='account-input-area'>
                    {getFieldDecorator('rePasswd', {
                      rules: [{
                        required: true,
                        whitespace: true,
                        pattern: /\S{6,18}/, message: '密码长度为6~18位', type: 'string'
                      }, {
                        validator: this.checkPass2,
                      }],
                    })(
                      <input name='repeat-password' type='password' placeholder='重复密码' autoComplete='off'
                             className={!this.state.errorMap.rePasswd || 'format-error'} onContextMenu={false} onPaste={false} onCopy={false}
                             onCut={false}
                             onFocus={()=>{this.handleFormItemFocus('rePasswd')}}
                      />
                    )}
                    {!this.state.errorMap.rePasswd ||
                    <div className='format-error-label' name='repeat_password_format_error'>
                      <span><i className='iconfont'>&#xe60a;</i></span>
                      <span className='error-message'>{this.state.errorMap['rePasswd']}</span>
                    </div>
                    }
                  </div>

                  <div className='account-input-area account-captcha hide'>
                    <input id='captcha' name='captcha' type='text' placeholder='验证码' className='short'
                           autoComplete='off'/>
                    <img className='captcha' alt='验证码' src='https://coding.net/api/getCaptcha?code=0.4359082529552596'/>
                  </div>


                  <div className='account-input-area icheckbox'>
                    {getFieldDecorator('agreement', {
                      rules: [
                        {
                          required: true,
                          message: '请阅读并勾选用户协议',
                          type: 'boolean'
                        },
                      ],
                    })(
                      <input name='agreement' type='checkbox' onChange={(event)=>{
                        if(event.target.checked){
                          this.handleFormItemFocus('agreement')
                        }
                      }}/>
                    )}
                    <label htmlFor='agreement'>
                      <div className='icheckbox-square-parsec'></div>
                      &nbsp;我同意遵守<a href='#/agreement' target='_blank'>《用户服务协议》</a>
                    </label>
                    {!this.state.errorMap.agreement ||
                    <div className='format-error-label' name='agreement_format_error'>
                      <span><i className='iconfont'>&#xe60a;</i></span>
                      <span className='error-message'>{this.state.errorMap['agreement']}</span>
                    </div>
                    }
                  </div>

                  <Button className='account-button' type='button' onClick={()=> {
                    this.handleRegSubmit()
                  }}><span>注册</span>
                  </Button>

                  <div className='account-bottom-tip to-login'>
                    <label>已注册过帐号？<a href='#/login'>点击登录！</a></label>
                  </div>
                </div>
              </Form>
            </div>
            {/*注册成功的提示弹窗*/}
            <div className='modal-mask-layer' style={{display: this.state.visibleSuccess ? ' block' : 'none'}}></div>
            <div id='survey-pop-box' className='survey-pop-box'
                 style={{display: this.state.visibleSuccess ? ' block' : 'none'}}>
                <span className='survey-close-btn' onClick={()=> {
                  this.maskPopClose()
                }}>
                  <i className='iconfont'>&#xe608;</i>
                </span>
              <div className='survey-wrapper'>
                <div className='survey-header'>
                    <span className='success-icon'>
                      <i className='iconfont'>&#xe60b;</i>
                    </span>
                  <span className='success-words'>恭喜您，注册成功！</span>
                </div>
                <div className='survey-detail'>
                  <Button className='btn' onClick={()=> {
                    window.location.href = '#/'
                  }}>立即使用</Button>
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
RegisterComponent = new Form.create()(RegisterComponent);
// Uncomment properties you need
// RegisterComponent.propTypes = {};
// RegisterComponent.defaultProps = {};

export default RegisterComponent;
