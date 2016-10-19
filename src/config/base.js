'use strict';

// Settings configured here will be merged into the final config object.
let validateRegExp = {
  decmal: '^([+-]?)\\d*\\.\\d+$',
  // 浮点数
  decmal1: '^[1-9]\\d*.\\d*|0.\\d*[1-9]\\d*$',
  // 正浮点数
  decmal2: '^-([1-9]\\d*.\\d*|0.\\d*[1-9]\\d*)$',
  // 负浮点数
  decmal3: '^-?([1-9]\\d*.\\d*|0.\\d*[1-9]\\d*|0?.0+|0)$',
  // 浮点数
  decmal4: '^[1-9]\\d*.\\d*|0.\\d*[1-9]\\d*|0?.0+|0$',
  // 非负浮点数（正浮点数 + 0）
  decmal5: '^(-([1-9]\\d*.\\d*|0.\\d*[1-9]\\d*))|0?.0+|0$',
  // 非正浮点数（负浮点数 + 0）
  intege: '^-?[1-9]\\d*$',
  // 整数
  intege1: '^[1-9]\\d*$',
  // 正整数
  intege2: '^-[1-9]\\d*$',
  // 负整数
  num: '^([+-]?)\\d*\\.?\\d+$',
  // 数字
  num1: '^[1-9]\\d*|0$',
  // 正数（正整数 + 0）
  num2: '^-[1-9]\\d*|0$',
  // 负数（负整数 + 0）
  ascii: '^[\\x00-\\xFF]+$',
  // 仅ACSII字符
  chinese: '^[\\u4e00-\\u9fa5]+$',
  // 仅中文
  color: '^[a-fA-F0-9]{6}$',
  // 颜色
  date: '^\\d{4}(\\-|\\/|\.)\\d{1,2}\\1\\d{1,2}$',
  // 日期
  email: '^\\w+((-\\w+)|(\\.\\w+))*\\@[A-Za-z0-9]+((\\.|-)[A-Za-z0-9]+)*\\.[A-Za-z0-9]+$',
  // 邮件
  idcard: '^[1-9]([0-9]{14}|[0-9]{17})$',
  // 身份证
  ip4: '^(25[0-5]|2[0-4]\\d|[0-1]\\d{2}|[1-9]?\\d)\\.(25[0-5]|2[0-4]\\d|[0-1]\\d{2}|[1-9]?\\d)\\.(25[0-5]|2[0-4]\\d|[0-1]\\d{2}|[1-9]?\\d)\\.(25[0-5]|2[0-4]\\d|[0-1]\\d{2}|[1-9]?\\d)$',
  // ip地址
  letter: '^[A-Za-z]+$',
  // 字母
  letter_l: '^[a-z]+$',
  // 小写字母
  letter_u: '^[A-Z]+$',
  // 大写字母
  // mobile: '^0?(13|15|18|14|17)[0-9]{9}$',
  mobile: '^\\d{11}$',
  // 手机
  notempty: '^\\S+$',
  // 非空
  password: '^[\\w\\!\\@\\#\\$\\%\\^\\&\\*\\(\\)]{6,18}$',
  // 密码
  fullNumber: '^[0-9]+$',
  // 数字
  picture: '(.*)\\.(jpg|bmp|gif|ico|pcx|jpeg|tif|png|raw|tga)$',
  // 图片
  qq: '^[1-9]*[1-9][0-9]*$',
  // QQ号码
  rar: '(.*)\\.(rar|zip|7zip|tgz)$',
  // 压缩文件
  tel: '^[0-9\-()（）]{7,18}$',
  // 电话号码的函数(包括验证国内区号,国际区号,分机号)
  url: '^http[s]?:\\/\\/([\\w-]+\\.)+[\\w-]+([\\w-./?%&=]*)?$',
  // url
  username: '^[A-Za-z0-9_\\-\\u4e00-\\u9fa5]+$',
  // 户名
  deptname: '^[A-Za-z0-9_()（）\\-\\u4e00-\\u9fa5]+$',
  // 单位名
  zipcode: '^\\d{6}$',
  // 邮编
  // realname: '^[A-Za-z\\u4e00-\\u9fa5]+$',
  // realname: '^[A-Za-z\\u4e00-\\u9fa5.]+$',
  realname: '^\\S{1,10}$',
  // 真实姓名
  companyname: '^[A-Za-z0-9_()（）\\-\\u4e00-\\u9fa5]+$',
  //公司名称
  companyaddr: '^[A-Za-z0-9_()（）\\#\\-\\u4e00-\\u9fa5]+$',
  //公司地址
  companysite: '^http[s]?:\\/\\/([\\w-]+\\.)+[\\w-]+([\\w-./?%&#=]*)?$'
  //公司网站
}

export default {
  token: 'token',//token 信息
  tokenId: 'tokenid',
  user:'user',
  loginOutMsg: 'loginOutMsg',//登录提示信息
  expireTime:'expireTime',
  unreadNum:'unreadNum',//未读消息总条数
  validateRegExp: validateRegExp,
  dateFormat:{
    formatMobile:(str)=> {
      let phone = ''+str;
      return phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
    }
  },
  validateRules: {
    isNull: function (str) {
      return (str == "" || typeof str != "string" || str == undefined);
    },
    betweenLength: function (str, _min, _max) {
      return (str.length >= _min && str.length <= _max);
    },
    isUid: function (str) {
      return new RegExp(validateRegExp.username).test(str);
    },
    fullNumberName: function (str) {
      return new RegExp(validateRegExp.fullNumber).test(str);
    },
    isPwd: function (str) {
      return /^.*([\W_a-zA-z0-9-])+.*$/i.test(str);
    },
    isPwdRepeat: function (str1, str2) {
      return (str1 == str2);
    },
    isEmail: function (str) {
      return new RegExp(validateRegExp.email).test(str);
    },
    isTel: function (str) {
      return new RegExp(validateRegExp.tel).test(str);
    },
    isMobile: function (str) {
      return new RegExp(validateRegExp.mobile).test(str);
    },
    isTelOrMobile: function (str) {
      return new RegExp(validateRegExp.tel_mobile).test(str);
    },
    checkType: function (element) {
      return (element.attr("type") == "checkbox" || element.attr("type") == "radio" || element.attr("rel") == "select");
    },
    isRealName: function (str) {
      return new RegExp(validateRegExp.realname).test(str);
    },
    isCompanyname: function (str) {
      return new RegExp(validateRegExp.companyname).test(str);
    },
    isCompanyaddr: function (str) {
      return new RegExp(validateRegExp.companyaddr).test(str);
    },
    isCompanysite: function (str) {
      return new RegExp(validateRegExp.companysite).test(str);
    },
    simplePwd: function (str) {
      return pwdLevel(str) == 1;
    },
    weakPwd: function (str) {
      for (var i = 0; i < weakPwdArray.length; i++) {
        if (weakPwdArray[i] == str) {
          return true;
        }
      }
      return false;
    }
  },
  ThemColors: (function () {
    var temp = [
      '102,153,204',
      '204,204,102',
      '126,77,150',
      '48,210,204',
      '64,164,84',
      '72,172,201',
      '226,203,21',
    ];
    var colrs = [];

    //生成70个颜色
    for (var i = 0; i < 10; i++) {
      for (var j = 0; j < temp.length; j++) {
        colrs.push([
          'rgba(' + temp[j] + ',1)',
          'rgba(' + temp[j] + ',.7)',
        ])
      }
    }
    return colrs;
  })()
}
