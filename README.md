# FP

These are just my random notes on a course I did with Kyle Simpson on his functional light course. This is all my wild conjecture, and is probably wrong.

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


