(function () {
    let start = confirm('Do you want to play a game?');
    let gameInfo = {
        rangeStart : 0,
        rangeEnd : 5,
        prize : 10,
        prizeMultiplier : 3,
        rangeMultiplier : 2
    }
    let inputTemplate = (minRange, maxRange, attempts, total, current) => `
    Enter a number from ${minRange} to ${maxRange}
    Attempts left: ${attempts}
    Total prize: ${total}
    Possible prize on current attempt: ${Math.floor(current)}$`;
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
                    let userNumber = +prompt(inputTemplate(gameInfo.rangeStart, range, 3-i, totalPrize, currentPrize)
                    , ''); 
                    
                    if (myNumber === userNumber) {
                        totalPrize += Math.floor(currentPrize);
                        
                        if ( confirm(`
Congratulations! Your prize is: ${totalPrize} $. 
Do you want to continue?`)) {
                            range *= gameInfo.rangeMultiplier;                           
                            prize *= gameInfo.prizeMultiplier; 
                            currentPrize = prize;
                            break;
                            
                        } else {
                            endOfGameConfirmation(totalPrize);
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
        alert(`You did not become a millionaire, but can.`);
    }

    function endOfGameConfirmation(prizeWin) {
        wannaContinue = false;
        alert(`Thank you for your game. Your prize is: ${prizeWin}`);
        if (!confirm(`Want to play again?`)) {
            wannaPlay = false;
            return wannaPlay; 
        }
    }

    function generateNumber (maxRange) {
        return Math.floor(Math.random() * ++maxRange);
    }
}());