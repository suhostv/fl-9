function ShoppingCart (name, owner, maxCount) {
    this.name = name;
    this.owner = owner;
    this.maxCount = maxCount;
    let products = [];
    let productAddedToCart = [];
    let history = [];
    history.push(`${this.name} was created in ${new Date()}`)

    this.addNewProduct = function (product) {
        if (!(product instanceof Product)) {
            return console.log('Wrong parameter');
        } 

        if (products.length !== this.maxCount) {
            products.push(product);
        } else {
            let lowestPrice = Infinity;
            let index;
            for (let i = 0; i < products.length; i++) {
                if (products[i].getPrice() < lowestPrice) {
                    lowestPrice = products[i].getPrice();
                    index = i; 
                }
            }
            products.splice(index, 1);
            products.push(product);
        }
        productAddedToCart.push(new Date());
        product.add(this.name);
        history.push(`${product.name} was added to ${this.name} on ${new Date()}`)
        return this;
    }

    this.removeProduct = function (id) {
        if (id > products.length){
            console.log('You cannot remove not existing item')
        }
        history.push(`${products[id - 1].name} was removed from ${this.name} on ${new Date()}`);
        products[id - 1].removeProduct(this.name);
        products.splice(id - 1, 1);
        productAddedToCart.splice(id - 1, 1); 
        return this;  
    }

    this.getAveragePrice = function () {
        let average = 0;
        products.forEach((pr) => {
            average += pr.getPrice();
        });
        return average / products.length;
    }

    this.getProducts = function () {
        products.forEach((pr) => {
            console.log(pr);
        });
    }

    this.getFormattedListOfProducts = function () {
        products.forEach((pr) => console.log(`${pr.name} - is on ${this.name} 
from ${productAddedToCart[products.indexOf(pr)]}. 
Detailed product description: ${pr.description}
`));
        } 

    this.getTotalPrice = function () {
        let total = 0;
        products.forEach((pr) => {
            total += pr.getPrice();
        });
        return total;
    }

    this.getHistory = function () {
        history.forEach((log) => console.log(log));
    }
}

    

function Product (name, description, price) {
    this.name = name;
    this.description = description;
    let _price = price;
    let cartAddedTo = '';
    let history = [];

    this.getPrice = function () {
        return _price;
    }

    this.setPrice = function (price) {
        if (price > _price) {
            history.push(`Change price from ${_price} to ${price}`) 
            _price = price;
         } else {
            history.push(`Try to change price from ${_price} to ${price}`) 
            console.log('Cannot set smaller price');
         }
         return this;
    }
    
    this.add = function (cartName) {
        cartAddedTo = cartName;
        history.push(`${this.name} is added to ${cartName} on ${new Date()}`);
        return this;
    }

    this.removeProduct = function (cartName) {
        cartAddedTo = '';
        history.push(`${this.name} is removed from ${cartName} on ${new Date()}`);
        return this;
    }

    this.getHistoryLog = function () {
        history.forEach((log) => console.log(log));
    }
}

const shoppingCart1 = new ShoppingCart('name1', 'owner1', 5);
const shoppingCart2 = new ShoppingCart('name2', 'owner2', 5);

const pr1 = new Product('name1', 'desc1', 7);
const pr2 = new Product('name2', 'desc2', 8);
const pr3 = new Product('name3', 'desc3', 1);

pr2.setPrice(5);
pr2.setPrice(15);

shoppingCart1.addNewProduct(pr1).addNewProduct(pr2).addNewProduct(pr3).removeProduct(2);
console.log(shoppingCart1.getAveragePrice());
console.log(shoppingCart1.getTotalPrice());
shoppingCart1.getProducts();
shoppingCart1.getFormattedListOfProducts();
shoppingCart1.getHistory();

pr2.getHistoryLog();

shoppingCart2.addNewProduct(pr2);
shoppingCart2.getHistory();


