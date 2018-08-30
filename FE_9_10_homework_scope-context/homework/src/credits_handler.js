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
            recipient.putCredits(taxedCredits);
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
// let user = new UserAccount('Bob');
// user.addCard()
// user.addCard()
// user.addCard()

// console.log(user.userCards);

// let card1 = user.getCardByKey(1);
// let card2 = user.getCardByKey(2);


// card1.putCredits(500);
// card1.setTransactionLimit(800);
// card1.transferCredits(300, card2);

// card2.takeCredits(50);

// console.log(card1.getCardOptions()); 
// console.log(card2.getCardOptions()); 

// let user2 = new UserAccount('vitaliy');
// user2.addCard();
// user2.addCard();
// user2.addCard();
// user2.addCard();

// console.log(user2.userCards);

// let card11 = user2.getCardByKey(1);
// let card22 = user2.getCardByKey(2);


// card11.putCredits(10000);
// card11.setTransactionLimit(30000);
// card11.transferCredits(5000, card22);

// card22.takeCredits(50);

// console.log(card11.getCardOptions()); 
// console.log(card22.getCardOptions()); 

