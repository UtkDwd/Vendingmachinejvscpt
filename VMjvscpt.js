 //a tentative roadmap for the project 
 //1. Deposit bet money
 //2. Determine the number of line in the slot machine to bet to
 //3. Spin the slot machine
 //4. check if the user won or not
 //5. Recieve the win amount!!(if any) :)
 //6. Play again!
 // How to use the functions in javascript
//
 // function deposit () {
//
  //  return 1
 // }
// or 
const prompt = require("prompt-sync")(); 

const ROWS = 3;
const COLS = 3;

const SYMBOLS_COUNT = { //object it is
  A: 2,
  B: 4,
  C: 6,
  D: 8
}

const SYMBOLS_VALUES = {
  A: 5,
  B: 4,
  C: 3,
  D: 2
}
//SYMBOLS_COUT["A"] -> will give value '2'






const deposit = () => {
  while (true) {  
  const depositAmount = prompt("Enter a Deposit amount: ");
      const numberdepositAmount = parseFloat(depositAmount);

      if (isNaN(numberdepositAmount) || numberdepositAmount <= 0){
          console.log("Invalid Deposit, Try again.");  
      }
      else {
        return numberdepositAmount;
      }
    }   
  };
const getNumberOfLines = () => {
  while (true) {  //while - to set this code to run forever.
    const lines = prompt("Select the no. of Lines to bet on (1-3): ");
        const numberOfLines = parseFloat(lines);
  
        if (isNaN(numberOfLines) || numberOfLines <= 0 || numberOfLines > 3){
            console.log("Invalid Number of lines, Re-enter.");  
        }
        else {
          return numberOfLines;
        }
      }  
};

const getBet = (balance, lines) => {   // we accept values of balance and line variables to use it in this function
  while (true) {  //while - to set this code to run forever.
    const bet = prompt("Enter the bet per line: ");
        const numberbet = parseFloat(bet);
  
        if (isNaN(numberbet) || numberbet <= 0 || numberbet > balance / lines  ){
            console.log("Invalid Bet, Try again.");  
        }
        else {
          return numberbet;
        }
  bet
}
};

const spin = () => {
  const symbols = [];
  for (const[symbol, count] of Object.entries(SYMBOLS_COUNT)){
    //console.log(symbol, count)
      for(let i = 0; i < count; i++){
        symbols.push(symbol);
      }
    }
    //console.log(symbols); to watch the array formed to choose random from!
      const reels = []; // each of these nested arrays represent a column inside our slot machine!
      for (let i = 0; i < COLS; i++ ){
        reels.push([]);
        const reelSymbols = [...symbols];
        for (let j = 0; j < ROWS; j++) {
          const randomIndex = Math.floor(Math.random() * reelSymbols.length) 
          const selectedSymbol = reelSymbols[randomIndex];
          reels[i].push(selectedSymbol);
          reelSymbols.splice(randomIndex, 1);
        }
      }
      
      return reels;
  };

  const transpose = (reels) => {
    const rows = [];

    for (let i= 0; i < ROWS; i++ ){
       rows.push([]);
       for(let j = 0; j < COLS; j++){
        rows[i].push(reels[j][i]);
      }
    }

    return rows;
  };

  const printRows = (rows) => {
    for (const row of rows){
        let rowString = "";
        for (const [i, symbol] of row.entries()){
            rowString += symbol
            if (i != row.length - 1){
                rowString += " | "
            }
        }
        console.log(rowString)
    }

  };

  const getWinnings = (rows, bet, lines) => {
    let winnings = 0;
    
    for (let row =0; row< lines; row++){
      const symbols = rows[row];
      let allSame = true;

      for (const symbol of symbols){
        if(symbol != symbols[0]){
          allSame = false;
          break;
        }
      }
      if (allSame){
        winnings += bet * SYMBOLS_VALUES[symbols[0]]
      }
    }
    return winnings;
  }

const game= () => {


  let balance = deposit(); //type of variable is let because we can change its value after addn subtn.

    while (true){
      console.log("You have a balance of $" + balance);
  const numberOfLines = getNumberOfLines(); // value of const can't be changed
  const bet = getBet(balance, numberOfLines); // we pass values of balance and number of line to this fuction
  balance -= bet * numberOfLines;
  
  const reels = spin();
  const rows = transpose(reels);
  printRows(rows);
  const winnings = getWinnings(rows, bet, numberOfLines);
  
  balance += winnings;
  console.log("You won, $" + winnings.toString());
   
  if (balance <= 0 ){
    console.log("You ran out of Money!");
    break;
  }

  const playAgain = prompt("Do you want to play again (y/n)? ");

  if (playAgain != "y") break;

  }
};

game();




//console.log(reels);
//console.log(rows);
// we will now transpose the columns the result to the rows.
 
