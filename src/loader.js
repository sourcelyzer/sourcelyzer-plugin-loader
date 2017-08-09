function trimChar(str, charToRemove) {
  while (str.charAt(0) == charToRemove) {
    str = str.substring(1);
  }

  while (str.charAt(str.length-1) == charToRemove) {
    str = str.substring(0,str.length-1);
  }
  return str;
}

module.exports = function(content, modsToConvert) {

  var new_content = '';

  var wildcard_regex = /import \* as (.*)? from '(.*)?'/;
  var import_regex = /import (.*)? from '(.*)?'/;
  var require_regex = /(const|var|let)?\s(.*)?\s\=\srequire\((.*)?\)/

  var modules = {};

  var lines = content.split("\n");

  for (var x = 0; x < lines.length; x++) {
    let line = lines[x];

    let varName, modName;
    
    let wildcard_matches = line.match(wildcard_regex);
    if (wildcard_matches) {
      varName = wildcard_matches[1];
      modName = wildcard_matches[2];
    } else {
      let import_matches = line.match(import_regex);
      if (import_matches) {
        varName = import_matches[1];
        modName = import_matches[2];
      } else {
        let require_matches = line.match(require_regex);
        if (require_matches) {
          varName = require_matches[2];
          modName = require_matches[3];
        }
      }
    }

    if (varName && modName) {
      modName = trimChar(modName, "'");
      modName = trimChar(modName, '"');
      
      if (modsToConvert.indexOf(modName) > -1) {
        line = 'var ' + varName + ' = Require(\'' + modName + '\');\n';
        
      }
    }

    new_content += line
  }

  return new_content;
};
