function output(txt) {
	console.log(txt);
}

function printIf(predicate) {
	return function(msg) {
		if (predicate(msg)) {
			output(msg);
		}
	};
}

function isShortEnough(str) {
	return str.length <= 5;
}

function isLongEnough(str) {
	return !isShortEnough(str);
}

var msg1 = "Hello";
var msg2 = msg1 + " World";

printIf(isShortEnough)(msg1);		// Hello
printIf(isShortEnough)(msg2);
printIf(isLongEnough)(msg1);
printIf(isLongEnough)(msg2);		// Hello World


// Point free implementations
var output = console.log.bind(this);
var isLongEnough = not(isShortEnough);
var printIf = when(output);

var isShortEnough = compose(lte(5), prop("length"));

// lte is <=, it returns you a function that waits for a value to compare
lte(5)(4) // false
lte(5)(5) // true

// prop takes name, and an object to pull that prop off of.

prop("length")("a string") // returns the length of the string. pulls the prop of the given object. in this case a string.


// To get a pointFree if we can look at the `isOdd` / `isEven` and ask, what did we have to do to the `isOdd` function to define `isEven` in terms of it. We had to negate it, which means we can generalise the negation to all functions, then call `not(isEven)`.

// The question here then is, firstly what is `printIf` composed of? Secondly what is the general case here that we can abstract.

// If we look inside `printIf`, we can say it requires a predicate, and an output or 'print' function. So we need to define printIf in terms of the print and predicate functions.

// One way to do this is to say that `printIf` is saying when something is true, print it, and when something is false, print it.

// That means the general thing we are trying to do is run something when the predicate returns true, and dont run it if the predicate returns false. Let's start with that interface and see if we can get to the right answer:

given(isShortEnough)(output) ("thing")

// lets break it up first of all to get this:
given(isShortEnough)

// the function has to take in a predicate
function given(predicate) {
  ...
}

// okay and we need to get to this
given(isShortEnough)(output)

// it means we have to return a function that is wanting to take in a function that does something

function given(predicate) {
  return function(thingToDo) {
    ...
  }
}

// now what does this function do? From our inerface we can see it needs to return a function that takes an argument:
given(isShortEnough)(output)("thing")

function given(predicate) {
  return function(thingToDo) {
    return function thing(arg) {
      ..
    }
  }
}

// Now we have to ask what is the thing we want to do with the final argument? Well we want to pass it into the thingToDo function, as that's the thing we want to do:

function given(predicate) {
  return function(functionToRun) {
    return function thing(arg) {
      return functionToRun(arg);
    }
  }
}

// Okay, so we are getting there, except we aren't using the predicate function at all. Right now given will ignore the predicate and just run the function with the value everytime.

given(false)(output)("thing") // "thing"

// So lets take account of the predicate.... Where do we put it? if we put it here:
function given(predicate) {
  if (predicate(arg)) {
    return function(functionToRun) {
      return function thing(arg) {
        return functionToRun(arg);
      }
    }
  }
}

// we dont have the `arg` yet to asses the predicate. Instead we need to put it here:

function given(predicate) {
  return function(functionToRun) {
    return function thing(arg) {
      if (predicate(arg)) {
        return functionToRun(arg);
      }
    }
  }
}

// awesome. Now we can do this:
given(isShortEnough)(output)("hello");

// or this:
var shortEnough = given(isShortEnough)
shortEnough(output)("hello") // "hello"


// If instead we want to
printIf = given(output)




isOdd
isEven
isShortEnough
isLongEnough


function isOdd(v) {
  return v % 2 ==1;
}

function isEven(v){
  return !isOdd(v);
}

function isShortEnough(str) {
  return str.length <= 5;
}

function isLongEnough(str) {
  return !isShortEnough(str);
}

// point free - less code;

function isOdd(v) {
  return v % 2 ==1;
}

function isShortEnough(str) {
  return str.length <= 5;
}


function not(fn) {
  return function negated(...args) {
    return !fn(..args);
  }
}

not(isOdd);
not(isShortEnough);





