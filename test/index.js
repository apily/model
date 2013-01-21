var Model = require('model');
var assert = require('component-assert');

describe('Model#get(name)', function() {
  it('should get attribute value', function() {
    var model = new Model({name: 'Federico'});
    assert(model.get('name') === 'Federico');
  });
});