const isSmaller = (isBiggerFunc, a, b) => {
    return !isBiggerFunc(a, b);
}

//isSmaller(isBigger, 5, -1); // => false