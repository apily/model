/*
 * model
 * Model model
 *
 * @copyright 2012 Enrico Marino and Federico Spini
 * @license MIT
 */ 

/*
 * Expose `Model`
 */

module.exports = Model;

/*
 * Module dependencies
 */

var Emitter = require('emitter');

/*
 * Model
 * Create a model.
 *
 * @param {Object} attributes attributes
 * @return {Collection} a collection
 */

function Model(attributes) {
  if (!(this instanceof Model)) {
    return new Model(attributes);
  }
  Emitter.call(this);
  this.attributes = attributes || [];
}

/*
 * Inheritance
 */

Model.prototype = Object.create(Emitter.prototype);
Model.prototype.constructor = Model;

/*
 * get
 * Get the attribute value.
 *
 * @param {String} key attribute name
 * @return {Mixed} the attribute value
 * @api public
 */

Model.prototype.get = function(key) {
  return this.attributes[key];
};

/*
 * set
 * Set the attribute value.
 *
 * @param {String} key attribute name
 * @param {Mixed} value attribute value
 * @param {Object} options options
 *   @param {Boolean} [options.silent]
 * @return {Object} this, for chaining
 * @api public
 */

Model.prototype.set = function(key, value, options) {
  if (key == null) {
    return this;
  }
  if (typeof key === 'object') {
    return this.set_all(key, value);
  }

  var attributes = this.attributes;
  var silent = options && options.silent;
  var previous = attributes[key];
  var created = !(key in attributes);
  var changed = created || previous !== value;

  if (changed) {
    attributes[key] = value;
  }
  if (changed && !silent) {
    this.emit('change:' + key, this, value, previous);
    this.emit('change', this);
  }

  return this;
};

/*
 * set_all
 * Set the attribute values.
 *
 * @param {Object} values attribute values
 * @param {Object} options options
 *   @param {Boolean} [options.silent]
 * @return {Object} this, for chaining
 * @api public
 */

Model.prototype.set_all = function(values, options) {
  if (values == null) {
    return this;
  }

  var silent = options && options.silent;
  var attributes = this.attributes;
  var key;
  var value;
  var previous;
  var changed;
  var created;
  var emitted;
  
  for (key in values) {
    previous = attributes[key];
    value = values[key];    
    created = !(key in attributes);
    changed = created || previous !== value;

    if (changed) {
      attributes[key] = value;
    }
    if (changed && !silent) {
      this.emit('change:' + key, this, value, previous);
      emitted = true;
    }
  }

  if (emitted) {
    this.emit('change', this);
  }

  return this;
};

/*
 * del
 * Delete attribute `key`.
 *
 * @param {String} key key
 * @param {Object} options options
 *   @param {Boolean} [options.silent]
 * @return {Attribute} this, for chaining.
 * @api public
 */

Model.prototype.del = function(key, options) {
  var attributes = this.attributes;
  var silent = options && options.silent;
  var value = attributes[key];
  var present = value != null;

  if (present) {
    delete attributes[key];
  }
  if (present && !silent) {
    this.emit('delete:' + key, this, value);
  }

  return this;
};

/*
 * has
 * Return `true` if attributes contains `key`, `false` otherwise.
 *
 * @param {String} key key
 * @return {Boolean} `true` if attributes contains `key`, `false` otherwise.
 * @api public
 */

Model.prototype.has = function(key) {
  return this.attributes[key] != null;
};
