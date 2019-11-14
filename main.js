const addButton = document.getElementById('addButton');
const addInput = document.getElementById('itemInput');
const todoList = document.getElementById('todoList');
const listArray = [];

function listItemObj(content, status) {
  this.content = '';
  this.status = 'incomplete';
}

const changeToComp = () => {
  let parent = this.parentElement;
  console.log('Changed to complete');
  parent.className = 'uncompleted well';
  this.innerText = 'Incomplete';
  this.removeEventListener('click', changeToComp);
  this.addEventListener('click', changeToInComp);
  changeListArray(parent.firstChild.innerText, 'complete');
  console.trace();
}

const createItemDom = () => {
  const listItem = document.createElement('li');
  const itemLabel =document.createElement('label');
  const itemCompBtn = document.createElement('button');
  const itemIncompBtn = document.createElement('button');
}

const addToList = () => {
  const item = createItemDom();
  console.log(todoList);
  todoList.appendChild(item);
}

addButton.addEventListener('click',addToList);
