// code here! :)

function numberOne() {
  return 2
}

function numberTwo() {
  return 1
}

function add(x, y){
  return x + y
}


console.log(add(numberOne, numberTwo))

function add2(fun_1, fun_2) {
  return add(fun_1(), fun_2())
}

function numbers(first) {
  return function(second) {
    return first + second
  }
}

function addn(arrayOfFuncs) {
  return arrayOfFuncs.reduce( (acc, func) => ()=> add2(acc, func), ()=> 0)()
}

addn([numberOne, numberTwo])

function uniqList(oddAndEvenNos) {
  return Array.from(new Set(oddAndEvenNos))
}

function uniqEven(list) {
  return uniqList(list).filter((x) => x % 2 == 0)
}

addn([uniqList, uniqEven])
