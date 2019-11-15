const addButton = document.getElementById('addButton');
const addInput = document.getElementById('itemInput');
const todoList = document.getElementById('todoList');
let listArray = [];

function listItemObj(content, status) {
  this.content = '';
  this.status = 'incomplete';
}

const changeToComp = (e) => {
  const parent = e.target.parentElement;
  console.log(parent);
  console.log('Changed to complete');
  parent.className = 'uncompleted well';
  e.target.innerText = 'Incomplete';
  e.target.removeEventListener('click', changeToComp);
  e.target.addEventListener('click',changeToInComp);
  changeListArray(parent.firstChild.innerText, 'complete');
}

const changeToInComp = (e) => {
  const parent = e.target.parentElement;
  console.log('Changed to incomplete');
  parent.className = 'complete well';
  e.target.innerText = 'Complete';
  e.target.removeEventListener('click', changeToInComp);
  e.target.addEventListener('click', changeToComp);
  changeListArray(parent.firstChild.innerText, 'incomplete');
}

const removeItem = (e) => {
  const parent = e.target.parentElement.parentElement;
  parent.removeChild(e.target.parentElement);
  console.log(e.target.parentElement.firstChild.innerText);

  const data = e.target.parentElement.firstChild.innerText;
  for (let i=0; i < listArray.length; i++){
    if(listArray[i].content == data){
      listArray.splice(i,1);
      refreshLocal();
      break;
    }
  }
}

const changeListArray = (data, status) => {
  for(let i=0; i < listArray.length; i++){
    if(listArray[i].content == data){
      listArray[i].status = status;
      refreshLocal();
      break;
    }
  }
}

const createItemDom = (text, status) => {
  const listItem = document.createElement('li');
  const itemLabel = document.createElement('label');
  const itemCompBtn = document.createElement('button');
  const itemIncompBtn = document.createElement('button');
  listItem.className = (status == 'incomplete') ? 'complete well':'uncompleted well';

  itemLabel.innerText = text;

  itemCompBtn.className = 'btn btn-success mr-2';
  itemCompBtn.innerText = (status == 'incomplete') ? 'Complete' : 'Incomplete';

  itemIncompBtn.className = 'btn btn-danger';
  itemIncompBtn.innerHTML = '<i class="fas fa-trash"></i>';
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

const refreshLocal = () => {
  const todos = listArray;
  localStorage.removeItem('todoList');
  localStorage.setItem('todoList', JSON.stringify(todos));
  console.log(listArray);
}

const addToList = () => {
  const newItem = new listItemObj;
  newItem.content = addInput.value;
  const item = createItemDom(addInput.value, 'incomplete');
  listArray.push(newItem);
  refreshLocal();
  todoList.appendChild(item);
  addInput.value ='';

}

const clearList = () => {
  listArray = [];
  localStorage.removeItem('todoList');
  todoList.innerHTML = '';
}

window.onload = () => {
  const list = localStorage.getItem('todoList');
  if (list != null) {
    todos = JSON.parse(list);
    listArray = todos;

    for(let i=0; i<listArray.length; i++){
      const data = listArray[i].content;
      const item = createItemDom(data, listArray[i].status);
      todoList.appendChild(item);
    }
  }
  console.log(list);
}

addButton.addEventListener('click',addToList);
clearButton.addEventListener('click', clearList);
