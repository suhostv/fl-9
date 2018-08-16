let amount = +prompt('Please, input amount of money');
let discount = +prompt('Please, input your discount');

if (amount <= 0 || discount < 0 || discount > 100 || isNaN(amount) || isNaN(discount)) {
    console.log('Invalid data');
} else {
    let saved = amount / 100 * discount;
    let price = amount - saved;

    console.log('Price without discount: ' + Math.round(amount * 100) / 100 + '\n' +
                'Discount: ' + Math.round(discount * 100) / 100 + '%' + '\n' +
                'Price with discount: ' + Math.round(price * 100) / 100 + '\n' +
                'Saved: ' + Math.round(saved * 100) / 100);
}