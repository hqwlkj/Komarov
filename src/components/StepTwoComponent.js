'use strict';

import React from 'react';
import {Tabs, Button, Badge, Spin, Tooltip} from 'antd';
import MiniLogin from './MiniLoginComponent';
import classnames from 'classnames';
import SS from 'parsec-ss';
import Config from 'config';
import console from '../Console';
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
      previewTop: 0
    }
    this.loadData = this.loadData.bind(this);
    this.initData = this.initData.bind(this);
    this.clearAll = this.clearAll.bind(this);
    this.editPaltform = this.editPaltform.bind(this);
    this.headerTabsChange = this.headerTabsChange.bind(this);
    this.submitCalculateResults = this.submitCalculateResults.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.initData(nextProps);
  }

  componentWillMount() {
    this.initData(this.props);
  }

  loadData(idx) {
    // debugger;
    let platformsData = this.state.platformsData;
    let platform = platformsData.filter(item=>item.idx === idx)[0];
    if (!platform.children) {
      request({
        type: 'get',
        url: Config.host + '/fea',
        data: {},
        success: (data)=> {
          console.log(data);
          platform.children = data.data;
          this.setState({
            platformsData: platformsData
          });
        }
      });
    }
  }

  initData(props) {
    // this.setState({
    //   loading: true,
    //   platformsData: [],
    //   platformsChildData: []
    // });
    let platforms = props.location.query.platforms.split(',');

    let platformsData = [{
      idx: 'P001',
      name: 'Web网站',
      icon: '&#xe602;',
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

    // platformsChildData = data.data;
    //
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
    // this.setState({
    //   loading: false,
    //   platformsData,
    //   platformsChildData,
    //   selectedPlatformsData
    // });

    this.setState({
      selectedPaltforms: platforms,
      defaultActiveKey: platforms[0] || platformsData[0].idx,
      platformsData,
      selectedPlatformsData
    }, ()=> {
      this.loadData(this.state.selectedPaltforms[0]);
    });
  }

  clearAll(parent) {
    // debugger;
    if (!parent || parent.length === 0) {
      return;
    }
    parent.forEach((x)=> {
      x.checked = false;
      x.count = 0;
      this.clearAll(x.children);
      return x;
    });
    return;
  }

  headerTabsChange(key) {
    console.log('headerTabsChange ===> ', key);
    this.setState({
      defaultActiveKey: key
    }, ()=> {
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
        visiblePaltform: false,
      }, ()=> {
        let platforms = this.props.location.query.platforms.split(',');
        this.setState({
          selectedPaltforms: platforms
        }, ()=> {
          this.initData();
        });
      });
    } else {
      this.setState({
        visiblePaltform: true
      });
    }
  }


  getValues(parent) {
    // debugger;
    let falseLength = 0;
    let values = parent.map((item)=> {
      // debugger;
      let obj = {};
      if (!item.children) {
        obj[item.idx] = '';
        if (!item.checked) {
          // falseLength++;
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
    // if(falseLength === values.length){
    //   return undefined;
    // }

    return values.filter(x=>x != undefined);
  }

  //提交计算结果
  submitCalculateResults() {
    let values = this.getValues(this.state.platformsData);
    console.log(values);
    setTimeout(()=> {
      //MiniLogin.hide();
    }, 3000);
    // if (SS.get(Config.token) === null) {
    //   MiniLogin.show(()=> {
    //     console.log('xxxxxx');
    //   });
    //   return;
    // }
    //
    // this.props.history.push({
    //   pathname: '/step-3/',
    //   query: {platforms: this.state.selectedPaltforms.join(',')}
    // });
  }


  render() {

    //平台信息
    let paltformItem = (this.state.platformsData || []).map((item, index)=> {
      let check = this.state.selectedPaltforms.filter(idx => item.idx === idx).length != 0;
      return (
        <li className={classnames('column-short', {
          'current': check
        })} key={index}>
          <label htmlFor={item.idx + '-' + index}>
            <i className="iconfont" dangerouslySetInnerHTML={{__html: item.icon}}></i>
            <em className="platform-title">{item.name}</em>
            <input type="checkbox" id={item.idx + '-' + index} name="platform" checked={check} onChange={(event)=> {
              if (event.target.checked) {
                let selectedPaltforms = this.state.selectedPaltforms;
                selectedPaltforms.push(item.idx);
                this.setState({
                  selectedPaltforms
                });
              } else {
                this.setState({
                  selectedPaltforms: this.state.selectedPaltforms.filter(idx=>idx != item.idx)
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
    let platform = this.state.platformsData.filter(item=>item.idx === this.state.defaultActiveKey)[0];
    // debugger;
    let tbody = (platform.children || []).map((item, index)=> {//第一节
      // console.log("x:",item);
      // return (<span>1111</span>);
      if (item.children && item.children.length) {//判断是否有二层子节点
        let children = (item.children || []).map((child, cindex)=> {
          if (child.children && child.children.length) {//判断是否有三层子节点
            let children2 = (child.children || []).map((child2, cindex2)=> {
              let check = this.state.selectedItemTwoKeys.filter(idx => child.idx === idx).length != 0;
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
                  title: eval("'" + child.text + "'") + ' » ' + eval("'" + child2.text + "'"),
                  desc: child2.detail,
                  img: ''
                }
                this.setState({
                  previewTop: actualTop,
                  previewData
                });

              }} onMouseLeave={(event)=> {
                let e = event || window.event;
                if (e.target.nodeName === 'SPAN') {
                  return;
                }
                let previewData = {
                  title: '功能点描述',
                  desc: '鼠标移动到对应的功能点上，此处会显示功能点说明',
                  img: ''
                }
                this.setState({
                  previewData
                });
              }}><input type="checkbox"
                        id={item.idx + '-' + child.idx + '-' + child2.idx}
                        name={item.idx + '.' + child.idx + '.' + child2.idx}
                        value="on"
                        checked={child2.checked}
                        onChange={(event)=> {
                          child2.checked = event.target.checked;
                          let count = platform.count || 0;
                          if (event.target.checked) {
                            count++;
                          } else {
                            count--;
                            child.checked = false;
                          }
                          platform.count = count;
                          this.setState({platform});
                        }}/>
                {eval("'" + child2.text + "'")}
              </label>);
            });

            return (
              <tr className={cindex % 2 ? 'even' : 'odd'} key={child.idx + '-' + cindex}>
                { cindex === 0 ? <td rowSpan={item.children.length}>{eval("'" + item.text + "'")}</td> : ''}
                <td><label htmlFor={child.idx + '-' + cindex} className="module-label">
                  <span>{eval("'" + child.text + "'")}</span>
                  <input type="checkbox" id={child.idx + '-' + cindex} name={item.idx + '.' + child.idx} value='no'
                         checked={child.checked || child.children.filter(x=>x.checked).length === child.children.length}
                         onChange={(event)=> {
                           child.checked = event.target.checked;
                           let count = platform.count || 0;
                           if (event.target.checked) {
                             count += child.children.length;
                             child.children.map((x)=> {
                               x.checked = true;
                               return x;
                             });
                           } else {
                             count -= child.children.length;
                             child.children.map((x)=> {
                               x.checked = false;
                               return x;
                             });
                           }
                           platform.count = count;
                           this.setState({platform});
                         }}/>
                </label></td>
                <td>{children2}</td>
              </tr>
            );
          }
        });
        return (children);
      } else {
        return (
          <tr className={index % 2 ? 'odd' : 'even'} key={index}>
            <td rowSpan={item.children.length}>{eval("'" + item.text + "'")}</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
          </tr>
        );
      }
    });

    //tabs
    let defaultActiveKey = this.state.defaultActiveKey;
    let tabPaneItem = (this.state.selectedPlatformsData || []).map((item, index)=> {
      // if (index === 0 && this.state.defaultActiveKey === '') {
      //   defaultActiveKey = item.id;
      // }
      console.log(item.count);
      return (
        <Tabs.TabPane tab={<Badge count={item.count || 0}><span className="tab-title">{item.name}</span></Badge>}
                      key={item.idx}>
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
                      <Button type="ghost" onClick={()=> {
                        this.clearAll(this.state.platformsData);
                        this.setState({platformsData: this.state.platformsData});
                      }}>一键清空</Button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      <Button type="primary" onClick={()=> {
                        this.initData(this.props);
                      }}>还原默认</Button>
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
                    <div className="preview-icon"
                         style={{display: this.state.previewData.img === '' ? 'none' : 'block'}}>
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
              <Tabs tabBarExtraContent={operations} className='tabs' activeKey={defaultActiveKey}
                    onChange={this.headerTabsChange.bind(this)}>
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
