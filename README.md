# FP

These are just my random notes on a course I did with Kyle Simpson on his functional light course. This is all my wild conjecture, and is probably wrong. The spelling is almost definitely wrong.

### Imperative

Imperative code focuses on _how_ to do something. To understand it involves understanding everything that it does. It is made to describe to a computer what is happening. We must put ourselves in the mind of the computer to understand it. And step through it.

### Declarative

Instead of thinking of _how_ to do something, we focus instead on _what_ things are. We declare something to be, e.g.this is the sum of all the numbers in the list. Then we can carry on with the assumption that this is correct. Declarative code is better at communicating to other developers what's happening, without forcing us to think like a computer.

Declarative makes the _why_ of the code more obvious. Once we know the _why_ it becomes much easier to reason about things like, can it be updated? Can this part really be deleted? We know the intention of the thing, we can be much more confident in thinking about how to improve / add to / refactor the thing. This is not to say that we dont need to know the how sometimes - if there's a strange, or non obvious for example performance increase, we can comment on the how.

### Procedures Vs Functions

Kyle makes the distinction between a procedure - a function with a side effect that doesn't really have an output. Consider a function that just `console.log`s a result. A function is a calculation - which exists separate from time.


### Wrappers

The important thing is that the interactions between things are side effect free. We can wrap side-effect-y things in closures etc to preserve the functional interactions between other things. This is how we corner the side effect stuff.

Here are some techniques you can use if you need to play with global / shared state.

We can wrap it in a function that takes state uses that state, returns a new bit, but resets the shared state to what it was before the function ran. Analagous to how tests setup and teardown.


### Unary, Binary, Rest

Unary functions - funcs that take one argument
Binary functions - take two arguments

These are higher order functions - functions that can receive functions and or returns a function.

We can wrap other functions in these, so that we can pass in any kind of argument and _know_ that we will only use the first or first two arguments.

Other Higher Order Functions:

`flip` - flips the order of the first two arguments.
`reverseArgs` - could reverse the list of all args.
`apply` - take a list of args and spread it to pass each of the elements as individual argument to the function it wraps.

Higher order functions are like plumbing that make lots of different functions written in all kinds of libraries compatible.

They are ways of manipulaing the values wrapped inside of the functions, before the functions are applied. Analagous to a `map` over a list.
If we think of functions as functors, or containers, or computational contexts to wrap our values in.

### Point Free Programming - Tacit Programming

Both terrible names.

Essentially you compose functions without giving them a parameter. Then eventually you do. You don't list explicit arguments to a function. I think elixir's pipe operator kind of does this.

A good example is thinking about defining an `isOdd` function, then instead of defining an `isEven` function like this:

```javascript
function isEven(x) {
  return !isOddd(x)
}
```
You can define a more general `not` or `complement` function which will negate the result of any function you pass to it:

```js
function not(fn) {
  return function negated(...args) {
    return !fn(...args)
  };
}
```

This will then allow us to write isEven as `not(isOdd)(value)`

We want arguments to go from more general to more specific. We want to be able to pass in as late as possible the stuff that is most likely to change more often.
It is more likey that you would re-use a mapper function than you would re-use a specific array that you apply a map function to. For this reason, we



The idea of separating concerns of where we get values from to the concern of what we do with them.

composing unary functions is wayyyyyy easier. Should probably make them unary by currying / partial application then compose. when they are

e.g.

```js
var isShortEnough = compose(lte(5), prop("length"));
```

both `lte` and `prop` take 2 args. We make give them each an argument, which leaves us waiting for an argument.


### Composition

compose vs pipe


### Closures

Store off values for lulz. E.g.

```js
function add(x, y) {
  return function() {
    return x + y
  }
}

var fifteen = add(10, 5) // => function() { 10 + 5}
```
`fifteen()` puts the numbers in the function context.

### Referential Transparency

If you can replace the call of the function with the result of the function, and not affect any of the rest of the programme, then it is a pure function. It is referentially transparent.

Saying pure functions are functions that return the same output for the same input is wrong. Consider this:


```js
var x = 10;

function thing(y) {
  x++;
  return y + 10
}
```

thing(20) // => 30


This function will always return the same result for each given input. But it is not referentially transparent as if you memoize it, the state of the programme wont be the same if you run it again.

A common example is logging during the function. This makes a function impure as if we memoize it and run it twice, then the state of the programme wont be the same.

One way to solve this is to return the log as well, perhaps in an array.


```js
function thing(y) {
  log = Logger.addToLog("Thing")
  return [log, y + 10]
}
```

The writer monad is a way of making logging referentially transparant? By returning the log as part of the response, we restore the referential transparancy of the function.

Can we do this for any side effect?

```js
var x = 10
function thing(y) {
  newX = x;
  log = Logger.addToLog("Thing")
  return [log, newX++, y + 10]
}
```


### Specificity and Generalisation

#### specialization of generalised functions

We can implement specializations of generalised functions using partial application or currying.

That is, we can define 'instances' of a general function in terms of the specific arguments we have right now.

Partial app takes a function and some args to partially apply, returns a new function that is expecting *all of the rest* of the args *on the next call*.

To partially apply, you need an argument to partially apply. You can partially apply one argument, and it wouldnt really be currying as you need the argument when you do it.

In contrast, currying doesn't require ANY arguments ahead of time. You can curry a function without any arguments:

```js
// instead of:
add(x, y)

// we can:
function add(x) {
  return function(y) {
    return x+y
  }
}
```

Now we can provide any input whenever we have it, and for each argument we pass it we specialize the general function `add` some more:

```js
addTen = add(10);
```

Once we've curried the function, and we provided a ten to it, the function is now more specialized as it isn't a general adding function, now it is a function that adds ten to anything. Eventually when we add the final argument, its the most specific an add function an be.

A good use case for either of them is changing a binary or unary function into a function that takes one argument so that we can more easily compose them.


Date is always the most specific input, which is why it's always on the right hand side. That means you can delay the specificity until the very last moment. This is why elixir is a bit weird. It does it the other way meaning you can pipe things gratutiously. However the f*ck you spell that word.



### Transducers

A way to compose reducers, even though reducing functions take more than one arg and so is a bit messy usually.


