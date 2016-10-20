'use strict';

import React from 'react';
import {Tabs, Button, Badge, Spin, Tooltip} from 'antd';
import MiniLogin from './MiniLoginComponent';
import classnames from 'classnames';
import SS from 'parsec-ss';
import Config from 'config';
import console from '../Console';
import requset from '../Request';

require('styles//StepTwo.less');

class StepTwoComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      platformsChildData: [],
      platformsData: [],
      selectedPlatformsData: [],
      previewData:{
        title:'功能点描述',
        desc:'鼠标移动到对应的功能点上，此处会显示功能点说明',
        img:''
      },
      loading: false,
      visiblePaltform: false,
      selectedPaltforms: [],
      selectedItemTwoKeys: [],
      previewTop: 0
    }
    this.loadData = this.loadData.bind(this);
    this.editPaltform = this.editPaltform.bind(this);
    this.submitCalculateResults = this.submitCalculateResults.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    let platforms = this.props.location.query.platforms.split(',');
    console.log('platforms', platforms);
    this.setState({
      selectedPaltforms: platforms
    }, ()=> {
      this.loadData();
    });
  }

  componentWillMount() {
    let platforms = this.props.location.query.platforms.split(',');
    console.log('platforms', platforms);
    this.setState({
      selectedPaltforms: platforms
    }, ()=> {
      this.loadData();
    });
  }

  loadData() {
    this.setState({
      loading: true,
      platformsData: [],
      platformsChildData: []
    });
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

    let platformsChildData = [{
      "text": "\u6ce8\u518c\u767b\u5f55",
      "children": [{
        "text": "1.1 \u5f00\u653e\u5f0f\u6ce8\u518c",
        "children": [{
          "text": "1.1.1.a \u6ce8\u518c",
          "detail": "",
          "idx": 0
        }, {"text": "1.1.1.b \u6ce8\u518c\u7ba1\u7406", "detail": "", "idx": 1}, {
          "text": "1.1.2.a \u767b\u5f55",
          "detail": "",
          "idx": 2
        }],
        "idx": 0
      }, {
        "text": "1.2 \u5c01\u95ed\u5f0f\u6ce8\u518c",
        "children": [{
          "text": "1.2.1.a  \u6ce8\u518c",
          "detail": "",
          "idx": 0
        }, {"text": "1.2.1.b \u6ce8\u518c\u7ba1\u7406", "detail": "", "idx": 1}, {
          "text": "1.2.2.a \u767b\u5f55",
          "detail": "",
          "idx": 2
        }],
        "idx": 1
      }, {
        "text": "1.3 \u5ba1\u6838\u5f0f\u6ce8\u518c",
        "children": [{
          "text": "1.3.1.a \u6ce8\u518c",
          "detail": "",
          "idx": 0
        }, {"text": "1.3.1.b \u6ce8\u518c\u7ba1\u7406", "detail": "", "idx": 1}, {
          "text": "1.3.2.a \u767b\u5f55",
          "detail": "",
          "idx": 2
        }],
        "idx": 2
      }, {
        "text": "1.4 \u6ce8\u518c\u9080\u8bf7\u7801\u6a21\u5f0f",
        "children": [{
          "text": "1.4.1.a \u9080\u8bf7\u7801",
          "detail": "",
          "idx": 0
        }, {
          "text": "1.4.1.b \u9080\u8bf7\u7801\u7ba1\u7406",
          "detail": "",
          "idx": 1
        }, {
          "text": "1.4.2.a \u9080\u8bf7\u7801\u6e38\u620f\u89c4\u5219",
          "detail": "",
          "idx": 2
        }, {"text": "1.4.2.b \u9080\u8bf7\u7801\u6e38\u620f\u89c4\u5219\u8bbe\u7f6e", "detail": "", "idx": 3}],
        "idx": 3
      }, {
        "text": "1.5 \u4fee\u6539\u5bc6\u7801",
        "children": [{
          "text": "1.5.1.a \u7528\u6237\u4fee\u6539\u5bc6\u7801",
          "detail": "",
          "idx": 0
        }, {
          "text": "1.5.2.a \u7528\u6237\u627e\u56de\u5bc6\u7801",
          "detail": "",
          "idx": 1
        }, {"text": "1.5.2.b \u540e\u53f0\u91cd\u7f6e\u5bc6\u7801", "detail": "", "idx": 2}],
        "idx": 4
      }],
      "idx": 0
    }, {
      "text": "\u9996\u9875",
      "children": [{
        "text": "2.1 \u6807\u51c6\u56fe\u6587\u8f6e\u64ad",
        "children": [{
          "text": "2.1.1.a \u56fe\u6587\u8f6e\u64ad",
          "detail": "",
          "idx": 0
        }, {
          "text": "2.1.1.b \u8f6e\u64ad\u8bbe\u7f6e",
          "detail": "",
          "idx": 1
        }, {
          "text": "2.1.2.a \u56fe\u6587\u8be6\u60c5",
          "detail": "",
          "idx": 2
        }, {"text": "2.1.2.b \u8be6\u60c5\u8bbe\u7f6e", "detail": "", "idx": 3}],
        "idx": 0
      }, {
        "text": "2.2 \u5e26\u6d3b\u52a8\u56fe\u6587\u8f6e\u64ad",
        "children": [{
          "text": "2.2.1.a \u56fe\u6587\u8f6e\u64ad",
          "detail": "",
          "idx": 0
        }, {
          "text": "2.2.1.b \u8f6e\u64ad\u8bbe\u7f6e",
          "detail": "",
          "idx": 1
        }, {
          "text": "2.2.2.a \u56fe\u6587\u8be6\u60c5",
          "detail": "",
          "idx": 2
        }, {"text": "2.2.2.b \u8be6\u60c5\u8bbe\u7f6e", "detail": "", "idx": 3}],
        "idx": 1
      }, {
        "text": "2.3 \u8fd0\u8425\u5f0f\u56fe\u6587\u8f6e\u64ad",
        "children": [{
          "text": "2.3.1.a \u56fe\u6587\u8f6e\u64ad",
          "detail": "",
          "idx": 0
        }, {
          "text": "2.3.1.b \u6295\u653e\u89c4\u5219",
          "detail": "",
          "idx": 1
        }, {
          "text": "2.3.2.a \u56fe\u6587\u8be6\u60c5",
          "detail": "",
          "idx": 2
        }, {"text": "2.3.2.b \u8be6\u60c5\u8bbe\u7f6e", "detail": "", "idx": 3}],
        "idx": 2
      }, {
        "text": "2.4 \u6807\u51c6\u4ea7\u54c1\u63a8\u8350",
        "children": [{
          "text": "2.4.1.a \u4ea7\u54c1\u5c55\u793a",
          "detail": "",
          "idx": 0
        }, {"text": "2.4.1.b \u4ea7\u54c1\u63a8\u8350", "detail": "", "idx": 1}, {
          "text": "2.4.2.a \u70b9\u51fb",
          "detail": "",
          "idx": 2
        }, {"text": "2.4.3.a \u4ea7\u54c1\u8be6\u60c5", "detail": "", "idx": 3}],
        "idx": 3
      }, {
        "text": "2.5 \u89c4\u5219\u5f0f\u4ea7\u54c1\u63a8\u8350",
        "children": [{
          "text": "2.5.1.a \u4ea7\u54c1\u5c55\u793a",
          "detail": "",
          "idx": 0
        }, {"text": "2.5.1.b \u4ea7\u54c1\u63a8\u8350", "detail": "", "idx": 1}, {
          "text": "2.5.2.a \u70b9\u51fb",
          "detail": "",
          "idx": 2
        }, {"text": "2.5.3.a \u4ea7\u54c1\u8be6\u60c5", "detail": "", "idx": 3}],
        "idx": 4
      }, {
        "text": "2.6 \u8fd0\u8425\u5f0f\u4ea7\u54c1\u63a8\u8350",
        "children": [{
          "text": "2.6.1.a \u4ea7\u54c1\u5c55\u793a",
          "detail": "",
          "idx": 0
        }, {"text": "2.6.1.b \u4ea7\u54c1\u63a8\u8350", "detail": "", "idx": 1}, {
          "text": "2.6.3.a \u70b9\u51fb",
          "detail": "",
          "idx": 2
        }, {"text": "2.6.4.a \u4ea7\u54c1\u8be6\u60c5", "detail": "", "idx": 3}],
        "idx": 5
      }, {
        "text": "2.7 \u57fa\u7840\u641c\u7d22",
        "children": [{
          "text": "2.7.1.a \u641c\u7d22",
          "detail": "",
          "idx": 0
        }, {"text": "2.7.2.b \u641c\u7d22\u5217\u8868", "detail": "", "idx": 1}],
        "idx": 6
      }, {
        "text": "2.8 \u5168\u6587\u641c\u7d22",
        "children": [{
          "text": "2.8.1.a \u641c\u7d22",
          "detail": "",
          "idx": 0
        }, {"text": "2.8.2.a \u641c\u7d22\u5217\u8868", "detail": "", "idx": 1}],
        "idx": 7
      }, {
        "text": "2.9 \u591a\u7ef4\u5ea6\u641c\u7d22",
        "children": [{"text": "2.9.2.a \u641c\u7d22\u5217\u8868", "detail": "", "idx": 0}],
        "idx": 8
      }],
      "idx": 1
    }, {
      "text": "\u4ea7\u54c1\u7ba1\u7406",
      "children": [{
        "text": "3.1  \u4ea7\u54c1\u5206\u7c7b",
        "children": [{
          "text": "3.1.1.a  \u5355\u4e2a\u5546\u5bb6\u5206\u7c7b",
          "detail": "",
          "idx": 0
        }, {
          "text": "3.1.1.b  \u5355\u4e2a\u5546\u5bb6\u5206\u7c7b",
          "detail": "",
          "idx": 1
        }, {
          "text": "3.1.2.a  \u591a\u4e2a\u5546\u5bb6\u5206\u7c7b",
          "detail": "",
          "idx": 2
        }, {"text": "3.1.2.b  \u591a\u4e2a\u5546\u5bb6\u5206\u7c7b", "detail": "", "idx": 3}],
        "idx": 0
      }, {
        "text": "3.2  \u4ea7\u54c1\u5217\u8868",
        "children": [{
          "text": "3.2.1.a  \u975e\u652f\u4ed8\u7c7b\u5217\u8868",
          "detail": "",
          "idx": 0
        }, {
          "text": "3.2.1.b  \u975e\u652f\u4ed8\u7c7b\u5217\u8868",
          "detail": "",
          "idx": 1
        }, {
          "text": "3.2.2.a  \u652f\u4ed8\u7c7b\u5217\u8868",
          "detail": "",
          "idx": 2
        }, {"text": "3.2.2.b  \u652f\u4ed8\u7c7b\u5217\u8868", "detail": "", "idx": 3}],
        "idx": 1
      }, {
        "text": "3.3  \u4ea7\u54c1\u8be6\u60c5",
        "children": [{
          "text": "3.3.1.a  \u4ea7\u54c1\u4e3b\u4f53\u4fe1\u606f",
          "detail": "",
          "idx": 0
        }, {
          "text": "3.3.1.b  \u4ea7\u54c1\u4e3b\u4f53\u4fe1\u606f",
          "detail": "",
          "idx": 1
        }, {
          "text": "3.3.2.a  \u5bcc\u5a92\u4f53\u4fe1\u606f",
          "detail": "",
          "idx": 2
        }, {
          "text": "3.3.2.b  \u5bcc\u5a92\u4f53\u4fe1\u606f",
          "detail": "",
          "idx": 3
        }, {"text": "3.3.3.a  \u8d2d\u4e70", "detail": "", "idx": 4}, {
          "text": "3.3.3.b  \u8d2d\u4e70",
          "detail": "",
          "idx": 5
        }, {
          "text": "3.3.4.a  \u4f7f\u7528\u652f\u4ed8",
          "detail": "",
          "idx": 6
        }, {"text": "3.3.4.b  \u4f7f\u7528\u652f\u4ed8", "detail": "", "idx": 7}, {
          "text": "3.3.5.a  \u5206\u4eab",
          "detail": "",
          "idx": 8
        }, {"text": "3.3.5.b  \u5206\u4eab", "detail": "", "idx": 9}, {
          "text": "3.6.4.a  \u8bc4\u4ef7",
          "detail": "",
          "idx": 10
        }, {"text": "3.6.4.b  \u8bc4\u4ef7", "detail": "", "idx": 11}, {
          "text": "3.6.5.a  \u6536\u85cf",
          "detail": "",
          "idx": 12
        }, {"text": "3.6.5.b  \u6536\u85cf", "detail": "", "idx": 13}],
        "idx": 2
      }],
      "idx": 2
    }, {
      "text": "\u6d3b\u52a8",
      "children": [{
        "text": "4.1 \u865a\u62df\u793c\u54c1",
        "children": [{"text": "4.1.1.a \u6837\u5f0f", "detail": "", "idx": 0}, {
          "text": "4.1.1.b \u6837\u5f0f",
          "detail": "",
          "idx": 1
        }, {
          "text": "4.1.2.a \u4fdd\u5b58\u65b9\u5f0f",
          "detail": "",
          "idx": 2
        }, {"text": "4.1.2.b \u4fdd\u5b58\u65b9\u5f0f", "detail": "", "idx": 3}],
        "idx": 0
      }, {
        "text": "4.2 \u5b9e\u7269\u793c\u54c1",
        "children": [{"text": "4.2.1.a \u6837\u5f0f", "detail": "", "idx": 0}, {
          "text": "4.2.1.b \u6837\u5f0f",
          "detail": "",
          "idx": 1
        }, {
          "text": "4.2.2.a \u4fdd\u5b58\u65b9\u5f0f",
          "detail": "",
          "idx": 2
        }, {"text": "4.2.2.b \u4fdd\u5b58\u65b9\u5f0f", "detail": "", "idx": 3}],
        "idx": 1
      }, {
        "text": "4.3 \u5fae\u4fe1\u7ea2\u5305",
        "children": [{"text": "4.3.1.a \u6837\u5f0f", "detail": "", "idx": 0}, {
          "text": "4.3.1.b \u6837\u5f0f",
          "detail": "",
          "idx": 1
        }],
        "idx": 2
      }, {
        "text": "4.4 \u6307\u5b9a\u5355\u4e2a\u793c\u54c1\u6d3b\u52a8",
        "children": [{
          "text": "4.4.1.a \u4e92\u52a8\u65b9\u5f0f",
          "detail": "",
          "idx": 0
        }, {
          "text": "4.4.1.b \u4e92\u52a8\u65b9\u5f0f",
          "detail": "",
          "idx": 1
        }, {
          "text": "4.4.2.a \u83b7\u5f97\u793c\u54c1",
          "detail": "",
          "idx": 2
        }, {"text": "4.4.2.b \u83b7\u5f97\u793c\u54c1", "detail": "", "idx": 3}, {
          "text": "4.4.3.a \u5206\u4eab",
          "detail": "",
          "idx": 4
        }, {"text": "4.4.3.b \u5206\u4eab", "detail": "", "idx": 5}],
        "idx": 3
      }, {
        "text": "4.5 \u968f\u673a\u5355\u4e2a\u793c\u54c1\u6d3b\u52a8",
        "children": [{
          "text": "4.5.1.a \u4e92\u52a8\u65b9\u5f0f",
          "detail": "",
          "idx": 0
        }, {
          "text": "4.5.1.b \u4e92\u52a8\u65b9\u5f0f",
          "detail": "",
          "idx": 1
        }, {
          "text": "4.5.2.a \u83b7\u5f97\u793c\u54c1",
          "detail": "",
          "idx": 2
        }, {"text": "4.5.2.b \u83b7\u5f97\u793c\u54c1", "detail": "", "idx": 3}, {
          "text": "4.5.3.a \u5206\u4eab",
          "detail": "",
          "idx": 4
        }, {"text": "4.5.3.b \u5206\u4eab", "detail": "", "idx": 5}],
        "idx": 4
      }, {
        "text": "4.6 \u5206\u9500\u6d3b\u52a8",
        "children": [{
          "text": "4.6.1.a \u4e92\u52a8\u65b9\u5f0f",
          "detail": "",
          "idx": 0
        }, {
          "text": "4.6.1.b \u4e92\u52a8\u65b9\u5f0f",
          "detail": "",
          "idx": 1
        }, {
          "text": "4.6.2.a \u83b7\u5f97\u793c\u54c1",
          "detail": "",
          "idx": 2
        }, {"text": "4.6.2.b \u83b7\u5f97\u793c\u54c1", "detail": "", "idx": 3}, {
          "text": "4.6.3.a \u5206\u4eab",
          "detail": "",
          "idx": 4
        }, {"text": "4.6.3.b \u5206\u4eab", "detail": "", "idx": 5}],
        "idx": 5
      }, {
        "text": "4.7 \u62fc\u56e2\u6d3b\u52a8",
        "children": [{
          "text": "4.7.1.a \u4e92\u52a8\u65b9\u5f0f",
          "detail": "",
          "idx": 0
        }, {
          "text": "4.7.1.b \u4e92\u52a8\u65b9\u5f0f",
          "detail": "",
          "idx": 1
        }, {
          "text": "4.7.2.a \u83b7\u5f97\u793c\u54c1",
          "detail": "",
          "idx": 2
        }, {"text": "4.7.2.b \u83b7\u5f97\u793c\u54c1", "detail": "", "idx": 3}, {
          "text": "4.7.3.a \u5206\u4eab",
          "detail": "",
          "idx": 4
        }, {"text": "4.7.3.b \u5206\u4eab", "detail": "", "idx": 5}],
        "idx": 6
      }, {
        "text": "4.8 \u79d2\u6740\u6d3b\u52a8",
        "children": [{
          "text": "4.8.1.a \u4e92\u52a8\u65b9\u5f0f",
          "detail": "",
          "idx": 0
        }, {
          "text": "4.8.1.b \u4e92\u52a8\u65b9\u5f0f",
          "detail": "",
          "idx": 1
        }, {
          "text": "4.8.2.a \u83b7\u5f97\u793c\u54c1",
          "detail": "",
          "idx": 2
        }, {"text": "4.8.2.b \u83b7\u5f97\u793c\u54c1", "detail": "", "idx": 3}, {
          "text": "4.8.3.a \u5206\u4eab",
          "detail": "",
          "idx": 4
        }, {"text": "4.8.3.b \u5206\u4eab", "detail": "", "idx": 5}],
        "idx": 7
      }, {
        "text": "4.9 \u4efb\u52a1\u6d3b\u52a8",
        "children": [{
          "text": "4.9.1.a \u4e92\u52a8\u65b9\u5f0f",
          "detail": "",
          "idx": 0
        }, {
          "text": "4.9.1.b \u4e92\u52a8\u65b9\u5f0f",
          "detail": "",
          "idx": 1
        }, {
          "text": "4.9.2.a \u83b7\u5f97\u793c\u54c1",
          "detail": "",
          "idx": 2
        }, {"text": "4.9.2.b \u83b7\u5f97\u793c\u54c1", "detail": "", "idx": 3}, {
          "text": "4.9.3.a \u5206\u4eab",
          "detail": "",
          "idx": 4
        }, {"text": "4.9.3.b \u5206\u4eab", "detail": "", "idx": 5}],
        "idx": 8
      }, {
        "text": "4.10 \u62fc\u56fe\u6d3b\u52a8",
        "children": [{
          "text": "4.10.1.a \u4e92\u52a8\u65b9\u5f0f",
          "detail": "",
          "idx": 0
        }, {
          "text": "4.10.1.b \u4e92\u52a8\u65b9\u5f0f",
          "detail": "",
          "idx": 1
        }, {
          "text": "4.10.2.a \u83b7\u5f97\u793c\u54c1",
          "detail": "",
          "idx": 2
        }, {"text": "4.10.2.b \u83b7\u5f97\u793c\u54c1", "detail": "", "idx": 3}, {
          "text": "4.10.3.a \u5206\u4eab",
          "detail": "",
          "idx": 4
        }, {"text": "4.10.3.b \u5206\u4eab", "detail": "", "idx": 5}],
        "idx": 9
      }, {
        "text": "4.11 \u780d\u4ef7\u6d3b\u52a8",
        "children": [{
          "text": "4.11.1.a \u4e92\u52a8\u65b9\u5f0f",
          "detail": "",
          "idx": 0
        }, {
          "text": "4.11.1.b \u4e92\u52a8\u65b9\u5f0f",
          "detail": "",
          "idx": 1
        }, {
          "text": "4.11.2.a \u83b7\u5f97\u793c\u54c1",
          "detail": "",
          "idx": 2
        }, {"text": "4.11.2.b \u83b7\u5f97\u793c\u54c1", "detail": "", "idx": 3}, {
          "text": "4.11.3.a \u5206\u4eab",
          "detail": "",
          "idx": 4
        }, {"text": "4.11.3.b \u5206\u4eab", "detail": "", "idx": 5}],
        "idx": 10
      }, {
        "text": "4.12 \u7b54\u9898\u6d3b\u52a8",
        "children": [{
          "text": "4.12.1.a \u4e92\u52a8\u65b9\u5f0f",
          "detail": "",
          "idx": 0
        }, {
          "text": "4.12.1.b \u4e92\u52a8\u65b9\u5f0f",
          "detail": "",
          "idx": 1
        }, {
          "text": "4.12.2.a \u83b7\u5f97\u793c\u54c1",
          "detail": "",
          "idx": 2
        }, {"text": "4.12.2.b \u83b7\u5f97\u793c\u54c1", "detail": "", "idx": 3}, {
          "text": "4.12.3.a \u5206\u4eab",
          "detail": "",
          "idx": 4
        }, {"text": "4.12.3.b \u5206\u4eab", "detail": "", "idx": 5}],
        "idx": 11
      }, {
        "text": "4.13 \u7ade\u731c\u5f62\u5f0f\u6d3b\u52a8",
        "children": [{
          "text": "4.13.1.a \u4e92\u52a8\u65b9\u5f0f",
          "detail": "",
          "idx": 0
        }, {
          "text": "4.13.1.b \u4e92\u52a8\u65b9\u5f0f",
          "detail": "",
          "idx": 1
        }, {
          "text": "4.13.2.a \u83b7\u5f97\u793c\u54c1",
          "detail": "",
          "idx": 2
        }, {"text": "4.13.2.b \u83b7\u5f97\u793c\u54c1", "detail": "", "idx": 3}, {
          "text": "4.13.3.a \u5206\u4eab",
          "detail": "",
          "idx": 4
        }, {"text": "4.13.3.b \u5206\u4eab", "detail": "", "idx": 5}],
        "idx": 12
      }],
      "idx": 3
    }, {
      "text": "\u9884\u7ea6\u4e1a\u52a1",
      "children": [{
        "text": "5.1 \u6807\u51c6\u95e8\u5e97\u9884\u7ea6",
        "children": [{
          "text": "5.1.1.a \u95e8\u5e97\u9884\u7ea6",
          "detail": "",
          "idx": 0
        }, {"text": "5.1.1.b \u95e8\u5e97\u9884\u7ea6", "detail": "", "idx": 1}],
        "idx": 0
      }, {
        "text": "5.2 \u9ad8\u7ea7\u95e8\u5e97\u9884\u7ea6",
        "children": [{
          "text": "1.1.1.a \u95e8\u5e97\u9884\u7ea6",
          "detail": "",
          "idx": 0
        }, {"text": "1.1.1.b \u9884\u7ea6", "detail": "", "idx": 1}, {
          "text": "1.1.2.a \u5e08\u5085\u9884\u7ea6",
          "detail": "",
          "idx": 2
        }],
        "idx": 1
      }],
      "idx": 4
    }, {
      "text": "\u8ba2\u5355\u7ba1\u7406",
      "children": [{
        "text": "6.1 \u6807\u51c6\u5f85\u4ed8\u6b3e\u8ba2\u5355",
        "children": [{
          "text": "6.1.1.a \u8ba2\u5355\u5217\u8868",
          "detail": "",
          "idx": 0
        }, {"text": "6.1.2.a \u8ba2\u5355\u8be6\u60c5", "detail": "", "idx": 1}],
        "idx": 0
      }, {
        "text": "6.2 \u6807\u51c6\u5df2\u4ed8\u6b3e\u8ba2\u5355",
        "children": [{
          "text": "6.2.1.a \u8ba2\u5355\u5217\u8868",
          "detail": "",
          "idx": 0
        }, {"text": "6.2.2.a \u8ba2\u5355\u8be6\u60c5", "detail": "", "idx": 1}],
        "idx": 1
      }, {
        "text": "6.3 \u7ebf\u4e0b\u5546\u5bb6\u5df2\u4ed8\u6b3e\u8ba2\u5355",
        "children": [{
          "text": "6.3.1.a \u8ba2\u5355\u5217\u8868",
          "detail": "",
          "idx": 0
        }, {"text": "6.3.2.a \u8ba2\u5355\u8be6\u60c5", "detail": "", "idx": 1}],
        "idx": 2
      }, {
        "text": "6.4 \u6807\u51c6\u672a\u6536\u8d27\u8ba2\u5355",
        "children": [{
          "text": "6.4.1.a \u8ba2\u5355\u5217\u8868",
          "detail": "",
          "idx": 0
        }, {
          "text": "6.4.2.a \u8ba2\u5355\u8be6\u60c5",
          "detail": "",
          "idx": 1
        }, {"text": "6.4.2.b \u6536\u8d27\u65f6\u95f4", "detail": "", "idx": 2}],
        "idx": 3
      }, {
        "text": "6.5 \u9ad8\u7ea7\u672a\u6536\u8d27\u8ba2\u5355",
        "children": [{
          "text": "6.5.1.a \u8ba2\u5355\u5217\u8868",
          "detail": "",
          "idx": 0
        }, {"text": "6.5.2.a \u8ba2\u5355\u8be6\u60c5", "detail": "", "idx": 1}],
        "idx": 4
      }],
      "idx": 5
    }, {
      "text": "\u5185\u5bb9\u7ba1\u7406",
      "children": [{
        "text": "7.1 \u57fa\u7840\u5185\u5bb9\u7ba1\u7406",
        "children": [{
          "text": "7.1.1.a \u5185\u5bb9\u5217\u8868",
          "detail": "",
          "idx": 0
        }, {
          "text": "7.1.1.b \u5185\u5bb9\u53d1\u5e03",
          "detail": "",
          "idx": 1
        }, {"text": "7.1.2.a \u5185\u5bb9\u8be6\u60c5", "detail": "", "idx": 2}],
        "idx": 0
      }, {
        "text": "7.2 \u4f1a\u5458\u5f0f\u5185\u5bb9\u7ba1\u7406",
        "children": [{
          "text": "7.2.1.a \u5185\u5bb9\u5217\u8868",
          "detail": "",
          "idx": 0
        }, {
          "text": "7.2.1.b \u5185\u5bb9\u53d1\u5e03",
          "detail": "",
          "idx": 1
        }, {
          "text": "7.2.2.a \u5185\u5bb9\u8be6\u60c5",
          "detail": "",
          "idx": 2
        }, {"text": "7.2.2.b \u8bc4\u8bba\u7ba1\u7406", "detail": "", "idx": 3}],
        "idx": 1
      }, {
        "text": "7.3 \u5a92\u4f53\u5f0f\u5185\u5bb9\u7ba1\u7406",
        "children": [{
          "text": "7.3.1.a \u5185\u5bb9\u5217\u8868",
          "detail": "",
          "idx": 0
        }, {
          "text": "7.3.1.b \u5185\u5bb9\u53d1\u5e03",
          "detail": "",
          "idx": 1
        }, {
          "text": "7.3.2.a \u5185\u5bb9\u8be6\u60c5",
          "detail": "",
          "idx": 2
        }, {"text": "7.3.2.b \u8bc4\u8bba\u7ba1\u7406", "detail": "", "idx": 3}],
        "idx": 2
      }],
      "idx": 6
    }, {
      "text": "\u5546\u5bb6\u7ba1\u7406",
      "children": [{
        "text": "8.1 \u57fa\u7840\u5546\u5bb6\u7ba1\u7406",
        "children": [{
          "text": "8.1.1.a \u5546\u5bb6\u5206\u7c7b",
          "detail": "",
          "idx": 0
        }, {
          "text": "8.1.2.a \u5546\u5bb6\u5217\u8868",
          "detail": "",
          "idx": 1
        }, {
          "text": "8.1.3.a \u5546\u5bb6\u8be6\u60c5",
          "detail": "",
          "idx": 2
        }, {"text": "8.1.3.b \u5546\u5bb6\u7ba1\u7406", "detail": "", "idx": 3}],
        "idx": 0
      }, {
        "text": "8.2 \u9ad8\u7ea7\u5546\u5bb6\u7ba1\u7406",
        "children": [{
          "text": "8.2.1.a \u5546\u5bb6\u5206\u7c7b",
          "detail": "",
          "idx": 0
        }, {
          "text": "8.2.2.a \u5546\u5bb6\u5217\u8868",
          "detail": "",
          "idx": 1
        }, {
          "text": "8.2.3.a \u5546\u5bb6\u8be6\u60c5",
          "detail": "",
          "idx": 2
        }, {"text": "8.2.3.b \u5546\u5bb6\u7ba1\u7406", "detail": "", "idx": 3}],
        "idx": 1
      }, {
        "text": "8.3 \u591a\u5546\u5bb6\u7ba1\u7406",
        "children": [{
          "text": "8.3.1.a \u5546\u5bb6\u5206\u7c7b",
          "detail": "",
          "idx": 0
        }, {
          "text": "8.3.1.b \u5206\u7c7b\u89c4\u5219",
          "detail": "",
          "idx": 1
        }, {
          "text": "8.3.2.a \u5546\u5bb6\u5217\u8868",
          "detail": "",
          "idx": 2
        }, {
          "text": "8.3.3.a \u5546\u5bb6\u8be6\u60c5",
          "detail": "",
          "idx": 3
        }, {"text": "8.3.3.b \u5546\u5bb6\u7ba1\u7406", "detail": "", "idx": 4}],
        "idx": 2
      }],
      "idx": 7
    }, {
      "text": "\u7528\u6237\u7cfb\u7edf\uff08\u4e2a\u4eba\u4e2d\u5fc3\uff09",
      "children": [{
        "text": "9.1 \u4e2a\u4eba\u4fe1\u606f",
        "children": [{
          "text": "9.1.1.a \u4f1a\u5458\u9996\u9875",
          "detail": "",
          "idx": 0
        }, {
          "text": "9.1.2.a \u7528\u6237\u8d44\u6599\u4fee\u6539\u66f4\u65b0",
          "detail": "",
          "idx": 1
        }, {"text": "9.1.2.b \u7528\u6237\u8d44\u6599\u540e\u53f0\u4fee\u6539\u66f4\u65b0", "detail": "", "idx": 2}],
        "idx": 0
      }, {
        "text": "9.2 \u7ed1\u5b9a\u529f\u80fd",
        "children": [{
          "text": "9.2.1.a \u624b\u673a\u53f7\u7ed1\u5b9a",
          "detail": "",
          "idx": 0
        }, {"text": "9.2.2.a \u90ae\u7bb1\u7ed1\u5b9a", "detail": "", "idx": 1}],
        "idx": 1
      }, {
        "text": "9.3 \u6536\u8d27\u5730\u5740\u7ba1\u7406",
        "children": [{"text": "9.3.1.a \u5730\u5740\u7ba1\u7406", "detail": "", "idx": 0}],
        "idx": 2
      }, {
        "text": "9.4 \u6211\u7684\u8ba2\u5355",
        "children": [{
          "text": "9.4.1.a \u8ba2\u5355\u67e5\u770b",
          "detail": "",
          "idx": 0
        }, {
          "text": "9.4.2.a \u8ba2\u5355\u6807\u8bb0",
          "detail": "",
          "idx": 1
        }, {"text": "9.4.2.b \u540e\u53f0\u8ba2\u5355\u7ba1\u7406", "detail": "", "idx": 2}],
        "idx": 3
      }, {
        "text": "9.5 \u6211\u53d1\u5e03\u7684\u5185\u5bb9",
        "children": [{
          "text": "9.5.1.a \u5185\u5bb9\u67e5\u770b",
          "detail": "",
          "idx": 0
        }, {"text": "9.5.1.b \u540e\u53f0\u5185\u5bb9\u7ba1\u7406", "detail": "", "idx": 1}],
        "idx": 4
      }, {
        "text": "9.6 \u6211\u7684\u597d\u53cb",
        "children": [{
          "text": "9.6.1.a \u597d\u53cb\u7533\u8bf7",
          "detail": "",
          "idx": 0
        }, {"text": "9.6.2.a \u597d\u53cb\u7ba1\u7406", "detail": "", "idx": 1}],
        "idx": 5
      }, {
        "text": "9.7 \u6211\u7684\u6d88\u606f",
        "children": [{
          "text": "9.7.1.a \u6d88\u606f\u63d0\u9192",
          "detail": "",
          "idx": 0
        }, {
          "text": "9.7.1.b \u540e\u53f0\u901a\u77e5\u53d1\u9001",
          "detail": "",
          "idx": 1
        }, {"text": "9.7.2.a \u6d88\u606f\u56de\u590d", "detail": "", "idx": 2}],
        "idx": 6
      }, {
        "text": "9.8 \u6211\u7684\u7533\u8bc9",
        "children": [{
          "text": "9.8.1.a \u53d1\u8d77\u7533\u8bc9",
          "detail": "",
          "idx": 0
        }, {
          "text": "9.8.1.b \u540e\u53f0\u7533\u8bc9\u7ba1\u7406",
          "detail": "",
          "idx": 1
        }, {"text": "9.8.2.a \u7533\u8bc9\u67e5\u770b", "detail": "", "idx": 2}],
        "idx": 7
      }, {
        "text": "9.9 \u6211\u7684\u4f18\u60e0\u5238",
        "children": [{
          "text": "9.9.1.a \u4f18\u60e0\u5238\u67e5\u770b",
          "detail": "",
          "idx": 0
        }, {"text": "9.9.1.b \u540e\u53f0\u4f18\u60e0\u5238\u7ba1\u7406", "detail": "", "idx": 1}],
        "idx": 8
      }, {
        "text": "9.10 \u6211\u7684\u79ef\u5206",
        "children": [{
          "text": "9.10.1.a \u79ef\u5206\u67e5\u770b",
          "detail": "",
          "idx": 0
        }, {
          "text": "9.10.1.b \u540e\u53f0\u79ef\u5206\u7ba1\u7406",
          "detail": "",
          "idx": 1
        }, {
          "text": "9.10.2.a \u79ef\u5206\u5546\u57ce",
          "detail": "",
          "idx": 2
        }, {"text": "9.10.2.b \u79ef\u5206\u5151\u6362", "detail": "", "idx": 3}],
        "idx": 9
      }, {
        "text": "9.11 \u6211\u7684\u6536\u85cf",
        "children": [{
          "text": "9.11.1.a \u6536\u85cf\u7684\u4ea7\u54c1",
          "detail": "",
          "idx": 0
        }, {
          "text": "9.11.2.a \u53d6\u6d88\u4ea7\u54c1\u6536\u85cf",
          "detail": "",
          "idx": 1
        }, {
          "text": "9.11.3.a \u6536\u85cf\u7684\u5e97\u94fa",
          "detail": "",
          "idx": 2
        }, {"text": "9.11.4.a \u53d6\u6d88\u4ea7\u54c1\u6536\u85cf", "detail": "", "idx": 3}],
        "idx": 10
      }, {
        "text": "9.12 \u6211\u7684\u793c\u54c1",
        "children": [{
          "text": "9.12.1.a \u865a\u62df\u793c\u54c1",
          "detail": "",
          "idx": 0
        }, {"text": "9.12.2.a \u5b9e\u7269\u793c\u54c1", "detail": "", "idx": 1}],
        "idx": 11
      }, {
        "text": "9.13 \u6211\u7684\u9080\u8bf7",
        "children": [{
          "text": "9.13.1.a \u6211\u7684\u9080\u8bf7\u7801",
          "detail": "",
          "idx": 0
        }, {"text": "9.13.2.a \u5df2\u9080\u8bf7\u7528\u6237", "detail": "", "idx": 1}],
        "idx": 12
      }],
      "idx": 8
    }, {
      "text": "\u6d88\u606f\u7cfb\u7edf",
      "children": [{
        "text": "10.1 \u6d88\u606f\u5217\u8868",
        "children": [{
          "text": "10.1.1.a \u6d88\u606f\u5217\u8868",
          "detail": "* \u4ee5\u5217\u8868\u65b9\u5f0f\u5217\u51fa\u7528\u6237\u6536\u5230\u7684\u6d88\u606f\uff0c\u6309\u6536\u5230\u6d88\u606f\u7684\u65f6\u95f4\u964d\u5e8f\u6392\u5217\n* \u6bcf\u6761\u6d88\u606f\u663e\u793a\u6d88\u606f\u63a5\u6536\u65f6\u95f4\u3001\u6d88\u606f\u6807\u9898\uff08\u5982\u679c\u6709\uff09\u3001\u6d88\u606f\u7c7b\u578b\uff08\u5982\u679c\u6709\uff09\u548c\u6d88\u606f\u6b63\u6587\uff0c\u6d88\u606f\u6b63\u6587\u6839\u636e\u524d\u7aef\u8bbe\u8ba1\u622a\u53d6\u76f8\u5e94\u7684\u957f\u5ea6\u663e\u793a\uff0c\u672b\u5c3e\u589e\u52a0 *\u7701\u7565\u53f7*\u3002\n* \u6d88\u606f\u5217\u8868\u987b\u5206\u9875",
          "idx": 0
        }, {
          "text": "10.1.2.a \u6d88\u606f\u72b6\u6001",
          "detail": "* \u5728\u5217\u8868\u4e2d\u5df2\u4e0d\u540c\u7684\u6837\u5f0f\u663e\u793a _\u5df2\u8bfb\u6d88\u606f_ \u548c _\u672a\u8bfb\u6d88\u606f_\n* \u6837\u5f0f\u7684\u533a\u522b\u7531\u524d\u7aef\u8bbe\u8ba1\u786e\u5b9a\uff0c\u53ef\u4ee5\u662f\u5b57\u4f53\u53d8\u5316\u3001\u989c\u8272\u53d8\u5316\u548c\u56fe\u6807\u6807\u8bc6\u4e2d\u7684\u4efb\u610f\u4e00\u79cd\u6216\u51e0\u79cd\u3002",
          "idx": 1
        }, {
          "text": "10.1.3.a \u6d88\u606f\u5168\u6587",
          "detail": "* \u5728\u6d88\u606f\u5217\u8868\u4e0a\u70b9\u51fb\u4e00\u6761\u6d88\u606f\uff0c\u8df3\u8f6c\u81f3\u6d88\u606f\u5168\u6587\u754c\u9762\uff0c\u663e\u793a\u6240\u70b9\u51fb\u6d88\u606f\u7684\u5168\u6587\n* \u70b9\u51fb\u6d88\u606f\u5168\u6587\u754c\u9762\u4e0a\u7684\u8fd4\u56de\u6309\u94ae\uff0c\u8fd4\u56de\u6d88\u606f\u5217\u8868\u754c\u9762\n* \u70b9\u51fb\u540e\u7684\u6d88\u606f\u5217\u8868\u4e0a\u7684\u8be5\u6761\u6d88\u606f\u663e\u793a\u4e3a _\u5df2\u8bfb\u6d88\u606f_ \u72b6\u6001",
          "idx": 2
        }, {
          "text": "10.1.4.a \u5220\u9664\u6d88\u606f",
          "detail": "* \u5728\u6d88\u606f\u5217\u8868\u4e0a\u9009\u62e9\u4e00\u6761\u6d88\u606f\u5411\u53f3\u6ed1\u52a8\uff0c\u51fa\u73b0\u5220\u9664\u6309\u94ae\n* \u70b9\u51fb\u4e00\u6761\u6d88\u606f\u53f3\u4fa7\u7684\u5220\u9664\u6309\u94ae\uff0c\u5220\u9664\u8be5\u6761\u6d88\u606f",
          "idx": 3
        }],
        "idx": 0
      }, {
        "text": "10.2 \u53d1\u6d88\u606f",
        "children": [{
          "text": "10.2.1.a \u7cfb\u7edf\u6d88\u606f\u53d1\u9001",
          "detail": "* \u5728\u7ba1\u7406\u540e\u53f0\u7f16\u8f91\u6d88\u606f\u5185\u5bb9\uff0c\u6307\u5b9a\u63a5\u53d7\u6d88\u606f\u7684\u7528\u6237\u7c7b\u578b\u548c\u53d1\u9001\u6d88\u606f\u7684\u65f6\u95f4\uff0c\u53ef\u4ee5\u7acb\u5373\u53d1\u9001\u3002\n* \u63a5\u53d7\u6d88\u606f\u7684\u7528\u6237\u7c7b\u578b\u4e3a\u6ce8\u518c\u7528\u6237\u7684\u7c7b\u578b\u548c\u4e0d\u540c\u7684\u624b\u673a\u64cd\u4f5c\u7cfb\u7edf\u5ba2\u6237\u7aef\u7684\u7c7b\u578b\uff0c\u4e0d\u652f\u6301\u53d1\u9001\u7ed9\u6307\u5b9a\u7684\u5ba2\u6237\u3002\n* \u53d1\u9001\u6210\u529f\u7684\u6d88\u606f\u663e\u793a\u5728\u5386\u53f2\u6d88\u606f\u4e2d\uff0c\u6807\u6ce8\u4e3a\u5df2\u53d1\u9001\u3002",
          "idx": 0
        }, {
          "text": "10.2.1.b \u7cfb\u7edf\u6d88\u606f\u53d1\u9001",
          "detail": "* \u6839\u636e\u7a0b\u5e8f\u9884\u5b9a\u7684\u8bbe\u7f6e\uff0c\u751f\u6210\u6807\u51c6\u683c\u5f0f\u7684\u6d88\u606f\uff0c\u53d1\u9001\u7ed9\u6307\u5b9a\u7684\u7528\u6237\u3002\n* \u6d88\u606f\u53d1\u9001\u65b9\u5f0f\u4e3aAPP\u5185\u6d88\u606f\u548c\u77ed\u4fe1\u901a\u77e5\uff0c\u53ef\u540c\u65f6\u4f7f\u7528\u4e24\u79cd\u65b9\u5f0f\u3002\n* \u53d1\u9001\u6d88\u606f\u7531\u4e8b\u4ef6\u89e6\u53d1\uff0c\u4e0d\u53ef\u5728\u7ba1\u7406\u540e\u53f0\u81ea\u884c\u7f16\u8f91\u3002\n* \u6d88\u606f\u5185\u5bb9\u4e0d\u53ef\u5728\u7ba1\u7406\u540e\u53f0\u81ea\u884c\u7f16\u8f91.",
          "idx": 1
        }],
        "idx": 1
      }, {
        "text": "10.3 \u6d88\u606f\u63d0\u9192",
        "children": [{
          "text": "10.3.1.a \u7cfb\u7edf\u6d88\u606f\u63a8\u9001",
          "detail": "* \u5728\u63a5\u6536\u5230APP\u5185\u6d88\u606f\u662f\uff0c\u901a\u8fc7\u7cfb\u7edf\u63a8\u9001\u670d\u52a1\u5411\u7528\u6237\u53d1\u9001\u901a\u77e5\u3002",
          "idx": 0
        }, {
          "text": "10.3.1.b \u7cfb\u7edf\u6d88\u606f\u63a8\u9001",
          "detail": "* \u5728\u63a5\u6536\u5230APP\u5185\u6d88\u606f\u662f\uff0c\u8c03\u7528\u7cfb\u7edf\u63a8\u9001\u63a5\u53e3\u5411\u7528\u6237\u53d1\u9001\u901a\u77e5\u3002",
          "idx": 1
        }],
        "idx": 2
      }],
      "idx": 9
    }, {
      "text": "\u793e\u4ea4\u7cfb\u7edf",
      "children": [{
        "text": "11.1 \u53d1\u5e03\u5185\u5bb9",
        "children": [{
          "text": "11.1.1.a \u5185\u5bb9\u7f16\u8f91",
          "detail": "",
          "idx": 0
        }, {
          "text": "11.1.2.a \u63d2\u5165\u56fe\u7247",
          "detail": "",
          "idx": 1
        }, {
          "text": "11.1.3.a \u63d2\u5165\u94fe\u63a5",
          "detail": "",
          "idx": 2
        }, {"text": "11.1.4.a \u5185\u5bb9\u53d1\u5e03", "detail": "", "idx": 3}],
        "idx": 0
      }, {
        "text": "11.2 \u6211\u7684\u5185\u5bb9\u5217\u8868",
        "children": [{
          "text": "11.2.1.a \u5185\u5bb9\u5217\u8868",
          "detail": "",
          "idx": 0
        }, {
          "text": "11.2.2.a \u597d\u53cb\u5185\u5bb9\u5217\u8868",
          "detail": "",
          "idx": 1
        }, {"text": "11.2.3.a \u641c\u7d22\u5185\u5bb9\u5217\u8868", "detail": "", "idx": 2}],
        "idx": 1
      }, {
        "text": "11.3 \u6211\u7684\u597d\u53cb",
        "children": [{
          "text": "11.3.1.a \u597d\u53cb\u5217\u8868",
          "detail": "",
          "idx": 0
        }, {
          "text": "11.3.2.a \u641c\u7d22\u597d\u53cb",
          "detail": "",
          "idx": 1
        }, {
          "text": "11.3.3.a \u6dfb\u52a0/\u5220\u9664\u597d\u53cb",
          "detail": "",
          "idx": 2
        }, {"text": "11.3.4.a \u9080\u8bf7\u597d\u53cb", "detail": "", "idx": 3}],
        "idx": 2
      }, {
        "text": "11.4 \u56de\u590d\u4e0e\u8d5e",
        "children": [{
          "text": "11.4.1.a \u70b9\u8d5e\u4e0e\u53d6\u6d88",
          "detail": "",
          "idx": 0
        }, {"text": "11.4.2.a \u8bc4\u8bba\u548c\u56de\u590d\u8bc4\u8bba", "detail": "", "idx": 1}],
        "idx": 3
      }, {
        "text": "11.5 \u5206\u4eab",
        "children": [{
          "text": "11.5.1.a \u5206\u4eab\u5230\u5fae\u4fe1\u597d\u53cb",
          "detail": "",
          "idx": 0
        }, {
          "text": "11.5.2.a \u5206\u4eab\u5230\u5fae\u4fe1\u670b\u53cb\u5708",
          "detail": "",
          "idx": 1
        }, {
          "text": "11.5.3.a \u5206\u4eab\u5230\u65b0\u6d6a\u5fae\u535a",
          "detail": "",
          "idx": 2
        }, {
          "text": "11.5.4.a \u5206\u4eab\u5230QQ",
          "detail": "",
          "idx": 3
        }, {
          "text": "11.5.5.a \u5206\u4eab\u5230QQ\u7a7a\u95f4",
          "detail": "",
          "idx": 4
        }, {"text": "11.5.6.a \u901a\u8fc7\u90ae\u4ef6/\u77ed\u4fe1\u53d1\u9001", "detail": "", "idx": 5}],
        "idx": 4
      }],
      "idx": 10
    }, {
      "text": "\u5373\u65f6\u901a\u8baf",
      "children": [{
        "text": "12.1  \u6587\u672c\u5bf9\u8bdd",
        "children": [{
          "text": "12.1.1.a  \u6536\u53d1\u6587\u672c\u4fe1\u606f",
          "detail": "",
          "idx": 0
        }, {
          "text": "12.1.1.b  \u6536\u53d1\u6587\u672c\u4fe1\u606f",
          "detail": "",
          "idx": 1
        }, {
          "text": "12.1.2.a  \u804a\u5929\u8bb0\u5f55",
          "detail": "",
          "idx": 2
        }, {
          "text": "12.1.2.b  \u804a\u5929\u8bb0\u5f55",
          "detail": "",
          "idx": 3
        }, {
          "text": "12.1.3.a  \u6587\u4ef6\u4f20\u8f93",
          "detail": "",
          "idx": 4
        }, {"text": "12.1.3.b  \u6587\u4ef6\u4f20\u8f93", "detail": "", "idx": 5}],
        "idx": 0
      }, {
        "text": "12.2  \u8bed\u97f3\u5bf9\u8bdd",
        "children": [{
          "text": "12.2.1.a  \u6536\u53d1\u8bed\u97f3\u4fe1\u606f",
          "detail": "",
          "idx": 0
        }, {
          "text": "12.2.1.b  \u6536\u53d1\u8bed\u97f3\u4fe1\u606f",
          "detail": "",
          "idx": 1
        }, {
          "text": "12.2.2.a  \u804a\u5929\u8bb0\u5f55",
          "detail": "",
          "idx": 2
        }, {
          "text": "12.2.2.b  \u804a\u5929\u8bb0\u5f55",
          "detail": "",
          "idx": 3
        }, {
          "text": "12.2.3.a  \u6587\u4ef6\u4f20\u8f93",
          "detail": "",
          "idx": 4
        }, {"text": "12.2.3.b  \u6587\u4ef6\u4f20\u8f93", "detail": "", "idx": 5}],
        "idx": 1
      }, {
        "text": "12.3  \u591a\u4eba\u6587\u672c\u5bf9\u8bdd",
        "children": [{
          "text": "12.3.1.a  \u591a\u4eba\u6536\u53d1\u6587\u672c\u4fe1\u606f",
          "detail": "",
          "idx": 0
        }, {
          "text": "12.3.1.b  \u591a\u4eba\u6536\u53d1\u6587\u672c\u4fe1\u606f",
          "detail": "",
          "idx": 1
        }, {
          "text": "12.3.2.a  \u804a\u5929\u8bb0\u5f55",
          "detail": "",
          "idx": 2
        }, {
          "text": "12.3.2.b  \u804a\u5929\u8bb0\u5f55",
          "detail": "",
          "idx": 3
        }, {
          "text": "12.3.3.a  \u6587\u4ef6\u4f20\u8f93",
          "detail": "",
          "idx": 4
        }, {"text": "12.3.3.b  \u6587\u4ef6\u4f20\u8f93", "detail": "", "idx": 5}],
        "idx": 2
      }, {
        "text": "12.4  \u591a\u4eba\u8bed\u97f3\u5bf9\u8bdd",
        "children": [{
          "text": "12.4.1.a  \u591a\u4eba\u6536\u53d1\u8bed\u97f3\u4fe1\u606f",
          "detail": "",
          "idx": 0
        }, {
          "text": "12.4.1.b  \u591a\u4eba\u6536\u53d1\u8bed\u97f3\u4fe1\u606f",
          "detail": "",
          "idx": 1
        }, {
          "text": "12.4.2.a  \u804a\u5929\u8bb0\u5f55",
          "detail": "",
          "idx": 2
        }, {
          "text": "12.4.2.b  \u804a\u5929\u8bb0\u5f55",
          "detail": "",
          "idx": 3
        }, {
          "text": "12.4.3.a  \u6587\u4ef6\u4f20\u8f93",
          "detail": "",
          "idx": 4
        }, {"text": "12.4.3.b  \u6587\u4ef6\u4f20\u8f93", "detail": "", "idx": 5}],
        "idx": 3
      }, {
        "text": "12.5  \u8054\u7cfb\u4eba\u5217\u8868\u5206\u7c7b",
        "children": [{
          "text": "12.5.1.a  \u5206\u7c7b\u663e\u793a",
          "detail": "",
          "idx": 0
        }, {
          "text": "12.5.1.b  \u5206\u7c7b\u663e\u793a",
          "detail": "",
          "idx": 1
        }, {
          "text": "12.5.2.a  \u5c55\u5f00\u5206\u7c7b",
          "detail": "",
          "idx": 2
        }, {"text": "12.5.2.b  \u5c55\u5f00\u5206\u7c7b", "detail": "", "idx": 3}],
        "idx": 4
      }, {
        "text": "12.6  \u8054\u7cfb\u4eba\u5217\u8868",
        "children": [{
          "text": "12.6.1.a  \u663e\u793a\u4fe1\u606f",
          "detail": "",
          "idx": 0
        }, {"text": "12.6.1.b  \u663e\u793a\u4fe1\u606f", "detail": "", "idx": 1}, {
          "text": "12.6.2.a  \u6392\u5e8f",
          "detail": "",
          "idx": 2
        }, {"text": "12.6.2.b  \u6392\u5e8f", "detail": "", "idx": 3}, {
          "text": "12.6.3.a  \u53d1\u8d77\u4f1a\u8bdd",
          "detail": "",
          "idx": 4
        }, {"text": "12.6.3.b  \u53d1\u8d77\u4f1a\u8bdd", "detail": "", "idx": 5}],
        "idx": 5
      }, {
        "text": "12.7  \u8054\u7cfb\u4eba\u8be6\u60c5",
        "children": [{
          "text": "12.7.1.a  \u663e\u793a\u4fe1\u606f",
          "detail": "",
          "idx": 0
        }, {
          "text": "12.7.1.b  \u663e\u793a\u4fe1\u606f",
          "detail": "",
          "idx": 1
        }, {
          "text": "12.7.2.a  \u53d1\u8d77\u4f1a\u8bdd",
          "detail": "",
          "idx": 2
        }, {"text": "12.7.2.b  \u53d1\u8d77\u4f1a\u8bdd", "detail": "", "idx": 3}, {
          "text": "12.7.3.a  \u5907\u6ce8",
          "detail": "",
          "idx": 4
        }, {"text": "12.7.3.b  \u5907\u6ce8", "detail": "", "idx": 5}, {
          "text": "12.7.4.a  \u5220\u9664",
          "detail": "",
          "idx": 6
        }, {"text": "12.7.4.b  \u5220\u9664", "detail": "", "idx": 7}],
        "idx": 6
      }, {
        "text": "12.8  \u641c\u7d22\u8054\u7cfb\u4eba",
        "children": [{
          "text": "12.8.1.a  \u641c\u7d22\u65b9\u5f0f",
          "detail": "",
          "idx": 0
        }, {
          "text": "12.8.1.b  \u641c\u7d22\u65b9\u5f0f",
          "detail": "",
          "idx": 1
        }, {
          "text": "12.8.2.a  \u641c\u7d22\u7ed3\u679c",
          "detail": "",
          "idx": 2
        }, {"text": "12.8.2.b  \u641c\u7d22\u7ed3\u679c", "detail": "", "idx": 3}],
        "idx": 7
      }, {
        "text": "12.9  \u5e38\u7528\u8054\u7cfb\u4eba\u5217\u8868",
        "children": [{
          "text": "12.9.1.a  \u5217\u8868\u5c55\u793a",
          "detail": "",
          "idx": 0
        }, {
          "text": "12.9.1.b  \u5217\u8868\u5c55\u793a",
          "detail": "",
          "idx": 1
        }, {
          "text": "12.9.2.a  \u5e38\u7528\u8054\u7cfb\u4eba",
          "detail": "",
          "idx": 2
        }, {
          "text": "12.9.2.b  \u5e38\u7528\u8054\u7cfb\u4eba",
          "detail": "",
          "idx": 3
        }, {
          "text": "12.9.3.a  \u53d1\u8d77\u4f1a\u8bdd",
          "detail": "",
          "idx": 4
        }, {"text": "12.9.3.b  \u53d1\u8d77\u4f1a\u8bdd", "detail": "", "idx": 5}],
        "idx": 8
      }, {
        "text": "12.10  \u7fa4\u7ec4\u5217\u8868",
        "children": [{
          "text": "12.10.1.a  \u5c55\u793a\u4e3b\u4f53",
          "detail": "",
          "idx": 0
        }, {
          "text": "12.10.1.b  \u5c55\u793a\u4e3b\u4f53",
          "detail": "",
          "idx": 1
        }, {
          "text": "12.10.2.a  \u7fa4\u6210\u5458\u5217\u8868",
          "detail": "",
          "idx": 2
        }, {"text": "12.10.2.b  \u7fa4\u6210\u5458\u5217\u8868", "detail": "", "idx": 3}],
        "idx": 9
      }, {
        "text": "12.11  \u521b\u5efa\u7fa4\u7ec4",
        "children": [{
          "text": "12.11.1.a  \u4fe1\u606f\u63cf\u8ff0",
          "detail": "",
          "idx": 0
        }, {"text": "12.11.1.b  \u4fe1\u606f\u63cf\u8ff0", "detail": "", "idx": 1}, {
          "text": "12.11.2.a  \u521b\u5efa",
          "detail": "",
          "idx": 2
        }, {"text": "12.11.2.b  \u521b\u5efa", "detail": "", "idx": 3}],
        "idx": 10
      }, {
        "text": "12.12  \u89e3\u6563\u7fa4\u7ec4",
        "children": [{"text": "12.12.1.a  \u63cf\u8ff0", "detail": "", "idx": 0}, {
          "text": "12.12.1.b  \u63cf\u8ff0",
          "detail": "",
          "idx": 1
        }],
        "idx": 11
      }, {
        "text": "12.13  \u9a8c\u8bc1\u8bf7\u6c42",
        "children": [{
          "text": "12.13.1.a  \u663e\u793a\u4fe1\u606f",
          "detail": "",
          "idx": 0
        }, {
          "text": "12.13.1.b  \u663e\u793a\u4fe1\u606f",
          "detail": "",
          "idx": 1
        }, {
          "text": "12.13.2.a  \u901a\u8fc7\u9a8c\u8bc1",
          "detail": "",
          "idx": 2
        }, {"text": "12.13.2.b  \u901a\u8fc7\u9a8c\u8bc1", "detail": "", "idx": 3}],
        "idx": 12
      }],
      "idx": 11
    }, {
      "text": "\u7b2c\u4e09\u65b9\u670d\u52a1",
      "children": [{
        "text": "13.1  \u5bfc\u822a\u670d\u52a1",
        "children": [{
          "text": "13.1.1.a  \u4f4d\u7f6e\u8f93\u5165",
          "detail": "",
          "idx": 0
        }, {
          "text": "13.1.1.b  \u4f4d\u7f6e\u8f93\u5165",
          "detail": "",
          "idx": 1
        }, {
          "text": "13.1.2.a  \u7ebf\u8def\u663e\u793a",
          "detail": "",
          "idx": 2
        }, {
          "text": "13.1.2.b  \u7ebf\u8def\u663e\u793a",
          "detail": "",
          "idx": 3
        }, {
          "text": "13.1.3.a  \u5b9e\u65f6\u5bfc\u822a",
          "detail": "",
          "idx": 4
        }, {"text": "13.1.3.b  \u5b9e\u65f6\u5bfc\u822a", "detail": "", "idx": 5}],
        "idx": 0
      }, {
        "text": "13.2  \u5fae\u4fe1\u652f\u4ed8",
        "children": [{
          "text": "13.2.1.a  \u5411\u5546\u5bb6\u4ed8\u6b3e",
          "detail": "",
          "idx": 0
        }, {
          "text": "13.2.1.b  \u5411\u5546\u5bb6\u4ed8\u6b3e",
          "detail": "",
          "idx": 1
        }, {
          "text": "13.2.2.a  \u4e8c\u7ef4\u7801\u652f\u4ed8",
          "detail": "",
          "idx": 2
        }, {"text": "13.2.2.b  \u4e8c\u7ef4\u7801\u652f\u4ed8", "detail": "", "idx": 3}],
        "idx": 1
      }, {
        "text": "13.3  \u652f\u4ed8\u5b9d\u652f\u4ed8",
        "children": [{
          "text": "13.3.1.a  \u5411\u5546\u5bb6\u4ed8\u6b3e",
          "detail": "",
          "idx": 0
        }, {
          "text": "13.3.1.b  \u5411\u5546\u5bb6\u4ed8\u6b3e",
          "detail": "",
          "idx": 1
        }, {
          "text": "13.3.2.a  \u4e8c\u7ef4\u7801\u652f\u4ed8",
          "detail": "",
          "idx": 2
        }, {"text": "13.2.2.b  \u4e8c\u7ef4\u7801\u652f\u4ed8", "detail": "", "idx": 3}],
        "idx": 2
      }, {
        "text": "13.4  \u67e5\u8be2\u4fe1\u606f",
        "children": [{
          "text": "13.3.1.a  \u6570\u636e\u663e\u793a",
          "detail": "",
          "idx": 0
        }, {
          "text": "13.4.1.b  \u6570\u636e\u663e\u793a",
          "detail": "",
          "idx": 1
        }, {
          "text": "13.4.2.a  \u56fe\u7247\u663e\u793a",
          "detail": "",
          "idx": 2
        }, {"text": "13.4.2.b  \u56fe\u7247\u663e\u793a", "detail": "", "idx": 3}],
        "idx": 3
      }, {
        "text": "13.5  \u6570\u636e\u5904\u7406",
        "children": [{
          "text": "13.5.1.a  \u6570\u636e\u63d0\u4ea4",
          "detail": "",
          "idx": 0
        }, {
          "text": "13.5.1.b  \u6570\u636e\u63d0\u4ea4",
          "detail": "",
          "idx": 1
        }, {
          "text": "13.5.2.a  \u663e\u793a\u7ed3\u679c",
          "detail": "",
          "idx": 2
        }, {"text": "13.5.2.b  \u663e\u793a\u7ed3\u679c", "detail": "", "idx": 3}],
        "idx": 4
      }, {
        "text": "13.6  \u5b58\u50a8\u670d\u52a1",
        "children": [{
          "text": "13.6.1.a  \u4e0a\u4f20\u6570\u636e",
          "detail": "",
          "idx": 0
        }, {
          "text": "13.6.1.b  \u4e0a\u4f20\u6570\u636e",
          "detail": "",
          "idx": 1
        }, {
          "text": "13.6.2.a  \u5220\u9664\u6570\u636e",
          "detail": "",
          "idx": 2
        }, {
          "text": "13.6.2.b  \u5220\u9664\u6570\u636e",
          "detail": "",
          "idx": 3
        }, {
          "text": "13.6.3.a  \u4e0b\u8f7d\u6570\u636e",
          "detail": "",
          "idx": 4
        }, {"text": "13.6.3.b  \u4e0b\u8f7d\u6570\u636e", "detail": "", "idx": 5}],
        "idx": 5
      }, {
        "text": "13.7  \u7b2c\u4e09\u65b9\u767b\u5f55",
        "children": [{
          "text": "13.7.1.a  \u4f7f\u7528\u8d26\u6237\u57fa\u672c\u4fe1\u606f",
          "detail": "",
          "idx": 0
        }, {"text": "13.7.1.b  \u4e0a\u4f20\u6570\u636e", "detail": "", "idx": 1}],
        "idx": 6
      }],
      "idx": 12
    }, {
      "text": "\u7edf\u8ba1\u62a5\u8868",
      "children": [{
        "text": "14.1 \u57fa\u7840\u8d44\u6599\u7edf\u8ba1",
        "children": [{
          "text": "14.1.1.b \u57fa\u7840\u7528\u6237\u7edf\u8ba1",
          "detail": "",
          "idx": 0
        }, {
          "text": "14.1.2.b \u9ad8\u7ea7\u7528\u6237\u7edf\u8ba1",
          "detail": "",
          "idx": 1
        }, {
          "text": "14.1.3.b \u57fa\u7840\u4f1a\u5458\u7edf\u8ba1",
          "detail": "",
          "idx": 2
        }, {"text": "14.1.4.b \u9ad8\u7ea7\u4f1a\u5458\u7edf\u8ba1", "detail": "", "idx": 3}],
        "idx": 0
      }, {
        "text": "14.2 \u79ef\u5206\u7edf\u8ba1",
        "children": [{
          "text": "14.2.1.b \u4f18\u60e0\u5238\u7edf\u8ba1\u8868",
          "detail": "",
          "idx": 0
        }, {"text": "14.2.2.b \u79ef\u5206\u7edf\u8ba1\u8868", "detail": "", "idx": 1}],
        "idx": 1
      }, {
        "text": "14.3 \u8ba2\u5355\u7edf\u8ba1",
        "children": [{
          "text": "14.3.1.b \u8d44\u91d1\u6765\u6e90\u8868",
          "detail": "",
          "idx": 0
        }, {"text": "14.3.3.b \u5546\u54c1\u603b\u8868", "detail": "", "idx": 1}],
        "idx": 2
      }, {
        "text": "14.4 \u9884\u7ea6\u7edf\u8ba1",
        "children": [{"text": "14.4.1.b \u9884\u7ea6\u5217\u8868", "detail": "", "idx": 0}],
        "idx": 3
      }],
      "idx": 13
    }, {
      "text": "\u7528\u6237\u6570\u636e\u6743\u9650",
      "children": [{
        "text": "15.1  \u533a\u57df\u578b\u6a21\u5f0f",
        "children": [{
          "text": "15.1.1.a  \u7247\u533a\u5206\u7c7b",
          "detail": "",
          "idx": 0
        }, {
          "text": "15.1.1.b  \u7247\u533a\u5206\u7c7b",
          "detail": "",
          "idx": 1
        }, {
          "text": "15.1.2.a  \u6743\u9650\u8bbe\u5b9a",
          "detail": "",
          "idx": 2
        }, {"text": "15.1.2.b  \u6743\u9650\u8bbe\u5b9a", "detail": "", "idx": 3}],
        "idx": 0
      }, {
        "text": "15.2  \u8fd0\u8425\u578b\u6a21\u5f0f",
        "children": [{
          "text": "15.2.1.a  \u7ba1\u7406\u5458\u5206\u7c7b",
          "detail": "",
          "idx": 0
        }, {
          "text": "15.2.1.b  \u7ba1\u7406\u5458\u5206\u7c7b",
          "detail": "",
          "idx": 1
        }, {
          "text": "15.2.1.a  \u6743\u9650\u8bbe\u5b9a",
          "detail": "",
          "idx": 2
        }, {"text": "15.2.1.b  \u6743\u9650\u8bbe\u5b9a", "detail": "", "idx": 3}],
        "idx": 1
      }, {
        "text": "15.3  \u804c\u80fd\u578b\u6a21\u5f0f",
        "children": [{
          "text": "15.3.1.a  \u804c\u80fd\u5206\u7c7b",
          "detail": "",
          "idx": 0
        }, {
          "text": "15.3.1.b  \u804c\u80fd\u5206\u7c7b",
          "detail": "",
          "idx": 1
        }, {
          "text": "15.3.2.a  \u804c\u80fd\u6743\u9650",
          "detail": "",
          "idx": 2
        }, {"text": "15.3.2.b  \u804c\u80fd\u6743\u9650", "detail": "", "idx": 3}],
        "idx": 2
      }],
      "idx": 14
    }, {
      "text": "\u8d44\u91d1\u7ba1\u7406",
      "children": [{
        "text": "16.1 \u8ba2\u5355\u652f\u4ed8",
        "children": [{
          "text": "16.1.1.a \u652f\u4ed8\u660e\u7ec6",
          "detail": "",
          "idx": 0
        }, {"text": "16.1.2.a \u652f\u4ed8", "detail": "", "idx": 1}],
        "idx": 0
      }, {
        "text": "16.2 \u4ee3\u6536\u6b3e",
        "children": [{
          "text": "16.2.1.a \u63d0\u4ea4\u4ee3\u6536\u6b3e",
          "detail": "",
          "idx": 0
        }, {"text": "16.2.2.a \u4ee3\u6536\u6b3e\u786e\u8ba4", "detail": "", "idx": 1}],
        "idx": 1
      }, {
        "text": "16.3 \u57fa\u7840\u9000\u6b3e",
        "children": [{
          "text": "16.3.1.a \u9000\u6b3e\u7533\u8bf7",
          "detail": "",
          "idx": 0
        }, {"text": "16.3.1.b \u9000\u6b3e\u7533\u8bf7\u5ba1\u6838", "detail": "", "idx": 1}],
        "idx": 2
      }, {
        "text": "16.4 \u9ad8\u7ea7\u9000\u6b3e",
        "children": [{
          "text": "16.4.1.a \u9000\u6b3e\u7533\u8bf7",
          "detail": "",
          "idx": 0
        }, {"text": "16.4.1.b \u9000\u6b3e\u7533\u8bf7\u5ba1\u6838", "detail": "", "idx": 1}],
        "idx": 3
      }, {
        "text": "16.5 \u63d0\u73b0",
        "children": [{
          "text": "16.5.1.a \u63d0\u73b0\u67e5\u770b",
          "detail": "",
          "idx": 0
        }, {"text": "16.5.2.a \u63d0\u73b0", "detail": "", "idx": 1}, {
          "text": "16.5.2.b \u63d0\u73b0\u5ba1\u6838",
          "detail": "",
          "idx": 2
        }],
        "idx": 4
      }, {
        "text": "16.6 \u53ca\u65f6\u5bf9\u8d26",
        "children": [{"text": "16.6.1.b \u5bf9\u8d26\u67e5\u8be2", "detail": "", "idx": 0}],
        "idx": 5
      }, {
        "text": "16.7 \u8d26\u671f\u5bf9\u8d26",
        "children": [{"text": "16.7.1.b \u5bf9\u8d26\u67e5\u8be2\u53ca\u786e\u8ba4", "detail": "", "idx": 0}],
        "idx": 6
      }, {
        "text": "16.8 \u7ed3\u7b97",
        "children": [{"text": "16.7.1.b \u7ed3\u7b97", "detail": "", "idx": 0}],
        "idx": 7
      }],
      "idx": 15
    }, {
      "text": "\u4f17\u5305",
      "children": [{
        "text": "17.1 \u5e73\u53f0\u4efb\u52a1\u5f0f",
        "children": [{
          "text": "17.1.1.a \u4efb\u52a1\u67e5\u770b",
          "detail": "",
          "idx": 0
        }, {
          "text": "17.1.1.b \u4efb\u52a1\u7ba1\u7406",
          "detail": "",
          "idx": 1
        }, {
          "text": "17.1.2.a \u4efb\u52a1\u9886\u53d6",
          "detail": "",
          "idx": 2
        }, {
          "text": "17.1.2.b \u4efb\u52a1\u9886\u53d6\u89c4\u5219",
          "detail": "",
          "idx": 3
        }, {
          "text": "17.1.3.a \u4efb\u52a1\u6c47\u62a5",
          "detail": "",
          "idx": 4
        }, {
          "text": "17.1.3.b \u4efb\u52a1\u8282\u70b9",
          "detail": "",
          "idx": 5
        }, {
          "text": "17.1.4.a \u4efb\u52a1\u53d6\u6d88",
          "detail": "",
          "idx": 6
        }, {"text": "17.1.4.b \u4efb\u52a1\u53d6\u6d88\u89c4\u5219", "detail": "", "idx": 7}],
        "idx": 0
      }, {
        "text": "17.2 \u7528\u6237\u4efb\u52a1\u5f0f",
        "children": [{
          "text": "17.2.1.a \u4efb\u52a1\u53d1\u5e03\u7ba1\u7406",
          "detail": "",
          "idx": 0
        }, {
          "text": "17.2.1.b \u4efb\u52a1\u53d6\u6d88\u89c4\u5219",
          "detail": "",
          "idx": 1
        }, {
          "text": "17.2.2.a \u4efb\u52a1\u67e5\u770b",
          "detail": "",
          "idx": 2
        }, {
          "text": "17.2.3.a \u4efb\u52a1\u9886\u53d6",
          "detail": "",
          "idx": 3
        }, {
          "text": "17.2.3.b \u4efb\u52a1\u9886\u53d6\u89c4\u5219",
          "detail": "",
          "idx": 4
        }, {
          "text": "17.2.4.a \u4efb\u52a1\u6c47\u62a5",
          "detail": "",
          "idx": 5
        }, {"text": "17.2.4.b \u4efb\u52a1\u8282\u70b9", "detail": "", "idx": 6}],
        "idx": 1
      }],
      "idx": 16
    }, {"text": "\u5ba2\u670d\u7cfb\u7edf", "children": [], "idx": 17}]

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
        platformsChildData,
        selectedPlatformsData
      });
    }, 1500);
  }

  //修改、保存平台
  editPaltform() {
    if (this.state.visiblePaltform) {
      this.props.history.replace({
        pathname: '/step-2/',
        query: { platforms: this.state.selectedPaltforms.join(',') }
      });
      this.setState({
        visiblePaltform: false,
      },()=>{
        let platforms = this.props.location.query.platforms.split(',');
        this.setState({
          selectedPaltforms:platforms
        },()=>{
          this.loadData();
        });
      });
    } else {
      this.setState({
        visiblePaltform: true
      });
    }
  }


  //提交计算结果
  submitCalculateResults() {
    MiniLogin.show(()=>{
      console.log('xxxxxx');
    });
    return;
    setTimeout(()=> {
      MiniLogin.hide();
    }, 3000);
    if (SS.get(Config.token === null)) {
      MiniLogin.show(()=>{
        console.log('xxxxxx');
      });
      return;
    }


    this.props.history.push({
      pathname: '/step-3/',
      query: { platforms: this.state.selectedPaltforms.join(',') }
    });
  }


  render() {

    //平台信息
    let paltformItem = (this.state.platformsData || []).map((item, index)=> {
      let check = this.state.selectedPaltforms.filter(id => item.id === id).length != 0;
      return (
        <li className={classnames('column-short', {
          'current': check
        })} key={index}>
          <label htmlFor={item.id + '-' + index}>
            <i className="iconfont" dangerouslySetInnerHTML={{__html: item.icon}}></i>
            <em className="platform-title">{item.name}</em>
            <input type="checkbox" id={item.id + '-' + index} name="platform" checked={check} onChange={(event)=> {
              if (event.target.checked) {
                let selectedPaltforms = this.state.selectedPaltforms;
                selectedPaltforms.push(item.id);
                this.setState({
                  selectedPaltforms
                });
              } else {
                this.setState({
                  selectedPaltforms: this.state.selectedPaltforms.filter(id=>id != item.id)
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

    //平台功能点
    let tbody = (this.state.platformsChildData || []).map((item, index)=> {//第一节
      if (item.children && item.children.length) {//判断是否有二层子节点
        let children = (item.children || []).map((child, cindex)=> {
          if (cindex == 0) {
            if (child.children && child.children.length) {//判断是否有三层子节点
              let children2 = (child.children || []).map((child2, cindex2)=> {
                let check = this.state.selectedItemTwoKeys.filter(id => child.idx === id).length != 0;
                return (<label key={child2.idx + '-' + cindex2} htmlFor={item.id + '-' + child.idx + '-' + child2.idx}
                               className="function-label" onMouseEnter={(event)=> {
                  let e = event || window.event;
                  let elem_tips = document.querySelector(".preview");
                  let eleTtop = elem_tips.getClientRects()[0].top;
                  var actualTop = e.target.getClientRects()[0].top;
                  actualTop = actualTop - eleTtop;
                  actualTop = this.state.previewTop + actualTop - 52;
                  if (e.target.nodeName === 'SPAN') {
                    return;
                  }
                  let previewData = {
                    title:child.text+' » '+child2.text,
                    desc:child2.detail,
                    img:''
                  }
                  this.setState({
                    previewTop: actualTop,
                    previewData
                  });

                }} onMouseLeave={(event)=>{
                  let e = event || window.event;
                  if (e.target.nodeName === 'SPAN') {
                    return;
                  }
                  let previewData = {
                    title:'功能点描述',
                    desc:'鼠标移动到对应的功能点上，此处会显示功能点说明',
                    img:''
                  }
                  this.setState({
                    previewData
                  });
                }}><input type="checkbox" id={item.idx + '-' + child.idx + '-' + child2.idx} checked={check}
                          name={item.idx + ',' + child.idx + ',' + child2.idx}
                          value="on"/>{child2.text}</label>);
              });
              return (
                <tr className={cindex % 2 ? 'even' : 'odd'} key={child.idx + '-' + cindex}>
                  <td rowSpan={item.children.length}>{item.text}</td>
                  <td><label htmlFor={child.idx + '-' + cindex} className="module-label">
                    <span>{child.text}</span>
                    <input type="checkbox" id={child.idx + '-' + cindex} name={item.idx + ',' + child.idx} value='no'
                           onChange={(event)=> {
                             if (event.target.checked) {
                               let selectedItemTwoKeys = this.state.selectedItemTwoKeys;
                               selectedItemTwoKeys.push(child.idx);
                               this.setState({
                                 selectedItemTwoKeys
                               });
                             } else {
                               this.setState({
                                 selectedItemTwoKeys: this.state.selectedItemTwoKeys.filter(id=>id != child.idx)
                               });
                             }
                           }}/>
                  </label></td>
                  <td>{children2}</td>
                </tr>
              );
            }
          } else {
            if (child.children && child.children.length) {//判断是否有二层子节点
              let children2 = (child.children || []).map((child2, cindex2)=> {
                let check = this.state.selectedItemTwoKeys.filter(id => child.idx === id).length != 0;
                return (<label key={child2.idx + '-' + cindex2} htmlFor={item.idx + '-' + child.idx + '-' + child2.idx}
                               className="function-label" onMouseEnter={(event)=> {
                  let e = event || window.event;
                  let elem_tips = document.querySelector(".preview");
                  let eleTtop = elem_tips.getClientRects()[0].top;
                  var actualTop = e.target.getClientRects()[0].top;
                  actualTop = actualTop - eleTtop;
                  actualTop = this.state.previewTop + actualTop - 52;
                  if (e.target.nodeName === 'SPAN') {
                    return;
                  }
                  let previewData = {
                    title:child.text+' » '+child2.text,
                    desc:child2.detail,
                    img:''
                  }
                  this.setState({
                    previewTop: actualTop,
                    previewData
                  });

                }} onMouseLeave={(event)=>{
                  let e = event || window.event;
                  if (e.target.nodeName === 'SPAN') {
                    return;
                  }
                  let previewData = {
                    title:'功能点描述',
                    desc:'鼠标移动到对应的功能点上，此处会显示功能点说明',
                    img:''
                  }
                  this.setState({
                    previewData
                  });
                }}><input type="checkbox" id={item.idx + '-' + child.idx + '-' + child2.idx} checked={check}
                          name={item.idx + ',' + child.idx + ',' + child2.idx}
                          value="on"/>{child2.text}</label>);
              });
              return (
                <tr className={cindex % 2 ? 'even' : 'odd'} key={child.idx + '-' + cindex}>
                  <td><label htmlFor={item.idx + '-' + child.idx} className="module-label">
                    <span>{child.text}</span>
                    <input type="checkbox" id={item.idx + '-' + child.idx} name={item.idx + ',' + child.idx} value='no'
                           onChange={(event)=> {
                             if (event.target.checked) {
                               let selectedItemTwoKeys = this.state.selectedItemTwoKeys;
                               selectedItemTwoKeys.push(child.idx);
                               this.setState({
                                 selectedItemTwoKeys
                               });
                             } else {
                               this.setState({
                                 selectedItemTwoKeys: this.state.selectedItemTwoKeys.filter(id=>id != child.idx)
                               });
                             }
                           }}/>
                  </label></td>
                  <td>{children2}</td>
                </tr>
              );
            }
          }
        });
        return (children);
      } else {
        return (
          <tr className={index % 2 ? 'odd' : 'even'} key={index}>
            <td rowSpan={item.children.length}>{item.text}</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
          </tr>
        );
      }
    });

    //tabs
    let tabPaneItem = (this.state.selectedPlatformsData || []).map((item, index)=> {
      return (
        <Tabs.TabPane tab={<Badge count={2}><span className="tab-title">{item.name}</span></Badge>} key={index}>
          <div className="pane-body">
            <div className="pane-body-wrapper">
              <div className="functions">
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
                  <tfoot>
                  <tr>
                    <th colSpan="3">
                      <Button type="ghost">一键清空</Button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      <Button type="primary">还原默认</Button>
                    </th>
                  </tr>
                  </tfoot>
                </table>
              </div>
              <div className="preview" style={{top: this.state.previewTop}}>
                <div className="inner">
                  <h2>{this.state.previewData.title}</h2>
                  <article>
                    <p>{this.state.previewData.desc}</p>
                    <div className="preview-icon" style={{display: this.state.previewData.img === '' ? 'none' : 'block'}}>
                      <img src="" alt=""/>
                    </div>
                  </article>
                </div>
              </div>
            </div>
          </div>
        </Tabs.TabPane>
      );
    });


    const operations = <Button type={this.state.visiblePaltform ? 'primary' : ''} onClick={()=> {
      this.editPaltform()
    }}>{this.state.visiblePaltform ? '保存平台' : '修改平台'}</Button>;

    return (
      <div className="steptwo-component">
        <div className="quote">
          <ul className="steps clearfix">
            <li className="">
              <em>1</em>
              <span>
                    <label>第一步，</label>
                    <label>项目类型</label>
                </span>
            </li>
            <li className="current">
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
          <div className="wrapper">
            <div style={{display: this.state.visiblePaltform ? 'block' : 'none'}}>
              <ul className="platforms clearfix visible">
                {paltformItem}
              </ul>
            </div>
            <Spin spinning={this.state.loading}>
              <Tabs tabBarExtraContent={operations} className='tabs' defaultActiveKey="0">
                {tabPaneItem}
              </Tabs>
            </Spin>
            <div className="calculate">
              <Button type="submit"
                      className={this.state.selectedPaltforms.length > 0 ? 'button primary' : 'button disabled'}
                      onClick={()=> {
                        this.submitCalculateResults()
                      }}>计算结果
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

StepTwoComponent.displayName = 'StepTwoComponent';

// Uncomment properties you need
// StepTwoComponent.propTypes = {};
// StepTwoComponent.defaultProps = {};

export default StepTwoComponent;
