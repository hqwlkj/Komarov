'use strict';

import baseConfig from './base';

let config = {
  appEnv: 'dist',  // feel free to remove the appEnv property here
  host:'http://120.76.212.104:8081'
};

export default Object.freeze(Object.assign({}, baseConfig, config));
