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
import $ from 'jquery';
import SS from  'parsec-ss';
import Config from 'config';
import Main from './components/Main';
import Index from './components/IndexComponent';
import Login from './components/LoginComponent';
import Register from './components/RegisterComponent';
import MiniLogin from './components/MiniLoginComponent';


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
                <Route path='/minilogin' component={MiniLogin} breadcrumbName='迷你登录'/>
                <Route path='/' component={Main} breadcrumbName='首页'>
                    <IndexRoute component={Index}/>
                </Route>
            </Router>
        );
    }
}


// Render the main component into the dom
ReactDOM.render(<App />, document.getElementById('app'));
