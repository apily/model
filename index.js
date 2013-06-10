/**
 * model
 * Model model
 *
 * @copyright 2013 Enrico Marino and Federico Spini
 * @license MIT
 */ 

/**
 * Expose component
 */

module.exports = function () {

  /**
   * Component dependencies
   */

  var Emitter = require('emitter');

  /**
   * @constructor Model
   * @description Create a model.
   * @param {Object} options options
   *   @param {Object} [options.attributes] attributes
   * @return {Model} a model
   */
  
  function model (attributes, options) {
    if (!(this instanceof model)) {
      return new model(attributes, options);
    }
    Emitter.call(this);
    attributes = attributes || {};
    options = options || {};
    
    this.collection = options.collection;
    this.attributes = {};
    this.set_all(attributes, options);
  }
  
  /**
   * Inherit from `Emitter`
   */
  
  model.prototype = Object.create(Emitter.prototype);
  model.prototype.constructor = Model;
  
  /**
   * get
   * Get the attribute value.
   *
   * @param {String} key attribute name
   * @return {Mixed} the attribute value
   * @api public
   */
  
  model.prototype.get = function (key) {
    return this.attributes[key];
  };
  
  /**
   * set
   * Set the attribute value.
   *
   * @param {String} key attribute name
   * @param {Mixed} value attribute value
   * @param {Object} options options
   *   @param {Boolean} [options.silent]
   * @return {model} this for chaining
   * @api public
   */
  
  model.prototype.set = function (key, value, options) {
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
  
  /**
   * set_all
   * Set the attribute values.
   *
   * @param {Object} values attribute values
   * @param {Object} options options
   *   @param {Boolean} [options.silent]
   * @return {model} this for chaining
   * @api public
   */
  
  model.prototype.set_all = function (values, options) {
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
  
  /**
   * del
   * Delete attribute `key`.
   *
   * @param {String} key key
   * @param {Object} options options
   *   @param {Boolean} [options.silent]
   * @return {model} this for chaining.
   * @api public
   */
  
  model.prototype.del = function (key, options) {
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
  
  /**
   * has
   * Return `true` if attributes contains `key`, `false` otherwise.
   *
   * @param {String} key key
   * @return {Boolean} 
   *   `true` if attributes contains `key`,  
   *   `false` otherwise.
   * @api public
   */
  
  model.prototype.has = function (key) {
    return this.attributes[key] != null;
  };

  return model;
}
