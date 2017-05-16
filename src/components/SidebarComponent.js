'use strict';

import React from 'react';
import { Button, Form, Radio, Input, Modal} from 'antd';
import Config from 'config';
import $ from  'jquery';
import request from '../Request';

require('styles//SideBar.less');

class SideBarComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      starsValue: 0,
      feedbackWrapperRight:-500
    };
    this.handleScroll = this.handleScroll.bind(this);
    this.handleFeedbackSubmit = this.handleFeedbackSubmit.bind(this);
    this.closeFeedbackWindow = this.closeFeedbackWindow.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
    this.handleScroll();
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll() {
    let top = document.body.scrollTop;
    if (top >= 150) {
      this.setState({
        visible: true
      });
    } else {
      this.setState({
        visible: false
      });
    }
  }

  closeFeedbackWindow() {
    this.props.form.resetFields();
    this.setState({
      feedbackWrapperRight:-500
    });
  }

  handleStarsChange(value) {
    this.setState({starsValue: value});
  }

  handleFeedbackSubmit() {
    this.props.form.validateFields((errors, values) => {
      if (errors) {
        //console.log('Errors in form!!!');
        return;
      }
      request({
        type:'post',
        url: Config.host + '/feedback/email',
        data:values,
        success:()=>{
          this.closeFeedbackWindow();
          Modal.success({
            title: '反馈成功',
            content: '感谢您对我们的支持，我们会认真处理您反馈的信息。',
            okText:'关闭'
          });
        }
      })
    });
  }


  render() {
    const {getFieldDecorator} = this.props.form;
    const formItemLayout = {
      labelCol: {span: 0},
      wrapperCol: {span: 24}
    };
    return (
      <div className='sidebar-component'>
        <div className='scroll bar-item' style={{display: this.state.visible ? 'block' : 'none'}}>
          <a href='javascript:void(0)' onClick={()=> {
            $('html,body').stop().animate({scrollTop: 0}, 300);
          }} className='scroll_top'>
            <span><i className='iconfont'>&#xe60d;</i></span>
            <span>顶部</span>
          </a>
        </div>
        <div className='feedback bar-item'>
          <a href='javascript:void(0)' className='scroll_top' onClick={()=>{
            this.setState({
              feedbackWrapperRight:52
            });
          }}>
            <span><i className='iconfont'>&#xe60c;</i></span>
            <span>反馈</span>
            <div className='feedback-global-tip'>
              <p>您可以通过点击&nbsp;&nbsp;&nbsp;&nbsp;<i className='iconfont'>&#xe60c;</i> 反馈按钮</p>
              <div className='tip-msg'>
                对我们产品的<em>体验、功能、系统错误</em>等提出反馈，以帮助 我们改善产品体验，为您提供更好的服务！
              </div>
            </div>
          </a>
        </div>
        <div className='feedback-box-wrapper' style={{right:this.state.feedbackWrapperRight}}>
          <div className='feedback-box'>
            <Button shape='circle-outline' className='feedback-box-close' onClick={()=> {
              this.closeFeedbackWindow()
            }}><i className='iconfont'>&#xe608;</i></Button>
            <div className='feedback-form-title'>
              <label htmlFor=''>用户反馈收集</label>
            </div>
            <div className='feedback-form'>
              <Form horizontal>
                <Form.Item
                  {...formItemLayout}
                >
                  {getFieldDecorator('username', {
                    rules: [
                      {required: true, max:11, message: '请输入你的姓名',type:'string'}
                    ]
                  })(
                    <Input autoComplete='off' placeholder='请输入你的姓名'/>
                  )}
                </Form.Item>
                <Form.Item
                  {...formItemLayout}
                >
                  {getFieldDecorator('contact',{
                    rules: [
                      {required: true, max:11, message: '请输入你的手机号码',type:'string'}
                    ]
                  })(
                    <Input autoComplete='off' placeholder='请输入你的手机号码'/>
                  )}
                </Form.Item>
                <Form.Item
                  {...formItemLayout}
                >
                  {getFieldDecorator('type', { initialValue: '体验反馈' },{
                    rules: [
                      {required: true, message: '请选择体验类型'}
                    ]
                  })(
                    <Radio.Group>
                      <Radio value='体验反馈'>体验反馈</Radio>
                      <Radio value='功能反馈'>功能反馈</Radio>
                      <Radio value='BUG反馈'>BUG反馈</Radio>
                    </Radio.Group>
                  )}
                </Form.Item>
                <Form.Item
                  {...formItemLayout}
                >
                  {getFieldDecorator('message', {
                    validate: [{
                      rules: [
                        {required: true, min:5, message: '请输入您的反馈信息'}
                      ],
                      trigger: 'onBlur'
                    }, {
                      rules: [
                        { type: 'string', min:5, message: '请输入您的反馈信息' }
                      ],
                      trigger: ['onBlur', 'onChange']
                    }]
                  })(
                    <Input type='textarea' id='control-textarea' rows='5' placeholder='您的反馈对我们来说很重要^.^'/>
                  )}
                </Form.Item>
                <Form.Item
                  {...formItemLayout}
                >
                  <Button type='primary' onClick={()=>{this.handleFeedbackSubmit()}}>提交</Button>
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

SideBarComponent.displayName = 'SideBarComponent';
SideBarComponent = new Form.create()(SideBarComponent);
// Uncomment properties you need
// SideBarComponent.propTypes = {};
// SideBarComponent.defaultProps = {};

export default SideBarComponent;
