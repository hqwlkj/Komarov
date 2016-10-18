'use strict';

import React from 'react';

require('styles//Footer.less');
let wechat = require('images//parsec-wechat.jpg');

class FooterComponent extends React.Component {
  render() {
    return (
      <div className="footer-component">
        <div className="content">
          <div className="help-contain clearfix">
            <p>
              <span>友情链接：</span>
              <span><a target="_blank" href="https://www.uber.com/?exp=home_signup_form">Uber 中国</a></span>
              <b>|</b>
              <span><a target="_blank" href="http://www.xiaojukeji.com/index/index">滴滴打车</a></span>
              <b>|</b>
              <span><a target="_blank" href="https://mp.weixin.qq.com/">微信公众平台</a></span>
            </p>
          </div>
          <div className="company-info clearfix">
            <div className="fl">
              <p>© 2016 parsec.com.cn All rights reserved 重庆市秒差距科技有限公司</p>
              <p>电信与信息服务业务经营许可证：渝ICP备13005505号</p>
            </div>
            <div className="fr" style={{width:'280px'}}>
              <div className="fr" style={{backgroundColor:'#ffffff'}}>
                <img src={wechat} alt="" width='80x' height='80px'/>
              </div>
              <p>微信：扫描二维码咨询在线客服</p>
              <p>邮箱：hr@parsec.com.cn</p>
              <p>电话：023-63200347</p>
              <p>时间：9:00-18:00</p>
            </div>
          </div>
        </div>

      </div>
    );
  }
}

FooterComponent.displayName = 'FooterComponent';

// Uncomment properties you need
// FooterComponent.propTypes = {};
// FooterComponent.defaultProps = {};

export default FooterComponent;
