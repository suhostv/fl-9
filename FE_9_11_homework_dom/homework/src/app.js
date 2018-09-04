const rootNode = document.getElementById('root');
const inputDiv = document.querySelector('.flex');
const inputField = document.querySelector('.action-input');
const addActionButton = document.querySelector('.add');
const appendActionsDiv = document.querySelector('.append-to');
const warning = document.querySelector('.warning');

//event listeners
addActionButton.addEventListener('click', appendAction);

appendActionsDiv.addEventListener('click', function (event) {
    if (event.target.classList.contains('mark')) {
        event.target.innerHTML = 'check_box';    
    }
}, false);

appendActionsDiv.addEventListener('click', function (event) {
    if (event.target.classList.contains('delete')) {
        event.target.parentNode.remove();  
        if (warning.style.display === 'block') {
            warning.style.display = 'none';
            inputField.removeAttribute('disabled');
        }  
    }
}, false);

function appendAction () {
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
       
    if (inputField.value.trim() === '') {
        inputField.value = '';
        inputField.focus();
        return;
    }    

    const container = createElemAddAttribute('div', {class: 'draggable', draggable: 'true'});

    const checkbox = createElemAddAttribute('input', {type: 'checkbox', id: 'thing'});
    container.appendChild(checkbox);

    const label = createElemAddAttribute('label', {for: 'thing'});

    const markButton = createElemAddAttribute('i', {class: 'material-icons mark'}, 'check_box_outline_blank')
    label.appendChild(markButton);

    container.appendChild(label);

    const actionText = createElemAddAttribute('span', {}, inputField.value);
    container.appendChild(actionText);

    const deleteButton = createElemAddAttribute('i', {class: 'material-icons delete'}, 'delete');
    container.appendChild(deleteButton);

    appendActionsDiv.appendChild(container);

    inputField.value = '';

    addDnDHandlers(container);

    const MAX_ACTIONS = 10;
    if (appendActionsDiv.childNodes.length === MAX_ACTIONS) {
        warning.style.display = 'block';
        inputField.setAttribute('disabled', 'true');
        return;        
    } else {
        inputField.focus();
    }   
}

//functions for dragndrop
let draggingElement = null; 

function handleDragStart(e) {
    draggingElement = this;    
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.outerHTML);
}

function handleDragOver(e) {
    if (e.preventDefault) {
        e.preventDefault();
    }
    if (draggingElement !== null) {
        this.classList.add('over');
    }
    e.dataTransfer.dropEffect = 'move';  
    return false;
}

function handleDragEnter(e) {
    if (e.preventDefault) {
        e.preventDefault(); 
    }
}

function handleDragLeave(e) {
    this.classList.remove('over');
}

function handleDrop(e) {
    if (e.stopPropagation) {
        e.stopPropagation(); 
    }

    if (draggingElement !== this && draggingElement !== null) {        
        this.parentNode.removeChild(draggingElement);
        let dropHTML = e.dataTransfer.getData('text/html');
        this.insertAdjacentHTML('beforebegin', dropHTML);
        let dropElem = this.previousSibling;
        addDnDHandlers(dropElem);    
    }
    this.classList.remove('over');
    draggingElement = null;
    return false;
}
    
function addDnDHandlers(elem) {
    elem.addEventListener('dragstart', handleDragStart, false);
    elem.addEventListener('dragenter', handleDragEnter, false)
    elem.addEventListener('dragover', handleDragOver, false);
    elem.addEventListener('dragleave', handleDragLeave, false);
    elem.addEventListener('drop', handleDrop, false);    
}