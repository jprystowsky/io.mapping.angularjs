io.mapping.angularjs
====================

Helpful additions for AngularJS

License
-------

If you use this technology, I would love to hear about it!

This software is distributed under the terms of the [MIT license](http://opensource.org/licenses/MIT):

Copyright (c) 2013 Jacob Miles Prystowsky

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

What's here
-----------

Not much for now --- I intend on growing this project as I write more useful general-purpose AngularJS code for the
world.

Like a good boy, I also intend on adding unit testing, etc., which I naughtily have not done thus far. :( Sorry.

### Directives

#### enumeratedList

enumeratedList will iterate through the elements of a supplied list `list` and concatenate their values. It correctly
handles various array sizes to generate sensible output ("A," "A and B," "A, B, and C," etc.) and is intelligent enough
to handle non-primitive types and undefined values. Specifically:

* Naughty types (undefined) are skipped
* Primitive types (strings and numbers) are used as-is
* Arrays are recursively iterated over, in place
* Objects are evaluated given a `property` attribute
* Functions are called

##### Required attributes:

* `list:` An array of values

##### Optional attributes:

* `separator:` A string like "," as in: "Moe, ..." (defaults to ',')
* `final-separator:` A string like "and" as in "Moe, Larry, and Curly" (defaults to 'and')
* `property:` The property to look for when examining objects

##### Sample usage

````
<span enumerated-list list='myList' property='value'></span>
````

(elsewhere)

````
$scope.myList = [
    'One',
    ['Two', 'Three'],
    function () { return "Four" },
    { value: 'Five' }
];
````

will yield `One, Two, Three, Four, and Five.` (You could go deeper and have
objects that return arrays of functions, etc., but you get the point.)

Usage
-----

To generate a production version, ensure you have a working directory first with `npm install`
and then generate the build version (which will combine and compress the JavaScript) with `grunt.`

Installing these additions goes the usual way:

Copy the relevant scripts (either minified or otherwise) somewhere into your [AngularJS](http://angularjs.org) project
(see the [seed](https://github.com/angular/angular-seed) if you need a quick starting place) and reference the scripts
in your application. Then use [DI](http://docs.angularjs.org/guide/di) to include them:

```
var yourApp = angular.module('com.example.someApp', [
    'io.mapping.angularjs'
]);
```
