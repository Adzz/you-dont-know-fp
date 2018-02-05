function lotteryNum() {
  return (Math.round(Math.random() * 100) % 58) + 1;
}

function pickNumber(){}

var luckyLotteryNumbers = [];

for (var i = 0; i < 6; i++) {
  pickNumber();
}

//==================================================================================\\

function lotteryNum() {
  return (Math.round(Math.random() * 100) % 58) + 1;
}

function pickNumber([...currentNumbers]){
  var num;
  do {
    num = lotteryNum()
  } while (currentNumbers.includes(num));
  currentNumbers = [...currentNumbers, num]
  currentNumber.sort((a,b) => a - b);
}

const numNumbs = 6
var luckyLotteryNumbers = [];

for (let i = 0; i < numNumbs; i++) {
  pickNumber(Object.freeze(luckyLotteryNumbers));
}

console.log(luckyLotteryNumbers);

//==================================================================================\\

function lotteryNum() {
	return (Math.round(Math.random() * 100) % 58) + 1;
}

function pickNumber(){
  var luckyLotteryNumbers = [];

  for (var i = 0; i < 6; i++) {
    luckyLotteryNumbers.push(lotteryNum());
  }
}


function pickNumber(){
  [1,2,3,4,5,6].map((x) => lotteryNum())
}


console.log(pickNumber);



function pickNumber(luckyLotteryNumbers, lotteryNumFun){
  for (var i = 0; i < 6; i++) {
    luckyLotteryNumbers.push(lotteryNumFun())
  }

  // might now be
  return luckyLotteryNumbers.sort().uniq()

}
