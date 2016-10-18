require('normalize.css/normalize.css');
require('styles/App.less');

import React from 'react';
import {Row, Col} from 'antd';

import Foooter from './FooterComponent';
import Header from './HeaderComponent';
import Index from './IndexComponent';

let yeomanImage = require('../images/yeoman.png');

class AppComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="container">
                <Header />
                <div className="content-wrapper">
                    <Index />
                </div>
                <Foooter/>
            </div>
        );
    }
}

AppComponent.defaultProps = {};

export default AppComponent;
