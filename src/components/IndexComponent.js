'use strict';

import React from 'react';
import {Form} from 'antd';

require('styles//Index.less');

class IndexComponent extends React.Component {
  render() {
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
                  <li className="current column-short">
                      <label htmlFor="P001-1">
                        <i className="iconfont">&#xe602;</i>
                          <em className="platform-title">Web网站</em>
                          <input type="checkbox" id="P001-1" name="platform" value='P001'/>
                          <span className="checked">
                            <span className="fa fa-check">&#xe606;</span>
                          </span>
                      </label>
                  </li>
                  <li className="column-short">
                      <label htmlFor="P002-1">
                          <i className="iconfont">&#xe603;</i>
                          <em className="platform-title">移动应用iOS</em>
                          <input type="checkbox" id="P002-1" name="platform" value='P002'/>
                          <span className="checked">
                            <span className="fa fa-check">&#xe606;</span>
                          </span>
                      </label>
                  </li>
              </ul>
          </div>
        </div>
      </div>
    );
  }
}

IndexComponent.displayName = 'IndexComponent';
IndexComponent = new Form.create()(IndexComponent);

// Uncomment properties you need
// IndexComponent.propTypes = {};
// IndexComponent.defaultProps = {};

export default IndexComponent;
