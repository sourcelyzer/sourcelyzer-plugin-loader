var loaderUtils = require('loader-utils');
var loader = require('./src/loader');

module.exports = function(content) {
  const options = loaderUtils.getOptions(this);
  return loader(content, options.modules);
};
