'use strict';

import React from 'react';
import {Tabs, Button, Badge, Spin, Tooltip} from 'antd';
import MiniLogin from './MiniLoginComponent';
import classnames from 'classnames';
import SS from 'parsec-ss';
import Config from 'config';
import console from '../Console';
import requset from '../Request';

require('styles//StepThree.less');

class StepThreeComponent extends React.Component {
  constructor(props){
    super(props);
    this.state={
      loading:false,
      platformsData:[],
      selectedPlatformsData:[]
    }
    this.submitSaveQuote = this.submitSaveQuote.bind(this);
  }

  componentWillMount(){
    let platforms = this.props.location.query.platforms.split(',');
    this.setState({
      selectedPaltforms: platforms
    }, ()=> {
      this.loadData();
    });
  }
  loadData(){
    let platformsData = [{
      id: 'P001',
      name: 'Web网站',
      icon: '&#xe602;'
    }, {
      id: 'P002',
      name: '移动应用iOS',
      icon: '&#xe603;'
    }, {
      id: 'P003',
      name: '移动应用Android',
      icon: '&#xe605;'
    }, {
      id: 'P004',
      name: '微信公众号',
      icon: '&#xe601;'
    }, {
      id: 'P005',
      name: '前端项目',
      icon: '&#xe600;'
    }, {
      id: 'P006',
      name: '其他项目',
      icon: '&#xe604;'
    }];
    let selectedPlatformsData = [];
    for (let i = 0; i < platformsData.length; i++) {
      for (let j = 0; j < this.state.selectedPaltforms.length; j++) {
        let platform = platformsData[i];
        let key = this.state.selectedPaltforms[j];
        if (platform.id === key) {
          selectedPlatformsData.push(platform);
        }
      }
    }
    setTimeout(()=> {
      this.setState({
        loading: false,
        platformsData,
        selectedPlatformsData
      });
    }, 1500);
  }

  submitSaveQuote(){

  }
  render() {
    const operations = <Button>下载报表</Button>;

    let tabPaneItem = (this.state.selectedPlatformsData || []).map((item, index)=> {
      return (
        <Tabs.TabPane tab={<Badge count={2}><span className="tab-title">{item.name}</span></Badge>} key={index}>
          <div className="pane-body">
            <div className="pane-body-wrapper">
              <div className="functions">
                这里是整理表格信息
              </div>
            </div>
          </div>
        </Tabs.TabPane>
      );
    });

    return (
      <div className="stepthree-component">
        <div className="quote">
          <ul className="steps clearfix">
            <li className="">
              <em>1</em>
              <span>
                    <label>第一步，</label>
                    <label>项目类型</label>
                </span>
            </li>
            <li className="">
              <em>2</em>
              <span>
                    <label>第二步，</label>
                    <label>功能评估</label>
                </span>
            </li>
            <li className="current">
              <em>3</em>
              <span>
                    <label>第三步，</label>
                    <label>评估结果</label>
                </span>
            </li>
          </ul>
          <div className="wrapper">
            <Spin spinning={this.state.loading}>
              <Tabs tabBarExtraContent={operations} className='tabs' defaultActiveKey="0">
                {tabPaneItem}
              </Tabs>
            </Spin>
            <div className="button-wrapper">
              <button type="submit"
                      className={this.state.selectedPaltforms.length > 0 ? 'button primary' : 'button disabled'}
                      onClick={()=> {
                        this.submitSaveQuote()
                      }}>保存到我的评估
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

StepThreeComponent.displayName = 'StepThreeComponent';

// Uncomment properties you need
// StepThreeComponent.propTypes = {};
// StepThreeComponent.defaultProps = {};

export default StepThreeComponent;
