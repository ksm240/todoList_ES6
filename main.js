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

const createItemDom = (text, status) => {
  const listItem = document.createElement('li');
  const itemLabel =document.createElement('label');
  const itemCompBtn = document.createElement('button');
  const itemIncompBtn = document.createElement('button');
  listItem.className = (status == 'incomplete') ? 'complete well':'uncompleted well';
  itemLabel.innerText = text;
  itemCompBtn.className = 'btn btn-success';
  itemCompBtn.innerText = (status == 'incomplete') ? 'Complete' : 'Incomplete';

  itemIncompBtn.className = 'btn btn-danger';
  itemIncompBtn.innerText = "Delete";

  listItem.appendChild(itemLabel);
  listItem.appendChild(itemCompBtn);
  listItem.appendChild(itemIncompBtn);

  return listItem;
}

const addToList = () => {
  const item = createItemDom();
  todoList.appendChild(item);
}

addButton.addEventListener('click',addToList);
