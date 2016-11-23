'use strict';

import React from 'react';
import {Tabs, Button, Badge, Spin, Tooltip, message, Modal, Form, Input, Row, Col} from 'antd';
import MiniLogin from './MiniLoginComponent';
import SS from 'parsec-ss';
import classnames from 'classnames';
import Config from 'config';
import request from '../Request';

require('styles//StepThree.less');

class StepThreeComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      downloadLoading: false,
      visible: true,
      visibleResultWrapper: false,
      visibleSaveFun: false,
      platformsData: [],
      resultData: [],
      errorMap: {},
      selectedPaltforms: '',
      selectedPlatformsData: []
    }
    this.loadData = this.loadData.bind(this);
    this.loadInitData = this.loadInitData.bind(this);
    this.submitSaveQuote = this.submitSaveQuote.bind(this);
    this.downloadTheReport = this.downloadTheReport.bind(this);
    this.seeFunctionList = this.seeFunctionList.bind(this);
    this.handleSaveFunCancel = this.handleSaveFunCancel.bind(this);
    this.handleFormItemFocus = this.handleFormItemFocus.bind(this);
    this.handleSaveFunctionList = this.handleSaveFunctionList.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    //console.log('componentWillReceiveProps');
  }

  componentWillMount() {
    //console.log('componentWillMount');
    let project = SS.getObj(Config.project);
    if(!!project){
      this.props.form.setFieldsValue({'objectId':project.objectId,'project_name':project.project_name,'project_desc':project.project_desc});
    }
    let platforms = SS.get(Config.platformsKeys);
    if(!platforms && !!project){
      platforms = encodeURI(JSON.stringify(project.idxtree));
    }
    let selectedPaltforms = decodeURI(platforms);
    this.setState({
      selectedPaltforms
    }, () => {
      this.loadInitData();
      this.loadData();
    });
  }

  loadInitData() {
    request({
      type: 'post',
      url: Config.host + '/filter/tree',
      data: {
        idxtree: JSON.parse(this.state.selectedPaltforms)
      },
      success: (data) => {
        this.setState({
          resultData: data.result
        });
      }
    });
  }

  loadData() {
    this.setState({
      loading: true,
      platformsData: [],
    });
    request({
      type: 'post',
      url: Config.host + '/filter/tree',
      data: {
        idxtree: JSON.parse(this.state.selectedPaltforms)
      },
      success: (data) => {
        this.setState({
          visible: true,
          loading: false,
          platformsData: data.result,
          resultData: data.result
        });
      }
    });
  }

  seeFunctionList() {
    if (!this.state.visible) {
      this.loadData();
    } else {
      this.setState({
        visible: false,
        platformsData: [],
      });
    }
  }

  submitSaveQuote() {
    this.setState({
      visibleSaveFun: true
    });
  }

  //保存到我的项目
  handleSaveFunCancel() {
    this.setState({
      visibleSaveFun: false
    });
  }

  //下载功能报表
  downloadTheReport() {
    if (SS.get(Config.token) === null) {
      MiniLogin.show(() => {
      });
      return;
    }
    debugger;
    let project = SS.getObj(Config.project);
    let idxtree = SS.get(Config.platformsKeys);
    if(!idxtree && !!project){
      idxtree = JSON.stringify(project.idxtree);
    }else{
      idxtree = decodeURI(idxtree);
    }
    let elem_form = document.querySelector('.export-form');
    if (!elem_form) {
      elem_form = document.createElement('form');
      elem_form.className = 'export-form';
      elem_form.style.display = 'none';
      elem_form.target = '_self';
      elem_form.method = 'post';
      elem_form.action = Config.host + '/fea/download';
      document.body.appendChild(elem_form);
    }
    let elem_input = document.querySelector('.input-idxtree');
    if (!elem_input) {
      elem_input = document.createElement('input');
      elem_input.className = 'input-idxtree'
      elem_input.type = 'hidden';
      elem_input.name = 'idxtree';
    }
    elem_input.value = idxtree;
    elem_form.appendChild(elem_input);

    this.setState({
      downloadLoading: true,
    }, () => {
      elem_form.submit();
      this.setState({
        downloadLoading: false,
      });
    });
  }

  //获取光标移除对应的错误信息
  handleFormItemFocus(key) {
    let errorMap = this.state.errorMap;
    delete errorMap[key];
    this.setState({
      errorMap
    });
  }

  //保存到我的项目
  handleSaveFunctionList() {
    this.props.form.validateFieldsAndScroll((errors, values) => {
      if (!!errors) {
        let errorMap = {};
        for (let key in errors) {
          errorMap[key] = errors[key]['errors'][0]['message'];
        }
        this.setState({
          errorMap
        });
        return;
      }
      if (SS.get(Config.token) === null) {
        MiniLogin.show(() => {
        });
        return;
      }
      this.saveFunctionInfo(values);
    });
  }

  saveFunctionInfo(values) {
    values.idxtree = JSON.parse(this.state.selectedPaltforms);
    values.objectId = values.objectId === undefined ? 0 : values.objectId;
    request({
      type: 'post',
      url: Config.host + '/project/save',
      data: values,
      success: (data) => {
        this.setState({
          visibleResultWrapper: true
        });
        SS.remove(Config.project);
        SS.remove(Config.platformsKeys);//删除缓存中的 IDEXTREE
      },
      error: (data) => {
        message.error(data.messages);
      }
    });
  }

  render() {
    const {getFieldDecorator} = this.props.form;

    let platformNum = 0, functionNum = 0;
    (this.state.resultData || []).map((item) => {
      platformNum += 1;
      (item.children || []).map((item, index) => {//第一节
        if (item.children && item.children.length) {//判断是否有二层子节点
          let children = (item.children || []).map((child, cindex) => {
            if (child.children && child.children.length) {//判断是否有三层子节点
              functionNum += child.children.length;
            } else {
              functionNum += 1;
            }
          });
          return (children);
        }
      });
    });

    let funItem = (this.state.platformsData || []).map((item) => {
      let num = 0;
      let tbody = (item.children || []).map((item, index) => {//第一节
        if (item.children && item.children.length) {//判断是否有二层子节点
          let children = (item.children || []).map((child, cindex) => {
            if (child.children && child.children.length) {//判断是否有三层子节点
              num += child.children.length;
              let children2 = (child.children || []).map((child2, cindex2) => {
                return (<label key={child2.idx + '-' + cindex2} htmlFor={item.idx + '-' + child.idx + '-' + child2.idx}
                               className="function-label">
                  {eval("'" + child2.text + "'")}
                </label>);
              });

              return (
                <tr className={cindex % 2 ? 'even' : 'odd'} key={child.idx + '-' + cindex}>
                  { cindex != 0 || <td rowSpan={item.children.length}>{eval("'" + item.text + "'")}</td>}
                  <td><label htmlFor={child.idx + '-' + cindex} className="module-label">
                    <span>{eval("'" + child.text + "'")}</span>
                  </label></td>
                  <td>{children2}</td>
                </tr>
              );
            } else {
              // 没有第三节点
              num += 1;
              return (
                <tr className={cindex % 2 ? 'even' : 'odd'} key={child.idx + '-' + cindex}>
                  { cindex != 0 || <td rowSpan={item.children.length}>{eval("'" + item.text + "'")}</td>}
                  <td><label htmlFor={child.idx + '-' + cindex} className="module-label">
                    <span>{eval("'" + child.text + "'")}</span>
                  </label></td>
                  <td></td>
                </tr>
              );
            }
          });
          return (children);
        } else {
          return (
            <tr className={index % 2 ? 'odd' : 'even'} key={index}>
              <td rowSpan={item.children.length}>{eval("'" + item.text + "'")}</td>
              <td></td>
              <td></td>
            </tr>
          );
        }
      });
      return (
        <div className="list-box" key={item.idx}>
          <div className="simple-wrapper">
            <div className="tabs-title">
              <span className="name">{item.text}<em>{num}</em></span>
            </div>
          </div>
          <div className="table-wrapper">
            <div className="functions">
              <table>
                <thead>
                <tr>
                  <th>分类</th>
                  <th>模块</th>
                  <th>功能点</th>
                </tr>
                </thead>
                <tbody>
                {tbody}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      );
    });

    return (
      <div className="stepthree-component">
        { this.state.visibleResultWrapper ||
        <div className="quote">
          <ul className="steps clearfix">
            <li className="">
              <em>1</em>
              <span>
                <label>第一步，</label>
                <label>功能评估</label>
              </span>
            </li>
            <li className="current">
              <em>2</em>
              <span>
                <label>第二步，</label>
                <label>评估结果</label>
              </span>
            </li>
          </ul>
          <div className="wrapper">
            <div className="quote-board">
              <article className="flex-box">
                <div className="flex-auto-justify">
                  <h1>项目规划评估统计</h1>
                  <em>平台数量：<span>{platformNum}</span>个</em>
                  <em>功能模块：<span>{functionNum}</span>个</em>
                  <div className="detail">
                    {/*<Button className='see-fun-list-btn' htmlType='button' onClick={() => {*/}
                      {/*this.seeFunctionList()*/}
                    {/*}}>{this.state.visible ? '隐藏功能清单' : '查看功能清单'}</Button>*/}
                  </div>
                </div>
                <div className="right">
                  <Button className="adjust-btn" htmlType='button' onClick={() => {
                    let project = SS.getObj(Config.project) || {};
                    project.idxtree = JSON.parse(this.state.selectedPaltforms);
                    SS.setObj(Config.project, project);
                    SS.remove(Config.platformsKeys);//删除缓存中的 IDEXTREE
                    this.props.history.go(-1);
                  }}>调整需求重新计算</Button>
                </div>
              </article>
              <div className="button-wrapper">
                <Button className={this.state.selectedPaltforms.length > 0 ? 'button primary' : 'button disabled'}
                        onClick={() => {this.submitSaveQuote()}}>保存到我的项目</Button>
                <Button className={this.state.selectedPaltforms.length > 0 ? 'button primary' : 'button disabled'}
                        loading={this.state.downloadLoading} onClick={() => {
                  this.downloadTheReport()
                }}>下载评估报表</Button>
              </div>
            </div>
            <Spin tip="数据加载中..." spinning={this.state.loading}>
              <div className="function-list-wrapper">
                {funItem}
              </div>
            </Spin>
          </div>
          <Modal title={<div className="modal-form-title"><h2>保存报价</h2><p>您保存的项目，可以在「我的项目」列表查看或编辑。</p></div>}
                 visible={this.state.visibleSaveFun}
                 width='34.4rem'
                 wrapClassName="save-fun-modal"
                 onOk={null} onCancel={() => {
            this.handleSaveFunCancel()
          }} footer={null}
          >
            <Form horizontal>
              <div className="modal-form-box">
                <div className='modal-input-area'>
                  {getFieldDecorator('platformNum', {initialValue: platformNum})(
                    <input type="hidden"/>
                  )}
                  {getFieldDecorator('functionNum', {initialValue: functionNum})(
                    <input type="hidden"/>
                  )}
                  {getFieldDecorator('objectId')(
                    <input type="hidden"/>
                  )}
                  {getFieldDecorator('project_name', {
                    rules: [{required: true, message: '请填写项目名称', type: 'string'}]
                  })(
                    <Input name='project_name' type='text' placeholder='填写项目名称(必填)'
                           className={classnames({'format-error': this.state.errorMap.project_name})} autoComplete='off'
                           onFocus={() => {
                             this.handleFormItemFocus('project_name')
                           }}
                    />
                  )}
                  {!this.state.errorMap.project_name ||
                  <div className='format-error-label'>
                    <span><i className='iconfont'>&#xe60a;</i></span>
                    <span className='error-message'>{this.state.errorMap['project_name']}</span>
                  </div>
                  }
                </div>
                <div className='modal-input-area'>
                  {getFieldDecorator('project_desc')(
                    <Input name='project_desc' type='textarea' rows="6" placeholder='填写项目描述' autoComplete='off'/>
                  )}
                </div>
                {
                  SS.getObj(Config.project) && SS.getObj(Config.project).objectId != undefined
                  ?
                    <Row gutter={6}>
                      <Col span={12}><Button className='modal-button' htmlType='button' onClick={() => {
                        let project = SS.getObj(Config.project);
                        if(!!project){
                          this.props.form.setFieldsValue({'objectId':0});
                        }
                        this.handleSaveFunctionList()
                      }}><span>另存为新项目</span>
                      </Button></Col>
                      <Col span={12}>
                        <Button className='modal-button primary' htmlType='button' onClick={() => {
                          this.handleSaveFunctionList()
                        }}><span>保存修改</span>
                        </Button>
                      </Col>
                    </Row> :
                    <Button className='modal-button primary' htmlType='button' onClick={() => {
                      this.handleSaveFunctionList()
                    }}><span>确认保存</span>
                    </Button>
                }

              </div>
            </Form>
          </Modal>
        </div>
        }
        { !this.state.visibleResultWrapper ||
        <div className="result-wrapper">
          <div className="success-icon">
            <i className='iconfont'>&#xe60b;</i>
          </div>
          <h1>保存成功!</h1>
          <p>您可以在发布项目的过程中，将预估功能的报价清单作为参考链接提供给开发者。</p>
          <Button className='see-btn' htmlType='button' onClick={() => {
            window.location.href = '#/user/projects';
          }}>查看我的项目</Button>
          <hr className="success-hr hide"/>
          <h2 className="hide">心动了吗？立即发布需求！</h2>
          <Button className='see-btn primary-btn hide' htmlType='button'>发布需求</Button>
        </div>
        }
      </div>
    );
  }
}

StepThreeComponent.displayName = 'StepThreeComponent';
StepThreeComponent = new Form.create()(StepThreeComponent);

// Uncomment properties you need
// StepThreeComponent.propTypes = {};
// StepThreeComponent.defaultProps = {};

export default StepThreeComponent;
