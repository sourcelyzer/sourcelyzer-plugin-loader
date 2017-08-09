var expect = require('chai').expect;
var loader = require('../src/loader.js');

it('converts require statements', function() {

  var content = 'var VarMod = require(\'varModule\');\n';
  content    += 'let LetMod = require(\'letModule\');\n';
  content    += 'const ConstMod = require(\'constModule\');\n';

  new_content = loader(content, ['varModule', 'letModule', 'constModule']).split("\n");

  expect(new_content[0]).to.equal('var VarMod = Require(\'varModule\');');
  expect(new_content[1]).to.equal('var LetMod = Require(\'letModule\');');
  expect(new_content[2]).to.equal('var ConstMod = Require(\'constModule\');');
});

it('converts import statements', function() {
  var content = 'import SomeMod from \'someKindOfModule\';\n';
  
  new_content = loader(content, ['someKindOfModule']).split("\n");

  expect(new_content[0]).to.equal('var SomeMod = Require(\'someKindOfModule\');');
});

it('converts import all statements', function() {
  var content = 'import * as d3 from \'d3\';\n';

  new_content = loader(content, ['d3']).split("\n");
  expect(new_content[0]).to.equal('var d3 = Require(\'d3\');');
});
