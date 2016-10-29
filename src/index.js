require('styles/antd.less');
require('normalize.css/normalize.css');

require('es5-shim');
require('es5-shim/es5-sham');
require('console-polyfill');
require('babel-polyfill');

import 'core-js/fn/object/assign';

import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, hashHistory} from 'react-router';
import SS from  'parsec-ss';
import Config from 'config';
import Main from './components/Main';
import StepOne from './components/IndexComponent';
import Login from './components/LoginComponent';
import Register from './components/RegisterComponent';
import UserCenter from './components/UserCenterComponent';
import PwdSetting from './components/PwdSettingComponent';
import StepTwo from './components/StepTwoComponent';
import StepThree from './components/StepThreeComponent';


class App extends React.Component {
  constructor(props) {
    super(props);
  }

  //权限验证(是否登录)
  handleAuth(nextState, replace) {
    // if (SS.get(Config.token) == null) {
    //     window.location.href = '#/login';
    // }
    return true;
  }

  render() {
    return (
      <Router history={hashHistory}>
        <Route path='/login' component={Login}/>
        <Route path='/register' component={Register}/>
        <Route path='/' component={Main} breadcrumbName='首页'>
          <IndexRoute component={StepOne}/>
          <Route path='/step-2' component={StepTwo} breadcrumbName='第二步'/>
          <Route path='/step-3' component={StepThree} breadcrumbName='第三步'/>
          <Route path='/user/center' component={UserCenter} breadcrumbName='个人信息'/>
          <Route path='/password/setting' component={PwdSetting} breadcrumbName='修改密码'/>
        </Route>
      </Router>
    );
  }
}


// Render the main component into the dom
ReactDOM.render(<App />, document.getElementById('app'));
