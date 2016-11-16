'use strict';

import React from 'react';
import {Modal} from 'antd';
import classnames from 'classnames';

require('styles//Index.less');

class IndexComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      platformsData: [],
      selectedPaltforms: []
    }
    this.loadData = this.loadData.bind(this);
    this.submitPlatform = this.submitPlatform.bind(this);
  }

  componentWillMount() {
    this.loadData();
  }

  loadData() {
    let platformsData = [{
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
    }];
    this.setState({
      platformsData
    });
  }

  //提交
  submitPlatform() {
    let selectedPaltforms = this.state.selectedPaltforms;
    if (selectedPaltforms.length > 0) {
      window.location.href = '#/step-2?platforms='+selectedPaltforms.join(',');
      // this.props.history.push({
      //   pathname: '/step-2/',
      //   query: {platforms: selectedPaltforms.join(',')}
      // });
    }
  }

  render() {
    let paltformItem = (this.state.platformsData || []).map((item, index)=> {
      return (
        <li className={classnames('column-short', {
          'current': this.state.selectedPaltforms.filter(idx => item.idx === idx).length != 0
        })} key={index}>
          <label htmlFor={item.idx + '-' + index}>
            <i className="iconfont" dangerouslySetInnerHTML={{__html: item.icon}}></i>
            <em className="platform-title">{item.name}</em>
            <input type="checkbox" id={item.idx + '-' + index} name="platform" checked={
              this.state.selectedPaltforms.filter(idx => item.idx === idx).length != 0
            } value={item.idx} onChange={(event)=> {
              if (event.target.checked) {
                let selectedPaltforms = this.state.selectedPaltforms;
                let idx = event.target.value;
                if(idx != 'P.a'){
                  Modal.info({
                    title: '提示信息',
                    content: '该平台未开放，敬请期待',
                    onOk:()=> {}
                  });
                  return;
                }
                selectedPaltforms.push(idx);
                this.setState({
                  selectedPaltforms
                });
              } else {
                this.setState({
                  selectedPaltforms: this.state.selectedPaltforms.filter(idx =>idx != item.idx)
                });
              }
            }}/>
            <span className="checked">
              <span className="fa fa-check">&#xe606;</span>
            </span>
          </label>
        </li>
      );
    });
    return (
      <div className="index-component">
        <div className="quote">
          <ul className="steps clearfix">
            <li className="current">
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
            <li className="">
              <em>3</em>
              <span>
                <label>第三步，</label>
                <label>评估结果</label>
              </span>
            </li>
          </ul>
          <div className="description">
            <h1>自助评估您的项目价格和周期</h1>
            <p>轻松完成您的项目评估，获得码市承诺报价，不仅低于同等服务市场平均价格，而且码市提供项目开发过程的管控，保障交付。</p>
          </div>
          <div className="form">
            <ul className="platforms clearfix visible">
              {paltformItem}
            </ul>
            <div className="next">
              <button type="button" disabled={this.state.selectedPaltforms.length > 0 ? false : true} className={this.state.selectedPaltforms.length > 0 ? 'button primary' : 'button disabled'} onClick={()=> { this.submitPlatform() }}>下一步</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

IndexComponent.displayName = 'IndexComponent';

// Uncomment properties you need
// IndexComponent.propTypes = {};
// IndexComponent.defaultProps = {};

export default IndexComponent;
