(function () {
    let start = confirm('Do you want to play a game?');
    let gameInfo = {
        rangeStart : 0,
        rangeEnd : 5,
        prize : 10,
        prizeMultiplier : 3,
        rangeMultiplier : 2
    }
    let wannaPlay = true;
    let wannaContinue;

    if (start) {    
        
        while (wannaPlay) {
            wannaContinue = true;    
            let prize = gameInfo.prize;
            let range = gameInfo.rangeEnd; 
            let totalPrize = 0;

            while (wannaContinue) {
                let myNumber = generateNumber(range);
                
                for (let i = 0, currentPrize = prize; i < 3; i++) {
                    let userNumber = +prompt('Enter a number from ' + gameInfo.rangeStart + 
                    ' to ' + range + '\n' +
                    'Attempts left: ' + (3-i) + '\n' +
                    'Total prize: ' + totalPrize + '$\n' +
                    'Possible prize on current attempt: ' + Math.floor(currentPrize) +'$' 
                    ,''); 
                    
                    if (myNumber === userNumber) {
                        totalPrize += Math.floor(currentPrize);
                        
                        let playAgain = confirm('Congratulations! Your prize is: ' + 
                            totalPrize + '$\nDo you want to continue?')
                        if (!playAgain) {
                            endOfGameConfirmation(totalPrize);
                            break;
                        } else {
                            range *= gameInfo.rangeMultiplier;                           
                            prize *= gameInfo.prizeMultiplier; 
                            currentPrize = prize;
                            break;
                        }
                    } else if (i === 2) {
                        endOfGameConfirmation(totalPrize);
                        break;
                    } else {
                        currentPrize /= 2;
                    }
                }
            }
        }
    } else {
        alert('You did not become a millionaire, but can.');
    }

    function endOfGameConfirmation(prizeWin) {
        wannaContinue = false;
        alert('Thank you for your game. Your prize is: ' + prizeWin);
        if (!confirm('Want to play again?')) {
            wannaPlay = false;
            return wannaPlay; 
        }
    }

    function generateNumber (maxRange) {
        return Math.floor(Math.random() * ++maxRange);
    }
}());