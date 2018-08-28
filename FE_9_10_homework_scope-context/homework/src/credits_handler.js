function userCard (index) {
    let cardBalance = 100;
    let limit = 100;
    let history = [];
    function getCardOptions() {
        return {
            balance: cardBalance,
            transactionLimit: limit,
            historyLogs: history   
        };
    }

    function putCredits(amount){
        cardBalance += amount;
        history.push({
            operationType: 'Received credits',
            credits: amount,
            operationTime: new Date().toLocaleString('en-GB')
        });
    }

    function takeCredits(amount) {
        cardBalance - amount >= 0 && limit >= amount ? 
        cardBalance -= amount : 
        console.log('Something went wrong. Please, check your balance and transaction limit');
        history.push({
            operationType: 'Withdrawal of credits',
            credits: amount,
            operationTime: new Date().toLocaleString('en-GB') //en-GB added to make date look like on SOW
        });
    }

    function setTransactionLimit(amount) {
        limit = amount;
        history.push({
            operationType: 'Transaction limit change',
            credits: amount,
            operationTime: new Date().toLocaleString('en-GB')
        });
    }

    function transferCredits(amount, recipient) {
        let tax = amount * 0.005;
        let taxedCredits = amount - tax;
        if (cardBalance - taxedCredits >= 0 && limit >= amount ) {
            takeCredits(amount + tax);
            recipient.putCredits(taxedCredits);
        } else {
            console.log('Something went wrong. Please, check your balance and transaction limit');
        }
    }
    return {
        getCardOptions,
        putCredits,
        takeCredits,
        setTransactionLimit,
        transferCredits
    };
}

const card1 = userCard(1);
const card2 = userCard(1);
console.log(card1.putCredits(100),card1.setTransactionLimit(200), card1.transferCredits(100, card2), card1.getCardOptions());


console.log(card2.takeCredits(21), card2.setTransactionLimit(280),card2.getCardOptions());