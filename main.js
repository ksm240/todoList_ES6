const addButton = document.getElementById('addButton');
const addInput = document.getElementById('itemInput');
const todoList = document.getElementById('todoList');
const listArray = [];

function listItemObj(content, status) {
  this.content = '';
  this.status = 'incomplete';
}

const changeToComp = (e) => {
  const parent = e.target.parentElement;
  console.log('Changed to complete');
  parent.className = 'uncompleted well';
  e.target.innerText = 'Incomplete';
  e.target.removeEventListener('click', changeToComp);
  e.target.addEventListener('click',changeToInComp);
  parent.firstChild.innerText = 'complete';
}

const changeToInComp = (e) => {
  const parent = e.target.parentElement;
  console.log('Changed to incomplete');
  parent.className = 'complete well';
  e.target.innerText = 'Complete';
  e.target.removeEventListener('click', changeToInComp);
  e.target.addEventListener('click', changeToComp);
}

const removeItem = (e) => {
  const parent = e.target.parentElement.parentElement;
  parent.removeChild(e.target.parentElement);
  console.log(e.target.parentElement.firstChild.innerText);
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
  itemIncompBtn.addEventListener('click', removeItem);

  if (status == 'incomplete') {
    itemCompBtn.addEventListener('click', changeToComp);
  }else{
    itemCompBtn.addEventListener('click', changeToInComp);
  }

  listItem.appendChild(itemLabel);
  listItem.appendChild(itemCompBtn);
  listItem.appendChild(itemIncompBtn);

  return listItem;
}

const addToList = () => {
  const item = createItemDom(addInput.value, 'incomplete');
  todoList.appendChild(item);
  addInput.value ='';

}

const clearList = () => {
  todoList.innerHTML = '';
}

addButton.addEventListener('click',addToList);
clearButton.addEventListener('click', clearList);
