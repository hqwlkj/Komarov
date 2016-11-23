'use strict';

import React from 'react';
import {Breadcrumb, Button, Modal, Form, Input, Spin, Tooltip, Switch} from 'antd';
import Foooter from './FooterComponent';
import Header from './HeaderComponent';
import dateFormat from 'date-format';
import Config from 'config';
import request from '../Request';

require('styles//View.less');
let base64 = require('base-64');

class ViewComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      loading: false,
      platformsData: [],
      projectData: {}
    }
  }

  componentWillReceiveProps(nextProps) {
    this.loadData(nextProps);
  }

  componentWillMount() {
    this.loadData(this.props)
  }

  loadData(props) {
    let hash = props.params.hash;
    console.log('hash', hash);
    hash = base64.decode(hash);
    console.log('hash', hash);
    let params = hash.split('-');
    let id = params[0];

    let time = dateFormat('yyyy-MM-dd', new Date(parseInt(params[1])));
    let currentTime = dateFormat('yyyy-MM-dd', new Date());
    if (time === currentTime) {
      this.setState({
        loading: true
      });
      request({
        type: 'get',
        url: Config.host + '/share',
        data: {objectId: id},
        success: (data) => {
          this.setState({
            loading: false,
            projectData: data.result,
            platformsData: data.result.functionList
          }, () => {
            //this.loadFunctionListData(this.state.platformsData.idxtree);
          });
        }
      });
    } else {
      console.log('no');
    }


    // let project = {};
    // project.id = id;
    // project.name = '我是项目的标题'+(id+1);
    // project.desc = '我是项目的描述信息'+(id+1);
    // project.updateTime = new Date().getTime();
    // project.platformNum = parseInt(Math.random() * 99);
    // project.functionNum = parseInt(Math.random() * 9999);
    // project.idxtree = '[{"P.a":[{"2.a":[{"2.3.a":[{"2.3.1.a":""},{"2.3.2.a":""}]},{"2.4.a":[{"2.4.1.a":""},{"2.4.2.a":""},{"2.4.3.a":""}]},{"2.5.a":[{"2.5.1.a":""},{"2.5.2.a":""},{"2.5.3.a":""}]},{"2.6.a":[{"2.6.1.a":""},{"2.6.3.a":""},{"2.6.4.a":""}]}]}]},{"P.b":[{"8.b":[{"8.3.b":[{"8.3.1.b":""},{"8.3.3.b":""}]}]},{"9.b":[{"9.1.b":[{"9.1.2.b":""}]}]}]}]';
    // this.setState({projectData:project},()=>{
    //   this.loadFunctionListData(project.idxtree);
    // });
  }

  loadFunctionListData(idxtree) {
    this.setState({
      loading: true,
      platformsData: [],
    });
    request({
      type: 'post',
      url: Config.host + '/filter/tree',
      data: {
        idxtree: idxtree
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

  render() {

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
      <div className="container">
        <Header />
        <div className="view-component">
          <div className="content">
            <div className="breadcrumb-wrapper">
              <Breadcrumb>
                <Breadcrumb.Item><a href='#/'>项目评估</a></Breadcrumb.Item>
                <Breadcrumb.Item>功能清单</Breadcrumb.Item>
              </Breadcrumb>
            </div>
            <div className="function-wrapper">
              <div className="item-header">
                <h2 className="item-name">{this.state.projectData.project_name}</h2>
                <p className="item-desc">{this.state.projectData.project_desc}</p>
                <div className="info">
                  <div className="counts">平台数量：<em>{this.state.projectData.platformNum}</em>个</div>
                  <div className="counts">功能模块：<em>{this.state.projectData.functionNum}</em>个</div>
                  <div className="time">
                    创建时间：<em>{!this.state.projectData.createTime || dateFormat('yyyy-MM-dd hh:mm:ss', new Date(this.state.projectData.createTime))}</em></div>
                </div>
              </div>
              <div className="item-main">
                <p>功能清单</p>
                <Spin spinning={this.state.loading}>
                  <div className="function-list-wrapper">
                    {funItem}
                  </div>
                </Spin>
              </div>
            </div>
          </div>
        </div>
        <Foooter/>
      </div>
    );
  }
}

ViewComponent.displayName = 'ViewComponent';

// Uncomment properties you need
// ViewComponent.propTypes = {};
// ViewComponent.defaultProps = {};

export default ViewComponent;
