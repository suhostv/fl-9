let draggingElement = null; //variable needed for drag’n’drop

//creation of page layout
let rootNode = document.getElementById('root');

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

let heading = createElemAddAttribute('h1', {}, 'TODO Cat List');
 rootNode.appendChild(heading);

let inputDiv = createElemAddAttribute('div', {class: 'flex'});

let inputField = createElemAddAttribute('input', {placeholder: 'Add New Action', type: 'text'});
inputDiv.appendChild(inputField);

let addActionButton = createElemAddAttribute('i', {class: 'material-icons add'}, 'add_box');
inputDiv.appendChild(addActionButton);

rootNode.appendChild(inputDiv);

rootNode.appendChild(document.createElement('hr'));

let appendActionsDiv = createElemAddAttribute('div', {class: 'append-to'});
rootNode.appendChild(appendActionsDiv);

let img = createElemAddAttribute('img', {src: '../homework/assets/img/cat.png'});
rootNode.appendChild(img);

let warning = createElemAddAttribute('h3', {class: 'warning'}, 'Maximum item per list are created');

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
        if (rootNode.contains(warning)) {
            warning.remove();
            inputField.removeAttribute('disabled');
        }  
    }
}, false);

function appendAction () {
    let text = inputField.value;
    
    if (text === '') {
        return;
    }    

    let container = createElemAddAttribute('div', {class: 'draggable', draggable: 'true'});

    let checkbox = createElemAddAttribute('input', {type: 'checkbox', id: 'thing'});
    container.appendChild(checkbox);

    let label = createElemAddAttribute('label', {for: 'thing'});

    let markButton = createElemAddAttribute('i', {class: 'material-icons mark'}, 'check_box_outline_blank')
    label.appendChild(markButton);

    container.appendChild(label);

    let actionText = createElemAddAttribute('span', {}, text);
    container.appendChild(actionText);

    let deleteButton = createElemAddAttribute('i', {class: 'material-icons delete'}, 'delete');
    container.appendChild(deleteButton);

    appendActionsDiv.appendChild(container);

    inputField.value = '';

    addDnDHandlers(container);

    const MAX_ACTIONS = 10;
    if (appendActionsDiv.childNodes.length === MAX_ACTIONS) {
        rootNode.insertBefore(warning, inputDiv);
        inputField.setAttribute('disabled', 'true');
        return;        
    } else {
        inputField.focus();
    }   
}

//functions for dragndrop
function handleDragStart(e) {
    draggingElement = this;    
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.outerHTML);
}

function handleDragOver(e) {
  if (e.preventDefault) {
    e.preventDefault();
  }
  this.classList.add('over');
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

  if (draggingElement !== this) {        
    this.parentNode.removeChild(draggingElement);
    let dropHTML = e.dataTransfer.getData('text/html');
    this.insertAdjacentHTML('beforebegin', dropHTML);
    let dropElem = this.previousSibling;
    addDnDHandlers(dropElem);
    
  }
  this.classList.remove('over');
  return false;
}
    
function addDnDHandlers(elem) {
  elem.addEventListener('dragstart', handleDragStart, false);
  elem.addEventListener('dragenter', handleDragEnter, false)
  elem.addEventListener('dragover', handleDragOver, false);
  elem.addEventListener('dragleave', handleDragLeave, false);
  elem.addEventListener('drop', handleDrop, false);    
}