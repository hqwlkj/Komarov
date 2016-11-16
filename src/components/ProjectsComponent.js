'use strict';

import React from 'react';
import {Breadcrumb, Button, Modal, Form, Input, Row, Col, message, Spin} from 'antd';
import MiniLogin from './MiniLoginComponent';
import SS from 'parsec-ss';
import dateFormat from 'date-format';
import Config from 'config';
import request from '../Request';
require('styles//Projects.less');

class ProjectsComponent extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      badgeData: [{
        idx: 'P.a',
        name: 'Web网站',
        icon: '&#xe602;'
      }, {
        idx: 'P002',
        name: '移动应用iOS',
        icon: '&#xe603;'
      }, {
        idx: 'P003',
        name: '移动应用Android',
        icon: '&#xe605;'
      }, {
        idx: 'P004',
        name: '微信公众号',
        icon: '&#xe601;'
      }, {
        idx: 'P005',
        name: '前端项目',
        icon: '&#xe600;'
      }, {
        idx: 'P006',
        name: '其他项目',
        icon: '&#xe604;'
      }],
      projectData:[],
      loading:false,
      downloadLoading:false
    }
    this.loadData = this.loadData.bind(this);
    this.handleDeleteProject = this.handleDeleteProject.bind(this);
    this.downloadTheReport = this.downloadTheReport.bind(this);
    this.goToStepTwo = this.goToStepTwo.bind(this);
  }

  componentWillMount(){
    this.loadData();
  }
  loadData(){
    this.setState({
      loading:true
    });
    request({
      type: 'get',
      url: Config.host + '/project/find',
      data: {},
      success: (data) => {
        this.setState({
          loading:false,
          projectData: data.result
        });
      }
    });
  }

  //删除项目
  handleDeleteProject(id){
    Modal.confirm({
      title: '你是否确认删除该项目信息',
      content: '项目删除之后不能恢复哦！',
      okText: '确认',
      cancelText: '取消',
      onOk:()=>{
        request({
          type:'get',
          url: Config.host +'/project/delete',
          data:{
            objectId:id
          },
          success:(data)=>{
            message.success(data.message);
            this.loadData();
          }
        })
      }
    });
  }

  //下载报表
  downloadTheReport(idxtree){
    if (SS.get(Config.token) === null) {
      MiniLogin.show(()=> {});
      return;
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
    },()=>{
      elem_form.submit();
      this.setState({
        downloadLoading: false,
      });
    });
  }

  //编辑功能清单
  goToStepTwo(obj){
    let selectedPaltforms = [];
    let idxs = obj.idxtree;
    idxs.forEach((idx)=>{
      for(var key in idx){
        selectedPaltforms.push(key);
      }
    });
    SS.setObj(Config.project,obj);
    window.location.href = '#/step-2?platforms='+selectedPaltforms.join(',');
  }

  render() {

    //项目ITEM
    let projectItem = (this.state.projectData || []).map((item,index)=>{
      let icon = '';
      if(!!item.idxtree){

        console.log('item.idxtree',item.idxtree);
        let idxs = item.idxtree;
        console.log('idxs',idxs);
        let selectedPaltforms = [];
        idxs.forEach((idx)=>{
          for(var key in idx){
            selectedPaltforms.push(key);
          }
        });
        icon = (selectedPaltforms || []).map((idx)=>{
          for(let i = 0; i < this.state.badgeData.length; i++){
            let badge = this.state.badgeData[i];
            if(idx === badge.idx){
              return(<i className="iconfont" dangerouslySetInnerHTML={{__html: badge.icon}} key={idx+'_'+index}></i>);
            }
          }
        });
      }

      return(
        <li className="flex-box" key={index}>
          <div className="platforms flex-auto-justify">
            <div className="icons">
              <div className="icon-wrapper">
                {icon}
              </div>
            </div>
          </div>
          <div className="detail">
            <h1 className="ellipsis">{item.project_name}</h1>
            <p className="ellipsis">{item.project_desc}</p>
            <div className="info">
              <div className="counts">平台数量：<em>{item.platformNum}</em>个</div>
              <div className="counts">功能模块：<em>{item.functionNum}</em>个</div>
              <div className="time">创建时间：<em>{dateFormat('yyyy-MM-dd hh:mm:ss', new Date(item.createTime))}</em></div>
            </div>
            <div className="opera-buttons">
              <Button size="small" icon='eye' onClick={()=>{window.location.href='#/user/projects/'+item.objectId}}>查看功能清单</Button>
              <Button size="small" icon='edit' onClick={()=>{this.goToStepTwo(item)}}>编辑功能清单</Button>
              <Button size="small" icon='download' onClick={()=>{this.downloadTheReport(JSON.stringify(item.idxtree))}}>下载功能清单</Button>
              <Button size="small" icon='delete' onClick={()=>{this.handleDeleteProject(item.objectId)}}>删除</Button>
            </div>
          </div>
        </li>
      );
    });

    return (
      <div className="projects-component">
        <div className="content">
          <div className="breadcrumb-wrapper">
            <Breadcrumb>
              <Breadcrumb.Item>我的项目</Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <div className="projects-wrapper">
            <Spin tip="数据加载中..." spinning={this.state.loading}>
              <ul className="quotes clearfix">
                {projectItem}
              </ul>
            </Spin>
          </div>
        </div>
      </div>
    );
  }
}

ProjectsComponent.displayName = 'ProjectsComponent';

// Uncomment properties you need
// ProjectsComponent.propTypes = {};
// ProjectsComponent.defaultProps = {};

export default ProjectsComponent;
