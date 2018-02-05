function foo(x, y) {
  return function() {
    return x + y
  }
}

var x = foo(3,4);

x();	// 7
x();	// 7

// curry it:
function foo(x) {
  return function(y) {
    return x + y
  }
}

addFive = foo(5)
addTen = foo(10)

addTen(20) // 30
addFive(5) // ten
compose(addFive, addTen)(10) // 25
