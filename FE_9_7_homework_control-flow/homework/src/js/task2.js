(function guessingGame() {
    let start = confirm('Do you want to play a game?');
    let gameInfo = {
        rangeStart : 0,
        rangeEnd : 5,
        rangeMultiplier : 6
    }

    function onCancel() {
        alert('You did not become a millionaire, but can.');
    }

    function endOfGameConfirmation(callback, prizeWin) {
        alert('Thank you for your game. Your prize is: ' + prizeWin);
        confirm('Want to play again?') ? callback() : alert('See you next time');
    }

    function generateNumber (maxRange) {
        return Math.floor(Math.random() * ++maxRange);
    }
    
    (function game () {
        let prize = 10; 
        let totalPrize = 0;
        let currentRange = gameInfo.rangeEnd;
        
        if (start === false) {
            onCancel();
        } else {                    
            (function round() {
            let myNumber = generateNumber(currentRange);
            console.log(myNumber);
            
                for (let i = 0, currentPrize = prize; i < 3; i++) {
                    let userNumber = prompt('Enter a number from ' + gameInfo.rangeStart + 
                    ' to ' + currentRange + '\n' +
                    'Attempts left: ' + (3-i) + '\n' +
                    'Total prize: ' + totalPrize + '$\n' +
                    'Possible prize on current attempt: ' + Math.floor(currentPrize) +'$' 
                    ,'');
                    
                    

                    if (userNumber === null) {
                        onCancel();
                        break;
                    }
                   
                    userNumber = +userNumber;
                    
                    if (myNumber === userNumber) {
                        totalPrize += Math.floor(currentPrize);
                        let playAgain = confirm('Congratulations! Your prize is: ' + 
                        totalPrize + '$\nDo you want to contunue?');
                        
                        if (!playAgain) {
                            endOfGameConfirmation(game, totalPrize);
                            break;
                        } else {
                            currentRange *= 2;
                           
                            prize *= 3; 
                            currentPrize = prize;
                            round();
                            break;
                        }
                    } else if (i === 3) {
                        endOfGameConfirmation(game, totalPrize);
                        break;
                    } else {
                        currentPrize /= 2;
                    }
                }
            }());    
        }
    }());    
}());