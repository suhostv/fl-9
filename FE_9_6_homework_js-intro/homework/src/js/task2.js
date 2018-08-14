let firstSide = +prompt('Please, input first side of the triangle');
let secondSide = +prompt('Please, input second side of the triangle');
let angle = +prompt('Please, input angle between sides of the triangle');
const MAX_ANGLE = 179; 

if (firstSide <= 0 || secondSide <= 0 || angle <= 0 || angle > MAX_ANGLE 
    || isNaN(firstSide) || isNaN(secondSide)|| isNaN(angle)) {
    console.log('Invalid data');
} else {
    const STRAIGHT = 180;
    let rad = angle * Math.PI/STRAIGHT;
    let thrirdSide = Math.sqrt(Math.pow(firstSide, 2) + Math.pow(secondSide, 2) 
                    - 2 * firstSide * secondSide * Math.cos(rad));
    let perimeter = firstSide + secondSide + thrirdSide;
    let p = perimeter / 2;
    let square = Math.sqrt(p * (p - firstSide) * (p - secondSide) * (p - thrirdSide));

    console.log('c length: ' + Math.round(thrirdSide * 100) / 100 + '\n' +
                'Triangle square: ' + Math.round(square * 100) / 100 + '\n' +
                'Triangle perimeter: ' + Math.round(perimeter * 100) / 100);
}