
function foo(x) {
	y++;
	z = x * y;
}


var y = 5, z;

foo(20);
z;		// 120

foo(25);
z;		// 175


// ========================= Exercise 1 ======================== \\

// The function foo(x) implicitly takes in y, and implicitly returns a y.
// We know this becuase the second time the function runs, when y is different
// we get a different answer. Making it pure means making that implicit y
// explicit

function bar(x, y) {
  var z;

  foo(x)
  return z;

  function foo(x) {
    y++;
    z = x * y;
  }
}


// ========================= Exercise 2 ======================== \\
// This is pure, but not making the y explicit. So we still rely on the global state.
// a better more pure function is to do the second implementation:


function bar(x) {
  var original_y = y;
  var original_z = z;

  function foo(x) {
    original_y++;
    original_z = x * original_y;
  }
  return original_z;
}


// better:

function foo(x) {
  y++;
  z = x * y;
}

function bar(curX,curY) {
  var [origY,origZ] = [y,z];
  y = curY;
  foo(curX);
  var [newY,newZ] = [y,z];
  [y,z] = [origY,origZ];
  return [newY,newZ];
}
