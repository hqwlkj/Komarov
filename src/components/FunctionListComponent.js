'use strict';

import React from 'react';
import {Breadcrumb, Button, message, Spin, Tooltip,Switch} from 'antd';
import MiniLogin from './MiniLoginComponent';
import SS from 'parsec-ss';
import dateFormat from 'date-format';
import Clipboard from  'clipboard';
import Config from 'config';
import request from '../Request';

require('styles//FunctionList.less');
let base64 = require('base-64');

class FunctionListComponent extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      visible: false,
      visibleShareLink: false,
      tipMsg:'当前未开启分享，开启将自动创建公开链接。',
      shareLink:'',
      loading: false,
      platformsData:[],
      projectData:{}
    }
    this.getShareLink = this.getShareLink.bind(this);
    this.copyShareLink = this.copyShareLink.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    this.copyShareLink();
    this.loadData(nextProps);
  }

  componentWillMount(){
    this.copyShareLink();
    this.loadData(this.props)
  }

  copyShareLink() {
    let clipboard = new Clipboard('.copy-btn');
    clipboard.on('success', function (e) {
      message.success('复制成功');
      e.clearSelection();
    });
    clipboard.on('error', function () {
      message.error('复制失败');
    });
  }

  loadData(props){
    this.setState({
      loading:true
    });
    let id = props.params.id;
    request({
      type: 'get',
      url: Config.host + '/project/view',
      data: {objectId:id},
      success: (data) => {
        this.setState({
          loading:false,
          projectData: data.result,
          platformsData:data.result.functionList
        },()=>{
          //this.loadFunctionListData(this.state.platformsData.idxtree);
        });
      }
    });
  }

  loadFunctionListData(idxtree){
    this.setState({
      loading: true,
      platformsData:[]
    });
    request({
      type:'post',
      url:Config.host + '/filter/tree',
      data:{
        idxtree:JSON.parse(idxtree)
      },
      success:(data)=>{
        this.setState({
          visible: true,
          loading: false,
          platformsData:data.result,
          resultData:data.result
        });
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
      downloadLoading: true
    },()=>{
      elem_form.submit();
      this.setState({
        downloadLoading: false
      });
    });
  }

  //编辑功能清单
  goToStepTwo(){
    let obj = this.state.projectData;
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


  //得到分享链接
  getShareLink(checked,objectId){
    let shareLink = window.location.protocol + '//' +window.location.host+'/#/projects/view/';
    shareLink += base64.encode(objectId+'-'+new Date().getTime());
    if(checked) {
      this.setState({visibleShareLink: true,tipMsg:'该链接适用于所有人，无需登录(当日有效)。',shareLink:shareLink});
    }else{
      this.setState({visibleShareLink:false,tipMsg:'当前未开启分享，开启将自动创建公开链接。',shareLink:''})
    }
  }
  render() {

    let funItem = (this.state.platformsData || []).map((item)=>{
      let num = 0;
      let tbody = (item.children || []).map((item, index)=> {//第一节
        if (item.children && item.children.length) {//判断是否有二层子节点
          let children = (item.children || []).map((child, cindex)=> {
            if (child.children && child.children.length) {//判断是否有三层子节点
              num += child.children.length;
              let children2 = (child.children || []).map((child2, cindex2)=> {
                return (<label key={child2.idx + '-' + cindex2} htmlFor={item.idx + '-' + child.idx + '-' + child2.idx}
                               className='function-label'>
                  {child2.text}
                </label>);
              });

              return (
                <tr className={cindex % 2 ? 'even' : 'odd'} key={child.idx + '-' + cindex}>
                  { cindex != 0 || <td rowSpan={item.children.length}>{item.text}</td>}
                  <td><label htmlFor={child.idx + '-' + cindex} className='module-label'>
                    <span>{child.text}</span>
                  </label></td>
                  <td>{children2}</td>
                </tr>
              );
            }else{
              // 没有第三节点
              num += 1;
              return (
                <tr className={cindex % 2 ? 'even' : 'odd'} key={child.idx + '-' + cindex}>
                  { cindex != 0 || <td rowSpan={item.children.length}>{item.text}</td>}
                  <td><label htmlFor={child.idx + '-' + cindex} className='module-label'>
                    <span>{child.text}</span>
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
              <td rowSpan={item.children.length}>{item.text}</td>
              <td></td>
              <td></td>
            </tr>
          );
        }
      });
      return(
        <div className='list-box' key={item.idx}>
          <div className='simple-wrapper'>
            <div className='tabs-title'>
              <span className='name'>{item.text}<em>{num}</em></span>
            </div>
          </div>
          <div className='table-wrapper'>
            <div className='functions'>
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

    let shareWrapper = <div className='share-wrapper'>
      <div className='share-header'>
        <label htmlFor=''>分享项目</label>
        <div className='switcher'>
          <Switch defaultChecked={false} onChange={(checked)=>{
            this.getShareLink(checked,this.state.projectData.objectId);
          }}/>
        </div>
        <p className='tip'>{this.state.tipMsg}</p>
        <div className='copy-input-group'>
          <input type='text' id='shareLink' value={this.state.shareLink} readOnly='readOnly' style={{display:this.state.visibleShareLink ? 'inline-block' : 'none'}}/>
          <Tooltip placement='bottomRight' getTooltipContainer={()=>document.querySelector('.share-wrapper')} title='点击复制'>
            <Button data-clipboard-target='#shareLink' icon='copy' className='copy-btn' style={{display:this.state.visibleShareLink ? 'inline-block' : 'none'}} />
          </Tooltip>
        </div>
      </div>
    </div>;

    return (
      <div className='functionlist-component'>
        <div className='content'>
          <div className='breadcrumb-wrapper'>
            <Breadcrumb>
              <Breadcrumb.Item><a href='#/user/projects'>我的项目</a></Breadcrumb.Item>
              <Breadcrumb.Item>功能清单</Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <div className='function-wrapper'>
            <Spin tip='数据加载中...' spinning={this.state.loading}>
              <div className='item-header'>
                <h2 className='item-name'>{this.state.projectData.project_name}</h2>
                <p className='item-desc'>{this.state.projectData.project_desc}</p>
                <div className='info'>
                  <div className='counts'>平台数量：<em>{this.state.projectData.platformNum || 0}</em>个</div>
                  <div className='counts'>功能模块：<em>{this.state.projectData.functionNum || 0}</em>个</div>
                  <div className='time'>创建时间：<em>{!this.state.projectData.createTime || dateFormat('yyyy-MM-dd hh:mm:ss', new Date(this.state.projectData.createTime))}</em></div>
                </div>
                <div className='opera-buttons'>
                  <Button type='primary' icon='edit' onClick={()=>{this.goToStepTwo()}}>编辑功能清单</Button>
                  <Button type='primary' icon='download' onClick={()=>{this.downloadTheReport(JSON.stringify(this.state.projectData.idxtree))}}>下载功能清单</Button>
                  <Tooltip placement='bottomRight'
                           getTooltipContainer={()=>document.querySelector('.opera-buttons')}
                           title={shareWrapper}>
                    <Button type='primary' icon='share-alt'>分享</Button>
                  </Tooltip>
                </div>
              </div>
              <div className='item-main'>
                <p>功能清单</p>
                <div className='function-list-wrapper'>
                  {funItem}
                </div>
              </div>
            </Spin>
          </div>
        </div>
      </div>
    );
  }
}

FunctionListComponent.displayName = 'FunctionListComponent';

// Uncomment properties you need
// FunctionListComponent.propTypes = {};
// FunctionListComponent.defaultProps = {};

export default FunctionListComponent;
