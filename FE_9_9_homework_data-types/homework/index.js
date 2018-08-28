let findType = (varType) => {
    return typeof varType;
}

let forEach = (array, callBackFunction) => {
    for (let i = 0; i < array.length; i++) {
        callBackFunction(array[i]);
    }
}

let map = (array, callBackFunction) => {
    let transformedArr = [];
    forEach(array, (elem) => transformedArr.push(callBackFunction(elem)));
    return transformedArr;
}

let filter = (array, callBackFunction) => {
    let filteredArr = [];
    forEach(array, function (elem) {
        if (callBackFunction(elem)) {
            filteredArr.push(elem);
        }
    });
    return filteredArr;
}

let getAdultAppleLovers = (data) => {
    return map(filter(data, (elem) => {
        return elem.age >= 18 && elem.favoriteFruit === 'apple';
    }), (elem) => {
        return elem.name;
    });    
}

let keys = (data) => {
    let keysArr = [];
    for (let key in data) {
        if (data.hasOwnProperty(key)) {
            keysArr.push(key);
        }
    }
    return keysArr;
}

let values = (data) => {
    let valuesArr = [];
    for (let key in data) {
        if (data.hasOwnProperty(key)) {
            valuesArr.push(data[key]);
        }
    }
    return valuesArr;
}

let showFormattedDate = (date) => {
    return `It is ${date.getDate()} of ${date.toLocaleString('en-US', {month: 'short'})}, ${date.getFullYear()}`
}
