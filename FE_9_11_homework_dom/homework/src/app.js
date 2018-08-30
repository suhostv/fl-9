let rootNode = document.getElementById('root');

//add heading
let heading = document.createElement('h1');
heading.innerHTML = 'TODO Cat List';
rootNode.appendChild(heading);

//add div with input
let inputDiv = document.createElement('div');
inputDiv.setAttribute('class', 'flex');

let inputField = inputDiv.appendChild(document.createElement('input'));
inputField.setAttribute('placeholder', 'Add New Action');
inputField.setAttribute('type', 'text');

let addActionButton = document.createElement('i');
addActionButton.setAttribute('class', 'material-icons add');
addActionButton.innerHTML = 'add_box';
inputDiv.appendChild(addActionButton);

rootNode.appendChild(inputDiv);

//add hr
rootNode.appendChild(document.createElement('hr'));

//add div to append actions to
let appendActionsDiv = document.createElement('div'); 
appendActionsDiv.setAttribute('class', 'append-to');
rootNode.appendChild(appendActionsDiv);

//add img to the bottom
let img = document.createElement('img');
img.setAttribute('src', '../homework/assets/img/cat.png');
rootNode.appendChild(img);

//declared warning message
let warning = document.createElement('h3');
warning.setAttribute('class', 'warning');
warning.innerHTML = 'Maximum item per list are created';

addActionButton.addEventListener('click', appendAction);

//append div with action function
function appendAction () {
    let text = inputField.value;
    
    if (text === '') {
        return;
    }    

    let container = document.createElement('div');
    container.setAttribute('class', 'draggable');
    container.setAttribute('draggable', 'true');

    let checkbox = document.createElement('input');
    checkbox.setAttribute('type', 'checkbox');
    checkbox.setAttribute('id', 'thing');

    container.appendChild(checkbox);

    let label = document.createElement('label');
    label.setAttribute('for', 'thing');

    let markButton = document.createElement('i');
    markButton.setAttribute('class', 'material-icons mark');
    markButton.innerHTML = 'check_box_outline_blank';
    label.appendChild(markButton);

    container.appendChild(label);


    let actionText = document.createElement('span');
    actionText.innerHTML = text;
    container.appendChild(actionText);

    let deleteButton = document.createElement('i');
    deleteButton.setAttribute('class', 'material-icons delete');
    deleteButton.innerHTML = 'delete';
    container.appendChild(deleteButton);

    appendActionsDiv.appendChild(container);

    inputField.value = '';

    const MAX_ACTIONS = 10;

    if (appendActionsDiv.childNodes.length === MAX_ACTIONS) {
        rootNode.insertBefore(warning, inputDiv);
        inputField.setAttribute('disabled', 'true');
        return;        
    } else {
        inputField.focus();
    }
}

appendActionsDiv.addEventListener('click', function (event) {
    if (event.target.classList.contains('mark')) {
        event.target.innerHTML = 'check_box';    
    }
}, false);

appendActionsDiv.addEventListener('click', function (event) {
    if (event.target.classList.contains('delete')) {
        event.target.parentNode.remove();    
    }
}, false);



//rootNode.appendChild(/* Append your list item node*/);