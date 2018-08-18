(function verification () {
    let login = prompt('Please, input your username', '');
  
    if (login === '' || login === null) {
        alert('Canceled');
    } else if (login.length < 4) {
        alert('I don’t know any users having name length less then 4 symbols');
    } else if (login !== 'User') {
        alert('I don’t know you');
    } else {
        let password = prompt('Please, enter your password', '');
      
        if (password === '' || password === null) {
            alert('Canceled');
        } else if (password !== 'SuperUser') {
            alert('Wrong password');
        } else if (new Date().getHours() < 20) {
            alert('Good day!');
        } else {
            alert('Good evening!');
        }
    }
}());
