'use strict';

import React from 'react';
import {Tabs, Button, Badge, Spin, Modal, Checkbox, Timeline, notification} from 'antd';
import MiniLogin from './MiniLoginComponent';
import classnames from 'classnames';
import SS from 'parsec-ss';
import KomarovSDK  from 'komarov-sdk';
import Config from 'config';
import request from '../Request';

require('styles//StepTwo.less');

class StepTwoComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      platformsChildData: [],
      platformsData: [],
      selectedPlatformsData: [],
      previewData: {
        title: '功能点描述',
        desc: '鼠标移动到对应的功能点上，此处会显示功能点说明',
        img: ''
      },
      loading: false,
      visiblePaltform: false,
      selectedPaltforms: [],
      selectedItemTwoKeys: [],
      selectedItemThreeKeys: [],
      defaultActiveKey: '',//默认选择的Tabs KEY
      selectedPaltformKeysCount: 0,
      previewTop: 0
    }
    this.loadData = this.loadData.bind(this);
    this.initData = this.initData.bind(this);
    this.clearAll = this.clearAll.bind(this);
    this.editPaltform = this.editPaltform.bind(this);
    this.headerTabsChange = this.headerTabsChange.bind(this);
    this.submitCalculateResults = this.submitCalculateResults.bind(this);
    this.handleFunctionItemChange = this.handleFunctionItemChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.initData(nextProps);
  }

  componentWillMount() {
    this.initData(this.props);
  }

  loadData(idx) {
    let project = SS.getObj(Config.project);
    let platformsData = this.state.selectedPlatformsData;
    let platform = platformsData.filter(item => item.idx === idx)[0];
    if (!platform.children) {
      request({
        type: 'get',
        url: Config.host + '/fea',
        data: {
          idx: idx
        },
        success: (data) => {
          platform.children = data.result;
          platform.count = platform.count || 0;
          if (!!project) {
            let functionItem = project.idxtree;
            platform = this.checkDefultFuntionItem(platform, functionItem);
          }
          this.setState({
            loading: false,
            selectedPlatformsData: platformsData
          });
        },
        error: () => {
          this.setState({
            loading: false
          });
        }
      });
    }
  }

  //选择修改时的功能点信息
  checkDefultFuntionItem(platform, functionItem) {
    (functionItem || []).map((fun) => {
      for (let key in fun) {
        for (let i = 0; i < fun[key].length; i++) {
          (platform.children || []).map((item) => {//第一节
            if (this.getIdx(fun[key][i]) === item.idx && fun[key][i] && item.children && item.children.length) { //判断是否有二层子节点
              for (let key2 in fun[key][i]) {
                for (let k = 0; k < fun[key][i][key2].length; k++) {
                  (item.children || []).map((child) => {
                    if (this.getIdx(fun[key][i][key2][k]) === child.idx && fun[key][i][key2][k]) {
                      if (child.children && child.children.length) {//判断是否有三层子节点
                        for (let key3 in fun[key][i][key2][k]) {
                          for (let j = 0; j < fun[key][i][key2][k][key3].length; j++) {
                            (child.children || []).map((child2) => {
                              if (this.getIdx(fun[key][i][key2][k][key3][j]) === child2.idx && !child2.checked) {
                                child2.checked = true;
                                platform.count++;
                              }
                            });
                          }
                        }
                      } else {
                        if (this.getIdx(fun[key][i][key2][k]) === child.idx && !child.checked) {
                          child.checked = true;
                          platform.count++;
                        }
                      }
                    }
                  });
                }
              }
            }
          });
        }
      }
    });
    return platform;
  }

  getIdx(obj) {
    for (var key in obj) {
      return key
    }
  }

  initData(props) {
    this.setState({
      loading: true
    });
    //let platforms = props.location.query.platforms.split(',');

    let platforms = ['P.a','P.b'];

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
      idx: 'P100',
      name: '其他项目',
      icon: '&#xe604;'
    },{
      idx: 'P.b',
      name: '管理后台',
      icon: ''
    }];

    let selectedPlatformsData = [];
    for (let i = 0; i < platformsData.length; i++) {
      for (let j = 0; j < platforms.length; j++) {
        let platform = platformsData[i];
        let key = platforms[j];
        if (platform.idx === key) {
          selectedPlatformsData.push(platform);
        }
      }
    }

    this.setState({
      selectedPaltforms: this.unique(platforms),
      defaultActiveKey: platforms[0] || platformsData[0].idx,
      platformsData,
      selectedPlatformsData
    }, () => {
      for (let i = 0; i < this.state.selectedPaltforms.length; i++) {
        this.loadData(this.state.selectedPaltforms[i]);
      }
    });
  }

  //去掉相同的
  unique(arr) {
    // 遍历arr，把元素分别放入tmp数组(不存在才放)
    var tmp = new Array();
    for (var i in arr) {
      //该元素在tmp内部不存在才允许追加
      if (tmp.indexOf(arr[i]) == -1) {
        tmp.push(arr[i]);
      }
    }
    return tmp;
  }

  clearAll(parent) {
    if (!parent || parent.length === 0) {
      return;
    }
    parent.forEach((x) => {
      x.checked = false;
      x.count = 0;
      this.clearAll(x.children);
      return x;
    });
    return;
  }

  //平台切换
  headerTabsChange(key) {
    this.setState({
      defaultActiveKey: key
    }, () => {
      this.loadData(key);
    });
  }

  //修改、保存平台
  editPaltform() {
    if (this.state.visiblePaltform) {
      this.props.history.replace({
        pathname: '/step-2/',
        query: {platforms: this.state.selectedPaltforms.join(',')}
      });
      this.setState({
        visiblePaltform: false
      }, () => {
        let platforms = this.props.location.query.platforms.split(',');
        this.setState({
          selectedPaltforms: platforms
        }, () => {
          this.initData();
        });
      });
    } else {
      this.setState({
        visiblePaltform: true
      });
    }
  }

  //得到选择的IDX值
  getValues(parent) {
    let values = parent.map((item) => {
      let obj = {};
      if (!item.children) {
        obj[item.idx] = '';
        if (!item.checked) {
          return undefined;
        }
      } else {
        obj[item.idx] = this.getValues(item.children);
        if (obj[item.idx].length == 0) {
          return undefined;
        }
      }
      return obj;
    });
    return values.filter(x => x != undefined);
  }

  //提交计算结果
  submitCalculateResults() {
    let values = this.getValues(this.state.selectedPlatformsData);
    if (!values || values.length <= 0) {
      notification['error']({
        duration: 3,
        message: '请选择项目的功能点信息'
      });
      this.setState({selectedPaltformKeysCount: 0});
      return;
    }
    SS.set(Config.platformsKeys, encodeURI(JSON.stringify(values)));
    if (SS.get(Config.token) === null) {
      MiniLogin.show(() => {
        window.location.href = '#/step-3';
      });
      return;
    }
    window.location.href = '#/step-3';
  }


  handleFunctionItemChange(event, item, platform) {
    //item.checked = event.target.checked;
    let platformsData = this.state.selectedPlatformsData;
    let idxTreeOut = this.getValues(this.state.selectedPlatformsData);
    if (event.target.checked) {
      let result = KomarovSDK.check(this.state.selectedPlatformsData, idxTreeOut, item.idx);
      if (result && result.funName && result.funName.length > 0) {
        let timelineItem = (result.funName || []).map((name, index) => {
          return (<Timeline.Item key={index}>{name}</Timeline.Item>);
        });
        Modal.confirm({
          title: '此功能点与以下功能点具有关联关系，是否将这些功能点一并添加到清单中？',
          width: 600,
          maskClosable: false,
          content: (
            <div className='comfirm-wrapper' style={{marginTop: '20px', maxHeight: '250px', overflowY: 'scroll'}}>
              <Timeline>
                {timelineItem}
              </Timeline>
            </div>),
          onOk: () => {
            let selectedPaltformKeysCount = this.state.selectedPaltformKeysCount;
            for (let i = 0; i < this.state.selectedPaltforms.length; i++) {
              let platform = platformsData.filter(item => item.idx === this.state.selectedPaltforms[i])[0];
              if (platform.children) {
                let functionItem = result.idxtree;
                platform = this.checkDefultFuntionItem(platform, functionItem);
                selectedPaltformKeysCount += platform.count;
              }
            }
            this.setState({selectedPaltformKeysCount});
          }, onCancel: () => {
          }
        });
      } else if (result && result.idxtree && result.idxtree.length > 0) {
        let selectedPaltformKeysCount = this.state.selectedPaltformKeysCount;
        for (let i = 0; i < this.state.selectedPaltforms.length; i++) {
          let platform = platformsData.filter(item => item.idx === this.state.selectedPaltforms[i])[0];
          if (platform.children) {
            let functionItem = result.idxtree;
            platform = this.checkDefultFuntionItem(platform, functionItem);
            selectedPaltformKeysCount += platform.count;
          }
        }
        this.setState({selectedPaltformKeysCount});
      }
    } else {
      let selectedPaltformKeysCount = KomarovSDK.unCheck(this.state.selectedPaltforms,platformsData,item.idx);
      this.setState({selectedPaltformKeysCount});
    }
  }




  render() {
    //平台信息
    let paltformItem = (this.state.platformsData || []).map((item, index) => {
      let check = this.state.selectedPaltforms.filter(idx => item.idx === idx).length != 0;
      return (
        <li className={classnames('column-short', {
          'current': check
        })} key={index}>
          <label htmlFor={item.idx + '-' + index}>
            <i className='iconfont' dangerouslySetInnerHTML={{__html: item.icon}}></i>
            <em className='platform-title'>{item.name}</em>
            <input type='checkbox' id={item.idx + '-' + index} name='platform' checked={check} onChange={(event) => {
              if (event.target.checked) {
                let selectedPaltforms = this.state.selectedPaltforms;
                if (item.idx != 'P.a') {
                  Modal.info({
                    title: '提示信息',
                    content: '该平台未开放，敬请期待',
                    onOk: () => {
                    }
                  });
                  return;
                }
                selectedPaltforms.push(item.idx);
                this.setState({
                  selectedPaltforms
                });
              } else {
                this.setState({
                  selectedPaltforms: this.state.selectedPaltforms.filter(idx => idx != item.idx)
                });
              }
            }}/>
            <span className='checked'>
                <span className='fa fa-check'>&#xe606;</span>
              </span>
          </label>
        </li>
      );
    });

    //平台功能点
    let platform = this.state.selectedPlatformsData.filter(item => item.idx === this.state.defaultActiveKey)[0];
    let tbody = (platform.children || []).map((item, index) => {//第一节
      if (item.children && item.children.length) {//判断是否有二层子节点
        let children = (item.children || []).map((child, cindex) => {
          if (child.children && child.children.length) {//判断是否有三层子节点
            let children2 = (child.children || []).map((child2, cindex2) => {
              return (<label key={child2.idx + '-' + cindex2} htmlFor={item.idx + '-' + child.idx + '-' + child2.idx}
                             className='function-label' onMouseEnter={(event) => {
                let e = event || window.event;
                let elem_tips = document.querySelector('.preview');
                let eleTtop = elem_tips.getClientRects()[0].top;
                var actualTop = e.target.getClientRects()[0].top;
                actualTop = actualTop - eleTtop;
                actualTop = this.state.previewTop + actualTop - 52;
                if (e.target.nodeName === 'SPAN') {
                  return;
                }
                let previewData = {
                  title: eval('\'' + child.text + '\'') + ' » ' + eval('\'' + child2.text + '\''),
                  desc: child2.detail,
                  img: ''
                }
                this.setState({
                  previewTop: actualTop,
                  previewData
                });

              }} onMouseLeave={(event) => {
                let e = event || window.event;
                if (e.target.nodeName === 'SPAN') {
                  return;
                }
                this.setState({
                  previewData: {
                    title: '功能点描述',
                    desc: '鼠标移动到对应的功能点上，此处会显示功能点说明',
                    img: ''
                  }
                });
              }}>
                <Checkbox id={item.idx + '-' + child.idx + '-' + child2.idx}
                          name={item.idx + '.' + child.idx + '.' + child2.idx}
                          checked={child2.checked}
                          onChange={(event) => {
                            this.handleFunctionItemChange(event, child2, platform);
                          }}>{eval('\'' + child2.text + '\'')}</Checkbox>
              </label>);
            });

            return (
              <tr className={cindex % 2 ? 'even' : 'odd'} key={child.idx + '-' + cindex}>
                { cindex != 0 ||
                <td rowSpan={item.children.length} data-idx={item.idx}>{eval('\'' + item.text + '\'')}</td>}
                <td><Checkbox className='module-label' id={child.idx + '-' + cindex} name={item.idx + '.' + child.idx}
                              checked={ child.children.filter(x => x.checked).length === child.children.length}
                              onChange={(event) => {
                                this.handleFunctionItemChange(event, child, platform);
                              }}>{eval('\'' + child.text + '\'')}</Checkbox></td>
                <td>{children2}</td>
              </tr>
            );
          } else {
            // 没有第三节点
            return (
              <tr className={cindex % 2 ? 'even' : 'odd'} key={child.idx + '-' + cindex}>
                { cindex != 0 ||
                <td rowSpan={item.children.length} data-idx={item.idx}>{eval('\'' + item.text + '\'')}</td>}
                <td><Checkbox className='module-label' id={child.idx + '-' + cindex} name={item.idx + '-' + child.idx}
                              checked={child.checked}
                              onChange={(event) => {
                                this.handleFunctionItemChange(event, child, platform);
                              }}>{eval('\'' + child.text + '\'')}</Checkbox></td>
                <td></td>
              </tr>
            );
          }
        });
        return (children);
      } else {
        return (
          <tr className={index % 2 ? 'odd' : 'even'} key={index}>
            <td rowSpan={item.children.length} data-idx={item.idx}>{eval('\'' + item.text + '\'')}</td>
            <td></td>
            <td></td>
          </tr>
        );
      }
    });

    //tabs
    let defaultActiveKey = this.state.defaultActiveKey;
    let tabPaneItem = (this.state.selectedPlatformsData || []).map((item) => {
      return (
        <Tabs.TabPane tab={<Badge count={item.count || 0}><span className='tab-title'>{item.name}</span></Badge>}
                      key={item.idx}>
          <div className='pane-body'>
            <Spin tip='数据加载中...' spinning={this.state.loading}>
              <div className='pane-body-wrapper'>
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
                    <tfoot>
                    <tr>
                      <th colSpan='3'>
                        <Button type='ghost' onClick={() => {
                          this.clearAll(this.state.platformsData);
                          this.setState({platformsData: this.state.platformsData, selectedPaltformKeysCount: 0});
                        }}>一键清空</Button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <Button type='primary' className='hide' onClick={() => {
                          this.initData(this.props);
                        }}>还原默认</Button>
                      </th>
                    </tr>
                    </tfoot>
                  </table>
                </div>
                <div className='preview' style={{top: this.state.previewTop}}>
                  <div className='inner'>
                    <h2>{this.state.previewData.title}</h2>
                    <article>
                      <p>{this.state.previewData.desc}</p>
                      <div className='preview-icon'
                           style={{display: this.state.previewData.img === '' ? 'none' : 'block'}}>
                        <img src='' alt=''/>
                      </div>
                    </article>
                  </div>
                </div>
              </div>
            </Spin>
          </div>
        </Tabs.TabPane>
      );
    });


    const operations = <Button type={this.state.visiblePaltform ? 'primary' : ''} onClick={() => {
      this.editPaltform()
    }}>{this.state.visiblePaltform ? '保存平台' : '修改平台'}</Button>;

    return (
      <div className='steptwo-component'>
        <div className='quote'>
          <ul className='steps clearfix'>
            <li className='current'>
              <em>1</em>
              <span>
                <label>第一步，</label>
                <label>功能评估</label>
              </span>
            </li>
            <li className=''>
              <em>2</em>
              <span>
                <label>第二步，</label>
                <label>评估结果</label>
              </span>
            </li>
          </ul>
          <div className='wrapper'>
            <div style={{display: this.state.visiblePaltform ? 'block' : 'none'}}>
              <ul className='platforms clearfix visible'>
                {paltformItem}
              </ul>
            </div>
            {/*<Tabs tabBarExtraContent={operations} className='tabs' activeKey={defaultActiveKey} onChange={this.headerTabsChange.bind(this)}>*/}
            {/*{tabPaneItem}*/}
            {/*</Tabs>*/}
            <Tabs className='tabs' activeKey={defaultActiveKey} onChange={this.headerTabsChange.bind(this)}>
              {tabPaneItem}
            </Tabs>
            <div className='calculate'>
              <Button type='submit'
                      className={this.state.selectedPaltformKeysCount > 0 ? 'button primary' : 'button disabled'}
                      disabled={this.state.selectedPaltformKeysCount > 0 ? false : true}
                      style={{display: this.state.loading ? 'none' : 'inline-block'}}
                      onClick={() => {
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
