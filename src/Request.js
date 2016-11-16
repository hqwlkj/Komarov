import {message} from 'antd';
import Config from 'config';
import SS from 'parsec-ss';
import $ from 'jquery';
import Console from './Console';
import MiniLogin from 'components/MiniLoginComponent';

export default (option)=> {

  let error = option.error;
  option.error = (jqXHR, textStatus, errorThrown)=> {
    if (!!error) {
      error({message:textStatus});
    }else{
      console.log("error:", jqXHR.status === 401)
      switch (jqXHR.status) {
        case(500):
          break;
        case(403):
          break;
        case(400)://非法的数据请求
        case(401):
          //SS.clear();
          SS.set(Config.loginOutMsg, '您没有权限访问该资源');
          MiniLogin.show(()=>{
            location.reload();
          });
          break;
        case(404):
          location.href = 'errorpage.html';
          break;
        default:
        //alert('暂时无法连接到服务器');
      }
    }
  }

  let success = option.success;
  option.success = (data)=> {
    if (!!success) {
      if (data.code === 0) {
        success(data);
      } else {
        if(!!error){
          error(data);
        }else{
          Console.log(data.errors);
          message.error(data.message);
        }
      }
    }
  }


  Object.assign(option, {
    cache: false,
    beforeSend: function (xhr) {
      xhr.setRequestHeader(Config.token, SS.get(Config.token) == null ? '' : SS.get(Config.token));
      //xhr.setRequestHeader("Content-Type","application/json");
      // xhr.setRequestHeader(Config.tokenId, SS.get(Config.tokenId) == null ? '' : SS.get(Config.tokenId));
    },
    //dataType: 'json',
    //contentType: "application/json"
  });

  if(!!option.type && option.type != "get"){
    option.data = JSON.stringify(option.data);
  }

  return $.ajax(option);
};
