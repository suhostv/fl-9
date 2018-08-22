const reverseNumber = (number) => {
    if (!Number.isInteger(number)) {
        return 'Input numbers should be integer';
    } else {
        number = number + '';
        let reversedString = number.split('').reverse();
        if (reversedString[reversedString.length - 1] === '-'){
            reversedString.unshift('-');
            reversedString.pop();
        }
        reversedString = reversedString.join('');
        return parseFloat(reversedString);
    }
}

//reverseNumber(1000); // => 1
//reverseNumber(123); // => 321
//reverseNumber(-456); // => -654
