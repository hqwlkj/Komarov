'use strict';

import React from 'react';
import {Breadcrumb, Button, Modal, Form, Input, Row, Col, message, Spin, Switch, Icon, Pagination} from 'antd';
import MiniLogin from './MiniLoginComponent';
import classnames from 'classnames';
import SS from 'parsec-ss';
import dateFormat from 'date-format';
import Config from 'config';
import request from '../Request';
require('styles//Projects.less');

let marker2;
let mapIcon = require('../images/curlocation.png');

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
      }, {
        idx: 'P.b',
        name: '后台管理',
        icon: '&#xe61d;'
      }],
      projectData:[],
      loading:false,
      visible:false,
      viewMode:false,
      downloadLoading:false,
      params:{
        pageNo:1,
        pageSize:12,
        total:0
      }
    }
    this.loadData = this.loadData.bind(this);
    this.handleDeleteProject = this.handleDeleteProject.bind(this);
    this.downloadTheReport = this.downloadTheReport.bind(this);
    this.goToStepTwo = this.goToStepTwo.bind(this);
    this.handleShowSizeChange = this.handleShowSizeChange.bind(this);
    this.handlePagination = this.handlePagination.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
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
      data: {
        pageNo:this.state.params.pageNo,
        pageSize:this.state.params.pageSize
      },
      success: (data) => {
        let params = this.state.params;
        params.total = data.total;
        this.setState({
          loading:false,
          projectData: data.result,
          params:params
        });
      }
    });
  }

  //分页操作-修改每页显示的条数时候触发
  handleShowSizeChange(current, pageSize){
    let params = this.state.params;
    params.pageNo = current;
    params.pageSize = pageSize;
    this.setState({params},()=>{
      this.loadData()
    })
  }
  //分页查询
  handlePagination(current){
    let params = this.state.params;
    params.pageNo = current;
    this.setState({params},()=>{
      this.loadData()
    })
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

  //视图切换
  handleSwitchOnChange(checked){
    this.setState({
      viewMode:checked
    });
  }

  //查询
  handleSearch(value) {
    let params = this.state.params;
    params.pageNo = 1;
    params.projectName = value;
    this.setState({params},()=>{
      this.loadData()
    })
  }

  render() {
    //项目ITEM
    let listViewItem = (this.state.projectData || []).map((item,index)=>{
      let icon = '';
      if(!!item.idxtree){
        let idxs = item.idxtree;
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
              <div className="time">创建时间：<em>{!item.updateTime || dateFormat('yyyy-MM-dd hh:mm:ss', new Date(item.updateTime))}</em></div>
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

    let gridViewItem = (this.state.projectData || []).map((item,index)=>{
      let icon = '';
      if(!!item.idxtree){
        let idxs = item.idxtree;
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
        <li className="platforms-item" key={index}>
          <div className="platform-close" onClick={()=>{this.handleDeleteProject(item.objectId)}}>
            <em className="close-text">删除</em>
            <a href="javascript:void(0);" className="close-btn"><i className="iconfont">&#xe617;</i></a>
          </div>
          <div className="platforms-folder" onClick={()=>{window.location.href='#/user/projects/'+item.objectId}}>
            <div className="time">{!item.updateTime || dateFormat('yyyy-MM-dd hh:mm:ss', new Date(item.updateTime))}</div>
            <div className="icons" style={{display:'none'}}>
              <div className="icon-wrapper">
                {icon}
              </div>
            </div>
            <div className="folder-info">
              <div className="platform-title">{item.project_name}</div>
              <div className="platform-counts">功能模块：<em>{item.functionNum}</em>个</div>
            </div>

          </div>
          <div className="platform-title hide" onClick={()=>{window.location.href='#/user/projects/'+item.objectId}}>{item.project_name}</div>
        </li>
      );
    });

    return (
      <div className="projects-component">
        <div className="content">
          <div className="breadcrumb-wrapper">
            <Row>
              <Col span={12}>
                <Breadcrumb>
                  <Breadcrumb.Item>我的项目</Breadcrumb.Item>
                </Breadcrumb>
              </Col>
              <Col span={12} className='breadcrumb-nav'>
                <Switch defaultChecked={this.state.viewMode} style={{display:'none'}} onChange={this.handleSwitchOnChange.bind(this)} checkedChildren={<i className="iconfont">&#xe616;</i>} unCheckedChildren={<i className="iconfont">&#xe618;</i>}/>
                <SearchInput placeholder="请输入项目名称" onSearch={(value)=>{this.handleSearch(value)}} style={{ width: 200 }}/>
              </Col>
            </Row>
          </div>
          <div className="projects-wrapper">
            <Spin tip="数据加载中..." spinning={this.state.loading}>
              { this.state.viewMode ?
                <ul className="quotes clearfix">
                  {listViewItem}
                </ul>
                :
                <ul className="quotes grid-view clearfix">
                  {gridViewItem}
                  {/*<li className="platforms-item">*/}
                    {/*<div className="platform-close">*/}
                      {/*<em className="close-text">删除</em>*/}
                      {/*<a href="javascript:void(0);" className="close-btn"><i className="iconfont">&#xe617;</i></a>*/}
                    {/*</div>*/}
                    {/*<div className="platforms-folder">*/}
                      {/*<div className="time">2016-11-11 12:00:00</div>*/}
                      {/*<div className="icons">*/}
                        {/*<div className="icon-wrapper">*/}
                          {/*<i className="iconfont">&#xe603;</i>*/}
                        {/*</div>*/}
                      {/*</div>*/}
                    {/*</div>*/}
                    {/*<div className="platform-title">这里是项目名称</div>*/}
                  {/*</li>*/}
                  {/*<li className="platforms-item">*/}
                    {/*<div className="platforms-folder">*/}
                      {/*<div className="time">2016-11-11 12:00:00</div>*/}
                      {/*<div className="icons">*/}
                        {/*<div className="icon-wrapper">*/}
                          {/*<i className="iconfont">&#xe603;</i>*/}
                          {/*<i className="iconfont">&#xe603;</i>*/}
                          {/*<i className="iconfont">&#xe603;</i>*/}
                        {/*</div>*/}
                      {/*</div>*/}
                    {/*</div>*/}
                    {/*<div className="platform-title">这里是项目名称</div>*/}
                  {/*</li>*/}
                  {/*<li className="platforms-item">*/}
                    {/*<div className="platforms-folder">*/}
                      {/*<div className="time">2016-11-11 12:00:00</div>*/}
                      {/*<div className="icons">*/}
                        {/*<div className="icon-wrapper">*/}
                          {/*<i className="iconfont">&#xe603;</i>*/}
                          {/*<i className="iconfont">&#xe603;</i>*/}
                          {/*<i className="iconfont">&#xe603;</i>*/}
                          {/*<i className="iconfont">&#xe603;</i>*/}
                          {/*<i className="iconfont">&#xe603;</i>*/}
                          {/*<i className="iconfont">&#xe603;</i>*/}
                        {/*</div>*/}
                      {/*</div>*/}
                    {/*</div>*/}
                    {/*<div className="platform-title">这里是项目名称</div>*/}
                  {/*</li>*/}

                </ul>
              }
              <div className="quotes-pagination">
                <Pagination className="pagination" showSizeChanger pageSizeOptions={['12','24','48','96']} onChange={this.handlePagination} onShowSizeChange={this.handleShowSizeChange} defaultCurrent={1} defaultPageSize={this.state.params.pageSize} total={this.state.params.total} />
              </div>
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


class SearchInput extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      value: '',
      focus: false,
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFocusBlur = this.handleFocusBlur.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }
  handleInputChange(e) {
    this.setState({
      value: e.target.value,
    });
  }
  handleFocusBlur(e) {
    this.setState({
      focus: e.target === document.activeElement,
    });
  }
  handleSearch() {
    if (this.props.onSearch) {
      this.props.onSearch(this.state.value);
    }
  }

  render() {
    const { style, size, placeholder } = this.props;
    const btnCls = classnames({
      'ant-search-btn': true,
      'ant-search-btn-noempty': !!this.state.value.trim(),
    });
    const searchCls = classnames({
      'ant-search-input': true,
      'ant-search-input-focus': this.state.focus,
    });
    return (
      <div className="ant-search-input-wrapper" style={style}>
        <Input.Group className={searchCls}>
          <Input placeholder={placeholder} value={this.state.value} onChange={this.handleInputChange}
                 onFocus={this.handleFocusBlur} onBlur={this.handleFocusBlur} onPressEnter={this.handleSearch}
          />
          <div className="ant-input-group-wrap">
            <Button icon="search" className={btnCls} size={size} onClick={this.handleSearch} />
          </div>
        </Input.Group>
      </div>
    );
  }
}
