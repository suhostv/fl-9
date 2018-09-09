const rootNode = document.getElementById('root');
let zero = 0;
let two = 2;
const todoItems = [
    {isDone: false, id: 12345, description: 'Todo 1'}
];

let itemToModify = null;
const addButton = document.getElementById('add-button');
const cancelButton = document.getElementById('cancel-button');
const saveButton = document.getElementById('save-button');
const headers = document.getElementsByTagName('h1');
const input = document.querySelector('input');
const unorderedList = document.querySelector('ul');

addButton.addEventListener('click', moveToAddItemPage);
cancelButton.addEventListener('click', moveToMainPage);
saveButton.addEventListener('click', saveItem);
window.addEventListener('hashchange', onHashChange);



function moveToAddItemPage() {
    window.location.hash = '/add';
}

function moveToMainPage() {
    window.location.hash = '';
    history.pushState('', document.title, window.location.pathname);    
}

function saveItem() {
    if (window.location.hash === '#/add') {
        generateListItem(input.value);
    } else {
        const listChildren = itemToModify.childNodes;
        listChildren[two].innerHTML = input.value;     
    }
    input.value = '';
    window.location.hash = '';
    history.pushState('', document.title, window.location.pathname);
}

function modifyItem() {
    let clickedOn;
    if (event.target.tagName === 'SPAN') {
        clickedOn = event.target.parentNode;
    } else {
        return;
    }
    window.location.hash = '/modify:';
    const listChildren = clickedOn.childNodes;
    input.value = listChildren[two].innerHTML;    
    itemToModify = clickedOn;
}

function deleteItem() {
    let clickedOn = event.target.parentNode;
    clickedOn.remove();
}

function checkItem() {
    event.target.setAttribute('src', 'assets/img/done-s.png');
    let span = event.target.parentNode.nextSibling;
    let li = span.parentNode;
    li.remove();
    unorderedList.appendChild(li);
    span.style.backgroundColor = '#807f7f';
}

function onHashChange() {
    let newHash = window.location.hash;
    const listlistItem = document.querySelector('.task-list');
    if (newHash === '#/add' || newHash === '#/modify:') {
        headers[zero].style = 'display: none';
        if (newHash === '#/add'){
            headers[two].style = 'display: none';
            headers[1].style = 'display: block';
        } else {
            headers[1].style = 'display: none';
            headers[two].style = 'display: block';
        }
        addButton.style = 'display: none';
        listlistItem.style = 'display: none';
        input.style = 'display: block';
        cancelButton.style = 'display: block';
        saveButton.style = 'display: block';

    } else if (newHash === '') {
        headers[zero].style = 'display: block';
        headers[1].style = 'display: none';
        headers[two].style = 'display: none';
        addButton.style = 'display: block';
        listlistItem.style = 'display: block';
        input.style = 'display: none';
        cancelButton.style = 'display: none';
        saveButton.style = 'display: none';
    } 
}

function generateListItem(value) {
    function createElemAddAttribute(tag, attributesObject, markup) {
        let createdElement = document.createElement(tag);
        if (Object.keys(attributesObject).length){
            for (let key in attributesObject) {
                if (attributesObject.hasOwnProperty(key)) {
                    createdElement.setAttribute(key, attributesObject[key]);
                }
            }
        }
        if (markup && typeof markup === 'string') {
            createdElement.innerHTML = markup
        }
        return createdElement;
    }
    
    if (value === ''){
        return;
    }
    let listItem = document.createElement('li');
    
    const checkbox = createElemAddAttribute('input', {type: 'checkbox', id: 'thing', style: 'display: none'});
    listItem.appendChild(checkbox);

    const label = createElemAddAttribute('label', {for: 'thing'});

    const markButton = createElemAddAttribute('img', {src: 'assets/img/todo-s.png', alt: 'logo'})
    label.appendChild(markButton);

    listItem.appendChild(label);

    const actionText = createElemAddAttribute('span', {}, value);
    listItem.appendChild(actionText);

    const deleteButton = createElemAddAttribute('img', 
    {src: 'assets/img/remove-s.jpg', class: 'delete-btn-img', alt: 'logo'});
    listItem.appendChild(deleteButton);

    unorderedList.appendChild(listItem);

    listItem.addEventListener('click', modifyItem);
    deleteButton.addEventListener('click', deleteItem);
    markButton.addEventListener('click', checkItem);
}

//rootNode.appendChild(/* Append your list item node*/);