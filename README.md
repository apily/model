# model

Model component

## Installation

    $ component install apily/model

## Usage

```js
var model = require('model');

var User = model();

var user = User({ name: 'Enrico' });

user.set('color', 'yellow');
```

## API

### Model(Object:attributes, Object:options)

Create a model

```js
var model = new Model({name: 'Enrico'});
```

### Model#get(String:key)

Get the value of the property `key`.

```js
console.log('Hello ' + model.get('name') + '!');
```

### Model#set(String:key, Mixed:value, Object:options)

Set the value of the property `key` to `value`.  
If the value is different from the previous one   
emit the event *change:*`key`.

```js
model.set('color', 'yellow');
```

### Model#set_all(Object:values)

Set the values.

```js
model.set({color: 'red'})
```

### Model#del(String:key)

Delete the property `key`.

```js
model.del('color');
```

### Model#has(String:key)

Test if it has the property `key`.

```js
var has_color = model.has('color');
```


## License

(The MIT License)

Copyright (c) 2013 Enrico Marino and Federico Spini

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
