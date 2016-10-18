'use strict';

import React from 'react';

require('styles//Header.less');
let logo = require('../images/yeoman.png');

class HeaderComponent extends React.Component {
  render() {
    return (
      <div className="header-component">
        <div className="content">
          <div className="header">
            <a href="http://www.parsec.com.cn">
              <img src={logo} alt="秒差距码市" className="logo-image"/>
            </a>
            <ul className="nav">
              <li>
                <a href="#/">首页</a>
              </li>
            </ul>
            <div className="right-zone">
              <div className="login-zone">
                <div className="btns">
                  <a href="#/login" className="button">登录</a>
                  <a href="#/register" className="button">注册</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

HeaderComponent.displayName = 'HeaderComponent';

// Uncomment properties you need
// HeaderComponent.propTypes = {};
// HeaderComponent.defaultProps = {};

export default HeaderComponent;
