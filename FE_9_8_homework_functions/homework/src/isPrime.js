const isPrime = number => {
    if (!Number.isInteger(number) || number <= 0) {
        return 'Input numbers should be positive integer';
    } else {
        for ( let i = 2; i < number; i++){
            if (number % i === 0) {
                return false;
            }
        }        
        //I chose standart where natural numbers start with 1, so no checking on 0
        return number !== 1;
    }    
}

//isPrime(5); // => true