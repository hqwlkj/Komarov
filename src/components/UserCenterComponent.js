'use strict';

import React from 'react';
import {Breadcrumb, Button, Form, Input, Modal, Row, Col, Upload, message, Icon} from 'antd';
import Console from '../Console';
import Config from 'config';

require('styles//UserCenter.less');

class UserCenterComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      settingErrorMap:{},
      verifycodeTime:0,
      visibleUserHeader: false
    }
    this.handleUserSettingOk = this.handleUserSettingOk.bind(this);
    this.showUserSettingModal = this.showUserSettingModal.bind(this);
    this.handleUserSettingCancel = this.handleUserSettingCancel.bind(this);
    this.showUserHeaderModal = this.showUserHeaderModal.bind(this);
    this.handleUserHeaderOk = this.handleUserHeaderOk.bind(this);
    this.handleUserHeaderCancel = this.handleUserHeaderCancel.bind(this);

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

  }

  componentWillReceiveProps(nextProps) {
    if (this.xhr && this.xhr.abort) {
      this.xhr.abort();
    }
    this.props = nextProps;
  }

  componentWillUnmount() {
    if (this.xhr && this.xhr.abort) {
      this.xhr.abort();
    }
    clearInterval(this.interval);
  }

  handleUserSettingOk() {
    this.props.form.validateFieldsAndScroll((errors) => {
      if (!!errors) {
        let settingErrorMap = {};
        for (let key in errors) {
          Console.log(errors);
          settingErrorMap[key] = errors[key]['errors'][0]['message'];
        }
        this.setState({
          settingErrorMap
        });
        return;
      }
    });
  }

  handleUserSettingCancel() {
    this.props.form.resetFields();
    this.setState({
      visible: false,
      settingErrorMap:{}
    });
  }


  showUserSettingModal() {
    this.setState({
      visible: true
    });
  }

  handleUserHeaderOk(){

  }

  handleUserHeaderCancel() {
    this.setState({
      visibleUserHeader: false
    });
  }

  showUserHeaderModal() {
    this.setState({
      visibleUserHeader: true
    });
  }

  getVerifiCationCode(){
    this.handleVerifyPhone((document.querySelector('input[id=phone]') || {}).value, (result)=> {
      let settingErrorMap = this.state.settingErrorMap;
      if (!!result) {
        settingErrorMap['phone'] = '手机号码已经存在';
        this.setState({
          settingErrorMap: settingErrorMap
        });
        return;
      }
      if (this.state.verifycodeTime > 0) {
        return;
      }
      this.props.form.validateFields((errors) => {
        errors = errors['phone'];
        Console.log(errors);
        if (!!errors) {
          settingErrorMap['phone'] = errors['errors'][0]['message'];
          this.setState({
            settingErrorMap: settingErrorMap
          });
          return;
        }

        delete settingErrorMap['phone'];
        delete settingErrorMap['verification_code'];

        this.setState({
          settingErrorMap: settingErrorMap,
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
    let settingErrorMap = this.state.settingErrorMap;
    if (!phone) {
      settingErrorMap['phone'] = '手机号码不能为空';
      this.setState({
        errorMap: settingErrorMap
      });
      return;
    }else if(!Config.validateRules.isMobile(phone)){
      settingErrorMap['phone'] = '请输入正确的手机号码';
      this.setState({
        settingErrorMap: settingErrorMap
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

  //获取光标移除对应的错误信息
  handleFormItemFocus(key){
    let settingErrorMap = this.state.settingErrorMap;
    delete settingErrorMap[key];
    this.setState({
      settingErrorMap
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const props = {
      name: 'file',
      showUploadList: false,
      action: '/upload.do',
      onChange(info) {
        if (info.file.status !== 'uploading') {
          Console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
          message.success(`${info.file.name} file uploaded successfully.`);
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
        }
      }
    }

    return (
      <div className='usercenter-component'>
        <div className='content'>
          <div className='breadcrumb-wrapper'>
            <Breadcrumb>
              <Breadcrumb.Item>个人中心</Breadcrumb.Item>
              <Breadcrumb.Item><a href='#/user/center'>个人信息</a></Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <div className='menu'>
            <div className='side-nav'>
              <ul className='clearfix'>
                <li className='side-nav-header border-radius-top'>
                  <span className='subtitle'>基本信息</span>
                </li>
                <li className='side-nav-item'>
                  <a href='#/user/center' className='nav-link active'>
                    <i className='iconfont'>&#xe611;</i>
                    <span>个人信息</span>
                  </a>
                </li>
                <li className='side-nav-item'>
                  <a href='#/password/setting' className='nav-link'>
                    <i className='iconfont'>&#xe612;</i>
                    <span>修改密码</span>
                  </a>
                </li>
              </ul>
            </div>
            <div className='side-nav mpay-menu'>
              <ul className='clearfix'>
                <li className='side-nav-header border-radius-top'>
                  <span className='subtitle'>项目管理</span>
                </li>
                <li className='side-nav-item'>
                  <a href='#/user/projects' className='nav-link'>
                    <i className='iconfont'>&#xe65e;</i>
                    <span>我的项目</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className='form-container'>
            <div className='form-box'>
              <div className='form-account'>
                <div className='avatar'>
                  <img src='https://gitlab.com/uploads/user/avatar/711661/avatar.png' alt='' height='40px'/>
                </div>
                <div className='user-info'>
                  <div className='user-info-head'>
                    <span>Coding 账户</span>
                    <Button type='primary' size='small' onClick={()=> {
                      this.showUserSettingModal()
                    }}>修改账户信息</Button>
                  </div>
                  <div className='user-info-body'>
                    <span>Global Key: <em>Yanghc</em></span>
                    <span>Email: <em>Yanghc@outlook.com</em></span>
                    <span>手机: <em>15998914690</em></span>
                  </div>
                </div>
              </div>
              <h1>个人信息</h1>
              <hr className='head-line'/>
              <div className='item'>
                <div className='tip'>
                  <span>请填写正确的码市个人信息，让 Coding 可以联系上您，以下信息不用于账户登录。</span>
                  <span>您的个人信息不会透露给任何第三方，请放心填写。</span>
                  <span>标有星号 (*) 的栏目为必填栏目, 并请验证工作邮箱和工作手机。</span>
                </div>
                <Form horizontal>
                  <div className='form-item'>
                    <div className='ds-table'>
                      <div className='ds-table-cell'>
                        <label htmlFor=''>姓名 *
                          <span className='valided hide'>222</span>
                        </label>
                        <Input className='form-input' placeholder='姓名'/>
                      </div>
                      <div className='ds-table-cell'>
                      </div>
                    </div>
                  </div>
                  <div className='form-item'>
                    <div className='ds-table'>
                      <div className='ds-table-cell'>
                        <label htmlFor=''>Email *</label>
                        <Input className='form-input' placeholder='电子邮箱'/>
                      </div>
                      <div className='ds-table-cell'>
                      </div>
                    </div>
                  </div>
                  <div className='form-item'>
                    <div className='ds-table'>
                      <div className='ds-table-cell'>
                        <label htmlFor=''>手机号码 *
                          <span className='valided'>已验证</span>
                        </label>
                        <Input className='form-input' placeholder='手机号码'/>
                      </div>
                      <div className='ds-table-cell'>
                      </div>
                    </div>
                  </div>
                  <div className='form-item'>
                    <Button type='primary' className='sub-button'>保存</Button>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>

        {/*修改账户信息*/}
        <Modal title='修改账户信息' visible={this.state.visible}
               wrapClassName='user-setting'
               width={620}
               onOk={()=> {
                 this.handleUserSettingOk()
               }} onCancel={()=> {
          this.handleUserSettingCancel()
        }}
        >
          <Row>
            <Col span={5}>
              <a href='javascript:void(0);' onClick={()=> {
                this.showUserHeaderModal()
              }}>
                <div className='avatar'>
                  <i className='iconfont'>&#xe614;</i>
                  <img src='https://gitlab.com/uploads/user/avatar/711661/avatar.png' alt='' height='128px'
                       width='128px'/>
                </div>
              </a>
              <div className='upload-user-header-btn'>
                <Button type='primary' size='small' onClick={()=> {
                  this.showUserHeaderModal()
                }}>上传头像</Button>
              </div>
            </Col>
            <Col span={19}>
              <Form horizontal>
                <div className='user-setting-form'>
                  <div className='account-input-area'>
                    {getFieldDecorator('global_key', {
                      rules: [
                        { required: true, message: '个性后缀至少为3位字符', min:3, type: 'string'}
                      ]
                    })(
                      <input name='global_key' type='text' disabled placeholder='用户名 (即个性后缀，注册后无法修改)' autoComplete='off'/>
                    )}
                    {!this.state.settingErrorMap.global_key ||
                      <div className='format-error-label' name='gk_format_error'>
                        <span><i className='iconfont'>&#xe60a;</i></span>
                        <span className='error-message'>{this.state.settingErrorMap['global_key']}</span>
                      </div>
                    }
                  </div>
                  <div className='account-input-area'>
                    <div className={!this.state.settingErrorMap.phone ? 'phone-wrapper' : 'phone-wrapper format-error'} >
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
                    {!this.state.settingErrorMap.phone ||
                    <div className='format-error-label' name='phone_format_error'>
                      <span><i className='iconfont'>&#xe60a;</i></span>
                      <span className='error-message'>{this.state.settingErrorMap['phone']}</span>
                    </div>
                    }
                  </div>

                  <div className='account-input-area'>
                    {getFieldDecorator('verification_code', {
                      rules: [
                        { required: true, message: '请输入正确的手机验证码', type: 'number'}
                      ]
                    })(
                      <input name='verification_code' type='number' placeholder='手机验证码' autoComplete='off'/>
                    )}
                    {!this.state.settingErrorMap.verification_code ||
                    <div className='format-error-label' name='verification_code_format_error'>
                      <span><i className='iconfont'>&#xe60a;</i></span>
                      <span className='error-message'>{this.state.settingErrorMap['verification_code']}</span>
                    </div>
                    }
                  </div>
                  <div className='account-input-area'>
                    {getFieldDecorator('email', {
                      rules: [
                        { required: true,  pattern: new RegExp(Config.validateRegExp.email), message: '请输入正确的邮箱地址', type: 'email'}
                      ]
                    })(
                      <input name='email' type='email' placeholder='邮箱地址' autoComplete='off' />
                    )}
                    {!this.state.settingErrorMap.email ||
                    <div className='format-error-label' name='password_format_error'>
                      <span><i className='iconfont'>&#xe60a;</i></span>
                      <span className='error-message'>{this.state.settingErrorMap['email']}</span>
                    </div>
                    }
                  </div>
                </div>
              </Form>
            </Col>
          </Row>
        </Modal>
        {/*上传头像*/}
        <Modal title='上传头像'
               visible={this.state.visibleUserHeader}
               wrapClassName='user-header-setting'
               onOk={()=> {
                 this.handleUserHeaderOk()
               }} onCancel={()=> {
          this.handleUserHeaderCancel()
        }}
        >
          <div style={{ height: 180 }}>
            <Upload.Dragger {...props}>
              <p className='ant-upload-drag-icon'>
                <Icon type='inbox' />
              </p>
              <p className='ant-upload-text'>点击或将图片拖拽至此上传！</p>
              <p className='ant-upload-hint'>支持JPG格式，图片大小不超过5MB,请保证图片质量，分辨率至少为200*200</p>
            </Upload.Dragger>
          </div>
        </Modal>
      </div>
    );
  }
}

UserCenterComponent.displayName = 'UserCenterComponent';
UserCenterComponent = new Form.create()(UserCenterComponent);

// Uncomment properties you need
// UserCenterComponent.propTypes = {};
// UserCenterComponent.defaultProps = {};

export default UserCenterComponent;
