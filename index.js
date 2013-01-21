
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

Model.prototype = Emitter.prototype;
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
