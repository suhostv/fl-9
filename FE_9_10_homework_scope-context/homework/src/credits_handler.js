function userCard (key) {
    const minBalance = 0; 
    let balance = 100;
    let transactionLimit = 100;
    let historyLogs = [];
    function getCardOptions() {
        return {
            balance,
            transactionLimit,
            historyLogs,
            key   
        };
    }

    function putCredits(amount){
        balance += amount;
        historyLogs.push({
            operationType: 'Received credits',
            credits: amount,
            operationTime: new Date().toLocaleString('en-GB') 
        });
    }

    function takeCredits(amount) {
        balance - amount >= minBalance && transactionLimit >= amount ? 
        balance -= amount : 
        console.log('Something went wrong. Please, check your balance and transaction limit');
        historyLogs.push({
            operationType: 'Withdrawal of credits',
            credits: amount,
            operationTime: new Date().toLocaleString('en-GB') 
        });
    }

    function setTransactionLimit(amount) {
        transactionLimit = amount;
        historyLogs.push({
            operationType: 'Transaction limit change',
            credits: amount,
            operationTime: new Date().toLocaleString('en-GB') 
        });
    }

    function transferCredits(amount, recipient) {
        const taxPersentage = 0.005;
        let tax = amount * taxPersentage;
        let taxedCredits = amount - tax;
        if (balance - taxedCredits >= minBalance && transactionLimit >= amount ) {
            takeCredits(amount + tax);
            recipient.putCredits(amount);
        } else {
            console.log('Something went wrong. Please, check your balance and transaction limit');
        }
    }
    return {
        balance,
        transactionLimit,
        key,
        getCardOptions,
        putCredits,
        takeCredits,
        setTransactionLimit,
        transferCredits
    };
}

class UserAccount {
    constructor (name) {
        this.name = name,
        this.userCards = [],
        this.addedCards = 0,
        this.MAX_CARDS = 3
    }
    
    addCard() {
        if (this.addedCards < this.MAX_CARDS) {
            let newCard = userCard(++this.addedCards);
            this.userCards.push(newCard);
        } else {
            return console.log('You cannot add more than 3 cards to your wallet');
        }
    }
    
    getCardByKey(index) {
        return this.userCards[index - 1];
    }
}

