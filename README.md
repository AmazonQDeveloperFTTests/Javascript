# FiveStars JavaScript Style Guide() {

*Better than anarchy!*

## Table of Contents

  1. [Objects](#objects)
  1. [Arrays](#arrays)
  1. [Strings](#strings)
  1. [Functions](#functions)
  1. [Iterators](#iterators)
  1. [Properties](#properties)
  1. [Variables](#variables)
  1. [Hoisting](#hoisting)
  1. [Comparison Operators & Equality](#comparison-operators--equality)
  1. [Blocks](#blocks)
  1. [Control Statements](#control-statements)
  1. [Comments](#comments)
  1. [Whitespace](#whitespace)
  1. [Commas](#commas)
  1. [Semicolons](#semicolons)
  1. [Type Casting & Coercion](#type-casting--coercion)
  1. [Naming Conventions](#naming-conventions)
  1. [Accessors](#accessors)
  1. [Events](#events)
  1. [License](#license)


## Guiding Principles

* Consistency beats optimality.
* Typographical space is no longer limited by printing costs or tiny monitors.  Optimizing code density per line no longer makes sense.
* Whitespace makes things easier to read (andnotusingwhitespacemakesthingshardertoread).  Err on more whitespace rather than less.
* Cutting-and-pasting whole lines is easier than any alternative and makes diffs easier to parse.
	
## Objects

  <a name="objects--no-new"></a><a name="1.1"></a>
  - [1.1](#objects--no-new) Use the literal syntax for object creation. eslint: [`no-new-object`](http://eslint.org/docs/rules/no-new-object.html)

    ```javascript
    // bad
    var item = new Object();

    // good
    var item = {};
    ```

  <a name="objects--quoted-props"></a><a name="1.2"></a>
  - [1.2](#objects--quoted-props) Only quote properties that are invalid identifiers. eslint: [`quote-props`](http://eslint.org/docs/rules/quote-props.html)

    > Why? In general we consider it subjectively easier to read. It improves syntax highlighting, and is also more easily optimized by many JS engines.

    ```javascript
    // bad
    var bad = {
      'foo': 3,
      'bar': 4,
      'data-blah': 5,
    };

    // good
    var good = {
      foo: 3,
      bar: 4,
      'data-blah': 5,
    };
    ```

  <a name="objects--prototype-builtins"></a>
  - [1.3](#objects--prototype-builtins) Do not call `Object.prototype` methods directly, such as `hasOwnProperty`, `propertyIsEnumerable`, and `isPrototypeOf`.

    > Why? These methods may be shadowed by properties on the object in question - consider `{ hasOwnProperty: false }` - or, the object may be a null object (`Object.create(null)`).

    ```javascript
    // bad
    console.log( object.hasOwnProperty(key) );

    // good
    console.log( Object.prototype.hasOwnProperty.call(object, key) );
    ```

**[⬆ back to top](#table-of-contents)**

## Arrays

  <a name="arrays--literals"></a><a name="2.1"></a>
  - [2.1](#arrays--literals) Use the literal syntax for array creation. eslint: [`no-array-constructor`](http://eslint.org/docs/rules/no-array-constructor.html)

    ```javascript
    // bad
    var items = new Array();

    // good
    var items = [];
    ```

  <a name="arrays--push"></a><a name="4.2"></a>
  - [2.2](#arrays--push) Use [Array#push](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/push) instead of direct assignment to add items to an array.

    ```javascript
    var someStack = [];

    // bad
    someStack[someStack.length] = 'abracadabra';

    // good
    someStack.push('abracadabra');
    ```

  <a name="arrays--bracket-newline"></a>
  - [2.3](#arrays--bracket-newline) Use line breaks after open and before close array brackets if an array has multiple lines

	```javascript
	// bad
	var arr = [
		[0, 1], [2, 3], [4, 5],
	];

	var objectInArray = [{
		id: 1,
	}, {
		id: 2,
	}];

	var numberInArray = [
	1, 2,
	];

	// good
	var arr = [[0, 1], [2, 3], [4, 5]];
	
	var objectInArray = [
		{
		  id: 1,
		},
		{
		  id: 2,
		},
	];
	
	var numberInArray = [
		1,
		2
	];
	```

**[⬆ back to top](#table-of-contents)**

## Strings

  <a name="strings--quotes"></a><a name="3.1"></a>
  - [3.1](#strings--quotes) Use single quotes `'` for strings. eslint: [`quotes`](http://eslint.org/docs/rules/quotes.html)

 
	```javascript
	// bad
	var name = "Buckaroo Banzai";
	var note = "Doesn\'t play accordion. Likes \"The Sound of Music\"."; 
	 
	// good
	var name = 'Buckaroo Banzai';
	var note = 'Doesn\'t play accordion. Likes "The Sound of Music".';
	```

  <a name="strings--line-length"></a><a name="3.2"></a>
  - [3.2](#strings--line-length) Strings that cause the line to go over 100 characters should not be written across multiple lines using string concatenation. 

    > Why? Broken strings are painful to work with and make code less searchable.

    ```javascript
    // bad
    var errorMessage = 'This is a super long error that was thrown because \
    of Batman. When you stop to think about how Batman had anything to do \
    with this, you would get nowhere \
    fast.';

    // bad
    var errorMessage = 'This is a super long error that was thrown because ' +
    'of Batman. When you stop to think about how Batman had anything to do ' +
    'with this, you would get nowhere fast.';

    // good
    var errorMessage = 'This is a super long error that was thrown because of Batman. When you stop to think about how Batman had anything to do with this, you would get nowhere fast.';
    ```

  <a name="strings--eval"></a><a name="3.3"></a>
  - [3.3](#strings--eval) Never use `eval()` on a string, it opens too many vulnerabilities. eslint: [`no-eval`](http://eslint.org/docs/rules/no-eval)

  <a name="strings--escaping"></a><a name="3.4"></a>
  - [3.4](#strings--escaping) Do not unnecessarily escape characters in strings. eslint: [`no-useless-escape`](http://eslint.org/docs/rules/no-useless-escape)

    > Why? Backslashes harm readability, thus they should only be present when necessary.

    ```javascript
    // bad
    var foo = '\'this\' \i\s \"quoted\"';

    // good
    var foo = '\'this\' is "quoted"';
    ```

**[⬆ back to top](#table-of-contents)**

## Functions

  <a name="functions--declarations"></a><a name="4.1"></a>
  - [4.1](#functions--declarations) Use named function expressions instead of function declarations. eslint: [`func-style`](http://eslint.org/docs/rules/func-style)

    > Why? Function declarations are hoisted, which means that it’s easy - too easy - to reference the function before it is defined in the file. This harms readability and maintainability. If you find that a function’s definition is large or complex enough that it is interfering with understanding the rest of the file, then perhaps it’s time to extract it to its own module! Don’t forget to name the expression - anonymous functions can make it harder to locate the problem in an Error’s call stack.

    ```javascript
    // bad
    function foo() {
      // ...
    }

    // bad
    var foo = function () {
      // ...
    };

    // good
    var foo = function foo() {
      // ...
    };
    ```

  <a name="functions--iife"></a><a name="4.2"></a>
  - [4.2](#functions--iife) Wrap immediately invoked function expressions in parentheses. eslint: [`wrap-iife`](http://eslint.org/docs/rules/wrap-iife.html)

    > Why? An immediately invoked function expression is a single unit - wrapping both it, and its invocation parens, in parens, cleanly expresses this.

    ```javascript
    // immediately-invoked function expression (IIFE)
    (function () {
      console.log('Welcome to the Internet. Please follow me.');
    }());
    ```

  <a name="functions--in-blocks"></a><a name="4.3"></a>
  - [4.3](#functions--in-blocks) Never declare a function in a non-function block (`if`, `while`, etc). Assign the function to a variable instead. Browsers will allow you to do it, but they all interpret it differently. eslint: [`no-loop-func`](http://eslint.org/docs/rules/no-loop-func.html)

**Note:** ECMA-262 defines a `block` as a list of statements. A function declaration is not a statement. [Read ECMA-262’s note on this issue](http://www.ecma-international.org/publications/files/ECMA-ST/Ecma-262.pdf#page=97).

  <a name="functions--arguments-shadow"></a><a name="4.4"></a>
  - [4.4](#functions--arguments-shadow) Never name a parameter `arguments`. This will take precedence over the `arguments` object that is given to every function scope.

    ```javascript
    // bad
    function foo( name, options, arguments ) {
      // ...
    }

    // good
    function foo( name, options, args ) {
      // ...
    }
    ```

  <a name="functions--constructor"></a><a name="4.5"></a>
  - [4.5](#functions--constructor) Never use the Function constructor to create a new function. eslint: [`no-new-func`](http://eslint.org/docs/rules/no-new-func)

    > Why? Creating a function in this way evaluates a string similarly to eval(), which opens vulnerabilities.

    ```javascript
    // bad
    var add = new Function( 'a', 'b', 'return a + b' );

    // still bad
    var subtract = Function( 'a', 'b', 'return a - b' );
    ```

  <a name="functions--signature-spacing"></a><a name="4.6"></a>
  - [4.6](#functions--signature-spacing) Provide spaces between 1) the `function` keyword and the parens for anonymous functions and 2) the close-paren and opening brace. eslint: [`space-before-function-paren`](http://eslint.org/docs/rules/space-before-function-paren) [`space-before-blocks`](http://eslint.org/docs/rules/space-before-blocks)

    > Why? You shouldn’t have to add or remove a space when adding or removing a name.

    ```javascript
    // bad
    var f = function(){};
    var g = function (){};
    var h = function() {};

    // good
    var x = function () {};
    var y = function a() {};
    ```

  <a name="functions--mutate-params"></a><a name="4.7"></a>
  - [4.7](#functions--mutate-params) Never mutate parameters. eslint: [`no-param-reassign`](http://eslint.org/docs/rules/no-param-reassign.html)

    > Why? Manipulating objects passed in as parameters can cause unwanted variable side effects in the original caller.

    ```javascript
    // bad
    function f1( obj ) {
      obj.key = 1;
    }

	// good
    function f1( obj ) {
    	var key = obj.key; 
    }
	
    // overkill
    function f2( obj ) {
      var key = Object.prototype.hasOwnProperty.call( obj, 'key' ) ? obj.key : 1;
    }
    ```

  <a name="functions--reassign-params"></a><a name="4.8"></a>
  - [4.8](#functions--reassign-params) Never reassign parameters. eslint: [`no-param-reassign`](http://eslint.org/docs/rules/no-param-reassign.html)

    > Why? It's confusing.  Reviewers expect possible mutation of parameters, but not complete reassignment.  Reassigning parameters can also lead to unexpected behavior, especially when accessing the `arguments` object. And can cause optimization issues, especially in V8.

    ```javascript
    // bad
    function f1( a ) {
      a = 1;
      // ...
    }

    function f2( a ) {
      if( !a ) { a = 1; }
      // ...
    }

    // good
    function f3( a ) {
      var b = a || 1;
      // ...
    }
    ```

  <a name="functions--signature-invocation-indentation"></a>
  - [4.9](#functions--signature-invocation-indentation) Functions with multiline signatures, or invocations, should be indented just like every other multiline list in this guide: with each item on a line by itself.

    ```javascript
    // bad
    function foo( bar,
                  baz,
                  quux) {
      // ...
    }

    // good
    function foo( bar, baz, quux ) {};

    function foo(
      bar,
      baz,
      quux
    ) {
      // ...
    }

    // bad
    console.log(foo,
      bar,
      baz);

    // good
    console.log(foo, bar, baz, quux);    

    console.log(
      foo,
      bar,
      baz
    );
    ```

  <a name="functions--boolean-parameters"></a>
  - [4.10](#functions--boolean-parameters) Avoid boolean parameters.

    > Why?  While boolean parameters convey their meaning clearly within the function definition, they do not at the sites of the calls.  Use hashes with named parameters to convey their purpose in the context from which they are called.
  
    ```javascript
    // bad
    var fall = function fall(object, up) {
      var g = ACCELERATION_FROM_EARTH;
      if( up ) {
        g = -g;
      }
      // handle falling
    }

    fall(object, false);

    // good
    var fall = function fall(object, options) {
      var g = UNIVERSAL_CONSTANTS.accelerationDueToEarthsGravity;
      if( options.direction === 'up' ) {
        g = -g;
      }
      // handle falling
    }

    fall( object, { direction: 'up' } );

    // bad (real code)
      initMouseEvent(
        eventType,
        true /* bubble */, true /* cancelable */,
        window, null,
        0, 0, 0, 0, /* coordinates */
        false, false, false, false, /* modifier keys */
        0 /*left*/, null
        );
    // left?

    // so much better
      initMouseEvent({
        eventType: eventType,
        bubble: true,
        cancelable: true
      });

    // worse, but ok
      initMouseEvent({
        eventType: eventType,
        bubble: true,
        cancelable: true,
        coordinates: [0, 0, 0, 0],
        modifierKeys: {
          shift: false,
          control: false,
          alt: false,
          command: false
        },
        left: 0,
        whoKnows: null
      });	

    ```

**[⬆ back to top](#table-of-contents)**

## Iterators

  <a name="iterators--nope"></a><a name="11.1"></a>
  - [5.1](#iterators--nope) Don’t use `for` iterators. Prefer JavaScript’s higher-order functions instead of loops like `for-in` or `for-of`.  (If you have to do an early return, there may be no good way around it though.)  eslint: [`no-iterator`](http://eslint.org/docs/rules/no-iterator.html) [`no-restricted-syntax`](http://eslint.org/docs/rules/no-restricted-syntax)

    > Why? This enforces our immutable rule. Dealing with pure functions that return values is easier to reason about than side effects.

    > Use `map()` / `every()` / `filter()` / `find()` / `findIndex()` / `reduce()` / `some()` / ... to iterate over arrays, and `Object.keys()` / `Object.values()` / `Object.entries()` to produce arrays so you can iterate over objects.

    ```javascript
    var numbers = [1, 2, 3, 4, 5];

    // bad
    var sum = 0;
    for( var num of numbers ) {
      sum += num;
    }
    sum === 15;

    // good
    var sum = 0;
    numbers.forEach( function(num) => {
      sum += num;
    });
    sum === 15;

    // best (use the functional force)
    var sum = numbers.reduce( function(total, num) => total + num, 0 );
    sum === 15;

    // bad
    var increasedByOne = [];
    for( var i = 0; i < numbers.length; i++ ) {
      increasedByOne.push( numbers[i] + 1 );
    }

    // good
    var increasedByOne = [];
    numbers.forEach( function(num) => {
      increasedByOne.push(num + 1);
    });

    // best (keeping it functional)
    var increasedByOne = numbers.map(function () { num => num + 1; });
    
    // bad
    var hasAThree = false;
    insanelyLongArray.forEach( function (value) {
    	if( value === 3 ) {
    		hasAThree = true;
		}    		
    });
    
    return hasAThree;
    
    // good
    for( var i = 0; i < insanelyLongArray.length; i++ ) {
    	if( insanelyLongArray[i] === 3 ) {
    		return true;
    }
    
    return false;
    
    ```

**[⬆ back to top](#table-of-contents)**

## Properties

  <a name="properties--dot"></a><a name="12.1"></a>
  - [6.1](#properties--dot) Use dot notation when accessing properties. eslint: [`dot-notation`](http://eslint.org/docs/rules/dot-notation.html) jscs: [`requireDotNotation`](http://jscs.info/rule/requireDotNotation)

    ```javascript
    var luke = {
      jedi: true,
      age: 28,
    };

    // bad
    var isJedi = luke['jedi'];

    // good
    var isJedi = luke.jedi;
    ```

  <a name="properties--bracket"></a><a name="12.2"></a>
  - [6.2](#properties--bracket) Use bracket notation `[]` when accessing properties with a variable.

    ```javascript
    var luke = {
      jedi: true,
      age: 28,
    };

    function getProp(prop) {
      return luke[prop];
    }

    var isJedi = getProp('jedi');
    ```
    
  <a name="es2016-properties--exponentiation-operator"></a>
  - [6.3](#es2016-properties--exponentiation-operator) Use exponentiation operator `**` when calculating exponentiations. eslint: [`no-restricted-properties`](http://eslint.org/docs/rules/no-restricted-properties).

    ```javascript
    // bad
    var binary = Math.pow(2, 10);

    // good
    var binary = 2 ** 10;
    ```

**[⬆ back to top](#table-of-contents)**

## Variables

  <a name="variables--const"></a><a name="13.1"></a>
  - [7.1](#variables--const) Always use `var` to declare variables. Not doing so will result in global variables. We want to avoid polluting the global namespace. eslint: [`no-undef`](http://eslint.org/docs/rules/no-undef) [`prefer-const`](http://eslint.org/docs/rules/prefer-const)

    ```javascript
    // bad
    superPower = new SuperPower();

    // good
    var superPower = new SuperPower();
    ```
    
    
  <a name="variables--always-initialize"></a><a name="7.2"></a>
  - 7.2 Always initialize variables.
    
    ```javascript
    // bad
    var i;
    var foo;
    i = 8;

    // good
    var i 	= 8;
    var foo 	= null;
    ```
	
  <a name="variables--one-const"></a><a name="13.2"></a>
  - [7.2](#variables--one-const) Use one `var` declaration per variable. eslint: [`one-var`](http://eslint.org/docs/rules/one-var.html) 

    > Why? It’s easier to add new variable declarations this way, and you never have to worry about swapping out a `;` for a `,` or introducing punctuation-only diffs. You can also step through each declaration with the debugger, instead of jumping through all of them at once.

   ```javascript
    // bad
    var items = getItems(),
        goSportsTeam = true,
        dragonball = 'z';

    // bad
    // (compare to above, and try to spot the mistake)
    var items = getItems(),
        goSportsTeam = true;
        dragonball = 'z';

    // good
    var items = getItems();
    var goSportsTeam = true;
    var dragonball = 'z';
    
    // best
	var items 			= getItems();
	var goSportsTeam 	= true;
	var dragonball 		= 'z';    
   ```

  <a name="variables--capitalize-constants"></a><a name="13.3"></a>
  - [7.3](#variables--capitalize-constants) Capitalize your constants.

    ```javascript
    // bad
    var maxNameLength = 16;
    var userCount = getUsers().length;
    
    // good

	```

  <a name="variables--const-let-group"></a><a name="13.3"></a>
  - [7.4](#variables--const-let-group) Group all your constants and then group all your vars.

    > Why? This is helpful when later on you might need to assign a variable depending on one of the previous assigned variables.

    ```javascript
    // bad
    var i, len, dragonball,
        items = getItems(),
        goSportsTeam = true;

    // bad
    var i;
    var items = getItems();
    var dragonball;
    var goSportsTeam = true;
    var len;

    // good
    var GO_SPORTS_TEAM = true;
    var NUM_ITEMS = getItems();
    var dragonball;
    var i;
    var length;
    ```

  <a name="variables--no-chain-assignment"></a><a name="13.5"></a>
  - [7.5](#variables--no-chain-assignment) Don’t chain variable assignments.

    > Why? Chaining variable assignments creates implicit global variables.

    ```javascript
    // bad
    (function example() {
      // JavaScript interprets this as
      // var a = ( b = ( c = 1 ) );
      // The var keyword only applies to variable a; variables b and c become
      // global variables.
      var a = b = c = 1;
    }());

    console.log( a ); // throws ReferenceError
    console.log( b ); // 1
    console.log( c ); // 1

    // good
    (function example() {
      var a = 1;
      var b = a;
      var c = a;
    }());

    console.log( a ); // throws ReferenceError
    console.log( b ); // throws ReferenceError
    console.log( c ); // throws ReferenceError
    ```

  <a name="variables--unary-increment-decrement"></a><a name="13.6"></a>
  - [7.6](#variables--unary-increment-decrement) Avoid using unary increments and decrements (++, --). eslint [`no-plusplus`](http://eslint.org/docs/rules/no-plusplus)

    > Why? Per the eslint documentation, unary increment and decrement statements are subject to automatic semicolon insertion and can cause silent errors with incrementing or decrementing values within an application. It is also more expressive to mutate your values with statements like `num += 1` instead of `num++` or `num ++`. Disallowing unary increment and decrement statements also prevents you from pre-incrementing/pre-decrementing values unintentionally which can also cause unexpected behavior in your programs.

    ```javascript
    // bad
    
    var array = [1, 2, 3];
    var num = 1;
    num++;
    --num;

    var sum = 0;
    var truthyCount = 0;
    for( var i = 0; i < array.length; i++ ) {
      var value = array[i];
      sum += value;
      if( value ) {
        truthyCount++;
      }
    }

    // good
    
    var array = [1, 2, 3];
    var num = 1;
    num += 1;
    num -= 1;

    var sum = array.reduce( (a, b) => a + b, 0 );
    var truthyCount = array.filter(Boolean).length;
    ```

**[⬆ back to top](#table-of-contents)**

## Hoisting

  <a name="hoisting--about"></a><a name="14.1"></a>
  - [8.1](#hoisting--about) `var` declarations get hoisted to the top of their scope, but their assignment does not. 
  
    ```javascript
    // we know this wouldn’t work (assuming there
    // is no notDefined global variable)
    function example() {
      console.log(notDefined); // => throws a ReferenceError
    }

    // creating a variable declaration after you
    // reference the variable will work due to
    // variable hoisting. Note: the assignment
    // value of `true` is not hoisted.
    function example() {
      console.log(declaredButNotAssigned); // => undefined
      var declaredButNotAssigned = true;
    }

    // the interpreter is hoisting the variable
    // declaration to the top of the scope,
    // which means our example could be rewritten as:
    function example() {
      var declaredButNotAssigned;
      console.log(declaredButNotAssigned); // => undefined
      declaredButNotAssigned = true;
    }

    ```
  For this reason declare all variables at the top of their function blocks.
  
  	```javascript
  		// bad
  		function foo(wombats, marmosets) {
  			console.log('Total: ' + numWombats + numMarmosets);

  			var numWombats = wombats.length;
  			console.log('Wombats: ' + wombatCount);
  			
  			var numMarmosets = marmosets.length;
  			console.log('Marmosets count: ' + numMarmosets);
  		}
  		
  		// good
  		function foo(wombats, marmosets) {
  			var numWombats = wombats.length;    			var numMarmosets = marmosets.length;		
  			console.log('Total: ' + numWombats + numMarmosets);
  			console.log('Wombats: ' + wombatCount);
  			console.log('Marmosets count: ' + numMarmosets);
  		}
  		
  	```
    
  <a name="hoisting--anon-expressions"></a><a name="14.2"></a>
  - [8.2](#hoisting--anon-expressions) Anonymous function expressions hoist their variable name, but not the function assignment.

    ```javascript
    function example() {
      console.log(anonymous); // => undefined

      anonymous(); // => TypeError anonymous is not a function

      var anonymous = function () {
        console.log('anonymous function expression');
      };
    }
    ```

  <a name="hoisting--named-expresions"></a><a name="14.3"></a>
  - [8.3](#hoisting--named-expresions) Named function expressions hoist the variable name, not the function name or the function body.

    ```javascript
    function example() {
      console.log(named); // => undefined

      named(); // => TypeError named is not a function

      superPower(); // => ReferenceError superPower is not defined

      var named = function superPower() {
        console.log('Flying');
      };
    }

    // the same is true when the function name
    // is the same as the variable name.
    function example() {
      console.log(named); // => undefined

      named(); // => TypeError named is not a function

      var named = function named() {
        console.log('named');
      };
    }
    ```

  <a name="hoisting--declarations"></a><a name="14.4"></a>
  - [8.4](#hoisting--declarations) Function declarations hoist their name and the function body.

    ```javascript
    function example() {
      superPower(); // => Flying

      function superPower() {
        console.log('Flying');
      }
    }
    ```

  - For more information refer to [JavaScript Scoping & Hoisting](http://www.adequatelygood.com/2010/2/JavaScript-Scoping-and-Hoisting/) by [Ben Cherry](http://www.adequatelygood.com/).

**[⬆ back to top](#table-of-contents)**

## Comparison Operators & Equality

  <a name="comparison--eqeqeq"></a><a name="9.1"></a>
  - [9.1](#comparison--eqeqeq) Use `===` and `!==` over `==` and `!=`. eslint: [`eqeqeq`](http://eslint.org/docs/rules/eqeqeq.html)

  <a name="comparison--if"></a><a name="9.2"></a>
  - [9.2](#comparison--if) Conditional statements such as the `if` statement evaluate their expression using coercion with the `ToBoolean` abstract method and always follow these simple rules:

    - **Objects** evaluate to **true**
    - **Undefined** evaluates to **false**
    - **Null** evaluates to **false**
    - **Booleans** evaluate to **the value of the boolean**
    - **Numbers** evaluate to **false** if **+0, -0, or NaN**, otherwise **true**
    - **Strings** evaluate to **false** if an empty string `''`, otherwise **true**

    ```javascript
    if( [0] && [] ) {
      // true
      // an array (even an empty one) is an object, objects will evaluate to true
    }
    ```

  <a name="comparison--shortcuts"></a><a name="9.3"></a>
  - [9.3](#comparison--shortcuts) Use shortcuts for booleans, but explicit comparisons for strings and numbers.

  ```javascript
  // bad
  if( isValid === true ) {
    // ...
  }

  // good
  if( isValid ) {
    // ...
  }

  // bad
  if( name ) {
    // ...
  }

  // good
  if( name !== '' ) {
    // ...
  }

  // bad
  if( collection.length ) {
    // ...
  }

  // good
  if( collection.length > 0 ) {
    // ...
  }
  ```

  <a name="comparison--moreinfo"></a><a name="9.4"></a>
  - [9.4](#comparison--moreinfo) For more information see [Truth Equality and JavaScript](https://javascriptweblog.wordpress.com/2011/02/07/truth-equality-and-javascript/#more-2108) by Angus Croll.


  <a name="comparison--nested-ternaries"></a><a name="9.5"></a>
  - [9.5](#comparison--nested-ternaries) Ternaries should not be nested and generally be single line expressions. eslint: [`no-nested-ternary`](http://eslint.org/docs/rules/no-nested-ternary.html)

    ```javascript
    // bad
    var foo = maybe1 > maybe2
      ? 'bar'
      : value1 > value2 ? 'baz' : null;

    // split into 2 separated ternary expressions
    var maybeNull = value1 > value2 ? 'baz' : null;

    // better
    var foo = maybe1 > maybe2
      ? 'bar'
      : maybeNull;

    // best
    var foo = maybe1 > maybe2 ? 'bar' : maybeNull;
    ```

  <a name="comparison--unneeded-ternary"></a><a name="9.6"></a>
  - [9.6](#comparison--unneeded-ternary) Avoid unneeded ternary statements. eslint: [`no-unneeded-ternary`](http://eslint.org/docs/rules/no-unneeded-ternary.html)

    ```javascript
    // bad
    var foo = a ? a : b;
    var bar = c ? true : false;
    var baz = c ? false : true;

    // good
    var foo = a || b;
    var bar = !!c;
    var baz = !c;
    ```

**[⬆ back to top](#table-of-contents)**

## Blocks
<a name="blocks--braces"></a><a name="10.1"></a>
  - [10.1](#blocks--braces) Do not put multiple statements on the same line, it makes it difficult to debug.

    ```javascript
    // bad
    if( test ) { return false; }

    // good
    if( test ) {
      return false;
    }

    // bad
    function bar() { return false; }

    // good
    function bar() {
      return false;
    }
    ```

  <a name="blocks--braces"></a><a name="10.2"></a>
  - [10.2](#blocks--braces) Use braces with all blocks. 
    ```javascript
    // bad
    if( test )
      return false;

    // good
    if( test ) {
      return false;
    }
    ```

  <a name="blocks--cuddled-elses"></a><a name="10.3"></a>
  - [10.3](#blocks--cuddled-elses) If you're using blocks with `if` and `else`, put `else` on the same line as your `if` block’s closing brace. eslint: [`brace-style`](http://eslint.org/docs/rules/brace-style.html) 

    ```javascript
    // bad (one true brace style)
    if( test ) {
      thing1();
    } else {
      thing2();
    }

    // bad (allman) (why did we collectively decide that humans can pair things better if they don't line up?)
    if( test ) 
    {
      thing1();
    } 
    else 
    {
      thing2();
    }
    
    // good (stroustrop)
    if( test ) {
      thing1();
    } 
    else {
      thing3();
    }
    
    ```

**[⬆ back to top](#table-of-contents)**

## Control Statements

  <a name="control-statements"></a>
  - [11.1](#control-statements) In case your control statement (`if`, `while` etc.) gets too long or exceeds the maximum line length, each (grouped) condition could be put into a new line. It’s up to you whether the logical operator should begin or end the line.

    ```javascript
    // bad
    if((foo === 123 || bar === 'abc') && doesItLookGoodWhenItBecomesThatLong() && isThisReallyHappening()) {
      thing1();
    }

    // bad
    if(foo === 123 &&
      bar === 'abc') {
      thing1();
    }

    // bad
    if(foo === 123
      && bar === 'abc') {
      thing1();
    }

    // good
    if(
      (foo === 123 || bar === 'abc') &&
      doesItLookGoodWhenItBecomesThatLong() &&
      isThisReallyHappening()
    ) {
      thing1();
    }

    // good
    if( foo === 123 && bar === 'abc' ) {
      thing1();
    }

    // good
    if(
      foo === 123 &&
      bar === 'abc'
    ) {
      thing1();
    }

    // good
    if(
      foo === 123
      && bar === 'abc'
    ) {
      thing1();
    }
    ```

**[⬆ back to top](#table-of-contents)**

## Comments

  <a name="comments--multiline"></a><a name="12.1"></a>
  - [12.1](#comments--multiline) Use `/** ... */` for comments more than two lines.

    ```javascript
    // bad
    // make() returns a new element
    // based on the passed in tag name
    //
    // @param {String} tag
    // @return {Element} element
    function make(tag) {

      // ...

      return element;
    }
    
    /* Adam
       Had 'em */

    // good
    /**
     * make() returns a new element
     * based on the passed-in tag name
     */
    function make(tag) {

      // ...

      return element;
    }
    
    // Adam
    // Had 'em
    ```

  <a name="comments--singleline"></a><a name="12.2"></a>
  - [12.2](#comments--singleline) Use `//` for single line comments. Place single line comments on a newline above the subject of the comment. Put an empty line before the comment unless it’s on the first line of a block.

    ```javascript
    // bad
    var active = true;  // is current tab

    // good
    // is current tab
    var active = true;

    // bad
    function getType() {
      console.log( 'fetching type...' );
      // set the default type to 'no type'
      var type = this.type || 'no type';

      return type;
    }

    // good
    function getType() {
      console.log( 'fetching type...' );

      // set the default type to 'no type'
      var type = this.type || 'no type';

      return type;
    }

    // also good
    function getType() {
      // set the default type to 'no type'
      var type = this.type || 'no type';

      return type;
    }
    ```

  - [12.3](#comments--spaces) Start all comments with a space to make it easier to read. eslint: [`spaced-comment`](http://eslint.org/docs/rules/spaced-comment)

    ```javascript
    // bad
    //is current tab
    var active = true;

    // good
    // is current tab
    var active = true;

    // bad
    /**
     *make() returns a new element
     *based on the passed-in tag name
     */
    function make(tag) {

      // ...

      return element;
    }

    // good
    /**
     * make() returns a new element
     * based on the passed-in tag name
     */
    function make(tag) {

      // ...

      return element;
    }
    ```

  <a name="comments--actionitems"></a><a name="12.4"></a>
  - [12.4](#comments--actionitems) Prefixing your comments with `FIXME` or `TODO` helps other developers quickly understand if you're pointing out a problem that needs to be revisited, or if you're suggesting a solution to the problem that needs to be implemented. These are different than regular comments because they are actionable. The actions are `FIXME: -- need to figure this out` or `TODO: -- need to implement`.

  <a name="comments--fixme"></a><a name="12.5"></a>
  - [12.5](#comments--fixme) Use `// FIXME:` to annotate problems.

    ```javascript
    class Calculator extends Abacus {
      constructor() {
        super();

        // FIXME: shouldn’t use a global here
        total = 0;
      }
    }
    ```

  <a name="comments--todo"></a><a name="12.6"></a>
  - [12.6](#comments--todo) Use `// TODO:` to annotate solutions to problems.

    ```javascript
    class Calculator extends Abacus {
      constructor() {
        super();

        // TODO: total should be configurable by an options param
        this.total = 0;
      }
    }
    ```

  <a name="comments--unhelpful"></a><a name="12.7"></a>
  - [12.7](#comments--unhelpful) Don't make unhelpful or obvious comments.
  
    ```javascript
      // bad

        // increments variable i by one
        i++;

        // Sets the number of tentacles on the monster to five for now
        Monster.setNumberOfTentacles(3);

        // Moved this here after the miso soup incident
        Xrvrrzhhkrrkngng.$$(false, 0, null, true, 'FALSE', undefined, { causeSystemFailures: 700.0 } );

      // good

        i++;
        Monster.setNumberOfTentacles(3);    

        // This call invalidates the Procyon node cache.
        // The string of params are all harmless defaults except the last,
        // which has to be a floating point, and sets failure generation to the minimum of 700.
        Xrvrrzhhkrrkngng.$$(false, 0, null, true, 'FALSE', undefined, { causeSystemFailures: 700.0 } );
    ```
  
**[⬆ back to top](#table-of-contents)**

## Whitespace

  <a name="whitespace--spaces"></a><a name="13.1"></a>
  - [13.1](#whitespace--spaces) The sociopaths have won.  Use 4 spaces instead of the character designed for indentation, through gritted teeth, constantly ruing the fact that we didn't adopt the approach that can easily please everyone instead. eslint: [`indent`](http://eslint.org/docs/rules/indent.html)

    > Why?  To constantly remind ourselves of the cold, brutal and unforgiving nature of this meaningless vale of tears.

    ```javascript
    // unfortunately not recommended by this style guide
    function foo() {
      var name;
    }

    // plain bad
    function bar() {
    ∙var name;
    }

    // what you gotta use
    function baz() {
    ∙∙∙∙var name;
    }
    ```

  <a name="whitespace--before-blocks"></a><a name="13.2"></a>
  - [13.2](#whitespace--before-blocks) Place 1 space before the leading brace. eslint: [`space-before-blocks`](http://eslint.org/docs/rules/space-before-blocks.html) jscs: [`requireSpaceBeforeBlockStatements`](http://jscs.info/rule/requireSpaceBeforeBlockStatements)

    ```javascript
    // bad
    function test(){
      console.log( 'test' );
    }
    
    function() {}

    // good
    function test() {
      console.log( 'test' );
    }
    
    function () {}

    // bad
    dog.set( 'attr',{
      age: '1 year',
      breed: 'Bernese Mountain Dog',
    });

    // good
    dog.set( 'attr', {
      age: '1 year',
      breed: 'Bernese Mountain Dog',
    });
    ```

  <a name="whitespace--around-keywords"></a><a name="13.3"></a>
  - [13.3](#whitespace--around-keywords) Place a space after the opening parenthesis in control statements (`if`, `while` etc.). Place no space between the argument list and the function name in function calls and declarations. eslint: [`keyword-spacing`](http://eslint.org/docs/rules/keyword-spacing.html) 
    ```javascript
    // bad
    if(isJedi) {
      fight ();
    }

    // good
    if( isJedi ) {
      fight();
    }

    // bad
    function fight () {
      console.log ('Swooosh!');
    }

    // good
    function fight() {
      console.log( 'Swooosh!' );
    }
    ```

  <a name="whitespace--infix-ops"></a><a name="13.4"></a>
  - [13.4](#whitespace--infix-ops) Set off operators with spaces. eslint: [`space-infix-ops`](http://eslint.org/docs/rules/space-infix-ops.html) jscs: [`requireSpaceBeforeBinaryOperators`](http://jscs.info/rule/requireSpaceBeforeBinaryOperators), [`requireSpaceAfterBinaryOperators`](http://jscs.info/rule/requireSpaceAfterBinaryOperators)

    ```javascript
    // bad
    var x=y+5;

    // good
    var x = y + 5;
    ```

  <a name="whitespace--newline-at-end"></a><a name="13.5"></a>
  - [13.5](#whitespace--newline-at-end) End files with a single newline character. eslint: [`eol-last`](https://github.com/eslint/eslint/blob/master/docs/rules/eol-last.md)
	
    > Why?  Do you even POSIX?  Many (most?) *nix utilities that process text files rely on all lines ending with a line break.
	
    ```javascript
    // bad
    function foo() {
      // ...
    }
    ```

    ```javascript
    // bad
    function foo() {
      // ...
    }
    ↵
    ```

    ```javascript
    // good
    function foo() {
      // ...
    }↵
    ```

  <a name="whitespace--chains"></a><a name="13.6"></a>
  - [13.6](#whitespace--chains) TBD. eslint: [`newline-per-chained-call`](http://eslint.org/docs/rules/newline-per-chained-call) [`no-whitespace-before-property`](http://eslint.org/docs/rules/no-whitespace-before-property)

    ```javascript
    // bad
    $('#items').find('.selected').highlight().end().find('.open').updateCount();
    ```

  <a name="whitespace--after-blocks"></a><a name="13.7"></a>
  - [13.7](#whitespace--after-blocks) Leave a blank line after blocks and before the next statement. jscs: [`requirePaddingNewLinesAfterBlocks`](http://jscs.info/rule/requirePaddingNewLinesAfterBlocks)

    ```javascript
    // bad
    if( foo ) {
      return bar;
    }
    return baz;

    // good
    if( foo ) {
      return bar;
    }

    return baz;

    // bad
    var arr = [
      function foo() {
      },
      function bar() {
      },
    ];
    return arr;

    // good
    var arr = [
      function foo() {
      },

      function bar() {
      },
    ];

    return arr;
    ```

  <a name="whitespace--padded-blocks"></a><a name="13.8"></a>
  - [13.8](#whitespace--padded-blocks) Do not pad your blocks with blank lines. eslint: [`padded-blocks`](http://eslint.org/docs/rules/padded-blocks.html)

    ```javascript
    // bad
    function bar() {

      console.log( foo );

    }

    // bad
    if( baz ) {

    console.log( qux );
    } else {
    console.log( foo );

    }

    // good
    if( baz ) {
      console.log( qux );
    } 
    else {
      console.log( foo );
    }
    ```

  <a name="whitespace--in-parens"></a><a name="13.9"></a>
  - [13.9](#whitespace--in-parens) Add spaces inside parentheses. eslint: [`space-in-parens`](http://eslint.org/docs/rules/space-in-parens.html)
 
    > Why?  Becauseit'seasiertoreadthingswhenweusespacesratherthanputtingeverythingintoonelongrunon.

    ```javascript
    // bad
    function bar(foo) {
      return foo;
    }

    // good
    function bar( foo ) {
      return foo;
    }

    // bad
    if(foo) {
      console.log(foo);
    }

    // good
    if( foo ) {
      console.log(foo);
    }
    ```

  <a name="whitespace--in-brackets"></a><a name="13.10"></a>
  - [13.10](#whitespace--in-brackets) Do not add spaces inside brackets for one-line array declarations. eslint: [`array-bracket-spacing`](http://eslint.org/docs/rules/array-bracket-spacing.html)

    ```javascript
    // bad
    var foo = [ 1, 2, 3 ];
    console.log( foo[ 0 ]) ;

    // good
    var foo = [1, 2, 3];
    console.log( foo[0] );
    ```

  <a name="whitespace--in-braces"></a><a name="13.11"></a>
  - [13.11](#whitespace--in-braces) Add spaces inside curly braces. eslint: [`object-curly-spacing`](http://eslint.org/docs/rules/object-curly-spacing.html)

    ```javascript
    // bad
    var foo = {clark: 'kent'};

    // good
    var foo = { clark: 'kent' };
    ```

  <a name="whitespace--max-len"></a><a name="13.12"></a>
  - [13.12](#whitespace--max-len) Avoid having lines of code that are longer than 100 characters (including whitespace). Note: per [above](#strings--line-length), long strings are exempt from this rule, and should not be broken up. eslint: [`max-len`](http://eslint.org/docs/rules/max-len.html) jscs: [`maximumLineLength`](http://jscs.info/rule/maximumLineLength)

    > Why? This ensures readability and maintainability.

    ```javascript
    // bad
    var foo = jsonData && jsonData.foo && jsonData.foo.bar && jsonData.foo.bar.baz && jsonData.foo.bar.baz.quux && jsonData.foo.bar.baz.quux.xyzzy;

    // bad
    $.ajax({ method: 'POST', url: 'https://airbnb.com/', data: { name: 'John' } }).done(() => console.log('Congratulations!')).fail(() => console.log('You have failed this city.'));

    // good
    var foo = jsonData
      && jsonData.foo
      && jsonData.foo.bar
      && jsonData.foo.bar.baz
      && jsonData.foo.bar.baz.quux
      && jsonData.foo.bar.baz.quux.xyzzy;

    // good
    $.ajax({
      method: 'POST',
      url: 'https://airbnb.com/',
      data: { name: 'John' },
    })
      .done(() => console.log('Congratulations!'))
      .fail(() => console.log('You have failed this city.'));
    ```

**[⬆ back to top](#table-of-contents)**

## Commas

  <a name="commas--leading-trailing"></a><a name="14.1"></a>
  - [14.1](#commas--leading-trailing) Leading commas: **Nope.** eslint: [`comma-style`](http://eslint.org/docs/rules/comma-style.html) jscs: [`requireCommaBeforeLineBreak`](http://jscs.info/rule/requireCommaBeforeLineBreak)

    ```javascript
    // bad
    var story = [
        once
      , upon
      , aTime
    ];

    // good
    var story = [
      once,
      upon,
      aTime,
    ];

    // bad
    var hero = {
        firstName: 'Ada'
      , lastName: 'Lovelace'
      , birthYear: 1815
      , superPower: 'computers'
    };

    // good
    var hero = {
      firstName: 'Ada',
      lastName: 'Lovelace',
      birthYear: 1815,
      superPower: 'computers',
    };
    ```

  <a name="commas--dangling"></a><a name="14.2"></a>
  - [14.2](#commas--dangling) Additional trailing comma: **Nope.** eslint: [`comma-dangle`](http://eslint.org/docs/rules/comma-dangle.html) 


    ```javascript
    // bad
    var hero = {
      firstName: 'Dana',
      lastName: 'Scully',
    };

    var heroes = [
      'Batman',
      'Superman',
    ];

    // good
    var hero = {
      firstName: 'Dana',
      lastName: 'Scully'
    };

    var heroes = [
      'Batman',
      'Superman'
    ];

    // bad
    function createHero(
      firstName,
      lastName,
      inventorOf,
    ) {
      // does nothing
    }

    // good
    function createHero(
      firstName,
      lastName,
      inventorOf
    ) {
      // does nothing
    }
    ```

**[⬆ back to top](#table-of-contents)**

## Semicolons

  <a name="semicolons--required"></a><a name="15.1"></a>
  - [15.1](#semicolons--required) **Yup.** eslint: [`semi`](http://eslint.org/docs/rules/semi.html) jscs: [`requireSemicolons`](http://jscs.info/rule/requireSemicolons)

    ```javascript
    // bad
    function foo() {
      var name = 'Skywalker'
      
      return name
    }

    // good
    function foo() {
      var name = 'Skywalker';
      
      return name;
    }

    ```

**[⬆ back to top](#table-of-contents)**

## Type Casting & Coercion

  <a name="coercion--explicit"></a><a name="16.1"></a>
  - [16.1](#coercion--explicit) Perform type coercion at the beginning of the statement.

  <a name="coercion--strings"></a><a name="16.2"></a>
  - [16.2](#coercion--strings)  Strings:

    ```javascript
    // => this.reviewScore = 9;

    // bad
    var totalScore = this.reviewScore + ''; // invokes this.reviewScore.valueOf()

    // bad
    var totalScore = this.reviewScore.toString(); // isn’t guaranteed to return a string

    // good
    var totalScore = String( this.reviewScore );
    ```

  <a name="coercion--numbers"></a><a name="16.3"></a>
  - [16.3](#coercion--numbers) Numbers: Use `Number` for type casting and `parseInt` always with a radix for parsing strings. eslint: [`radix`](http://eslint.org/docs/rules/radix)

    ```javascript
    var inputValue = '4';

    // bad
    var val = new Number( inputValue );

    // bad
    var val = +inputValue;

    // bad
    var val = inputValue >> 0;

    // bad
    var val = parseInt( inputValue );

    // good
    var val = Number( inputValue) ;

    // good
    var val = parseInt( inputValue, 10 );
    ```

  <a name="coercion--comment-deviations"></a><a name="16.4"></a>
  - [16.4](#coercion--comment-deviations) If for whatever reason you are doing something wild and `parseInt` is your bottleneck and need to use Bitshift for [performance reasons](https://jsperf.com/coercion-vs-casting/3), leave a comment explaining why and what you're doing.

    ```javascript
    // good
    /**
     * parseInt was the reason my code was slow.
     * Bitshifting the String to coerce it to a
     * Number made it a lot faster.
     */
    var val = inputValue >> 0;
    ```

  <a name="coercion--bitwise"></a><a name="16.5"></a>
  - [16.5](#coercion--bitwise) **Note:** Be careful when using bitshift operations. Numbers are represented as [64-bit values](https://es5.github.io/#x4.3.19), but bitshift operations always return a 32-bit integer ([source](https://es5.github.io/#x11.7)). Bitshift can lead to unexpected behavior for integer values larger than 32 bits. [Discussion](https://github.com/airbnb/javascript/issues/109). Largest signed 32-bit Int is 2,147,483,647:

    ```javascript
    2147483647 >> 0; // => 2147483647
    2147483648 >> 0; // => -2147483648
    2147483649 >> 0; // => -2147483647
    ```

  <a name="coercion--booleans"></a><a name="16.6"></a>
  - [16.6](#coercion--booleans) Booleans:

    ```javascript
    var age = 0;

    // bad
    var hasAge = new Boolean( age );

    // good
    var hasAge = Boolean( age );

    // ok
    var hasAge = !!age;
    ```

**[⬆ back to top](#table-of-contents)**

## Naming Conventions

  <a name="naming--descriptive"></a><a name="17.1"></a>
  - [17.1](#naming--descriptive) Avoid single letter names. Be descriptive with your naming. eslint: [`id-length`](http://eslint.org/docs/rules/id-length)

    ```javascript
    // bad
    function q() {
      // ...
    }

    // good
    function query() {
      // ...
    }
    ```

  <a name="naming--camelCase"></a><a name="17.2"></a>
  - [17.2](#naming--camelCase) Use camelCase when naming objects, functions, and instances. eslint: [`camelcase`](http://eslint.org/docs/rules/camelcase.html) jscs: [`requireCamelCaseOrUpperCaseIdentifiers`](http://jscs.info/rule/requireCamelCaseOrUpperCaseIdentifiers)

    ```javascript
    // bad
    var OBJEcttsssss = {};
    var this_is_my_object = {};

    // good
    var thisIsMyObject = {};
    function thisIsMyFunction() {}
    ```

  <a name="naming--PascalCase"></a><a name="17.3"></a>
  - [17.3](#naming--PascalCase) Use PascalCase only when naming constructors or classes. eslint: [`new-cap`](http://eslint.org/docs/rules/new-cap.html)

    ```javascript
    // bad
    function funkyUser( options ) {
      this.name = options.name;
    }

    var bad = new funkyUser({
      name: 'nope',
    });

    // good
    var good = new FunkyUser({
      name: 'yup',
    });
    ```

  <a name="naming--Acronyms-and-Initialisms"></a>
  - [17.4](#naming--Acronyms-and-Initialisms) Acronyms and initialisms should always be camel-cased, or all lowercased.

    ```javascript
    // bad
    var userID;
    var SMSContainer;
    var HTTPRequests = [];
    var AWSSQSQueueACKOK = what( '?' );

    // good
    var userId;
    var smsContainer;
    var httpRequests = [];
    var AwsSqsQueueAckOk = oh( '.' );
    ```

**[⬆ back to top](#table-of-contents)**

## Accessors

  <a name="accessors--not-required"></a><a name="18.1"></a>
  - [18.1](#accessors--not-required) Accessor functions for properties are not required.

  <a name="accessors--boolean-prefix"></a><a name="18.2"></a>
  - [18.2](#accessors--boolean-prefix) If the property/method is a `boolean`, use `isVal()`.

    ```javascript
    // bad
    if( dragon.dead() ) {
      return false;
    }

    // good
    if( dragon.isDead()) {
      return false;
    }
    ```


**[⬆ back to top](#table-of-contents)**

## Events

  <a name="events--hash"></a><a name="19.1"></a>
  - [19.1](#events--hash) When attaching data payloads to events (whether DOM events or something more proprietary like Backbone events), pass a hash instead of a raw value. This allows a subsequent contributor to add more data to the event payload without finding and updating every handler for the event. For example, instead of:

    ```javascript
    // bad
    $(this).trigger( 'listingUpdated', listing.id );

    // ...

    $(this).on( 'listingUpdated', function( e, listingId ) {
      // do something with listingId
    });
    ```

    prefer:

    ```javascript
    // good
    $(this).trigger( 'listingUpdated', { listingId: listing.id });

    // ...

    $(this).on( 'listingUpdated', function(e, data) {
      // do something with data.listingId
    });
    ```

  **[⬆ back to top](#table-of-contents)**


## License

(The MIT License)

Copyright (c) 2014-2017 Airbnb

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

**[⬆ back to top](#table-of-contents)**


# };
