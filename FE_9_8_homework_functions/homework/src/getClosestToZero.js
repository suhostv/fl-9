const getClosestToZero = (...numbers) => {
    let closest = Infinity;
    for (let i = 0; i < numbers.length; i++){
        if (!Number.isInteger(numbers[i])) {
            return 'Input numbers should all be integer';
        } else {
            if (Math.abs(numbers[i]) < Math.abs(closest)) {
                closest = numbers[i];
            }
        }        
    }
    let output = closest !== Infinity ? closest : 'No numbers to check';
    return output;
}

//getClosestToZero(9, 5, -4, -9); // => -4
