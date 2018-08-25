const getMin = (...numbers) => {
    let temp = Infinity;
    for (let i = 0; i < numbers.length; i++){
        if (!Number.isInteger(numbers[i])) {
            return 'Input numbers should be integer';
        } else {
            if (numbers[i] < temp) {
                temp = numbers[i];
            }
        }
    }
    let output = temp !== Infinity ? temp : 'No numbers to check';
    return output;
}

//getMin(3, 0, -3); // => -3
