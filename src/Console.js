import Config from 'config';

let Logger = {};
let func_empty = ()=> {
};
for (let key in console || {}) {
  if (Config.appEnv === 'dist') {
    Logger[key] = func_empty;
  } else if (Config.appEnv === 'dev') {
    Logger[key] = (function (key) {
      return (...args)=> {
        console[key].apply(this, args);
      }
    })(key);
  }
}

export default Logger;
